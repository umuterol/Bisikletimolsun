import React, { useState, useEffect } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import BicycleDetails from '../../components/BicycleDetails'
import Loading from '../../components/Loading'
import { useSelector } from 'react-redux'
//helpers
import { getAllMyBicycles } from '../../helpers/bicycles'

const BicyclesTransactionsScreen = () => {
    const [myBicycles, setMyBicycles] = useState();
    const tc = useSelector(state => state.user);

    useEffect(async () => {
        setMyBicycles(await getAllMyBicycles(tc))
    }, [])

    if (!myBicycles) {
        return <Loading />
    }

    return <FlatList
        renderItem={renderBicycle}
        data={myBicycles}
        style={styles.list}
    />
}

export default BicyclesTransactionsScreen

const styles = StyleSheet.create({
    list: {
        flex: 1,
        padding: 10,
    }
})

const renderBicycle = (data) => {
    const bicycle = data.item;
    const allowWithdraw = bicycle.user_earn - bicycle.withdraw;
    return <BicycleDetails
        id={bicycle.id}
        price={bicycle.price}
        totalEarn={bicycle.total_earn}
        userEarn={bicycle.user_earn}
        withdraw={bicycle.withdraw}
        allowWithdraw={allowWithdraw}
        img={bicycle.img}
    />
}