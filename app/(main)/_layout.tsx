import { useAppSelector } from "../../store/hook"
import { Redirect, Slot } from "expo-router"

interface LayoutProps {}
const Layout = ({}: LayoutProps) => {
  const account = useAppSelector(state => state.accountStore.user)
  if(!account) return <Redirect href={"/(auth)/login"} />
  return <Slot />
}

export default Layout