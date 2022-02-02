import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Colors from '../constants/color'
import Button from './Button'
import { FontAwesome5 } from '@expo/vector-icons';

const WalletCard = (props) => {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={props.onSelect}>
            <View style={styles.card}>
                <View style={styles.priceContainer}>
                    <Text style={styles.text}>{props.balance.toFixed(2)}₺</Text>
                </View>
                <View style={styles.iconContainer}>
                    <FontAwesome5 name="google-wallet" size={50} color={Colors.accentColor} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default WalletCard

const styles = StyleSheet.create({
    card: {
        height: 200,
        backgroundColor: Colors.primaryColor,
        borderRadius: 10,
    },
    text: {
        fontFamily: 'open-sans-bold',
        color: '#fff',
        fontSize: 40,
    },
    priceContainer: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
    }
})
