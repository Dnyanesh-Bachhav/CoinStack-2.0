import { StyleSheet, TextInput, View } from "react-native";
import { SizableText } from "tamagui";
import { COLORS } from "../constants";
import { useState } from "react";

function Converter({ coinName, coinSymbol, currentPrice }){
    const [ coinValue, setCoinValue ] = useState("1");
    const [ coinLocalCurrencyValue, setCoinLocalCurrencyValue ]  = useState(currentPrice.toString());
    const changeLocalValue = (value)=>{
        const floatValue = parseFloat(value) || 0;
        setCoinLocalCurrencyValue(floatValue);
        setCoinValue((floatValue / currentPrice).toString());
    };
    const changeCoinValue = (value)=>{
        
        const floatValue = parseFloat(value) || 0;
        setCoinValue(floatValue);
        setCoinLocalCurrencyValue(( floatValue *currentPrice).toString());

    };
    return(
        <View style={styles.container}>
            <SizableText  size="$7" fontWeight="800" >{coinName} Converter</SizableText>
            <View style={{ flexDirection: 'row', width: '100%', backgroundColor: COLORS.white, borderRadius: 10, marginTop: 10, overflow: 'hidden' }} >
                <SizableText  style={{ width: '16%', color: COLORS.grayDark, backgroundColor: COLORS.white, padding: 10, borderRightWidth: 1, borderColor: COLORS.primaryFaint }}>{coinSymbol?.toUpperCase()}</SizableText>
                <TextInput inputMode="numeric" cursorColor={COLORS.grayDark} value={coinValue} style={{ color: COLORS.grayDark, marginLeft: 10, width: '100%' }} onChangeText={(value)=>{
                    changeCoinValue(value);
                }} />
            </View>
            <View style={{ flexDirection: 'row', width: '100%', backgroundColor: COLORS.white, borderRadius: 10, marginTop: 10, overflow: 'hidden' }} >
                <SizableText  style={{ width: '16%', color: COLORS.grayDark, backgroundColor: COLORS.white, padding: 10, borderRightWidth: 1, borderColor: COLORS.primaryFaint }}>{"INR"}</SizableText>
                <TextInput inputMode="numeric" cursorColor={COLORS.grayDark} value={coinLocalCurrencyValue} style={{ color: COLORS.grayDark, marginLeft: 10, width: '100%' }} onChangeText={(value)=>{
                    changeLocalValue(value);
                }}  />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 10,
        marginBottom: 10,

    }
});
export default Converter;