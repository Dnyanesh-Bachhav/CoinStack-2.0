import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import { COLORS } from '../../components/constants';
import Main1 from './Main1';
import GreedAndFearIndexScreen from '../../screens/GreedAndFearIndexScreen';
import TransactionHistoryScreen from '../../screens/TransactionHistoryScreen';
import ChatbotScreen from '../../screens/ChatbotScreen';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import ReportScreen from '../../screens/ReportScreen';
import { Feather } from '@expo/vector-icons';
import PortfolioGenerationScreen from '../../screens/PortfolioGenerationScreen';
import { Icon } from 'react-native-paper';
import PortfolioGenerateStack from '../../Stacks/PortfolioGenerateStack';
const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
    return(
        <Drawer.Navigator drawerContent={(props)=> <CustomDrawer {...props} />} screenOptions={{
            headerShown: false,
            drawerActiveBackgroundColor: COLORS.primary,
            drawerActiveTintColor: COLORS.white,
            drawerInactiveTintColor: COLORS.black,
            drawerLabelStyle:{
                marginLeft: -25
            }
            
        }} >
            <Drawer.Screen name="Main " component={Main1} options={{
                drawerIcon: ({color})=>(
                    <FontAwesome name="home" size={24} color={color} />
                )
            }} />
            {/* <Drawer.Screen name="Home " component={HomeStack} options={{
                drawerIcon: ({color})=>(
                    <FontAwesome name="home" size={24} color={color} />
                )
            }} />
             <Drawer.Screen name="Market" component={MarketStack} options={{
                drawerIcon: ({color})=>(
                    <FontAwesome name="line-chart" size={24} color={color} />
                )
            }} />
            <Drawer.Screen name="News" component={NewsScreen}
            options={{
                drawerIcon: ({color})=>(
                    <Ionicons name="newspaper-outline" size={24} color={color} />
                )
            }} />
            <Drawer.Screen name="Basket" component={BasketsScreen} 
            options={{
                drawerIcon: ({color})=>(
                    <Fontisto name="shopping-basket" size={24} color={color} />
                )
            }} />
            <Drawer.Screen name="Portfolio" component={PortfolioScreen} 
            options={{
                drawerIcon: ({color})=>(
                    <FontAwesome name="line-chart" size={24} color={color} />
                )
            }} /> */}
            <Drawer.Screen name="Greed and Fear Index" component={GreedAndFearIndexScreen} 
            options={{
                drawerIcon: ({color})=>(
                    <MaterialIcons name="speed" size={24} color={color} />
                )
            }} />
            <Drawer.Screen name="Transaction History" component={TransactionHistoryScreen} 
            options={{
                drawerIcon: ({color})=>(
                    <FontAwesome5 name="history" size={24} color={color} />
                )
            }} />
            <Drawer.Screen name="Chatbot" component={ChatbotScreen} 
            options={{
                drawerIcon: ({color})=>(
                    <FontAwesome5 name="robot" size={24} color={color} />
                )
            }} />
            <Drawer.Screen name="Download Report" component={ReportScreen} 
            options={{
                drawerIcon: ({color})=>(
                    <Feather name="download" size={24} color={color} />
                )
            }} />
            <Drawer.Screen name="Generate Portfolio" component={PortfolioGenerateStack} 
            options={{
                drawerIcon: ({color})=>(
                    <Icon
            source={"briefcase-check-outline"}
            color={COLORS.black}
            size={24}
            />
                )
            }} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;