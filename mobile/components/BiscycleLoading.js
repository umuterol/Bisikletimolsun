import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Color from '../constants/color'
import { Ionicons } from '@expo/vector-icons';

const randomColor = ["#15ff00", "#243aff", "#243aff", "#00ffff", "#000000", "#5f9ea0", "#ff7f50", "#dc143c", "#00008b", "#8b008b", "#483d8b", "#ffd700", "#808080", "#d2b48c", "#ee82ee", "#9acd32", "#40e0d0", "#ff6347", "#ffbff1", "#878727"]
const createRandomColor = () => {
    const randIndex = Math.floor(Math.random() * randomColor.length)
    return randomColor[randIndex];
}

const BiscycleLoading = () => {
    const [rotate, setRotate] = useState(null);
    const [iconColor, setColor] = useState(Color.accentColor);
    const [dot, setDot] = useState(".");

    useEffect(() => {
        if (Math.floor(Math.random() * 100 > 1))
            return;
        if (dot === ".")
            setDot("..")
        if (dot === "..")
            setDot("...")
        if (dot === "...")
            setDot("....")
        if (dot === "....")
            setDot(".....")
        if (dot === ".....")
            setDot("......")
        if (dot === "......")
            setDot(".......")
        if (dot === ".......")
            setDot("........")
        if (dot === "........")
            setDot(".........")
        if (dot === ".........")
            setDot(".")
    }, [rotate])

    useEffect(() => {
        let leftMoving = -30;
        const last = 45000;
        for (let i = 0; i <= last; i = i + 15) {

            setTimeout(() => {
                if (leftMoving == 100) {
                    leftMoving = -30;
                    setColor(createRandomColor());
                }
                if (i === last)
                    setRotate({ alignItems: 'center' })
                else setRotate({
                    left: leftMoving++ + "%",
                })
            }, i);
        }
    }, [])


    return (
        <View style={styles.screen}>
            <View style={{ ...styles.icon, ...rotate }}>
                <Ionicons name="ios-bicycle-sharp" size={150} color={iconColor} />
            </View>
            <Text style={styles.text}>Yükleniyor</Text>
            <Text style={styles.text}>{dot}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
    },
    icon: {
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
    },
})

export default BiscycleLoading