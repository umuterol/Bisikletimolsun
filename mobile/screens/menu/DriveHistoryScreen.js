import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList, Image } from 'react-native'
import DriveCard from '../../components/DriveCard'
import Loading from '../../components/Loading'
import { useSelector } from 'react-redux'
//helpers
import { getMyDrive } from '../../helpers/drive'

const DriveHistoryScreen = () => {
    const [myDrive, setMyDrive] = useState();
    const tc = useSelector(state => state.user)

    useEffect(async () => {
        setMyDrive(await getMyDrive(tc))
    }, [])

    if (!myDrive) {
        return <Loading />
    }

    return (
        <View style={styles.screen}>
            <FlatList
                style={styles.list}
                data={myDrive}
                renderItem={renderDriveItem}
            />
        </View>
    )
}

export default DriveHistoryScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingBottom: 20,
    },
    list: {
        padding: 10,
        flexGrow: 1,
    }
})

const renderDriveItem = (data) => {
    const drive = data.item;
    const driveStartTime = driveTimeFormat(drive.start_time)
    return <DriveCard
        minute={drive.minute}
        pay={drive.pay}
        bicycleId={drive.bicycle_id}
        date={driveStartTime}
        map={drive.map}
    />
}

const driveTimeFormat = (start_time) => {
    const date = new Date(updatedDate(start_time))
    const dateOnly = date.toLocaleDateString()
    const dateTime = date.toLocaleTimeString()
    const driveTime = dateOnly + " - " + dateTime

    return driveTime;
}

const updatedDate = (updated) => { //istediğim zaman dilimine çeviremeyince zorlandım ve çözümü 3 saat geri alarak buldum
    var date = new Date(updated);
    var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
        date.getUTCHours() - 3, date.getUTCMinutes(), date.getUTCSeconds());

    return new Date(now_utc);
}
