import {ActivityIndicator, Animated, FlatList, Image, ScrollView, Text, View} from "react-native";
import {Link} from "expo-router";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";
import { useRouter } from 'expo-router';
import SearchBar from "@/components/SearchBar";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";
import MovieCard from "@/components/MovieCard";

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
    const router = useRouter();

    const {
        data: movies,
        loading: moviesLoading,
        error: moviesError
    } = useFetch(() => fetchMovies({
        query: ''
    }))

    return (
      <View className="flex-1 bg-primary items-center ">
          <Image
              source={images.bg}
              className="absolute w-full z-0 m"
          />
          <ScrollView
              className="flex-1 px-5"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                  minHeight: "100%",
                  paddingBottom: 10,
              }}
    >
              <Image
                  className="w-12 h-10 mt-20 mb-5"
                  source={icons.logo}
              />
              {moviesLoading ? (
                  <ActivityIndicator
                    size="large"
                    color="#0000ff"
                    className="mt-10 self-center"
                  />
              ) : moviesError ? (
                  <Text>Error: {moviesError?.message}</Text>
              ) : (
                  <View className="flex-1 mt-5 ">
                      <SearchBar
                          onPress={() => router.push("/search")}
                          placeholder="Search for a movie" value={""}
                          onChangeText={function (text: string): void {}}
                      />
                      <>
                          <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>
                          <FlatList
                              data={movies}
                              renderItem={({ item }) => (
                                  <MovieCard
                                      {...item}
                                  />
                              )} // this shows the optimized list, how the data should be destructured
                              keyExtractor={(item) => item.id.toString()}
                              numColumns={3}
                              columnWrapperStyle={{
                                  justifyContent: 'flex-start',
                                  gap: 20,
                                  paddingRight: 5,
                                  marginBottom: 10
                              }}
                              className="mt-2 pb-32"
                              scrollEnabled={false}
                          />
                      </>
                  </View>
              )}

          </ScrollView>
      </View>

  )
}
