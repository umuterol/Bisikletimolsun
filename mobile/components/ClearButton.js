import React from 'react'
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import Colors from '../constants/color'

const ClearButton = props => {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={props.onSelect}>
            <MaterialIcons name='replay' color="#367bc9" size={Dimensions.get('window').width / 10} />
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
        right: Dimensions.get('window').width / 20,
        bottom: Dimensions.get('window').width / 10,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 5, height: 5 },
        shadowRadius: 5,
        shadowOpacity: 0.8,
        elevation: 5,
    }
});


export default ClearButton;