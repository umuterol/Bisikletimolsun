import React from 'react'
import { StyleSheet, View } from 'react-native'
import {
    Actionsheet,
    Text,
    Box,
    NativeBaseProvider,
} from "native-base"
import { MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';
import Colors from '../../constants/color';

const ActionSheet = props => {
    return (
        <NativeBaseProvider>
            <Actionsheet isOpen={props.isOpen} onClose={props.onClose}>
                <Actionsheet.Content>
                    <Box style={styles.box} px={4}>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialCommunityIcons name="bicycle-basket" size={24} color={Colors.primaryColor} style={{ marginHorizontal: 3 }} />
                            <Text
                                fontSize="16"
                                color="gray.500"
                                _dark={{
                                    color: "gray.300",
                                }}
                            >
                                {props.selectedBicycle.id}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialIcons name="payment" size={24} color={Colors.accentColor} style={{ marginHorizontal: 3 }} />
                            <Text
                                fontSize="16"
                                color="gray.500"
                                _dark={{
                                    color: "gray.300",
                                }}
                            >
                                ₺{props.selectedBicycle.price}/dk
                            </Text>
                        </View>
                    </Box>
                    <Actionsheet.Item onPress={props.startButton}>
                        <View style={styles.itemButton}>
                            <Ionicons name="play" color="green" size={25} />
                            <Text style={styles.itemText}>Start</Text>
                        </View>
                    </Actionsheet.Item>
                    <Actionsheet.Item onPress={props.onClose}><View style={styles.itemButton}>
                        <Ionicons name="close-outline" size={25} color="red" />
                        <Text style={styles.itemText}>Cancel</Text>
                    </View></Actionsheet.Item>
                </Actionsheet.Content>
            </Actionsheet>
        </NativeBaseProvider>
    )
}

export default ActionSheet

const styles = StyleSheet.create({
    box: {
        width: "100%",
        height: 60,
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row"
    },
    itemButton: { flexDirection: 'row', alignItems: 'center', },
    itemText: { fontFamily: 'open-sans-bold', marginLeft: 3 }
})
