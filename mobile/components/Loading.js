import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import Colors from '../constants/color';

const Loading = () => {
    return (
        <View style={styles.screen}>
            <ActivityIndicator size={25} color={Colors.primaryColor} />
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
