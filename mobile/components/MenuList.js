import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/color'

const MenuList = (props) => {
    return (
        <View style={styles.list}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.navigate('DriveHistoryScreen')}>
                <View style={styles.listItem}>
                    <Text style={styles.text}>Sürüşlerim</Text>
                    <View style={styles.icon}>
                        <MaterialIcons name="history-toggle-off" size={24} color={Colors.primaryColor} />
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.navigate('BicyclesTransactionsScreen')}>
                <View style={styles.listItem}>
                    <Text style={styles.text}>Bisikletlerim</Text>
                    <View style={styles.icon}>
                        <MaterialCommunityIcons name="bicycle-basket" size={25} color={Colors.primaryColor} />
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.navigate('BicycleAddScreen')}>
                <View style={styles.listItem}>
                    <Text style={styles.text}>Bisiklet ekle</Text>
                    <View style={styles.icon}>
                        <MaterialIcons name="hourglass-empty" size={25} color={Colors.primaryColor} />
                    </View>
                </View>
            </TouchableOpacity>
        </View >
    )
}

export default MenuList

const styles = StyleSheet.create({
    list: {
        padding: 10,
        shadowColor: '#e9e9e9',
        elevation: 1,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5,
        padding: 10,
        paddingVertical: 15,
        backgroundColor: 'rgba(0,0,0,0.02)',
        borderRadius: 5,
    },
    icon: {

    },
    text: {
        fontFamily: 'open-sans',
        fontSize: 17,
    }
})
