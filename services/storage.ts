import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'savedMovieIds';

// Get saved movie IDs
export const getSavedMovies = async (): Promise<number[]> => {
    try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        return json != null ? JSON.parse(json) : [];
    } catch (e) {
        console.error('Error loading saved movie IDs', e);
        return [];
    }
};

// Save a movie ID
export const saveMovie = async (movieId: number) => {
    try {
        const ids = await getSavedMovies();
        if (!ids.includes(movieId)) {
            const newIds = [...ids, movieId];
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newIds));
        }
    } catch (e) {
        console.error('Error saving movie ID', e);
    }
};

// Remove a movie ID
export const removeMovie = async (movieId: number) => {
    try {
        const ids = await getSavedMovies();
        const newIds = ids.filter(id => id !== movieId);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newIds));
    } catch (e) {
        console.error('Error removing movie ID', e);
    }
};

// Check if a movie ID is saved
export const isMovieSaved = async (movieId: number): Promise<boolean> => {
    try {
        const ids = await getSavedMovies();
        return ids.includes(movieId);
    } catch (e) {
        return false;
    }
};