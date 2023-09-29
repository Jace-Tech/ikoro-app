import { useEffect, useLayoutEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hook"
import { Redirect, Slot, useNavigation } from "expo-router"
import { updateFirstTime } from "../../store/slice/accountSlice"


interface LayoutProps {}
const Layout = ({}: LayoutProps) => {
  const account = useAppSelector(state => state.accountStore.user)
  const { setOptions} = useNavigation()
  const dispatch = useAppDispatch()

  useLayoutEffect(() => {
    setOptions({ headerShown: false })
  }, [])

  useEffect(() => {
    dispatch(updateFirstTime())
  }, [])
  
  if (account) return <Redirect href={"/(main)/home"} />
  return <Slot />
}

export default Layout