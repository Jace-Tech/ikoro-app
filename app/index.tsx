import { LinearGradient } from "expo-linear-gradient"
import { AspectRatio, Box, Button, Center, HStack, Heading, Image, Pressable, Stack, Text, VStack, themeTools } from "native-base"
import React from "react"
import { ImageBackground } from "react-native"
import AppContainer from "../components/AppContainer"
import { Link } from "expo-router"

interface WelcomeScreenProps { }
const WelcomeScreen: React.FC<WelcomeScreenProps> = () => {
  const { transparentize } = themeTools
  return (
    <ImageBackground style={{ flex: 1 }} source={require("../assets/bg.jpeg")}>
      <LinearGradient style={{ flex: 1, justifyContent: "flex-end" }} colors={["rgba(0, 0, 0, .8)", "rgba(0, 0, 0, .85)", "#000", "#000"]}>
        <AppContainer pb={16} flex={1}>
          <VStack flex={1}>
            <Center flex={1}>
              <Image source={require("../assets/ikoro.png")} resizeMode="contain" alt="logo" maxW={150} />
            </Center>
            <Link href={"/register"} asChild>
              <Button colorScheme={"red"} _text={{ fontWeight: "semibold" }} size={"lg"}>Get Started</Button>
            </Link>
          </VStack>
        </AppContainer>

        <AppContainer py={4} bg={transparentize("#fff", .1)({})}>
          <HStack >
            <Text color={"white"}>Already have an account?</Text>
            <Link href={"/login"} replace asChild>
              <Text ml={1} color={"red.600"} fontWeight={"semibold"}>Sign in</Text>
            </Link>
          </HStack>
        </AppContainer>
      </LinearGradient>
    </ImageBackground>
  )
}

export default WelcomeScreen