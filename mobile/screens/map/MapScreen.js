import React, { useState, useEffect } from 'react'
import { StyleSheet, ActivityIndicator, View } from 'react-native'
import Map from '../../components/Map';
import { useSelector } from 'react-redux'
import Colors from '../../constants/color';
import { showMessage } from "react-native-flash-message"
import ClearButton from '../../components/ClearButton'
//helpers
import { getAllParkedBicyclesWithCoords } from '../../helpers/bicycles';
import { getActiveMyDrive, startMyDrive } from '../../helpers/drive';

const MapScreen = props => {
    const tc = useSelector(state => state.user)
    const [bicycles, setBicycles] = useState();
    const [startedDrive, setStartedDrive] = useState(false);

    useEffect(async () => {
        setBicycles(await getAllParkedBicyclesWithCoords())
        const activeMyDrive = await getActiveMyDrive(tc);
        if (activeMyDrive) {
            props.navigation.replace('ActiveDriveScreen')
        }
    }, [startedDrive])

    const startDriveHandler = async (selectedBicycleId) => {
        const response = await startMyDrive(tc, selectedBicycleId);
        if (response === true)
            setStartedDrive(!startedDrive)
        else if (response === "no driving allowed")
            showMessage({
                message: 'Hesap onayı gerekiyor.',
                type: 'danger',
            })
        else
            showMessage({
                message: 'Sürüş Başlatılamadı! Bir sorun oluştu.',
                type: 'danger',
            })

    }

    if (!bicycles) {
        return <View style={styles.screen}>
            <ActivityIndicator size={50} color={Colors.primaryColor} />
        </View>
    }
    return <>
        <Map parkedBicycles={bicycles} navigation={props.navigation} startDrive={startDriveHandler} />
        <ClearButton onSelect={() => setStartedDrive(!startedDrive)} />
    </>
}

export default MapScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    }
})
