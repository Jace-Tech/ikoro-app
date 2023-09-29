import { useNavigation, useRouter } from "expo-router"
import { Box, HStack, Icon, IconButton, Image } from "native-base"
import { useLayoutEffect } from "react"
import AppContainer from "./AppContainer"
import { Feather  , Ionicons } from '@expo/vector-icons';
import { useDrawerContext } from "../contexts/DrawerContext";

interface HomeHeaderProps { }
const HomeHeader = ({ }: HomeHeaderProps) => {
  const { openDrawer } = useDrawerContext()
  const router = useRouter()

  const headerOptions = [
    {
      iconType: Ionicons,
      iconName: "mail-outline",
      handleClick: () => {},
      iconStyles: {
        size: "xl"
      }
    },
    {
      iconType: Ionicons,
      iconName: "notifications-outline",
      handleClick: () => {},
      iconStyles: {
        size: "xl"
      }
    },
    {
      iconType: Ionicons,
      iconName: "ios-person-circle-outline",
      handleClick: () => router.push("/profile/me"),
      iconStyles: {
        size: "2xl"
      }
    },
  ]

  return (
    <AppContainer py={2} w={"full"} bg={"black"} borderBottomWidth={.5} borderBottomColor={"dark.100"}>
      <HStack w={"full"} alignItems={"center"} justifyContent={"space-between"}>
        <Image source={require("../assets/ikoro.png")} h={12} maxW={12} alt="menu" resizeMode="contain" />

        <HStack alignItems={"center"}>
          <HStack space={1} alignItems={"center"}>
            { headerOptions.map((icon) => (
              <IconButton
                key={`option-${icon.iconName}`}
                colorScheme={"gray"}
                onPress={icon.handleClick}
                size={"xs"}
                icon={<Icon as={icon.iconType} name={icon.iconName} color={"gray.400"} {...icon.iconStyles} />}
              />
            )) }
          </HStack>

          <IconButton
            ml={4}
            onPress={openDrawer}
            colorScheme={"gray"}
            size={"xs"}
            icon={<Icon as={Feather} color={"gray.400"} name="menu" size={"xl"} />}
          />
        </HStack>
      </HStack>
    </AppContainer>
  )
}

export default HomeHeader