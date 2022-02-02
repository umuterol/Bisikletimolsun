import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, View, Image , Text } from 'react-native'
import MenuButton from '../components/MenuButton'
import ActiveTime from '../components/ActiveTime'
import ButtonOutline from '../components/ButtonOutline'
import { useSelector } from 'react-redux'
import Loading from '../components/Loading'
import { showMessage } from "react-native-flash-message"
//helpers
import { getActiveMyDrive, finishMyDrive } from '../helpers/drive'
import { calculateTimeDifference } from '../helpers/date'


const ActiveDriveScreen = (props) => {
    const [myDrive, setMyDrive] = useState();
    const [finishDrive, setFinishDrive] = useState(false);
    const [time, setTime] = useState()
    const [dateInterval, setDateInterval] = useState();
    const tc = useSelector(state => state.user)


    useEffect(async () => {
        const isDrive = await getActiveMyDrive(tc);
        if (isDrive)
            setMyDrive(isDrive)
        else
            props.navigation.replace('MapScreen')
    }, [finishDrive])
    useEffect(() => {  
        if (myDrive && !time) { 
            const di = setInterval(async () => {
                const time=calculateTimeDifference(new Date(myDrive.start_time))
                setTime(time)
                if(time.s == 3){
                    setMyDrive(await getActiveMyDrive(tc))
                }
            }, 1000);
            setDateInterval(di)
        }

    }, [myDrive])

    if (!myDrive || !time) {
        return <Loading />
    }


    const finisDriveHandler = async () => {
        const response = await finishMyDrive(tc);
        if (response) {
            setFinishDrive(!finishDrive);
            clearInterval(dateInterval)
        } else {
            showMessage({
                message: 'Sürüş Bitirilemedi.Lütfen cüzdanınızı kontrol edin !',
                type: 'danger',
            })
        }
    }

    return (
        <View style={styles.screen}>
            <Image source={require('../assets/images/bisikletimolsuntransparent.png')} resizeMode="center" style={styles.image} />
            <Text style={{color:'white'}}>{myDrive.pay}₺</Text>
            <ActiveTime m={time.m} s={time.s} />
            <MenuButton onSelect={() => props.navigation.navigate('WalletTransactionsScreen')} />
            <ButtonOutline bgColor='black'
                onSelect={finisDriveHandler}
            >
                Sürüşü Bitir
            </ButtonOutline>
        </View>
    )
}

export default ActiveDriveScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "black",
    },
    image: {
        width: 100,
        height: 100,
        position: 'absolute',
        top: 15,
        right: 20,
    }
})
