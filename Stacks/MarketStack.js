import react from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MarketScreen from '../screens/MarketScreen';
import BuyCoinScreen from '../screens/BuyCoinScreen';
import SellCoinScreen from '../screens/SellCoinScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import WatchListScreen from '../screens/WatchListScreen';
import CoinDetailedScreen from '../screens/CoinChartScreen';
import DetailNewsScreen from '../screens/DetailNewsScreen';
import { COLORS } from '../components/constants';
const MarketScreenStack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();
function TopBar(){
    return(

        <Tab.Navigator screenOptions={{
            tabBarStyle:{
                // backgroundColor: COLORS.primary,
            },
            tabBarIndicatorStyle:{
                backgroundColor: COLORS.primary,
            }
        }} >
            <Tab.Screen name='Market' component={MarketScreen} options={{
                headerShown: false
            }} />
            <Tab.Screen name='WatchList' component={WatchListScreen} />
        </Tab.Navigator>
    );
}
function MarketStack(){
    return(
        <MarketScreenStack.Navigator>
            <MarketScreenStack.Screen name="MarketScreen" component={TopBar} 
            options={{
                headerShown: false,
            }}
            />
            <MarketScreenStack.Screen name="coinDetails" component={CoinDetailedScreen}
            options={{
                headerShown: false,
            }}
            />
            
            <MarketScreenStack.Screen name="BuyCoinScreen" component={BuyCoinScreen}
            options={{
                headerShown: false,
            }}
            />
            <MarketScreenStack.Screen name="SellCoinScreen" component={SellCoinScreen}
            options={{
                headerShown: false,
            }}
            />
            
            <MarketScreenStack.Screen name="DetailNews" component={DetailNewsScreen}
            options={{
                headerShown: false,
            }}
            />
        </MarketScreenStack.Navigator>
    );
}

export default MarketStack;