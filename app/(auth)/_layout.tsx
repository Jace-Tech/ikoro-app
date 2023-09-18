import { useLayoutEffect } from "react"
import { useAppSelector } from "../../store/hook"
import { Redirect, Slot, useNavigation } from "expo-router"

interface LayoutProps {}
const Layout = ({}: LayoutProps) => {
  const account = useAppSelector(state => state.accountStore.user)
  const { setOptions} = useNavigation()
  useLayoutEffect(() => {
    setOptions({ headerShown: false })
  }, [])
  if (account) return <Redirect href={"/(main)/"} />
  return <Slot />
}

export default Layout