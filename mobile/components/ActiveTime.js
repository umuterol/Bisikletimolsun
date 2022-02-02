import React, { useState, useEffect, use } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Colors from '../constants/color'

const ActiveTime = (props) => {
    return (
        <View style={styles.dateContainer}>
            <Text style={styles.text}>{props.m}
                <Text style={{ fontSize: 10, fontFamily: 'open-sans-bold' }}>dk</Text>
            </Text>
            <Text style={styles.text}>{props.s}
                <Text style={{ fontSize: 10, fontFamily: 'open-sans-bold' }}>sn</Text>
            </Text>
        </View>
    )
}

export default ActiveTime

const styles = StyleSheet.create({
    dateContainer: {

    },
    text: {
        fontFamily: 'open-sans',
        color: Colors.primaryColor,
        fontSize: 50
    }
})

