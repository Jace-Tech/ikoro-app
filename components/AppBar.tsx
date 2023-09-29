import { Box, Center, HStack, IBoxProps, Icon, IconButton, Text } from "native-base"
import AppContainer from "./AppContainer"
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface AppBarProps extends IBoxProps { 
  title?: string;
}
const AppBar = ({ title, ...rest }: AppBarProps) => {
  const { canGoBack, back } = useRouter()
  return (
    <AppContainer py={4} bg={"black"} borderBottomWidth={.5} borderBottomColor={"dark.100"} {...rest}>
      <HStack position={"relative"} alignItems={"center"}>
        <Center position={"absolute"} zIndex={10}>
          <IconButton 
            onPress={() => canGoBack() && back()}
            size={"sm"}
            colorScheme={"gray"}
            icon={<Icon as={Ionicons} color={"gray.400"} size={"lg"} name="arrow-back-outline" />}
          />
        </Center>
        <Text flex={1} textAlign={"center"} textTransform={"uppercase"} color={"gray.400"} letterSpacing={"xl"} fontSize={"lg"} fontWeight={"medium"}>{ title }</Text>
      </HStack>
    </AppContainer>
  )
}

export default AppBar