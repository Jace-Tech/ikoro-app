import { useDisclose, useTheme } from "native-base";
import { createContext, ReactNode, useContext } from "react";
import { Drawer } from 'react-native-drawer-layout';
import DrawerContent from "../components/DrawerContent";

interface DrawerContextProps {
  closeDrawer: () => void;
  openDrawer: () => void;
  isOpen: boolean;
}
const DrawerContext = createContext({} as DrawerContextProps)


interface DrawerContextProviderProps {
  children: ReactNode;
}
const DrawerContextProvider = ({ children }: DrawerContextProviderProps) => {
  const { isOpen, onOpen, onClose } = useDisclose()
  const { colors } = useTheme()
  return (
    <DrawerContext.Provider value={{ closeDrawer: onClose, openDrawer: onOpen, isOpen }}>
      <Drawer
        open={isOpen}
        onOpen={onOpen}
        drawerPosition="right"
        drawerStyle={{ backgroundColor: colors.dark['50']}}
        onClose={onClose}
        renderDrawerContent={() => <DrawerContent />}
      >
        {children}
      </Drawer>
    </DrawerContext.Provider>
  )
}

export default DrawerContextProvider

export const useDrawerContext = () => useContext(DrawerContext)