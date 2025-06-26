import { FlatList, Image, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';
import MovieCard from '@/components/MovieCard';
import { getSavedMovies } from '@/services/storage';
import { useFocusEffect } from "expo-router";
import { fetchMovieDetails } from '@/services/api';

const Saved = () => {
    const [savedMovies, setSavedMovies] = useState<MovieDetails[]>([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;

            const loadSavedMovies = async () => {
                setLoading(true);
                setSavedMovies([]); // Clear previous state

                try {
                    const ids = await getSavedMovies(); // array of IDs only

                    for (const id of ids) {
                        try {
                            const movie = await fetchMovieDetails(String(id));
                            if (movie && isActive) {
                                setSavedMovies((prev) => [...prev, movie]);
                            }
                        } catch (e) {
                            console.error(`Error fetching movie ${id}`, e);
                        }
                    }
                } catch (error) {
                    console.error("Failed to load saved movies", error);
                } finally {
                    if (isActive) setLoading(false);
                }
            };

            loadSavedMovies();

            return () => {
                isActive = false;
            };
        }, [])
    );

    return (
        <View className="flex-1 bg-primary">
            <Image
                source={images.bg}
                className="flex-1 absolute w-full z-0"
                resizeMode="cover"
            />
            <FlatList
                data={savedMovies}
                renderItem={({ item }) => {
                    const { id, poster_path, title, vote_average, release_date } = item;
                    return (
                        <MovieCard
                            id={id}
                            poster_path={poster_path ?? ""}
                            title={title}
                            vote_average={vote_average}
                            release_date={release_date}
                        />
                    );
                }}
                keyExtractor={(item) => item.id.toString()}
                className="px-5"
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: "center",
                    gap: 16,
                    marginVertical: 16,
                }}
                contentContainerStyle={{ paddingBottom: 100 }}
                ListHeaderComponent={
                    <View className="w-full flex-row justify-center mt-20 items-center">
                        <Image source={icons.logo} className="w-12 h-10" />
                    </View>
                }

            />
        </View>
    );
};

export default Saved;

const styles = StyleSheet.create({});