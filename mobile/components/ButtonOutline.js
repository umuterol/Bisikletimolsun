import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Color from '../constants/color';

const ButtonOutline = props => {
    const color = props.color || Color.accentColor;
    const defaultButtonStyle = {
        ...styles.button,
        backgroundColor: props.bgColor || '#fff',
    };
    const defaultTextStyle = { ...styles.text, color: color, };
    const [buttonStyle, setButtonStyle] = useState(defaultButtonStyle)
    const [textStyle, setTextStyle] = useState(defaultTextStyle)

    const inPressStyle = () => {
        const pressButtonStyle = { ...buttonStyle, backgroundColor: color };
        const pressTextStyle = { ...textStyle, color: 'white' };
        setButtonStyle(pressButtonStyle);
        setTextStyle(pressTextStyle);
    }

    const outPressStyle = () => {
        setButtonStyle(defaultButtonStyle);
        setTextStyle(defaultTextStyle);
    }



    return (
        <TouchableOpacity
            // onPressIn={inPressStyle} 
            // onPressOut={outPressStyle} 
            activeOpacity={0.5}
            onPress={props.onSelect}>
            <View style={buttonStyle}>
                <Text style={textStyle}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ButtonOutline

const styles = StyleSheet.create({
    button: {
        borderRadius: 7,
        padding: 10,
    },
    text: {
        textAlign: 'center',
        fontSize: 17,
        fontFamily: 'open-sans',
        shadowColor: 'black',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.7,
        shadowRadius: 7,
        elevation: 100,
    }
})
