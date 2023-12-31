import React,{useState,useEffect} from "react";
import {View,Text,StyleSheet,ActivityIndicator } from 'react-native';
import { MostGainedCoins } from "./constants";
import ListCoins from "./Listcoins";
import TitleText from "./TitleText";
import {getMarketHighChangedData, getTopCoins } from '../Services/requests';
import { getExchanges,getTopCoinsCoinMarketCap } from "../Services/requestsCoinMarketCap";
import { AlertDialog, Button, SizableText, XStack, YStack } from "tamagui";
import { Activity, Airplay } from '@tamagui/lucide-icons'
import { Paragraph } from "tamagui";
function MainLists(){
    const [arrayData,setArrayData] = useState([]);
    const [topCoins,setTopCoins] = useState([]);
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
    useEffect(()=>{
        getData1();
        getData();
        getTopMarketCoins();
    },[]);
    return(
        <View style={styles.container}>
            {/* <Button>Hello World...!!!</Button> */}
            <Paragraph size="$7" fontWeight="800">Popular coins</Paragraph>
            <SizableText theme="alt2" size={"$3"}>People usually buy these coins</SizableText>
            {/* Newly Launched */}
            {/* <TitleText title="Newly Launched..." descriptionText="Explore more assets for your portfolio"/> */}
            <ListCoins coinData={MostGainedCoins} loading={loading} type={"NewlyLaunched"} />
            {/* Most Gained Coins */}
            {/* <TitleText title="Top Gainers..." descriptionText="Coins that have gain the most in 24 hours"/> */}
            <Paragraph size="$7" fontWeight="800">Top Gainers</Paragraph>
            <SizableText theme="alt2" size={"$3"}>Coins that have gain the most in 24 hours</SizableText>
            <ListCoins coinData={arrayData} loading={loading} type={"MostGained"} />
            {/* Most Lossed Coins */}
            {/* <TitleText title="Popular coins..." descriptionText="People usually buy these coins..."/> */}
            <Paragraph size="$7" fontWeight="800">Popular coins</Paragraph>
            <SizableText theme="alt2" size={"$3"}>People usually buy these coins</SizableText>
            <ListCoins coinData={topCoins} loading={loading}  type={"Popular"} />
            {/* <TitleText title="Crypto News" descriptionText="News in the market..."/> */}

        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        marginEnd: 10,
        padding: 10
    }
});

export default MainLists;