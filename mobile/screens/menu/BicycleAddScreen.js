import React, { useState } from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux'
import Button from '../../components/Button';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { createBicycleMeeting } from '../../helpers/bicycles'
import { showMessage } from "react-native-flash-message"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NumberTextInput from '../../components/NumberTextInput';
import Colors from '../../constants/color'


const BicycleAddScreen = () => {
    const tc = useSelector(state => state.user);
    const [pickedImage, setPickedImage] = useState();
    const [price, setPrice] = useState();

    const cameraHandler = async () => {
        const img = await ImagePicker.launchCameraAsync({
            aspect: [16, 12],
            allowsEditing: true,
        });
        if (!img.cancelled) {
            setPickedImage(img.uri);
        }
    }
    const galeryHandler = async () => {
        const img = await ImagePicker.launchImageLibraryAsync({
            aspect: [16, 12],
            allowsEditing: true,
        });
        console.log(img)
        if (!img.cancelled) {
            setPickedImage(img.uri);
        }
    }

    const saveFormHandler = async () => {
        if (!pickedImage || !price) {
            showMessage({
                message: 'Alanlar boş geçilemez!',
                type: 'danger',
            })
            return;
        }
        const formData = new FormData();
        formData.append("bicycle", {
            uri: pickedImage,
            name: pickedImage,
            type: 'image/jpg',
        })
        formData.append('tc', tc);
        formData.append('price', price);
        const response = await createBicycleMeeting(formData);
        if (response) {
            showMessage({
                message: 'Randevu oluşturuldu. En yakın zamanda size dönüş sağlayacağız.',
                type: 'success',
            })
            setPrice("");
            setPickedImage("");
        } else {
            showMessage({
                message: 'Randevu oluşturulamadı.',
                type: 'danger',
            })
        }
    }


    return (
        <View style={styles.screen}>
            <View style={styles.addContainer}>
                <View style={styles.chooseImage}>
                    <TouchableOpacity onPress={galeryHandler}><Ionicons name="images" size={40} color="purple" /></TouchableOpacity>
                    <TouchableOpacity onPress={cameraHandler}><Ionicons name="camera" size={40} color="black" /></TouchableOpacity>
                </View>
                <View style={styles.loadingFieldContainer}>
                    {pickedImage ? <Image style={styles.image} source={{ uri: pickedImage }} resizeMode='center' />
                        : <MaterialCommunityIcons name="image-off-outline" size={100} color="black" />
                    }
                </View>
                <NumberTextInput
                    label="fiyatlandırma"
                    value={price}
                    onChangeText={setPrice}
                />
                <Button onSelect={saveFormHandler} color={Colors.primaryColor}>Başvur</Button>
            </View>


        </View>
    );
};

export default BicycleAddScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    addContainer: {
        width: '80%',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    chooseImage: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    loadingFieldContainer: {
        alignItems: 'center',
    }
});