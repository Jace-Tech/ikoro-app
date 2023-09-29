import { useNavigation } from "expo-router"
import { Box, IBoxProps } from "native-base"
import { useLayoutEffect } from "react"
import AppBar from "./AppBar"

interface PageLayoutProps extends IBoxProps { 
  title: string;
}
const PageLayout = ({ title, ...rest }: PageLayoutProps) => {
  const { setOptions } = useNavigation()

  useLayoutEffect(() => {
    setOptions({ header: (prop: any) => <AppBar title={title} /> })
  }, [])
  
  return (
    <Box bg={"black"} flex={1} {...rest} />
  )
}

export default PageLayout