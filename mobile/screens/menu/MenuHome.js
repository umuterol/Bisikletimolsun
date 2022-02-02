import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import WalletCard from '../../components/WalletCard'
import { useSelector } from 'react-redux'
import MenuList from '../../components/MenuList'
import Loading from '../../components/Loading'
import { Ionicons } from '@expo/vector-icons';
//helpers
import { getWallet } from '../../helpers/wallets'
import { getIdentityStatus } from '../../helpers/identity'
import Colors from '../../constants/color'


const MenuHome = (props) => {
    const [wallet, setWallet] = useState();
    const [identityStatus, setIdentityStatus] = useState();
    const tc = useSelector(state => state.user)

    useEffect(async () => {
        setWallet(await getWallet(tc))
        setIdentityStatus(await getIdentityStatus(tc))
    }, [])

    if (!wallet || !identityStatus) {
        return <Loading />;
    }

    if (identityStatus === 'confirmed')
        return (
            <View style={styles.screen}>
                <WalletCard balance={wallet.balance} onSelect={() => props.navigation.navigate('WalletTransactionsScreen')} />
                <View style={styles.listContainer}>
                    <MenuList navigation={props.navigation} />
                </View>
            </View>
        )
    else
        return <UnconfirmedIdentity />
}

export default MenuHome

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 20,
    },
    image: {
        width: 100,
        height: 100,
    },
    listContainer: {
        marginVertical: 20,
    }
})


const UnconfirmedIdentity = () => {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
        <Text style={{ fontFamily: 'open-sans' }}>Hesap onayı bekleniyor.</Text>
        <Ionicons name="md-hourglass-outline" size={24} color={Colors.primaryColor} />
    </View>
}