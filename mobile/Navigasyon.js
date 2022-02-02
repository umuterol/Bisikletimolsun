import React from "react";
import Colors from './constants/color'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

//Screens
import AccessScreen from './screens/login/AccessScreen'
import VerifyCodeScreen from './screens/login/VerifyCodeScreen'
import IdentityConfirmationScreen from './screens/login/IdentityConfirmationScreen'
import MapScreen from './screens/map/MapScreen'
import MenuHomeScreen from './screens/menu/MenuHome';
import WalletTransactionsScreen from "./screens/menu/WalletTransactionsScreen";
import DriveHistoryScreen from './screens/menu/DriveHistoryScreen';
import BicyclesTransactionsScreen from "./screens/menu/BicyclesTransactionsScreen";
import ActiveDriveScreen from './screens/ActiveDriveScreen'
import BicycleAddScreen from "./screens/menu/BicycleAddScreen";

export default Navigasyon = props => {
    return <NavigationContainer>
        <Stack.Navigator screenOptions={
            {
                headerShown: false,
                contentStyle: { backgroundColor: 'white' },
                headerTitleStyle: {
                    color: Colors.accentColor,
                    fontFamily: 'open-sans-bold',
                    fontSize: 25,
                },
            }
        }
        >
            <Stack.Screen component={Login} name="Login" />
            <Stack.Screen
                component={IdentityConfirmationScreen}
                name="IdentityConfirmationScreen" />
            <Stack.Screen
                component={MapScreen}
                name="MapScreen"
            />
            <Stack.Screen
                component={ActiveDriveScreen}
                name="ActiveDriveScreen"
            />
            <Stack.Screen
                component={MenuHomeScreen}
                name="MenuHomeScreen"
                options={{ headerShown: true, headerTitle: "" }}
            />
            <Stack.Screen
                component={WalletTransactionsScreen}
                name="WalletTransactionsScreen"
                options={{ headerShown: true, headerTitle: "" }}
            />
            <Stack.Screen
                component={DriveHistoryScreen}
                name="DriveHistoryScreen"
                options={{ headerShown: true, headerTitle: "Sürüşlerim" }}
            />
            <Stack.Screen
                component={BicyclesTransactionsScreen}
                name="BicyclesTransactionsScreen"
                options={{ headerShown: true, headerTitle: "Bisikletlerim" }}
            />
              <Stack.Screen
                component={BicycleAddScreen}
                name="BicycleAddScreen"
                options={{ headerShown: true, headerTitle: "Bisiklet ekle" }}
            />
        </Stack.Navigator>
    </NavigationContainer >
}

const Login = () => {
    return <Stack.Navigator
        screenOptions={
            {
                headerShown: false,
                contentStyle: { backgroundColor: 'white' },
            }}
    >
        <Stack.Screen component={AccessScreen} name="AccessScreen" />
        <Stack.Screen component={VerifyCodeScreen} name="VerifyScreen" />
    </Stack.Navigator>
}