import HomeScreen from './screens/HomeScreen';
import react,{useEffect,useState} from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from 'react-native';
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

export default function App() {
  const [connected,setConnected] = useState(true);
  async function getNetworkData(){
    const data = await NetInfo.fetch();
    setConnected(data.isConnected);
  }
  function loadFonts(){
    const [loaded] = useFonts({
      Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
      InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
    });
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
      <PortfolioContextProvider>
        <WatchlistProvider>
          <TransactionContextProvider>
          <TamaguiProvider config={config}>
            <NavigationContainer>
                {/* <Tabs/> */}
                {/* <DrawerNavigator/> */}
                <AppNavigator/>
            </NavigationContainer>
          </TamaguiProvider>
          </TransactionContextProvider>
        </WatchlistProvider>
      </PortfolioContextProvider>
      
      </>
    : <NoInternetScreen/>
    
    
  }
    <StatusBar style="auto" backgroundColor={COLORS.primary} styles={styles.statusBarStyle} />
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
