import { Text, View } from "react-native";
import {Link} from "expo-router";

//to start the project here are thing we need to adjust:
//process here  --  https://www.nativewind.dev/docs/getting-started/installation#1-install-nativewind

// npx create-expo-app@latest ./ (app creating on the latest react native version in the current terminal folder)
// npx expo start or npx expo start --tunnel
// npm install nativewind tailwindcss react-native-reanimated react-native-safe-area-context ( in another terminal, few packages for the project)
// npx tailwindcss init
// change the tailwind file and babel file
// npx expo customize metro.config.js
// change the metro file
// create and change nativewind-env file
// adjust tailwind.js file colors

// not to show the segment in the URL wu use () like /(root)/home and see it as only /home

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
        <Text className="text-5xl text-accent">Hellooooooo</Text>
        <Link href="/onboarding">Onboarding</Link>
        <Link href="/movie/avatar">Avatar</Link>
    </View>
  );
}
