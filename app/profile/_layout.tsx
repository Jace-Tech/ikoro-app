import { Slot, Stack } from "expo-router"

interface PageProps { }
const Page = ({ }: PageProps) => {
  return (
    <Stack>
      <Stack.Screen name="[id]"  />
      <Stack.Screen name="me"  />
    </Stack>
  )
}

export default Page