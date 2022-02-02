import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { useSelector } from 'react-redux'
import WalletCard from '../../components/WalletCard'
import Loading from '../../components/Loading'
import CreditCardForm from '../../components/CreditCardForm'
import { showMessage } from "react-native-flash-message"
//helpers
import { getWallet, addMoneyToWallet } from '../../helpers/wallets'

const WalletTransactionScreen = () => {
    const [wallet, setWallet] = useState();
    const [add, setAdd] = useState(false);
    const tc = useSelector(state => state.user) //"10655892646"

    useEffect(async () => {
        setWallet(await getWallet(tc))
    }, [add])


    if (!wallet) {
        return <Loading />;
    }

    const addMoneyHandler = async (amount) => {
        const response = await addMoneyToWallet(tc, amount);
        if (response) {
            setAdd(!add);
            return
        }
        showMessage({
            message: 'Yükleme yapılamadı.Lütfen daha sonra tekrar deneyin!',
            type: 'danger',
        })
    }

    return (
        <View style={styles.screen}>
            <WalletCard balance={wallet.balance} />
            <View style={styles.creditContainer}>
                <CreditCardForm onSelect={addMoneyHandler} />
            </View>
        </View>
    )
}

export default WalletTransactionScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 20,
    },
    creditContainer: {
        marginTop: 50,
    }
})
