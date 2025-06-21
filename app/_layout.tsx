import { Stack } from "expo-router";
import './globals.css';

export default function RootLayout() {
  return <Stack>
    <Stack.Screen // this comp is used to hide the group route above and the Tabs comp in the _layout of tabs is used to hide the current route
      name="(tabs)"
      options={{headerShown: false}}
    />
    <Stack.Screen
        name="movie/[id]"
        options={{headerShown: false}}
    />
  </Stack>;
}
