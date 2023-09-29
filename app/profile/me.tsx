import { Avatar, Box, Center, Heading, Icon, Pressable, Spinner, Stack, VStack, themeTools, useDisclose, useTheme } from "native-base"
import PageLayout from "../../components/PageLayout"
import { useAppDispatch, useAppSelector } from "../../store/hook"
import { Entypo, Ionicons } from "@expo/vector-icons"
import { addBase64Addons, avatarNameSub, json, log } from "../../utils/helpers"
import * as ImagePicker from 'expo-image-picker';
import { uploadProfilePicture } from "../../apis/profile"
import { useAppContext } from "../../contexts/AppContext"
import { CustomError } from "../../utils/error"
import { useEffect, useState } from "react"
import { populateUser } from "../../store/slice/accountSlice"

interface MyProfileProps { }
const MyProfile = ({ }: MyProfileProps) => {
  const account = useAppSelector(state => state.accountStore.user)
  const token = useAppSelector(state => state.accountStore.token)
  const { openAlert } = useAppContext()
  const { colors } = useTheme()
  const { transparentize } = themeTools

  const [userData, setUserData] = useState(account)
  const { isOpen: isLoading, onClose: closeLoading, onOpen: openLoading } = useDisclose()
  const dispatch = useAppDispatch()

  useEffect(() => {
    log("USER DATA:", userData)
  }, [userData])

  const handleImagePick = async () => {
    try {
      
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
        base64: true
      });
      
      // CHECK IF IMAGE PICKER WAS CANCELED
      if (result.canceled) throw new CustomError("Image selection cancelled!", "warning")
      
      // START LOADING 
      openLoading()
      
      // UPLOAD RESULT 
      const data = addBase64Addons(result.assets[0].base64!)
      const uploadResult = await uploadProfilePicture(data, token!)
      if (!uploadResult.success) throw new CustomError(uploadResult.message)

      // UPDATE THE USER START
      dispatch(populateUser(uploadResult.data))
      setUserData(uploadResult.data)

      // SHOW SUCCESS MESSAGE
      openAlert(uploadResult.message, "success")
    }
    catch (error: any) {
      openAlert(error.message, error?.status || "error")
    }
    finally {
      // CLOSE LOADING
      closeLoading()
    }
  }

  return (
    <PageLayout title="My profile" safeAreaTop>
      <Stack flex={1} py={10}>
        <Center>
          <VStack>
            {account && account.image ? (
              <Box position={"relative"}>
                <Avatar size={"2xl"} source={{ uri: account.image }}>
                  {avatarNameSub(account.name)}

                  {/* UPLOAD BUTTON */}
                  {!isLoading && <Avatar.Badge bg="transparent" borderWidth={0} justifyContent={"center"} alignItems={"center"}>
                    <Pressable onPress={handleImagePick} p={2} rounded={"full"} bg={transparentize(colors.coolGray[900], .8)({})} _pressed={{ bg: transparentize(colors.coolGray[600], .5)({}) }}>
                      <Icon as={Entypo} name="camera" size={"md"} />
                    </Pressable>
                  </Avatar.Badge> }
                </Avatar>

                {isLoading &&
                  <Center rounded={"full"} zIndex={200} bg={transparentize(colors.coolGray[900], .8)({})} w={"full"} h={"full"} position={"absolute"}>
                    <Spinner colorScheme={"coolGray"} size={"lg"} />
                  </Center>
                }
              </Box>
            ) : (
              <Pressable onPress={handleImagePick} justifyContent={"center"} alignItems={"center"} w={32} h={32} rounded={"full"} bg={transparentize(colors.dark[100], .4)({})} _pressed={{ bg: "dark.50" }}>
                {isLoading ? <Spinner colorScheme={"coolGray"} size={"lg"} /> : account && account.name ?
                  <Heading size="2xl" letterSpacing={"xl"} fontWeight={"semibold"} color={"dark.500"}>{avatarNameSub(account?.name)}</Heading> :
                  <Icon as={Ionicons} name="person-outline" size="5xl" color={"dark.200"} />
                }
              </Pressable>
            )}
          </VStack>
        </Center>
      </Stack>
    </PageLayout>
  )
}

export default MyProfile