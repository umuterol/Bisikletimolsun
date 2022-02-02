import React, { useState, useRef } from 'react';
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet
} from 'react-native';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const LocationPicker = props => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();
  const start = useRef(0);

  const verifyPermissions = async () => {
    const result = await Location.requestForegroundPermissionsAsync();
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant location permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync(
        // {
        //   timeInterval: 5000
        // }
      );
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });

      await fetch('https://bisikletimolsun.xyz/api/bicycle/coords/current', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bicycle_id: 'c5f306',
          lat: location.coords.latitude,
          lng: location.coords.longitude
        })
      })

    } catch (err) {
      Alert.alert(
        'Could not fetch location!',
        'Please try again later or pick a location on the map.',
        [{ text: 'Okay' }]
      );
    }
    setIsFetching(false);
  };



  if (start.current === 0) {
    start.current = 1;
    let i = 1;
    setInterval(() => {
      getLocationHandler()

      console.log(i++);
    }, 10000);
  }

  return (
    <View style={styles.locationPicker}>
      <View style={styles.mapPreview}>
        {isFetching ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          pickedLocation ? <Text>lat:{pickedLocation.lat} lng:{pickedLocation.lng}</Text> : <Text>Null</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default LocationPicker;
