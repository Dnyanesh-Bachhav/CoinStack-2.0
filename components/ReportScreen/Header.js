import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';

function Header(){
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>{
                navigation.goBack();
            }} >
                <AntDesign name="arrowleft" size={24} color={COLORS.white} />
            </TouchableOpacity>
            <Text style={styles.textStyle}>Download Reports</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        backgroundColor : COLORS.primary,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 7,
        alignItems: 'center'
    },
    textStyle:{
        color: COLORS.white,
        fontWeight: 'bold',
        padding: 5,
        fontSize: 16,
        marginLeft: 5
    },
});

export default Header;