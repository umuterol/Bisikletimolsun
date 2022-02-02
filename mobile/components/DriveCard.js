import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/color'

const MealItem = props => {
    return <View style={styles.driveItem}>
        <View style={styles.driveHeader}>
            <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={1}>{props.date}</Text>
            </View>
            <Image
                source={{ uri: props.map }}
                style={styles.image}
            />
        </View>
        <View style={styles.driveDetail}>
            <Text style={styles.text}>{props.pay}₺</Text>
            <Text style={styles.text}>{props.minute}dk</Text>
            <View style={styles.detailBicycle}>
                <MaterialCommunityIcons name="bicycle-basket" size={24} color={Colors.primaryColor} />
                <Text style={{ ...styles.text, marginLeft: 2 }}>{props.bicycleId}</Text>
            </View>
        </View>
    </View>
}

const styles = StyleSheet.create({
    driveItem: {
        width: '100%',
        height: 200,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 10,
        borderBottomColor: Colors.accentColor,
        borderBottomWidth: 1,
    },
    driveHeader: {
        height: '85%',
    },
    driveDetail: {
        flexDirection: 'row',
        height: '15%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    image: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
    },
    titleContainer: {
        backgroundColor: Colors.primaryColor,
        paddingHorizontal: 12,
        paddingVertical: 5,
    },
    title: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 18,
        textAlign: 'center',
    },
    detailBicycle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
        fontFamily: 'open-sans-bold',
        fontSize: 17,
    },
    image: {
        width: '100%',
        height: '100%',
    }
})

export default MealItem;