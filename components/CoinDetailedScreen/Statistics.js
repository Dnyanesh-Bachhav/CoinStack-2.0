import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Separator, SizableText, Spinner, YStack } from "tamagui";
import { getWatchlistedCoins } from "../../Services/requests";
import { COLORS } from "../constants";

function Statistics({ coinName, coinId, coinSymbol }){
    const [ coinData, setCoinData ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const getStatisticData = async()=>{
        setLoading(true);
        const data = await getWatchlistedCoins(1,coinId);
        console.log("Statistics: ");
        console.log(data);
        setCoinData(data[0]);
        setLoading(false);
    }

    useEffect(()=>{
        getStatisticData();
    },[]);
    return(
        <View style={styles.container}>
            <SizableText  size="$7" fontWeight="800" >{coinName} Statistics</SizableText>
            {loading ? (
                <YStack padding="$3" space="$4" alignItems="center">
                <Spinner size="large" color={ COLORS.primary } />
                </YStack>
            )
            :
            <>
                <StatisticItem propertyName={"Market Cap Rank"} propertyValue={`#${coinData?.market_cap_rank}`} />
                <StatisticItem propertyName={`${coinName} Price`} propertyValue={`₹${coinData?.current_price}`} />
                <StatisticItem propertyName={"24h Low"} propertyValue={`₹${coinData?.low_24h}`} />
                <StatisticItem propertyName={"24h High"} propertyValue={`₹${coinData?.high_24h}`} />
                <StatisticItem propertyName={"Price Change 24h"} propertyValue={`₹${coinData?.price_change_24h}`} />
                <StatisticItem propertyName={"Price Change 24h %"} propertyValue={`${coinData?.price_change_percentage_24h}`} />
                <StatisticItem propertyName={"Trading Volume"} propertyValue={`${coinData?.total_volume}`} />
                <StatisticItem propertyName={"Circulating Supply"} propertyValue={`${coinData?.circulating_supply}`} />
                <StatisticItem propertyName={"Total Supply"} propertyValue={`${coinData?.total_supply}`} />
            </>
            }
            </View>        
    );
}
function StatisticItem({ propertyName, propertyValue })
{
    return(
        <>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, paddingBottom: 4, borderBottomWidth: 1, borderColor: "#dcd5e0" }}>
            <SizableText>{propertyName}</SizableText>
            <SizableText style={{ color: COLORS.grey, fontWeight: 'bold' }} >{propertyValue}</SizableText>
        </View>
        {/* <Separator/> */}
        </>
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 10,
        marginBottom: 10
    },
});
export default Statistics;