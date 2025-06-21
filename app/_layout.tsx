import { Stack } from "expo-router";
import './globals.css';
import {StatusBar} from "react-native";

export default function RootLayout() {
  return <>
          <StatusBar
              hidden={true} // this is used to hide the clock in the phone and battery state at the top of the screen
          />
          <Stack>
            <Stack.Screen // this comp is used to hide the group route above and the Tabs comp in the _layout of tabs is used to hide the current route
              name="(tabs)"
              options={{headerShown: false}}
            />
            <Stack.Screen
                name="movie/[id]"
                options={{headerShown: false}}
            />
          </Stack>;
        </>
}
