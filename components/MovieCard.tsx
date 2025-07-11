//Muzyka
import { Link } from "expo-router";
import { Text, Image, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { isMovieSaved, saveMovie, removeMovie } from "@/services/storage";
import { useFocusEffect } from "expo-router";
import { icons } from "@/constants/icons";
import React from "react";

const MovieCard = ({
                       id,
                       poster_path,
                       title,
                       vote_average,
                       release_date,
                   }: Movie) => {

    const [saved, setSaved] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            (async () => {
                const saved = await isMovieSaved(id);
                setSaved(saved);
            })();
        }, [id])
    );

    return (
        <Link href={`/movies/${id}`} asChild  // we use it in order to make the clickable link to the particular movie details(we will go to the movie group dynamic route)
        >
            <TouchableOpacity className="w-[30%]">
                <Image
                    source={{
                        uri: poster_path
                            ? `https://image.tmdb.org/t/p/w500${poster_path}` // in case the API has the poster we render it, else we render placeholder
                            : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
                    }}
                    className="w-full h-52 rounded-lg"
                    resizeMode="cover"
                />

                <Text
                    className="text-sm font-bold text-white mt-2"
                    numberOfLines={1}  // numberOfLines attribute is used to set the only 1 or 2 or ... lines for the text to be shortened
                >
                    {title}
                </Text>

                <View className="flex-row items-center justify-start gap-x-1">
                    <Image source={icons.star} className="size-4" />
                    <Text className="text-xs text-white font-bold uppercase">
                        {Math.round(vote_average / 2)}
                    </Text>
                </View>

                <View className="flex-row items-center justify-between">
                    <Text className="text-xs text-light-300 font-medium mt-1">
                        {release_date?.split("-")[0]}
                    </Text>
                    <Image source={saved ? icons.save : null} className="w-4 h-4" />
                </View>
            </TouchableOpacity>
        </Link>
    );
};

export default MovieCard;