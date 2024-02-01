import react from "react";
import {View,Text,StyleSheet, Dimensions} from 'react-native';
import { COLORS } from "../constants";
import { SizableText } from "tamagui";
const HEIGHT = Dimensions.get("window").height/6;
function InvestmentInfo({invested,current}){

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
                    <SizableText style={{marginLeft: '5%', flex: 1, ...styles.headerTextStyle}}>₹0</SizableText>
                    <SizableText style={{marginRight: '5%', flex: 1, ...styles.headerTextStyle}}>0%</SizableText>
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
        backgroundColor: COLORS.primaryFaint,
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
        color: COLORS.black,
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