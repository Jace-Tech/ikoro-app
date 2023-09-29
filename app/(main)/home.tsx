import { useNavigation } from "expo-router"
import { Heading, ScrollView, Stack, themeTools, useTheme } from "native-base"
import { useLayoutEffect } from "react"
import HomeHeader from "../../components/HomeHeader"
import AppContainer from "../../components/AppContainer"
import { ResizeMode, Video } from "expo-av"

interface HomeScreenProps { }
const HomeScreen = ({ }: HomeScreenProps) => {
  const { setOptions } = useNavigation()
  const { transparentize } = themeTools
  const { colors } = useTheme()

  useLayoutEffect(() => {
    setOptions({ header: (prop: any) => <HomeHeader /> })
  }, [])

  return (
    <AppContainer flex={1} bg={"black"} safeAreaTop>
      <ScrollView py={8} flex={1}>
        <Stack>
          <Heading mb={2} color={"gray.100"} fontWeight={"bold"} size={"lg"}>Featured Content</Heading>
          <Video
            // ref={videoRef}
            isLooping
            source={require("../../assets/cover.mp4")}
            style={{
              width: "auto",
              minHeight: 230,
              height: "auto",
              backgroundColor: transparentize(colors.dark[100], .1)({})
            }}
            isMuted
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay
          />
        </Stack>
      </ScrollView>
    </AppContainer>
  )
}

export default HomeScreen
