import { Modal, Text, themeTools, useTheme } from "native-base";
import { Button } from "native-base";
import { Center } from "native-base"

interface LogoutModalProps {
  isOpen?: boolean;
  handleCloseModal: () => void;
  handleLogout: () => void;
}
const LogoutModal = ({ isOpen, handleCloseModal, handleLogout }: LogoutModalProps) => {
  const gray = useTheme()['colors'].gray['600']
  const { transparentize } = themeTools
  return (
    <Center>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <Modal.Content maxWidth="400px" bg={"gray.900"} shadow={"5"}>
          <Modal.CloseButton _pressed={{ bg: transparentize(gray, .1)({}) }} _icon={{ size: "sm", color: "dark.200" }} />
          <Modal.Header borderBottomWidth={"0"} bg={"gray.900"}>
            <Text color={"gray.200"} fontSize={"lg"}>Are you sure you want to logout?</Text>
          </Modal.Header>
          <Button.Group space={2} p={4} pt={0}>
            <Button variant="ghost" colorScheme="blueGray" onPress={handleCloseModal}>
              Cancel
            </Button>
            <Button variant={"ghost"} colorScheme={"danger"} onPress={handleLogout}>
              Logout
            </Button>
          </Button.Group>
        </Modal.Content>
      </Modal>
    </Center>
  )
}

export default LogoutModal