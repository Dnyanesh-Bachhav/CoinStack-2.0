import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../constants";
import { useNavigation } from "@react-navigation/native";

function Button({button_text,backColor, screenName, name, coinId, price, symbol, imgSrc })
{
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
            <TouchableOpacity style={{...styles.buttonStyle,backgroundColor: backColor, shadowColor: backColor}} onPress={
                  ()=>{
                    console.log("Hello there...");
                    navigation.navigate(screenName,{
                        name: name,
                        coinId: coinId,
                        price: price,
                        symbol: symbol,
                        imgSrc: imgSrc
                    })
                  }
                } >
            <Text style={styles.buttonText}>{button_text}</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        
        borderColor: "#000",
        alignItems: 'center'
    },
    buttonStyle:{
        padding: 10,
        elevation: 10,
        borderRadius: 10,
    },
    buttonText:{
        color: COLORS.white,
        fontWeight: '600',
        fontSize: 22,
        paddingHorizontal: 25,
        textAlign: 'center'
    }
})

export default Button;