import React from "react";
import {View,Text,StyleSheet,Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PortfolioScreen from "../../screens/Portfolio";
import { COLORS } from "../../components/constants";
import HomeStack from "../../Stacks/HomeStack";
import BasketsStack from "../../Stacks/BasketStack";
import MarketStack from "../../Stacks/MarketStack";
import NewsStack from "../../Stacks/NewsStack";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import LearningScreenStack from "../../Stacks/LearningStack";
import LearningStack from "../../Stacks/LearningStack";
import { SizableText } from "tamagui";



const Tab = createBottomTabNavigator();
function Tabs(){
    const animation = useSharedValue(0.7);
    const animatedStyle = useAnimatedStyle(()=>{
        return { transform: [{scale:animation.value}]};
    });
    return(
        <Tab.Navigator
        screenOptions={{
            "tabBarShowLabel": false,
            "tabBarStyle": {
                // flex: 1,
                // display: "flex",
                // borderWidth: 1,
                // paddingHorizontal: 10,
                height: "7%",
                width: "96%",
                alignSelf: "center",
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 16,
                marginBottom: 10,
                elevation: 4,
                // paddingVertical: 10,
                paddingHorizontal: 25
            }
          }}
        >
            <Tab.Screen name="HomeScreen" component={HomeStack} options={{
                headerShown: false,
                tabBarIcon: ({focused})=>(
                    <View style={styles.tabOption }>
                        {
                            
                            animation.value = focused ? withSpring(1 ) : withSpring(1) 
                            
                        }
                    <Animated.View style={[focused ? styles.focusedIconStyle : null, animatedStyle]}>
                        <Image source={require("../../assets/Home.png")} style={{
                            tintColor: focused ? COLORS.primary : COLORS.blueFaint,
                            ...styles.imgStyle}}/>
                        {
                            focused &&
                            <Text numberOfLines={1} style={{color: focused ? COLORS.primary : COLORS.blueFaint,}} >Home</Text>
                        }
                    </Animated.View>
                    </View>
                )
            }} />
            <Tab.Screen name="Market" component={MarketStack} options={{
                headerShown: false,
                tabBarIcon: ({focused})=>(
                    <View style={styles.tabOption}>
                    <View style={focused ? styles.focusedIconStyle : null}>
                        <Image source={require("../../assets/Market.png")} style={{
                            tintColor: focused ? COLORS.primary : COLORS.blueFaint,
                            ...styles.imgStyle}}/>
                        {
                            focused &&
                        <Text numberOfLines={1} style={{color: focused ? COLORS.primary : COLORS.blueFaint,}} >Market</Text>
                        }
                    </View>
                    </View>
                )
            }} />
            <Tab.Screen name="News" component={LearningStack} options={{
                    headerShown: false,
                    unmountOnBlur: true,
                    tabBarIcon: ({focused})=>(
                        <View style={{...styles.tabOption  }}>
                        <View style={focused ? styles.focusedIconStyle : null}>
                            <Image source={require("../../assets/newspaper.png")} style={{
                                tintColor: focused ? COLORS.primary : COLORS.blueFaint,
                                ...styles.imgStyle }}/>
                            {
                                focused &&
                            <Text numberOfLines={1} style={{color: focused ? COLORS.primary : COLORS.blueFaint,}} >News</Text>
                            }
                            </View>
                        </View>
                    )
                }} />
            <Tab.Screen name="Baskets" component={BasketsStack} options={{
                headerShown: false,
                tabBarIcon: ({focused})=>(
                    <View style={styles.tabOption}>
                    <View style={focused ? styles.focusedIconStyle : null}>
                        <Image source={require("../../assets/Basket.png")} style={{
                            tintColor: focused ? COLORS.primary : COLORS.blueFaint,
                            ...styles.imgStyle}}/>
                        {
                            focused &&
                        <Text numberOfLines={1} style={{color: focused ? COLORS.primary : COLORS.blueFaint,}} >Baskets</Text>
                        }
                        </View>
                    </View>
                )
            }} />
            <Tab.Screen name="Portfolio" component={PortfolioScreen} options={{
                headerShown: false,
                unmountOnBlur: true,
                tabBarIcon: ({focused})=>(
                    <View style={styles.tabOption}>
                    <View style={focused ? styles.focusedIconStyle : null}>
                        <Image source={require("../../assets/Portfolio.png")} style={{
                            tintColor: focused ? COLORS.primary : COLORS.blueFaint,
                            ...styles.imgStyle}}/>
                        {
                            focused &&
                            <SizableText numberOfLines={1} style={{color: focused ? COLORS.primary : COLORS.blueFaint, fontSize: 13 }} >Portfolio</SizableText>
                        }
                        </View>
                    </View>
                )
            }} />
            
        </Tab.Navigator>
    );
}
const styles = StyleSheet.create({
    imgStyle:{
        width: 22,
        height: 22,
        marginRight: 5
    },
    tabOption:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    focusedIconStyle:{
        flexDirection: 'row',
        width : '100%',
        paddingVertical: 5,
        paddingHorizontal: 7,
        borderRadius: 10,
        backgroundColor: COLORS.primaryFaint,
    }
})
export default Tabs;