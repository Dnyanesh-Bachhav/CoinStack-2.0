import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../components/constants";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { Info, XSquare } from "@tamagui/lucide-icons";
import { Modal, Portal } from "react-native-paper";
import { useState } from "react";
import { SizableText } from "tamagui";
import { generatePortfolio } from "../components/portfolio_generation.mjs";

function GeneratedPortfolioScreen(){
    const navigation = useNavigation();
    // Modal Hooks
    const [visible, setVisible] = useState(false);
  
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    generatePortfolio(10000,"LOW");
    return(
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={()=>{
                        navigation.goBack();
                    }} >
                    <AntDesign name="arrowleft" size={24} color={COLORS.white} />
                    </TouchableOpacity>
                    <Text style={{color: COLORS.white,fontSize: 21,marginLeft: 10}}>Generated Portfolio</Text>
                </View>
                <Info
                // size={"$1"}
                onPress={()=>{
                    showModal();
                }}
                style={{ color: COLORS.white, marginRight: 10, fontSize: 12, alignItems: 'flex-end' }}
                />
            </View>
            <View style={styles.contentContainer}>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalStyle}>
                    <Image
                    source={require("../assets/info.png")}
                    style={{width: "100%", top: 0 }}
                    />
                    <View style={{ paddingHorizontal: 10, marginTop: 10 }} >
                        <SizableText size={"$6"} fontWeight={"bold"} >Information</SizableText>
                        <SizableText style={{ color: COLORS.grayDark }} >Please remember to conduct your own research before making any investment decisions. The portfolio provided is for assistance purposes only.</SizableText>
                    </View>
                    
                <TouchableOpacity style={styles.btnStyle} onPress={()=>{
                    console.log("Clicked...");
                    hideModal();
                }} >
                    <SizableText size={"$5"} fontWeight={"600"} style={{ color: COLORS.white, textAlign: 'center' }}>Got it</SizableText>
                </TouchableOpacity>
                </Modal>
            </Portal>
                <Text>Hello</Text>

            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    headerContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingLeft: 10,
        borderWidth: 1,
        backgroundColor: COLORS.primary,
    },
        
    btnStyle:{
        width: '70%',
        alignSelf: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 5,
        // marginTop: 15,
        bottom: 10,
        position: 'absolute',
        elevation: 5
    },

    contentContainer:{
        flex: 1,
        backgroundColor: COLORS.white,
        // paddingVertical: 40
    },
    modalStyle:{
        width: "92%",
        height: "57%",
        alignSelf: 'center',
        justifyContent: 'flex-start',
        backgroundColor: COLORS.white,
        borderRadius: 10,
        // padding: 10,
        overflow: 'hidden',
        // padding: 20,
      }
})
export default GeneratedPortfolioScreen;