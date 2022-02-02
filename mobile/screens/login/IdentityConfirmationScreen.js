import React, { useState } from "react"
import { identityInfoSave } from '../../helpers/identity'
import { showMessage } from "react-native-flash-message"
import { useDispatch } from "react-redux"
import { loginAction } from '../../store/action/user'
import {
    Box,
    Heading,
    VStack,
    FormControl,
    Input,
    Button,
    Center,
    NativeBaseProvider,
} from "native-base"
import Colors from '../../constants/color';

export const Example = (props) => {
    const dispatch = useDispatch();
    const [tc, setTc] = useState();
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [email, setEmail] = useState();
    const { phone } = props.route.params;

    const saveHandler = async () => {
        const response = await identityInfoSave({ tc, name, surname, email, phone })
        const { success } = response;
        if (!success) {
            showMessage({
                message: 'Kayıt tamamlanamadı.Lütfen daha sonra tekrar deneyin!',
                type: 'danger',
            })
        } else {
            //session
            const { tc } = response.data;
            dispatch(loginAction(tc));
            props.navigation.navigate('MapScreen')
        }
    }
    return (
        <Box safeArea p="2" w="90%" maxW="290" py="8">
            <Heading
                size="lg"
                color="coolGray.800"
                _dark={{
                    color: "warmGray.50",
                }}
                fontWeight="semibold"
            >
                Hoşgeldin
            </Heading>
            <Heading
                mt="1"
                color="coolGray.600"
                _dark={{
                    color: "warmGray.200",
                }}
                fontWeight="medium"
                size="xs"
            >
                Sürüşe başlamadan önce kimliğini doğrulaman gerekli!
            </Heading>
            <VStack space={3} mt="5">
                <FormControl>
                    <FormControl.Label>TC</FormControl.Label>
                    <Input autoCapitalize="none" keyboardType="numeric" isRequired={true} value={tc} onChangeText={setTc} />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Ad</FormControl.Label>
                    <Input autoCapitalize="none" placeholder="Kimlikte yazan" value={name} onChangeText={setName} />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Soyad</FormControl.Label>
                    <Input autoCapitalize="none" value={surname} onChangeText={setSurname} />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Email</FormControl.Label>
                    <Input autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
                </FormControl>
                <Button mt="2" color={Colors.primaryColor} onPress={saveHandler}>
                    Kaydet
                </Button>
            </VStack>
        </Box>
    )
}

export default (props) => {
    return (
        <NativeBaseProvider>
            <Center flex={1} px="3">
                <Example {...props} />
            </Center>
        </NativeBaseProvider>
    )
}
