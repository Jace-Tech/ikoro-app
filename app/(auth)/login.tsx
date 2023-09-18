import { Link, useNavigation, useRouter } from "expo-router"
import { Button, HStack, Heading, IconButton, Stack, Text, useDisclose, useTheme, KeyboardAvoidingView, ScrollView } from "native-base"
import React, { useLayoutEffect } from "react"
import AppContainer from "../../components/AppContainer"
import { useForm } from "react-hook-form"
import { Ionicons } from '@expo/vector-icons';
import AuthInput from "../../components/AuthInput"
import { Platform } from "react-native"
import { loginUser } from "../../apis/auth"
import { log } from "../../utils/helpers"
import { useAppContext } from "../../contexts/AppContext"
import { useAppDispatch } from "../../store/hook"
import { populateToken, populateUser } from "../../store/slice/accountSlice"


interface LoginScreenProps { }
const LoginScreen: React.FC<LoginScreenProps> = () => {
  const { isOpen, onToggle } = useDisclose()
  const { isOpen: isLoading, onOpen: openLoading, onClose: closeLoading } = useDisclose()
  const { openAlert } = useAppContext()
  const { setOptions } = useNavigation()
  const colors = useTheme()['colors']

  const dispatch = useAppDispatch()
  const router = useRouter()

  const { control, trigger, getValues, reset } = useForm<RegisterType>({ mode: "onTouched" })

  const handleLogin = async () => {
    if (! await trigger()) return
    openLoading()
    const result = await loginUser(getValues())
    log("RESULT:", result)
    if (!result?.success) {
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
      <Heading color={"white"} pb={3} mt={24} size={"xl"}>Login</Heading>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        flex={1}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust this offset as needed
      >
        <ScrollView flex={1} mb={10}>
          <Stack mt={8} space={4}>
            {/* EMAIL */}
            <AuthInput
              placeholder="Email"
              control={control}
              name="email"
              keyboardType="email-address"
              rules={{ required: "Email is required" }}
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

            <Button isLoading={isLoading} onPress={handleLogin} mt={6} colorScheme={"brand"} size={"lg"}>Login</Button>

            <HStack mt={4}>
              <Text color={"white"}>Don't have an account?</Text>
              <Link href={"/(auth)/register"} asChild>
                <Text color={"brand.600"} ml={1} fontWeight={"semibold"}>Sign up</Text>
              </Link>
            </HStack>
          </Stack>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppContainer>
  )
}

export default LoginScreen