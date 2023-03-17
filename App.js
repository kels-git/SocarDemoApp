import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import ApplicationNavigator from './src/Navigators/ApplicationNavigator';
import FlashMessage from "react-native-flash-message";
export default function App() {
  return (
    <>
      <ApplicationNavigator />
      <StatusBar style="auto" />
      <FlashMessage position="top" />
    </>
  );
}


