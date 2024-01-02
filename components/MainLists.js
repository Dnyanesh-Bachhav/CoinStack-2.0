import React,{useState,useEffect} from "react";
import {View,Text,StyleSheet,ActivityIndicator } from 'react-native';
import { MostGainedCoins } from "./constants";
import ListCoins from "./Listcoins";
import TitleText from "./TitleText";
import {getMarketHighChangedData, getTopCoins, getTrendingCoins } from '../Services/requests';
import { getExchanges,getTopCoinsCoinMarketCap } from "../Services/requestsCoinMarketCap";
import { AlertDialog, Button, SizableText, XStack, YStack } from "tamagui";
import { Activity, Airplay } from '@tamagui/lucide-icons'
import { Paragraph } from "tamagui";
function MainLists(){
    const [arrayData,setArrayData] = useState([]);
    const [topCoins,setTopCoins] = useState([]);
    const [trendingCoins, setTrendingCoins] = useState([]);
    const [loading,setLoading] = useState(false);
    async function getData(){
        setLoading(true);
        const data = await getMarketHighChangedData();
        let array1 = [];
        // Get top 10 coins
        for(let i=0;i<10;i++)
        {
            array1.push(data[i]);
        }
        console.log(array1.length);
        setArrayData(array1);
        setLoading(false);
    }
    async function getTopMarketCoins(){
        setLoading(true);
        const data = await getTopCoins();
        console.log("Top Coins:");
        console.log(data[0]);
        
        setTopCoins(data);
        setLoading(false);
    }
    
    async function getData1(){
        const topCoinsArray = await getTopCoinsCoinMarketCap();
        const exchanges = await getExchanges();
        console.log(exchanges);
        // for( let i=0;i<25;i++)
        // {
            //     console.log(exchanges.data[i].name);
            // }
        }
        async function getTrendingMarketCoins(){
            setLoading(true);
            const data = await getTrendingCoins();
            let array = [];
            data.coins.forEach((val,index)=>{
                array.push({
                    id: val.item.id,
                    name: val.item.name,
                    symbol: val.item.symbol,
                    image: val.item.small,
                    price: (parseFloat(val.item.data.price.replace(/,/g,'').substring(1)) * 80).toFixed(4),
                    market_cap_change_percentage_24h: val.item.data.price_change_percentage_24h.inr,
                    
                })
            })
            setTrendingCoins(array);
            console.log("Trending Coins:");
            console.log(data.coins[0].item);
            setLoading(false);
            
        }
        useEffect(()=>{
            // getData1();
            // getData();
            getTopMarketCoins();
            getTrendingMarketCoins();
        },[]);
        return(
            <View style={styles.container}>
            {/* Trending Coins */}
            <Paragraph size="$7" fontWeight="800">Trending Coins</Paragraph>
            <SizableText theme="alt2" size={"$3"}>Explore trending coins with live updates.</SizableText>
            <ListCoins coinData={trendingCoins} loading={loading} type={"Trending"} />
            
            {/* Popular Coins */}

            <Paragraph size="$7" fontWeight="800">Popular coins</Paragraph>
            <SizableText theme="alt2" size={"$3"}>People usually buy these coins</SizableText>
            <ListCoins coinData={topCoins} loading={loading}  type={"Popular"} />
            {/* <TitleText title="Crypto News" descriptionText="News in the market..."/> */}

        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        marginEnd: 4,
        padding: 10
    }
});

export default MainLists;