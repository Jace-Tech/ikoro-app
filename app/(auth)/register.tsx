import { Link, useNavigation, useRouter } from "expo-router"
import { Button, HStack, Heading, IconButton, Stack, Text, useDisclose, useTheme, KeyboardAvoidingView, ScrollView } from "native-base"
import React, { useLayoutEffect } from "react"
import AppContainer from "../../components/AppContainer"
import { useForm } from "react-hook-form"
import { Ionicons } from '@expo/vector-icons';
import AuthInput from "../../components/AuthInput"
import AuthSelect from "../../components/AuthSelect"
import { MaterialIcons } from '@expo/vector-icons';
import { Platform } from "react-native"
import { registerUser } from "../../apis/auth"
import { log } from "../../utils/helpers"
import { useAppContext } from "../../contexts/AppContext"
import { useAppDispatch } from "../../store/hook"
import { populateToken, populateUser } from "../../store/slice/accountSlice"

// import { GoogleSigninButton } from "@react-native-google-signin/google-signin"

interface RegisterScreenProps { }
const RegisterScreen: React.FC<RegisterScreenProps> = () => {
  const { isOpen, onToggle } = useDisclose()
  const { isOpen: isLoading, onOpen: openLoading, onClose: closeLoading } = useDisclose()
  const { openAlert } = useAppContext()
  const { setOptions } = useNavigation()
  const colors = useTheme()['colors']
  useLayoutEffect(() => {
    setOptions({ headerShown: false })
  }, [])

  const gender = ["Male", "Female"]
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { control, trigger, watch, clearErrors, getValues, reset } = useForm<RegisterType>({ mode: "onTouched" })
  const password = watch("password")

  const handleRegister = async () => {
    if (! await trigger()) return
    openLoading()
    const result = await registerUser(getValues())
    log("RESULT:", result)
    if(!result?.success) {
      openAlert(result.message, "error")
      closeLoading()
      return
    }

    dispatch(populateUser(result.data?.user))
    dispatch(populateToken(result.data?.token))
    closeLoading()
    openAlert(result.message, "success")
    reset()
    router.replace("/(main)/")
  }
  return (
    <AppContainer bg={"black"} flex={1}>
      <Heading color={"white"} pb={3} mt={24} size={"xl"}>Register</Heading>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        flex={1}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust this offset as needed
      >
        <ScrollView flex={1} mb={10}>
          <Stack mt={8} space={4}>

            {/* NAME */}
            <AuthInput
              placeholder="Name"
              control={control}
              name="name"
              rules={{
                required: "Name is required", minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters"
                }
              }}

            />

            {/* EMAIL */}
            <AuthInput
              placeholder="Email"
              control={control}
              name="email"
              keyboardType="email-address"
              rules={{ required: "Email is required" }}
            />

            {/* GENDER */}
            <AuthSelect
              placeholder="Gender"
              w="full"
              textTransform={"capitalize"}
              accessibilityLabel="Select gender"
              dropdownOpenIcon={<MaterialIcons name="keyboard-arrow-up" size={30} color={colors.gray['600']} />}
              dropdownCloseIcon={<MaterialIcons name="keyboard-arrow-down" size={30} color={colors.gray['600']} />}
              data={gender.map(item => ({ value: item, label: item }))}
              control={control}
              name="gender"
              rules={{ required: "Gender is required" }}
            />

            {/* PASSWORD */}
            <AuthInput
              placeholder="Password"
              control={control}
              name="password"
              type={isOpen ? "text" : "password"}
              rightElement={
                <IconButton
                  onPress={onToggle}
                  icon={<Ionicons color={isOpen ? colors.primary[500] : colors.gray[600]}
                    name={isOpen ? "md-eye-off" : "md-eye"} size={20} />}
                />
              }
              rules={{ required: "Password is required" }}
            />


            {/* CONFIRM PASSWORD */}
            <AuthInput
              placeholder="Confirm Password"
              control={control}
              name="confirmPassword"
              onChange={() => {
                clearErrors("confirmPassword")
              }}
              rules={{
                required: "Confirm password  is required", validate: (value: string) => {
                  return value !== password ? "Passwords do not match" : undefined
                }
              }}
              type={isOpen ? "text" : "password"}
              rightElement={
                <IconButton
                  onPress={onToggle}
                  icon={<Ionicons color={isOpen ? colors.primary[500] : colors.gray[600]}
                    name={isOpen ? "md-eye-off" : "md-eye"} size={20} />}
                />
              }
            />

            <Button isLoading={isLoading} onPress={handleRegister} mt={6} colorScheme={"brand"} size={"lg"}>Register</Button>

            <HStack mt={4}>
              <Text color={"white"}>Already have an account?</Text>
              <Link href={"/(auth)/login"} asChild>
                <Text color={"brand.600"} ml={1} fontWeight={"semibold"}>Sign in</Text>
              </Link>
            </HStack>
          </Stack>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppContainer>
  )
}

export default RegisterScreen