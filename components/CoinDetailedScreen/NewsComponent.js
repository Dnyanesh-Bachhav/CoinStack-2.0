import { Dimensions, Image, StyleSheet, View } from "react-native";
import { SizableText } from "tamagui";
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from "../constants";




const WIDTH = Dimensions.get("window").width;
function NewsComponent(){
    return(
        <View style={styles.container}>
            <View style={styles.NewsContainer}>
                <Image source={{
                    uri: "https://t3.ftcdn.net/jpg/04/75/78/56/360_F_475785604_HDtTcxBFA0Av87F7JoFmpircCcatQ22b.jpg",
                }}
                width={50}
                height={50}
                />
                <View style={{flexDirection: 'row', width: '100%', marginRight: 20 }} >
                    <SizableText>Lorem ipsum dolor sit amet consectetur, adipisicing elit. optio maiores? Maxime sit sunt minus voluptatum saepe hic nam numquam?</SizableText>
                </View>
                    <FontAwesome name="angle-right" size={40} color={COLORS.black} style={{ alignSelf: 'flex-end' }} />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        // width: WIDTH,
        marginHorizontal: 10,
        // marginVertical: 10
    },
    NewsContainer:{
        flexDirection: 'row',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
        
    }
});
export default NewsComponent;