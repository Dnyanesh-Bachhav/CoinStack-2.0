import React from 'react';
import {View,Text,Image,StyleSheet,ScrollView,Dimensions,TouchableOpacity} from 'react-native';
import { COLORS } from './constants';
const CARD_HEIGHT = Dimensions.get('window').height/4.5;
const CARD_WIDTH = Dimensions.get('window').width/3;
import {useNavigation} from '@react-navigation/native';
import { Paragraph } from 'tamagui';
import { SizableText } from 'tamagui';
function ItemCard({coinName,percentage,price,coinId,imgUrl }){
  const navigation = useNavigation();
  return(
    <View style={styles.container}>

        
      <View >
      <TouchableOpacity onPress={()=>{
        console.log("CoinName: "+percentage);
        navigation.navigate("coinDetails",{
          coin: coinName,
          coinId: coinId,
          imgUrl: imgUrl || "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
        });
      }} style={styles.card} >
        <Image
        style={styles.imgStyle}
        source={{
          uri: imgUrl || "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
        }}
        // source={require("../assets/MANA_Logo.jpg")}
        />
        <Paragraph size={"$4"} fontWeight={"500"} style={styles.coinNameText} numberOfLines={1}>{coinName}</Paragraph>
        <SizableText theme='alt1' size={"$3"} >₹{price ? price : 500 }</SizableText>
        { percentage > 0 ?
        <Text style={styles.coinPercentage}>{percentage.toFixed(2)}%</Text>
        : <Text style={styles.coinPercentageRed}>{Number.parseFloat(percentage).toFixed(2)}%</Text>
        }
      </TouchableOpacity>
      </View>

    </View>

  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: CARD_HEIGHT,
    flex: 1,
    flexDirection: 'column',
    // elevation: 5
  },
  card:{
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    width: CARD_WIDTH,
    borderRadius: 12,
    marginRight: 10,
    marginLeft: 2,
    paddingLeft: 8,
    paddingVertical: 10,
    elevation: 2,
  },
  imgStyle: {
    width: 40,
    height: 40,
    marginBottom: 5,
    // alignSelf: 'flex-start',
    resizeMode: 'contain',
    marginTop: 5
  },
  coinNameText:{
    color: '#000',
    // textAlign: 'left',
    fontWeight: 'bold',
  },
  coinPercentage:{
    color: 'green',
    fontWeight: 'bold',
    fontSize: 21
  },
  coinPercentageRed:{
    color: 'red',
    fontWeight: 'bold',
    fontSize: 21
  }
})
export default ItemCard;