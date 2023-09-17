import { Alert, CloseIcon, IconButton, Slide, Spacer, Text, useDisclose, useTheme } from "native-base";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

type AlertType = "success" | "error" | "warning" | "info"

interface AppContextProps {
  openAlert: (message: string, type: AlertType) => void;
}
const AppContext = createContext({} as AppContextProps)


interface AppContextProviderProps {
  children: ReactNode;
}
const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const { isOpen, onOpen, onClose } = useDisclose()
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)
  const [alert, setAlert] = useState<{ type: AlertType; message: string }>({
    message: "",
    type: "success"
  })

  const openAlert = (message: string, type: AlertType = "success") => {
    setAlert({ message, type })
    onOpen()
  }
  const colors = useTheme()['colors']

  const IconMap = {
    "success": <Ionicons name="ios-checkmark-circle" size={24} color={colors.success[600]} />,
    "error": <MaterialIcons name="error" size={24} color={colors.error[600]} />,
    "warning": <Ionicons name="warning" size={24} color={colors.warning[600]} />,
    "info": <Ionicons name="information-circle" size={24} color={colors.info[600]} />,
  }

  useEffect(() => {
    if (!isOpen) return
    setIntervalId(setTimeout(() => {
      onClose()
    }, 4000))
    return () => { intervalId && clearTimeout(intervalId) }
  }, [isOpen])

  return (
    <AppContext.Provider value={{ openAlert }}>
      <Slide in={isOpen} placement="top">
        <Alert px={4} flexDirection={"row"} status={alert.type}>
          {IconMap[alert.type]}
          <Text color={`${alert.type}.600`} fontWeight="medium">{alert.message}</Text>
          <Spacer />
          <IconButton
            onPress={onClose}
            icon={<CloseIcon />}
            color={"gray.500"}
          />
        </Alert>
      </Slide>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider

export const useAppContext = () => useContext(AppContext)