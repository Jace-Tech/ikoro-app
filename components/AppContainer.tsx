import { Box, IBoxProps } from "native-base"
import React from "react"

interface AppContainerProps extends IBoxProps { }
const AppContainer: React.FC<AppContainerProps> = (props) => {
  return (
    <Box px={4} {...props} />
  )
}

export default AppContainer