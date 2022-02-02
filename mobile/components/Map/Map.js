import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import BiscycleMarker from "./BicycleMarker";

const latitudeDelta = 0.005;
const longitudeDelta = 0.005;
const Map = props => {
    const { latitude, longitude } = props.userLocation;
    const initialRegion = {
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta,
    }
    const displayedData = props.data;

    return <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
        userLocationPriority="high"
        mapType="terrain"
        provider="google"
        mapPadding={{
            top: 25,
            bottom: 25,
            right: 10,
            left: 10,
        }}
    >

        {
            displayedData.map(data => {
                const { id, price } = data.bicycle;
                const latitude = parseFloat(data.coords.lat);
                const longitude = parseFloat(data.coords.lng);
                return <View key={id}>
                    <BiscycleMarker
                        coordinate={{
                            latitude,
                            longitude,
                        }}
                        onSelectBicycle={props.onSelectBicycle}
                        bicycle={{ id, price }}
                    />
                </View>
            })
        }

    </MapView>

}

export default Map;

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
    }
})