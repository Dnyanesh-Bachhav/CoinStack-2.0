import {View,Text,StyleSheet} from 'react-native';
import { COLORS } from "../constants";
import { SizableText } from 'tamagui';
function InfoText(){
    return(
        <View style={styles.container}>
              <SizableText style={styles.textHeader}>Things to keep in mind!</SizableText>
              <SizableText style={styles.textStyle}>All the values are indicative. All your invetments are virtual...Investments profit and losses teaches you about the market. Try to make more profits from your investments that will allow you to push your rank... </SizableText>
              <SizableText style={styles.textBottom}>--CoinStack</SizableText>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        padding: 10,
    },
    textHeader:{
        fontSize: 18,
        fontWeight: 'bold',
        paddingVertical: 5
    },
    textBottom:{
        fontSize: 18,
        fontWeight: 'bold',
        paddingVertical: 5,
        alignSelf: 'flex-end',
        marginRight: 10,
        bottom: 0,
        color: COLORS.black,

    },
    textStyle:{
        fontSize: 15,
        color: COLORS.black,
    }
});
export default InfoText;