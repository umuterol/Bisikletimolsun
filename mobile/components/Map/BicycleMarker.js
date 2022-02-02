import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Marker } from "react-native-maps";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Colors from '../../constants/color';

const BiscycleMarker = props => {
    return <Marker coordinate={props.coordinate}
        title={props.bicycle.id}
        onPress={() => {
            props.onSelectBicycle(props.bicycle)
        }}
    >
        <View style={styles.displayBottom}>
            <View style={styles.displayTop}>
                <MaterialCommunityIcons name="bicycle-basket" size={30} color={Colors.primaryColor} />
            </View>
        </View>
    </Marker>
}

export default BiscycleMarker

const styles = StyleSheet.create({
    displayBottom: {
        backgroundColor: Colors.primaryColor,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,

    },
    displayTop: {
        backgroundColor: '#fff',
        borderRadius: 30,
        borderColor: Colors.primaryColor,
        borderWidth: 0.01,
        padding: 10,
    }
})
