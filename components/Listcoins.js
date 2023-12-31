import React,{useRef, useState} from 'react';
import {View,Text,StyleSheet,Dimensions,FlatList} from 'react-native';
import ItemCard from './ItemCard';
const SCROLLVIEW_HEIGHT = Dimensions.get('window').height / 4;
import LottieView from 'lottie-react-native';
import { COLORS } from './constants';
function ListCoins({coinData,loading,type}){
  const animationRef = useRef(null);
  function getImageUrl(item){
     let imgUrl = "";
    //  console.log(item);
      // Coin Image fetching according to type of coin...
      if(type=="MostGained")
      {
        imgUrl = item.top_3_coins[0];
      }
      else{
        imgUrl = item.image || item.imgSrc;
      }
      // console.log("ImageUrl: "+imgUrl);

      return imgUrl;
    
  }

  function getPrice(item){
    let price = 0;
     // Coin Image fetching according to type of coin...
     if(type=="MostGained")
     {
       price = 500;
     }
     else{
       price = (item.current_price || item.price);
     }
     return price;
 }
  return (
    <View style={styles.coinListView}>
      {!loading ? (
        <FlatList
          data={coinData}
          horizontal={true}
          contentContainerStyle={styles.flatListContainer}
          renderItem={({ item, index }) => (
            <>
              <ItemCard
                coinName={item.name}
                coinId={item.id}
                imgUrl={`${getImageUrl(item)}`}
                percentage={
                  item.market_cap_change_percentage_24h ||
                  item.market_cap_change_24h
                }
                price={`${getPrice(item)}`}
                key={index}
                style={{ flexDirection: "column", height: 50, elevation: 25 }}
              />
              {/* <Text>{item.top_3_coins}</Text> */}
            </>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View
          style={{ justifyContent: "center", alignItems: "center", width: '100%', height: '100%' }}
        >
          <LottieView
            ref={animationRef}
            style={{
              width: "70%",
              height: "70%",
              alignSelf: "center",
              color: COLORS.primary,
            }}
            autoPlay
            loop
            source={require("../assets/Loading (1).json")}
          />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  coinListView:{
    width: '100%',
    paddingTop: 5,
    flex: 1,
    flexDirection: 'row',

  },
  flatListContainer:{
    // marginLeft: 10
  }
});
export default ListCoins;