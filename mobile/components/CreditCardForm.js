import React, { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import NumberTextInput from './NumberTextInput'
import { OutlinedTextField } from 'rn-material-ui-textfield'
import Colors from '../constants/color'
import Button from '../components/Button'

const CreditCard = (props) => {
    const [cardNumber, setCardNumber] = useState();
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardSecurity, setCardSecurity] = useState('');
    const [addAmount, setAddAmount] = useState();

    const cardNumberHandler = (number) => {
        if (number.length === 17)
            return;
        setCardNumber(number.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())
    }

    const cardExpiryHandler = (text) => {
        if (text.indexOf('.') >= 0 || text.length > 5) {
            return;
        }

        if (text.length === 2 && cardExpiry.length === 1) {
            text += '/'
        }
        setCardExpiry(text)
    }

    const securityNumberHandler = (text) => {
        if (text.length > 3)
            return;
        setCardSecurity(text);
    }

    return (
        <View>
            <NumberTextInput
                label='Miktar'
                value={addAmount}
                onChangeText={setAddAmount}
                color={Colors.accentColor}
            />
            <NumberTextInput
                label='Kart Numarası'
                value={cardNumber}
                onChangeText={cardNumberHandler}
                color={Colors.accentColor}
            />
            <View style={styles.securityExpiryContainer}>
                <View style={styles.expiry}>
                    <OutlinedTextField
                        label='MM/YY'
                        value={cardExpiry}
                        onChangeText={cardExpiryHandler}
                        tintColor={Colors.accentColor}
                        keyboardType='numeric'
                    />
                </View>
                <View style={styles.security}>
                    <NumberTextInput
                        label='CVV'
                        value={cardSecurity}
                        onChangeText={securityNumberHandler}
                        color={Colors.accentColor}
                    />
                </View>
            </View>
            <Button onSelect={()=>props.onSelect(addAmount)}>Yükle</Button>
        </View>
    )
}

export default CreditCard

const styles = StyleSheet.create({
    securityExpiryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    expiry: {
        width: '49%'
    },
    security: {
        width: '49%',
    }
})
