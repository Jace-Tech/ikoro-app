import { Box, Center, Divider, HStack, Icon, IconButton, Pressable, Stack, Text, themeTools, useDisclose } from "native-base"
import AppContainer from "./AppContainer"
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons"
import { useDrawerContext } from "../contexts/DrawerContext"
import { Link, useRouter } from "expo-router"
import { useAppDispatch } from "../store/hook"
import { clearAccountState } from "../store/slice/accountSlice"
import LogoutModal from "./modals/LogoutModal"
import colors from "../theme/colors"

interface DrawerContentProps { }
const DrawerContent = ({ }: DrawerContentProps) => {
  const { closeDrawer } = useDrawerContext()
  const { isOpen, onClose: closeModal, onOpen: openModal } = useDisclose()
  const dispatch = useAppDispatch()
  const { transparentize } = themeTools
  const router = useRouter()

  const drawerOptions = [
    {
      link: "/",
      name: "settings",
      iconType: Ionicons,
      iconName: "ios-settings",
      iconStyle: {}
    },
    {
      name: "trash",
      iconType: FontAwesome5,
      iconName: "trash",
      iconStyle: { size: "sm" }
    },
    {
      name: "saved",
      iconType: Ionicons,
      iconName: "ios-save",
      iconStyle: {}
    },
    {
      name: "help & feedback",
      iconType: Ionicons,
      iconName: "help-circle",
      iconStyle: { size: "lg" }
    },
    {
      name: "contact us",
      iconType: Ionicons,
      iconName: "ios-call",
      iconStyle: {}
    },
  ]

  const handleLogout = () => {
    // CLEAR STATE
    dispatch(clearAccountState())
    // NAVIGATE TO LOGIN PAGE
    router.replace("/(auth)/login")
  }
  return (
    <Box flex={1}>
      <AppContainer py={3} borderBottomWidth={.5} borderBottomColor={"dark.100"}>
        <HStack alignItems={"center"} position={"relative"} w={"full"}>
          <Center left={-10} position={"absolute"} zIndex={10}>
            <IconButton
              size={"xs"}
              colorScheme={"gray"}
              onPress={closeDrawer}
              icon={<Icon as={Ionicons} color={"dark.200"} size={"xl"} name="md-close-outline" />}
            />
          </Center>

          <Text flex={1} textAlign={"center"} textTransform={"uppercase"} color={"gray.400"} fontWeight={"medium"} fontSize={"xl"} letterSpacing={"xl"}>Menu</Text>
        </HStack>
      </AppContainer>

      <Stack>
        {drawerOptions.map((item) => (
          <Link key={item.name} href={"/settings"} asChild>
            <Pressable _pressed={{ bg: transparentize("white", .1)({}) }} p={4} py={4} >
              <HStack alignItems={"center"} space={4} w={"full"}>
                <Center boxSize={8} >
                  <Icon as={item.iconType} color={"gray.300"} size={"md"} name={item.iconName} {...item.iconStyle} />
                </Center>
                <Text flex={1} fontWeight={"medium"} textTransform={"capitalize"} fontSize={"lg"} color={"gray.400"}>{item.name}</Text>
              </HStack>
            </Pressable>
          </Link>
        ))}
      </Stack>

      <Divider h={".5"} bg={"dark.200"} />

      <Pressable _pressed={{ bg: transparentize("red", .05)({}) }} p={4} py={4} onPress={openModal}>
        <HStack alignItems={"center"} space={4} w={"full"}>
          <Center boxSize={8} >
            <Icon as={MaterialIcons} color={"danger.600"} size={"lg"} name={"logout"}  />
          </Center>
          <Text flex={1} fontWeight={"medium"} textTransform={"capitalize"} fontSize={"lg"} color={"danger.600"}>Logout</Text>
        </HStack>
      </Pressable>

      {/* LOGOUT MODAL */}
      <LogoutModal 
        handleCloseModal={closeModal}
        isOpen={isOpen}
        handleLogout={handleLogout}
      />
    </Box>
  )
}
  
export default DrawerContent