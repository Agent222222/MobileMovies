//Muzyka
import {ActivityIndicator, FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react'
import {images} from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import {useRouter} from "expo-router";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";
import {icons} from "@/constants/icons";
import SearchBar from "@/components/SearchBar";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const {
        data: movies,
        loading: moviesLoading,
        error: moviesError,
        refetch: loadMovies,
        reset,
    } = useFetch(() => fetchMovies({
        query: searchQuery
    }), false)

    useEffect(() => { // this useEffect is a trigger for the search to actually work as it should
        const timeoutId = setTimeout(async () =>{
            if(searchQuery.trim()){
                await loadMovies();
            }else{
                reset();
            }
        }, 500);

        return () => clearTimeout(timeoutId); // this is used to fix the race condition (using the timeout)
    },[ searchQuery ]);

    return(
        <View className="flex-1 bg-primary">
            <Image
                source={images.bg}
                className="flex-1 absolute w-full z-0"
                resizeMode="cover"
            />
            <FlatList // here as we need the searchBar to be always on the top, we just used the FlatList as it will be scrolled and other part will remain on their places
                data={movies}
                renderItem={({ item }) =>
                    <MovieCard {...item}/>
                }
                keyExtractor={(item) => item.id.toString()}
                className="px-5 "
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: "center",
                    gap: 16,
                    marginVertical: 16,
                }}
                contentContainerStyle={{paddingBottom: 100}}
                ListHeaderComponent={ // this attribute is used for the searchbar to always be on the top and to be the part of the flatlist
                    <>
                        <View className="w-full flex-row justify-center mt-20 items-center">
                            <Image source={icons.logo} className="w-12 h-10" />
                        </View>

                        <View className=" my-5 ">
                            <SearchBar
                                value={searchQuery}
                                onChangeText={(text: string) => setSearchQuery(text)}
                                onPress={() => {}}
                                placeholder="Search movies ..."
                            />
                        </View>

                        {moviesLoading && (
                            <ActivityIndicator
                                size="large"
                                color="#0000ff"
                                className="my-3"
                            />
                        )}
                        {moviesError && (
                            <Text className="text-red-500 px-5 my-3">
                                Error: {moviesError.message}
                            </Text>
                        )}

                        {!moviesLoading &&
                            !moviesError &&
                            searchQuery.trim() &&
                            movies?.length! > 0 && (
                                <Text className="text-xl text-white font-bold">
                                    Search Results for{" "}
                                    <Text className="text-accent">{searchQuery}</Text>
                                </Text>
                            )}

                    </>
                }
                ListEmptyComponent={
                    !moviesLoading && !moviesError ? (
                        <View className="mt-10 px-5">
                            <Text className="text-center text-gray-500">
                                {searchQuery.trim()
                                    ? "No movies found"
                                    : "Start typing to search for movies"}
                            </Text>
                        </View>
                    ) : null
                }
            />
        </View>
    )
}

export default Search;
const styles = StyleSheet.create({})