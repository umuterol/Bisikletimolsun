import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import ActionBicycle from './ActionBicycle'
import { useDisclose } from 'native-base'
import locationPermission from '../../permissions/locationPermission'
import Map from './Map'
import Colors from '../../constants/color';
import MenuButton from '../MenuButton'

const index = (props) => {
    const [selectedBicycle, setSelectedBicycle] = useState({});
    const { isOpen, onOpen, onClose } = useDisclose()
    const [location, setLocation] = useState(false);

    useEffect(async () => {
        const userLocation = await locationPermission();
        setLocation(userLocation.coords);
    }, [])

    if (!location)
        return <View style={styles.screen}>
            <ActivityIndicator size="large" color={Colors.accentColor} />
        </View>;

    const mapSelectBicycleHandler = (bicycle) => {
        setSelectedBicycle(bicycle);
        onOpen();
    }

    return (
        <View style={styles.screen}>
            <Map
                userLocation={location}
                onSelectBicycle={mapSelectBicycleHandler}
                data={props.parkedBicycles}
            />
            <MenuButton onSelect={() => props.navigation.navigate('MenuHomeScreen')} />
            <ActionBicycle
                isOpen={isOpen}
                onClose={onClose}
                selectedBicycle={selectedBicycle}
                startButton={() => props.startDrive(selectedBicycle.id)}
            />
        </View>
    )
}

export default index

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
