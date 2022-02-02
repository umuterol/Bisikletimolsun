import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import { OpenSans_400Regular, OpenSans_600SemiBold } from '@expo-google-fonts/open-sans';
import Navigasyon from './Navigasyon';
import Color from './constants/color';
import FlashMessage from "react-native-flash-message";
//redux
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import userReducer from './store/reducer/userReducer'
const combineStore = combineReducers({
  user: userReducer,
})
const store = createStore(combineStore);

export default function App() {
  const [dataLoaded] = useFonts({
    'open-sans': OpenSans_400Regular,
    'open-sans-bold': OpenSans_600SemiBold,
  })
  if (!dataLoaded) {
    return < ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      color={Color.primaryColor} size="large" />
  }

  return (
    <Provider store={store}>
      <Navigasyon />
      <StatusBar style="auto" />
      <FlashMessage position="top" />
    </Provider>
  );
}
