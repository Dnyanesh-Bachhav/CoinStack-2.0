import HomeScreen from './screens/HomeScreen';
import react,{useEffect,useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';
import { COLORS } from './components/constants';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './Navigation/bottom/tabs';
import NetInfo from '@react-native-community/netinfo';
import NoInternetScreen from './screens/NoInternetScreen';
import PortfolioContextProvider from './Contexts/PortfolioContext';
import TransactionContextProvider from './Contexts/TransactionContext';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-get-random-values';
import WatchlistProvider from './Contexts/WatchListContext';
import DrawerNavigator from './Navigation/drawer/DrawerNavigator';
import AppNavigator from './Navigation/AppNavigator';
import { useFonts } from 'expo-font'
import { TamaguiProvider } from 'tamagui'

import config from './tamagui.config'
import { AuthProvider } from './Contexts/AuthProviderContext';

export default function App() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });
  const [connected,setConnected] = useState(true);
  async function getNetworkData(){
    const data = await NetInfo.fetch();
    setConnected(data.isConnected);
  }

  useEffect(()=>{
    getNetworkData();
  },[]);
  const Drawer = createDrawerNavigator();
  return (
    
    <SafeAreaView style={styles.container}>
    {
      connected ?
      <>
            <AuthProvider>
      <PortfolioContextProvider>
        <WatchlistProvider>
          <TransactionContextProvider>
              <TamaguiProvider config={config}>
                <NavigationContainer>
                    <AppNavigator/>
                </NavigationContainer>
              </TamaguiProvider>
          </TransactionContextProvider>
        </WatchlistProvider>
      </PortfolioContextProvider>
            </AuthProvider>
      
      </>
    : <NoInternetScreen/>
    
    
  }
    <StatusBar style="auto" backgroundColor={"#632791"} styles={styles.statusBarStyle} />
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBarStyle:{
    backgroundColor: COLORS.primary,

  }
});
