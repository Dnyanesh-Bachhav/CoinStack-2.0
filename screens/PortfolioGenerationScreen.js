import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Icon, RadioButton } from "react-native-paper";
import { COLORS } from "../components/constants";
import DrawerScreenHeader from "../components/HomeScreen/DrawerScreenHeader";
import { SizableText } from "tamagui";
import { IndianRupee, Mail } from "@tamagui/lucide-icons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
function PortfolioGenerationScreen(){
    const [ investment, setInvestment ] = useState(0);
    const [ risk, setRisk ] = useState(null);
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
            <DrawerScreenHeader headerText={"Generate Portfolio"} />
            <View style={ styles.contentContainer}>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <SizableText size={"$9"} fontWeight={"700"}>Set up your Portfolio</SizableText>
                    <SizableText>How much would you like to invest?</SizableText>
                </View>
                <SizableText style={{ marginLeft: 5, marginTop: 40 }} size={"$5"} fontWeight={"600"}>Amount</SizableText>
                <View style={{ flexDirection: 'row', width: '100%', backgroundColor: COLORS.primaryFaint, paddingHorizontal: 5, paddingVertical: 10, borderRadius: 10, marginTop: 10, overflow: 'hidden' }} >
                    <IndianRupee size={"$1"} style={{ alignSelf: 'center', marginLeft: 5, color: COLORS.primary, fontWeight: '700' }} />
                    <TextInput cursorColor={COLORS.grayDark} keyboardType="numeric" placeholder="0" value={investment} style={{ color: COLORS.grayDark, marginLeft: 10, width: '100%' }} onChangeText={setInvestment} />
                </View>
                <SizableText style={{ marginLeft: 5, marginTop: 40 }} size={"$5"} fontWeight={"600"}>Risk Level</SizableText>
                <RadioButton.Group onValueChange={(val)=>{
                    setRisk(val);
                }} value={risk}>
                    <View style={{...styles.radioContainer, backgroundColor: risk=="low" ? COLORS.primaryFaint: null }}>
                        <RadioButton value="low" />
                        <Text>Low</Text>
                    </View>
                    <View style={{...styles.radioContainer, backgroundColor: risk=="medium" ? COLORS.primaryFaint: null }}>
                        <RadioButton value="medium" />
                        <Text>Medium</Text>
                    </View>
                    <View style={{...styles.radioContainer, backgroundColor: risk=="high" ? COLORS.primaryFaint : null }}>
                        <RadioButton value="high" />
                        <Text>High</Text> 
                    </View>
                </RadioButton.Group>
                <TouchableOpacity style={styles.btnStyle} onPress={()=>{
                    navigation.navigate("GeneratedPortfolioScreen");
                }} >
                    <SizableText size={"$5"} fontWeight={"600"} style={{ color: COLORS.white, textAlign: 'center' }} >Generate Portfolio</SizableText>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLORS.white
    },
    contentContainer:{
        flex: 1,
        paddingHorizontal: 10
    },
    radioContainer:{
        flexDirection: 'row',
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLORS.primaryFaint,
        marginTop: 10,
        alignItems: 'center'
    },
    
    btnStyle:{
        position: 'absolute',
        bottom: 34,
        width: '100%',
        alignSelf: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginTop: 15,
        elevation: 5
    },

});
export default PortfolioGenerationScreen;