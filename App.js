import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import TodolistScreen from './src/TodolistScreen';


export default function App() {
  return (
    <SafeAreaView>
    <View >
      <TodolistScreen/>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
 