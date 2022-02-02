import React from 'react'
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../constants/color'

const MenuButton = props => {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={props.onSelect}>
            <Ionicons name='menu' color={Colors.accentColor} size={Dimensions.get('window').width / 10} />
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width / 8,
        height: Dimensions.get('window').width / 8,
        backgroundColor: '#fff',
        position: 'absolute',
        left: Dimensions.get('window').width / 20,
        top: Dimensions.get('window').width / 10,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 5, height: 5 },
        shadowRadius: 5,
        shadowOpacity: 0.8,
        elevation: 5,
    }
});


export default MenuButton