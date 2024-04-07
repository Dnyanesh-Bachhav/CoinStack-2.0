import react, { useRef, useState } from "react";
import {View,Text,StyleSheet, Dimensions} from 'react-native';
import { COLORS } from "../constants";
import { SizableText } from "tamagui";
const HEIGHT = Dimensions.get("window").height/6;
function InvestmentInfo({invested,current}){
    const returns = parseInt(current)-parseInt(invested);
    const returnPercentage = (returns/parseInt(invested))*100;    
    return(
        <View style={styles.container}>
            <View style={{ flex: 1}}>
                <View style={styles.header}>
                    <SizableText style={{marginLeft: '5%', flex: 1, ...styles.textStyle}}>Current</SizableText>
                    <SizableText style={{marginRight: '5%', flex: 1, ...styles.textStyle}}>Invested</SizableText>
                </View>
                <View style={styles.headerVal}>
                    <SizableText style={{marginLeft: '5%', flex: 1, ...styles.headerTextStyle}}>₹{current}</SizableText>
                    <SizableText style={{marginRight: '5%', flex: 1, ...styles.headerTextStyle}}>₹{invested}</SizableText>
                </View>
            </View>
            <View style={{ flex: 1}}>
                <View style={styles.header}>
                    <SizableText style={{marginLeft: '5%', flex: 1, ...styles.textStyle}}>Returns</SizableText>
                    <SizableText style={{marginRight: '5%', flex: 1, alignSelf: 'flex-start', ...styles.textStyle}}>Total Returns%</SizableText>
                </View>
                <View style={styles.headerVal}>
                    <SizableText style={{marginLeft: '5%', flex: 1, color: returns<0 ? COLORS.red : COLORS.activeGreen, fontWeight: 'bold'}}>₹{ returns }</SizableText>
                    <SizableText style={{marginRight: '5%', flex: 1, color: returnPercentage<0 ? COLORS.red : COLORS.activeGreen, fontWeight: 'bold'}}>{ returnPercentage.toFixed(2) }%</SizableText>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        // flexDirection: 'row',
        // flex: 1,
        width: '99%',
        height: HEIGHT,
        // backgroundColor: COLORS.white,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#fff",
        borderColor: COLORS.grayDark,
        marginTop:15,
        marginBottom: 10,
        alignSelf: 'center',
        elevation: 5
    },
    textStyle:{
        color: COLORS.grayDark,
    },
    headerTextStyle:{
        color: "#212121",
    },
    header:{
        // flex: 1,
        // borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerVal:{
        // flex: 1,
        // borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});
export default InvestmentInfo;