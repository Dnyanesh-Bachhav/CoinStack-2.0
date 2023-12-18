import react, { useState, useRef, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { COLORS } from "../components/constants";
import Button from "../components/marketScreen/Button";
import Header from "../components/marketScreen/Header";
import { portfolioContext } from "../Contexts/PortfolioContext";
import { transactionContext } from "../Contexts/TransactionContext";
import { Separator, SizableText } from "tamagui";
import { Info } from '@tamagui/lucide-icons';
function BuyCoinScreen({ route }) {
  const [coinValue, setCoinValue] = useState("1");
  const currentPrice = route.params.price;
  const [coinLocalCurrencyValue, setCoinLocalCurrencyValue] = useState(
    route.params.price.toString()
  );
  const changeLocalValue = (value) => {
    const floatValue = parseFloat(value) || 0;
    setCoinLocalCurrencyValue(floatValue);
    setCoinValue((floatValue / currentPrice).toString());
  };
  const changeCoinValue = (value) => {
    const floatValue = parseFloat(value) || 0;
    setCoinValue(floatValue);
    setCoinLocalCurrencyValue((floatValue * currentPrice).toString());
  };

  const [itemQuantity, setItemQuantity] = useState();
  const [date, setDate] = useState(null);
  const { portfolioCoins, storePortfolioCoin, updatePortfolioCoins } =
    useContext(portfolioContext);
  const { transactions, storeTransaction } = useContext(transactionContext);
  const itemExists = portfolioCoins.some(
    (coin) => coin.name === route.params.name
  );

  console.log(transactions);
  function addZero(item) {
    if (item < 10) {
      return "0" + item;
    }
    return item;
  }

  function configureDate() {
    const d = new Date();
    let time = "";
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    let hours = addZero(d.getHours());
    let minutes = addZero(d.getMinutes());
    if (hours < 12) {
      time = "AM";
    } else {
      if (hours >= 12 && minutes > 0) {
        time = "PM";
      }
    }
    return (
      day + "/" + month + "/" + year + " " + hours + ":" + minutes + " " + time
    );
  }

  return (
    <View style={styles.container}>
      <Header coinName={route.params.name} imgSrc={route.params.imgSrc} />
      {/* <Converter
        coinName={route.params.name}
        coinSymbol={route.params.symbol}
        currentPrice={route.params.price}
      /> */}
      <View style={styles.dataContainer}>
        <SizableText color={"$color.gray10Light"} size={"$2"}>
          ESTIMATED BUYING PRICE
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
          How much do you want to buy?
        </SizableText>

        {/* <Text style={{ fontSize: 24, ...styles.textStyle }}>Quantity</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter a quantity"
          keyboardType="number-pad"
          onChangeText={(data) => {
            if (data > 0) setItemQuantity(data);
          }}
        /> */}

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
            }}
          >
            <SizableText
              style={{
                width: "16%",
                color: COLORS.grayDark,
                backgroundColor: COLORS.white,
                padding: 10,
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
              style={{ color: COLORS.grayDark, marginLeft: 10 }}
              onChangeText={(value) => {
                  if (value > 0) setItemQuantity(value);
                changeCoinValue(value);
              }}
            />
          </View>
          <View style={{ display: "flex", justifyContent: 'center', alignItems: 'center', width: "100%" }} >
              <SizableText style={{  }} size="$9" >=</SizableText>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              backgroundColor: COLORS.white,
              borderRadius: 10,
              marginTop: 10,
              overflow: "hidden",
            }}
          >
            <SizableText
              style={{
                width: "16%",
                color: COLORS.grayDark,
                backgroundColor: COLORS.white,
                padding: 10,
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
              style={{ color: COLORS.grayDark, marginLeft: 10 }}
              onChangeText={(value) => {
                changeLocalValue(value);
              }}
            />
          </View>
        </View>
        <View style={{ width: '90%',  color: COLORS.primary,  paddingBottom: 10, marginTop: "30%", borderBottomWidth: 1, width: '90%', alignSelf: 'center', borderBottomColor: COLORS.gray }} >
            <View style={{ flexDirection: 'row', backgroundColor: COLORS.lightRed, paddingHorizontal: 10, paddingVertical: 4, alignItems: 'center', borderRadius: 5, }} >
                <Info color="$red10Dark" size={"$1"} style={{ marginRight: 5 }} />
                <SizableText color={"$red10"} size="$3">Please enter all details to place an order</SizableText>
            </View>
            {/* <View style={{ height : 20 }} ></View> */}
       
        </View>
        
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.5}
          onPress={() => {
            if (itemExists) {
              portfolioCoins.map((coin) => {
                if (coin.name === route.params.name) {
                  // console.log("coin found: "+coin.name+"item name: "+route.params.name+" isTrue: "+(coin.name === route.params.name));
                  let val = parseFloat(coin.quantity);
                  val += parseFloat(itemQuantity);
                  coin.quantity = val;
                  console.log("Item quantity: " + coin.quantity);
                  console.log("Item quantity 1: " + typeof itemQuantity);
                }
              });
              updatePortfolioCoins(portfolioCoins);
              storeTransaction({
                name: route.params.name,
                type: "Buy",
                date: configureDate(),
                coin: route.params.symbol.toUpperCase(),
                quantity: itemQuantity,
              });
            } else {
              storePortfolioCoin({
                name: route.params.name,
                price: route.params.price,
                imgSrc: route.params.imgSrc,
                quantity: itemQuantity,
              });
              storeTransaction({
                name: route.params.name,
                type: "Buy",
                date: configureDate(),
                coin: route.params.symbol.toUpperCase(),
                quantity: itemQuantity,
              });
            }
            ToastAndroid.show("Coin bought successfully...", 1000);
          }}
        >
          <Button button_text={"Buy"} backColor={COLORS.success} />
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
    marginTop: "25%",
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
export default BuyCoinScreen;
