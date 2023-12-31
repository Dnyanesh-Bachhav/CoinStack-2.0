import react from 'react';
import {View,Text,StyleSheet,Image} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../constants';
function BasketMenuItem({ item }){
    const per_color = item.price_change_percentage_24h > 0 ? COLORS.success : COLORS.red;

    return(
        <View style={styles.container}>
            <View style={{justifyContent: 'center', alignItems: 'center'}} >
                <Image 
                    source={{
                        uri: item.image
                    }}
                    style={styles.imgStyle}
                />
            </View>
            <View style={styles.coinName}>
                <Text>{item.name}</Text>
                <Text>{item.symbol.toUpperCase()}</Text>
            </View>
            <Text style={styles.coinPrice}>₹{item.current_price}</Text>
            <View style={{backgroundColor: item.price_change_percentage_24h > 0 ? COLORS.lightGreen : COLORS.lightRed, ...styles.coinPercentage}}>
                <Text style={{color: per_color,fontWeight: 'bold' }}>{item.price_change_percentage_24h.toFixed(2)}%</Text>
                <AntDesign name={item.price_change_percentage_24h > 0 ? "caretup" : "caretdown"} size={16} color={per_color} />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray,
        paddingBottom: 10,
        marginTop: 5
    },
    imgStyle:{
        width: 45,
        height:  45,
        borderRadius: 50,
        marginTop: 3
    },
    coinName:{
        paddingLeft: 10,
        justifyContent: 'center',
        flex: 1
    },
    coinPrice:{
        justifyContent: 'center',
        // marginLeft: 'auto',
        textAlign: 'right',
        // borderWidth: 1,
        marginRight: 10,
        flex: 1
    },

    coinPercentage:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        borderRadius: 5,
        fontWeight: 'bold',
        // marginLeft: 'auto',
        flex: 1
    }
});
export default BasketMenuItem;