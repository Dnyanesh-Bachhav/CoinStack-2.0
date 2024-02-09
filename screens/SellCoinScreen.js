import react,{useState,useEffect, useRef,useContext} from "react";
import {View,Text,StyleSheet,TextInput,TouchableOpacity,ToastAndroid} from 'react-native';
import { COLORS } from "../components/constants";
import Button from "../components/marketScreen/Button";
import Header from "../components/marketScreen/Header";
import { portfolioContext } from "../Contexts/PortfolioContext";
import { transactionContext } from "../Contexts/TransactionContext";
import { Separator, SizableText } from "tamagui";
import { Info } from "@tamagui/lucide-icons";
function SellCoinScreen({route}){
    const [coinValue, setCoinValue] = useState("0");
    const buyExecuted =  useRef(0);
    const currentPrice = route.params.price;
    const [coinLocalCurrencyValue, setCoinLocalCurrencyValue] = useState(
      (route.params.price*parseFloat(coinValue)).toString()
    );
    // Local to cryptocurrency value
    const changeLocalValue = (value) => {
      const floatValue = parseFloat(value) || 0;
      setCoinLocalCurrencyValue(floatValue);
      setCoinValue((floatValue / currentPrice).toString());
      setInputVal((floatValue / currentPrice));
    };
    // Cryptocurrency to local value
    const changeCoinValue = (value) => {
      const floatValue = parseFloat(value) || 0;
      setCoinValue(floatValue);
      setCoinLocalCurrencyValue((floatValue * currentPrice).toString());
    };
    const[itemQuantity,setItemQuantity] = useState(0);
    const[inputVal,setInputVal] = useState(null);
    const[disabledBtn,setDisabledBtn] = useState(true);

    const[isValidData,setIsValidData] = useState(false);
    const {portfolioCoins,storePortfolioCoin,updatePortfolioCoins, updateFirebasePortfolio } = useContext(portfolioContext);
    const { transactions, storeTransaction } = useContext(transactionContext);
    const itemExists = portfolioCoins.some(coin=> coin.name === route.params.name);
    function addZero(item){
        if(item<10)
        {
            return "0"+item;
        }
        return item;
    }

    function configureDate(){
        const d = new Date();
        let time = "";
        let day = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        let hours = addZero(d.getHours());
        let minutes = addZero(d.getMinutes());
        if(hours<12)
        {
            time = "AM";
        }
        else{
            if(hours>=12 && minutes>0)
            {
                time = "PM";
            }
        }
        return day + "/" + month + "/" + year + " " + hours + ":" + minutes + " " + time;
    }
    function getData(){
        if(itemExists)
        {
            portfolioCoins.some(coin=>{
                if(coin.name === route.params.name)
                {
                    setItemQuantity(coin.quantity);
                    console.log("Quantity: "+itemQuantity);
                    if(itemQuantity > 0)
                    setDisabledBtn(false);
                    else
                    setDisabledBtn(true);
                }
            })   
        }
    }
    useEffect(()=>{
        getData();
    },[]);
    useEffect(()=>{
      console.log("UseEffect of portfolio coins...");
      // console.log(portfolioCoins);
      updateFirebasePortfolio();
    },[buyExecuted.current]);
    return(
        <View style={styles.container}>
            <Header coinName={route.params.name} imgSrc={route.params.imgSrc} />
            <View style={styles.dataContainer}>
            <SizableText color={"$color.gray10Light"} size={"$2"}>
              ESTIMATED SELLING PRICE
            </SizableText>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
            padding: 10,
          }}
        >
          <SizableText style={{ color: COLORS.red, ...styles.textStyle }}>
            {route.params.name}
          </SizableText>
          <SizableText
            style={{
              color: COLORS.success,
              fontWeight: "bold",
              ...styles.textStyle,
            }}
          >
            ₹{route.params.price}
          </SizableText>
        </View>
        <View style={{ borderBottomWidth: 1, width: '90%', alignSelf: 'center', borderBottomColor: COLORS.gray }} ></View>
        <Separator style={{ backgroundColor: COLORS.grey }} />
        <SizableText size={"$5"} style={{ marginTop: 21 }}>
          How much do you want to sell?
        </SizableText>

        <View
          style={{
            // flex: 1,
            width: '90%',
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              backgroundColor: COLORS.white,
              borderRadius: 10,
              marginTop: 10,
              overflow: "hidden",
              elevation: 2,
            }}
          >
            <SizableText
              style={{
                width: "18%",
                color: COLORS.grayDark,
                backgroundColor: COLORS.white,
                paddingHorizontal: 10,
                paddingVertical: 10,
                textAlign: 'center',
                borderRightWidth: 1,
                borderColor: COLORS.primaryFaint,
              }}
            >
              {route.params.symbol?.toUpperCase()}
            </SizableText>
            <TextInput
              inputMode="numeric"
              cursorColor={COLORS.grayDark}
              value={coinValue}
              style={{ color: COLORS.grayDark, marginLeft: 10, width: '100%' }}
              onChangeText={(data)=>{
                if(parseFloat(data)>0 && parseFloat(data)<=itemQuantity) 
                {
                    setIsValidData(true);
                    setInputVal(parseFloat(data));
                    changeCoinValue(data);
                }
                else{
                    setIsValidData(false);
                }
            }

             }
            />
          </View>
          <View style={{ display: "flex", justifyContent: 'center', alignItems: 'center', width: "100%" }} >
              <SizableText size="$9" >=</SizableText>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              backgroundColor: COLORS.white,
              borderRadius: 10,
              marginTop: 10,
              overflow: "hidden",
              elevation: 2,
            }}
          >
            <SizableText
              style={{
                width: "18%",
                color: COLORS.grayDark,
                backgroundColor: COLORS.white,
                padding: 10,
                textAlign: 'center',
                borderRightWidth: 1,
                borderColor: COLORS.primaryFaint,
              }}
            >
              {"INR"}
            </SizableText>
            <TextInput
              inputMode="numeric"
              cursorColor={COLORS.grayDark}
              value={coinLocalCurrencyValue}
              style={{ color: COLORS.grayDark, marginLeft: 10, width: '100%' }}
              onChangeText={(value) => {
                changeLocalValue(value);
              }}
            />
          </View>
        </View>

            {/* <TextInput style={styles.textInput} placeholder="Enter a quantity"
             keyboardType="number-pad"
             onChangeText={(data)=>{
                if(data>0 && parseFloat(data)<=itemQuantity) 
                {
                    setInputVal(data);
                    setIsValidData(true);
                }
                else{
                    setIsValidData(false);
                }
            }

             }
             /> */}
            {
                itemExists ?
                <SizableText style={{fontSize: 14,color: COLORS.grayDark, ...styles.textStyle}}>Available: {itemQuantity}</SizableText>
                : <SizableText style={{fontSize: 14,color: COLORS.grayDark, ...styles.textStyle}}>Available: {0}</SizableText>
                 
            }
        <View style={{ width: '90%',  color: COLORS.primary,  paddingBottom: 10, marginTop: "25%", borderBottomWidth: 1, width: '90%', alignSelf: 'center', borderBottomColor: COLORS.gray }} >
            <View style={{ flexDirection: 'row', backgroundColor: COLORS.lightRed, paddingHorizontal: 10, paddingVertical: 4, alignItems: 'center', borderRadius: 5, }} >
                <Info color="$red10Dark" size={"$1"} style={{ marginRight: 5 }} />
                <SizableText color={"$red10"} size="$3">Please enter all details to place an order</SizableText>
            </View>
            {/* <View style={{ height : 20 }} ></View> */}
       
        </View>
  
            <TouchableOpacity style={styles.btn} disabled={!itemExists} activeOpacity={0.5} onPress={
                ()=>{
                    if(itemExists)
                    {
                        portfolioCoins.map((coin)=>{
                            if(coin.name === route.params.name)
                            {
                                // console.log("coin found: "+coin.name+"item name: "+route.params.name+" isTrue: "+(coin.name === route.params.name));
                                let val = parseFloat(coin.quantity);
                                if(val>=0 && val >= parseFloat(inputVal))
                                {
                                    setIsValidData(true);
                                    val -= parseFloat(inputVal);
                                    coin.quantity = val.toFixed(4);
                                    ToastAndroid.show("Coin sold successfully...",1000);
                                }
                                else{
                                    setIsValidData(false);
                                    ToastAndroid.show("Please input a valid value...",1000);                        
                                }
                                setItemQuantity(coin.quantity);
                                console.log("Item quantity: "+coin.quantity);
                                console.log("Item quantity 1: "+typeof itemQuantity);
                            }
                        });
                        updatePortfolioCoins(portfolioCoins);
                        storeTransaction({
                            name: route.params.name,
                            type: "Sell",
                            date: configureDate(),
                            coin: route.params.symbol.toUpperCase(),
                            quantity: inputVal,
                            imgSrc: route.params.imgSrc,
                            currentPrice: currentPrice,
                            total: parseFloat(itemQuantity) * currentPrice,
                        });
                    }
                    else{
                        storePortfolioCoin(
                            { 
                                name: route.params.name,
                                price: route.params.price,
                                imgSrc: route.params.imgSrc,
                                quantity: itemQuantity
                            }
                        );
                        storeTransaction({
                            name: route.params.name,
                            type: "Sell",
                            date: configureDate(),
                            coin: route.params.symbol.toUpperCase(),
                            quantity: inputVal,
                            imgSrc: route.params.imgSrc,
                            currentPrice: currentPrice,
                            total: parseFloat(itemQuantity) * currentPrice,
                        });
                    }            
                    buyExecuted.current += 1;
                }
            } >
                <Button button_text={"Sell"} backColor={itemExists ? COLORS.red : COLORS.gray} />
            </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 10
      },
      dataContainer: {
        flex: 1,
        // borderWidth: 1,
        // justifyContent: "center",
        alignItems: "center",
        marginTop: "20%",
        padding: 10
      },
      textInput: {
        padding: 5,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        paddingVertical: 10,
        marginTop: 10,
        fontSize: 21,
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: 5,
      },
      textStyle: {
        fontSize: 20,
        fontWeight: '600'
      },
      btn: {
        marginTop: 50,
        position: 'absolute',
        bottom: "5%",
      },
    
});
export default SellCoinScreen;