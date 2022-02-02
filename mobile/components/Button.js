import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Color from '../constants/color';

const Button = props => {
    const color = props.color || Color.accentColor;
    const defaultButtonStyle = { ...styles.button, backgroundColor: color, borderColor: color };
    const defaultTextStyle = { ...styles.text };
    const [buttonStyle, setButtonStyle] = useState(defaultButtonStyle)
    const [textStyle, setTextStyle] = useState(defaultTextStyle)

    const inPressStyle = () => {
        const pressButtonStyle = { ...buttonStyle, backgroundColor: '#fff', borderColor: color };
        const pressTextStyle = { ...textStyle, color: color };
        setButtonStyle(pressButtonStyle);
        setTextStyle(pressTextStyle);
    }

    const outPressStyle = () => {
        setButtonStyle(defaultButtonStyle);
        setTextStyle(defaultTextStyle);
    }



    return (
        <TouchableOpacity onPressIn={inPressStyle} onPressOut={outPressStyle} activeOpacity={1} onPress={props.onSelect}>
            <View style={buttonStyle}>
                <Text style={textStyle}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    button: {
        borderWidth: 2,
        borderRadius: 7,
        shadowColor: 'black',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.7,
        shadowRadius: 7,
        elevation: 5,
        padding: 10,
    },
    text: {
        textAlign: 'center',
        fontSize: 17,
        fontFamily: 'open-sans-bold',
        color: '#fff',
    }
})
