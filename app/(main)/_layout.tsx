import FooterButton from "../../components/FooterButton"
import { useAppSelector } from "../../store/hook"
import { Redirect, Tabs } from "expo-router"
import { Entypo, AntDesign, MaterialIcons } from '@expo/vector-icons';
import Footer from "../../components/Footer";
import { Box, Flex } from "native-base";
import { json } from "../../utils/helpers";
import DrawerContextProvider from "../../contexts/DrawerContext";

interface LayoutProps { }
const Layout = ({ }: LayoutProps) => {
  const account = useAppSelector(state => state.accountStore.user)
  if (!account) return <Redirect href={"/(auth)/login"} />
  return (
    <DrawerContextProvider>
      <Tabs
        tabBar={(prop) => <Footer routes={prop.state.routes} index={prop.state.index} />}
      />
    </DrawerContextProvider>
  )
}

export default Layout