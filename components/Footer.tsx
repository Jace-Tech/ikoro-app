import { Box, HStack, useTheme } from "native-base"
import AppContainer from "./AppContainer";
import FooterButton from "./FooterButton";
import { Entypo, AntDesign, MaterialIcons } from "@expo/vector-icons"

interface FooterProps {
  routes: { name: string; key: string; }[],
  index: number;
}
const Footer = ({ index, routes }: FooterProps) => {
  const footerIconMap: any = {
    "home": { type: "entypo", name: "home" },
    "search": { type: "ant", name: "search1" },
    "upload": { type: "ant", name: "plus" },
    "channel": { type: "mat", name: "video-library" },
  }
  return (
    <AppContainer bgColor={"black"} borderTopWidth={.5} borderTopColor={"dark.100"}>
      <HStack w={"full"} mt={1}>
        {routes.map((route, idx) => (
          <FooterButton 
            active={index === idx} 
            flex={1} 
            Icon={<FooterIcon active={index === idx} {...footerIconMap[route.name]} />} 
            {...route}
          />
        ))}
      </HStack>
    </AppContainer>
  )
}

export default Footer


interface FooterIconProps {
  type: "entypo" | "ant" | "mat";
  name: string;
  active?: boolean;
}
const FooterIcon = ({ type, active, name }:FooterIconProps) => {
  const colors = useTheme()['colors']
  return type === "entypo" ?  <Entypo name={name as any} color={active ? colors.brand['500'] : colors.gray[500]} size={22} /> :
  type === "ant" ? <AntDesign name={name as any} color={active ? colors.brand['500'] : colors.gray[500]} size={22} /> : 
  <MaterialIcons name={name as any} color={active ? colors.brand['500'] : colors.gray[500]} size={22} />
}