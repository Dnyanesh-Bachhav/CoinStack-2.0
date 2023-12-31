import react,{useState,useEffect, useRef} from "react";
import {View,Text,StyleSheet,FlatList, Alert} from 'react-native';
import BasketMenuItem from "../components/BasketItemsScreen/BasketMenuItem";
import Header from "../components/BasketItemsScreen/Header";
import { MostGainedCoins2,profitCoins,lossCoins,trustedCoins,memeCoins, COLORS, MEME_COINS_IDS, TRUSTED_COINS_IDS } from '../components/constants';
import { getSpecificCoins, getTopCoins } from "../Services/requests";
import LottieView from 'lottie-react-native';
import { AlertDialog, Button, XStack, YStack } from 'tamagui'
function BasketItems({route}){
    const screenName = route.params.screenName;
    const [arrayData,setArrayData ] = useState([]);
    const animationRef = useRef(null);
    const [topCoins,setTopCoins] = useState([]);
    const [loading,setLoading] = useState(false);

    
    
    async function getTopMarketCoins(){
        setLoading(true);
        const data = await getTopCoins();
        setArrayData(data);
        setLoading(false);
    }
    

  const transformMemeCoinIds = () => MEME_COINS_IDS.join('%2C');
  const transformTrustedCoinIds = () => TRUSTED_COINS_IDS.join('%2C');

  const fetchTrustedCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const trustedCoinData = await getSpecificCoins(1,  transformTrustedCoinIds());
    console.log("get specific coins response: ");
    console.log(trustedCoinData);
    if(trustedCoinData.error!=null)
    {
        return (
            Alert.alert('Network Error', 'There is something wrong with network or API response...', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () =>
                    {
                        setLoading(false);
                        console.log('OK Pressed')
                    },
                }
              ])
        );
    }
    setArrayData(trustedCoinData);
    setLoading(false);
  };

  const fetchMemeCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const memeCoinData = await getSpecificCoins(1, transformMemeCoinIds());
    console.log("get specific coins response: ");
    console.log(memeCoinData);
    if(memeCoinData.error!=null)
    {
        return (
            Alert.alert('Network Error', 'There is something wrong with network or API response...', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () =>
                    {
                        setLoading(false);
                        console.log('OK Pressed')
                    },
                }
              ])
        );
    }
    setArrayData(memeCoinData);
    setLoading(false);
  };

    useEffect(()=>{
        if( screenName === "High Volume")
        {
            getTopMarketCoins();
        }
        if( screenName === "High Profit coins")
        {

        }
        if( screenName === "High Loss coins")
        {
            setArrayData(lossCoins);
        }
        if( screenName === "Trusted Coins")
        {
            fetchTrustedCoins();
        }
        if( screenName === "Meme Coins")
        {
            fetchMemeCoins();
        }
    },[]);
    return(
        <View style={styles.container}>
            <Header name={ route.params.screenName } imgSrc={route.params.imgSrc} />
            
            {
                !loading ? (
                <FlatList
                    data={arrayData}
                    renderItem={({item})=>(
                        <BasketMenuItem item={item} />
                    )}
                    style={ styles.listStyle }
                    keyExtractor={(item,index)=>index}
                />)
                :
                (
                    <View
                      style={{ justifyContent: "center", alignItems: "center", width: '100%', height: '100%' }}
                    >
                      <LottieView
                        ref={animationRef}
                        style={{
                          width: "40%",
                          height: "40%",
                          alignSelf: "center",
                          color: COLORS.primary,
                        }}
                        autoPlay
                        loop
                        source={require("../assets/Loading (1).json")}
                      />
                    </View>
                  )


            }
            
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLORS.white,
    },
    listStyle:{
        padding: 10
    }
})
export default BasketItems;