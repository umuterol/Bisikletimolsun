import * as Location from 'expo-location';

export default async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        return false;
    }
    return await Location.getCurrentPositionAsync({});
}