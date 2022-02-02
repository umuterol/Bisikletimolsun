import React, { useState } from "react";
import { View, TextInput, StyleSheet, Image } from "react-native";
import PhoneInput from 'react-native-phone-number-input';
import ButtonOutline from "../../components/ButtonOutline";
import { showMessage } from "react-native-flash-message";



const AccessScreen = props => {
    const [value, setValue] = useState('');

    const changeValue = (text) => {
        setValue(text.replace(/[^+\d]/g, ''));
    }

    const loginHandler = async () => {
        if (value.length !== 13) {
            showMessage({
                message: 'Hatalı telefon numarası!',
                type: 'warning',
            })
            return false;
        }
        const verifyCode =await login(value) //222
        if (verifyCode) {
            return props.navigation.navigate('VerifyScreen', { verifyCode, phoneNumber: value })
        }
        showMessage({
            message: 'Mesaj gönderilemedi! tekrar deneyin.',
            type: 'danger',
        })
    }



    return <View style={styles.screen}>
        <Image source={require('../../assets/images/mockup.jpg')} style={styles.image} />
        <View style={styles.inputContainer}>
            <PhoneInput
                defaultCode='TR'
                placeholder='Telefon Numarası'
                withShadow={true}
                containerStyle={{ width: '100%' }}
                value={value}
                onChangeFormattedText={changeValue}
            />
            <View style={styles.button}>
                <ButtonOutline onSelect={loginHandler}>ONAYLA</ButtonOutline>
            </View>
        </View>
    </View>
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        paddingTop: '40%',
    },
    inputContainer: {
        width: '50%',
        minWidth: 350,
        maxWidth: '90%',
    },
    button: {
        marginTop: 10,
    },
    image: {
        width: '50%',
        minWidth: 350,
        maxWidth: '90%',
        height: 200,
    },
})

export default AccessScreen;

const login = async (phoneNumber) => {
    try {
        const response = await fetch(`https://www.bisikletimolsun.xyz/api/sms/verify/${phoneNumber}`)
        const responseJson = await response.json();
        if (responseJson.status)
            return responseJson.data;

        return false;
    } catch (error) {
        return false;
    }
}