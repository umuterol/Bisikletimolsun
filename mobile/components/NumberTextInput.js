import React from 'react'
import { StyleSheet, View } from 'react-native'
import { TextField, FilledTextField, OutlinedTextField } from 'rn-material-ui-textfield'




const NumberTextInput = props => {
    const formatText = (text) => {
        return text.replace(/[^+\d]/g, '');
    }
    return <OutlinedTextField
        label={props.label}
        keyboardType='numeric'
        // formatText={formatText}
        defaultValue={props.defaultValue}
        value={props.value}
        onChangeText={props.onChangeText}
        fontSize={props.size}
        style={{ fontFamily: 'open-sans' }}
        tintColor={props.color}
    />
}

export default NumberTextInput
