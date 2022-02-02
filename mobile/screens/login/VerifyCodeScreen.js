import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import NumberTextInput from '../../components/NumberTextInput'
import Button from '../../components/Button'
import { showMessage } from "react-native-flash-message"
import { useDispatch } from "react-redux"
import { loginAction } from '../../store/action/user'

//helpers
import { isExistUser } from '../../helpers/identity'

const VerifyCodeScreen = props => {
    const [value, setValue] = useState();
    const { verifyCode } = props.route.params;
    const { phoneNumber } = props.route.params;
    const dispatch = useDispatch();

    const changeText = async (text) => {
        setValue(text);
        if (text === verifyCode) {
            const tc = await isExistUser(phoneNumber);
            if (!tc) {
                return props.navigation.replace('IdentityConfirmationScreen', { phone: phoneNumber })
            }
            else {
                dispatch(loginAction(tc));
                return props.navigation.replace('MapScreen')
            }
        }
    }

    const approvalCode = () => {
        if (value === verifyCode) {
            return props.navigation.replace('IdentityConfirmationScreen', { phone: phoneNumber })
        }
        showMessage({
            message: 'Doğrulama kodunuz hatalı !',
            type: 'danger',
        })
    }

    return (
        <View style={styles.screen}>
            <View style={styles.container}>
                <View style={styles.input}>
                    <NumberTextInput
                        label="DOGRULAMA KODU"
                        value={value}
                        onChangeText={changeText}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        onSelect={approvalCode}
                    >DOĞRULA</Button>
                </View>
            </View>
        </View>
    )
}

export default VerifyCodeScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '80%',
        minWidth: 300,
        maxWidth: '90%',
    },
})
