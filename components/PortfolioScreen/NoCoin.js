import react from "react";
import LottieView from 'lottie-react-native';
import {View,Text,StyleSheet, Pressable, TouchableOpacity} from 'react-native';
import { COLORS } from "../constants";
import Button from "../Button";
import { useNavigation } from "@react-navigation/native";
function NoCoin(){
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <LottieView
                style={{
                    width: 100,
                    height: 250,
                }}
                source={require('../../assets/70780-no-result-found.json')}
                autoPlay
                loop
            />
            <TouchableOpacity style={styles.buttonStyle} onPress={()=>{
                navigation.navigate("Market");
            }} >
            <Text style={styles.buttonText}>Add more Assets</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
        width: '100%',
    },
    textStyle:{
        fontSize: 24,
        color: COLORS.primary,
    },
    
    buttonStyle:{
        padding: 10,
        paddingHorizontal: 15,
        elevation: 25,
        backgroundColor: COLORS.primary,
        borderRadius: 8,
        width: '60%',
    },
    buttonText:{
        color: COLORS.white,
        fontWeight: '600',
        fontSize: 22,
        textAlign: 'center'
    }

});
export default NoCoin;