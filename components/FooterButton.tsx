import { Box, IPressableProps, Icon, IconButton, Pressable, Text } from "native-base"
import { Tabs, useRouter } from "expo-router"
import { ReactNode } from "react"

interface FooterButtonProps extends IPressableProps{
  Icon: ReactNode;
  name: string;
  active?: boolean;
}
const FooterButton = ({ active, Icon, name, ...rest }: FooterButtonProps) => {
  const {push} = useRouter()
  const linkMap: any =  {
    home: () => push("/(main)/home"),
    search: () => push("/(main)/search"),
    upload: () => push("/(main)/upload"),
    channel: () => push("/(main)/channel"),
  }
  return (
    <Pressable onPress={linkMap[name]} display={'flex'} alignItems={"center"} py={2} colorScheme={active ? "brand" : "gray"} {...rest}>
      { Icon }
      <Text mt={1} color={active ? "brand.500" : "gray.500"} textTransform={"capitalize"}>{name}</Text>
    </Pressable>
  )
}

export default FooterButton