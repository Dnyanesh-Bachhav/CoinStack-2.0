import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
import { Octicons } from '@expo/vector-icons';
import { COLORS } from "../components/constants";
import { FontAwesome } from '@expo/vector-icons';
import DrawerScreenHeader from "../components/HomeScreen/DrawerScreenHeader";
import { useContext, useEffect, useState } from "react";
import { transactionContext } from "../Contexts/TransactionContext";
import { Sheet, SizableText } from "tamagui";
import { ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import Button from "../components/CoinDetailedScreen/Button";

function TransactionHistoryScreen() {
    const { transactions, storeTransaction } = useContext(transactionContext);
    const [position, setPosition] = useState(0);
    const [open, setOpen] = useState(false);
    const [modal, setModal] = useState(true);
    const [innerOpen, setInnerOpen] = useState(false);
    const [currentTransaction, setCurrentTransaction] = useState({});
    
    // console.log(transactions);
    return (
        <View style={styles.container}>
            <DrawerScreenHeader headerText="Transactions List" />
    <Sheet
        forceRemoveScrollEnabled={open}
        modal={modal}
        open={open}
        onOpenChange={setOpen}
        // snapPoints={snapPoints}
        // snapPointsMode={snapPointsMode}
        dismissOnSnapToBottom
        position={position}
        onPositionChange={setPosition}
        zIndex={100_000}
        animation="medium"
      >
        <Sheet.Overlay
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Sheet.Handle />
        <Sheet.Frame padding="$4" justifyContent="center" alignItems="center" space="$5">
          <InnerSheet item={currentTransaction} />
        {/* <View style={styles.btnGroup}>
            <Button button_text="Buy" backColor={COLORS.success} screenName={"BuyCoinScreen"} name={ currentTransaction.name } price={ currentTransaction.currentPrice } symbol={ currentTransaction.coin } imgSrc={ currentTransaction.imgSrc }/>
            <Button button_text="Sell" backColor={COLORS.red} screenName={"SellCoinScreen"} name={ currentTransaction.name } price={ currentTransaction.currentPrice } symbol={ currentTransaction.coin } imgSrc={ currentTransaction.imgSrc } />
        </View> */}
        </Sheet.Frame>
      </Sheet>
            <ScrollView>

            {
                transactions.slice(0).reverse().map((item,index)=>(
                    <View key={index}>
                    {    
                    item.type == "Buy"
                    ? <BuyItem name={item.name} date={item.date} type={item.type} coin={item.coin} quantity={item.quantity} currentPrice={item.currentPrice} imgSrc={item.imgSrc} setOpen={setOpen} setCurrentTransaction={setCurrentTransaction} />
                    : <SellItem name={item.name} date={item.date} type={item.type} coin={item.coin} quantity={item.quantity} currentPrice={item.currentPrice} imgSrc={item.imgSrc} setOpen={setOpen} setCurrentTransaction={setCurrentTransaction} />
                }
                    </View>
                ))
            }
            </ScrollView>
        </View>
    );
}
function InnerSheet({item})
{
    return(
        <View style={styles.innerSheetContainer}>
            <View style={styles.item}>
                <SizableText size="$4" style={styles.propertyName}>Coin</SizableText>
                <View style={{ flexDirection: 'row' }} >
                    <View style={{ width: 20, height: 20 }}>
                        {/* <Octicons name="download" size={24} color={COLORS.success} /> */}
                        <Image
                            source={{
                                uri: item.imgSrc
                            }}
                            style={styles.imgStyle}
                            />
                    </View>
                <SizableText size="$5" style={{ marginLeft: 5 }} >{item.name}</SizableText>
                </View>
            </View>
            <View style={styles.item}>
                <SizableText size="$4" style={styles.propertyName}>Order</SizableText>
                <SizableText size="$5" fontWeight={"700"} style={{ color: item?.type?.toLowerCase() == "buy" ? COLORS.success : COLORS.red }}>{item?.type?.toUpperCase()}</SizableText>
            </View>
            <View style={styles.item}>
                <SizableText size="$4" style={styles.propertyName}>Status</SizableText>
                <SizableText size="$5">{"Completed"}</SizableText>
            </View>
            <View style={styles.item}>
                <SizableText size="$4" style={styles.propertyName}>Price</SizableText>
                <SizableText size="$5">₹{item.currentPrice}</SizableText>
            </View>
            <View style={styles.item}>
                <SizableText size="$4" style={styles.propertyName}>Quantity</SizableText>
                <SizableText size="$5">{item.quantity} { item.coin }</SizableText>
            </View>
            <View style={styles.item}>
                <SizableText size="$4" style={styles.propertyName}>Created At</SizableText>
                <SizableText size="$5">{item.date}</SizableText>
            </View>
            <View style={{...styles.item, borderBottomWidth: 0 }}>
                <SizableText size="$4" fontWeight={"700"} style={styles.propertyName}>Total</SizableText>
                <SizableText size="$5" fontWeight={"700"}>₹{parseFloat(item.quantity) * parseFloat(item.currentPrice)}</SizableText>
            </View>
        </View>
    );
}
function BuyItem({ name,date,type,coin,quantity, imgSrc, currentPrice, setOpen, setCurrentTransaction }) {
    return (
        <TouchableOpacity onPress={() => {
            console.log("Pressed...");
            setOpen(true);
            setCurrentTransaction({
                name,
                date,
                type,
                coin,
                quantity,
                imgSrc,
                currentPrice,
                setOpen,
                setCurrentTransaction
            })
        }}>
            <View style={styles.row}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{...styles.iconStyle,backgroundColor: COLORS.lightGreen }}>
                        {/* <Octicons name="download" size={24} color={COLORS.success} /> */}
                        <Image
                            source={{
                                uri: imgSrc
                            }}
                            style={styles.imgStyle}
                        />
                    </View>
                    <View style={{ marginLeft: 10 }} >
                        <SizableText size="$4" fontWeight={"900"} style={{color: COLORS.success}}>Buy</SizableText>
                        <SizableText size="$5" fontWeight={"600"} >{name}</SizableText>
                        <SizableText size={"$2"} style={{color: COLORS.grayDark }}>{ date!= null ? date : "29/11/2022 11:22AM" }</SizableText>
                    </View>
                </View>
                <View style={styles.quantityStyle}>
                    <Text style={{ marginRight: 10, fontSize: 16 }} >{ parseFloat(quantity)?.toFixed(2) } { coin }</Text>
                    <FontAwesome name="angle-right" size={22} color={COLORS.gray}/>
                </View>
            </View>
        </TouchableOpacity>
    );
}
function SellItem({ name,date,type,coin,quantity, imgSrc, currentPrice, setOpen, setCurrentTransaction }) {

    return (
        <TouchableOpacity onPress={() => {
            setOpen(true);
            setCurrentTransaction({
                name,
                date,
                type,
                coin,
                quantity,
                imgSrc,
                currentPrice,
                setOpen,
                setCurrentTransaction
            })
        }} 
        >
            <View style={styles.row}>
                
                <View style={{ flexDirection: 'row' }}>
                    <View style={{...styles.iconStyle,backgroundColor: COLORS.lightRed }}>
                        {/* <Octicons name="upload" size={24} color={COLORS.red} /> */}
                        <Image
                            source={{
                                uri: imgSrc
                            }}
                            style={styles.imgStyle}
                        />
                    </View>
                    <View style={{ marginLeft: 10 }} >
                        <SizableText size="$4" fontWeight={"900"} style={{color:COLORS.red }}>Sell</SizableText>
                        <SizableText size="$5" fontWeight={"600"} >{name}</SizableText>
                        <SizableText size={"$2"} style={{color: COLORS.grayDark }}>{ date!= null ? date : "29/11/2022 11:22AM" }</SizableText>
                    </View>
                </View>
                <View style={styles.quantityStyle}>
                    <Text style={{ marginRight: 10, fontSize: 16 }} >{ parseFloat(quantity).toFixed(2) } { coin }</Text>
                    <FontAwesome name="angle-right" size={22} color={COLORS.gray}/>
                </View>
            </View>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    innerSheetContainer:{
        flex: 1,
        width: '100%',
    },
    
    item:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        // borderWidth: 1,
        paddingVertical: 5,
        marginHorizontal: 5,
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.grayLight,
    },
    propertyName:{
        color: COLORS.grayDark,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // borderWidth: 1,
        paddingVertical: 10,
        marginHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.grayLight,
    },
    imgStyle:{
        width: "100%",
        height:  "100%",
        borderRadius: 50,
        marginTop: 3
    },
    iconStyle: {
        width: 38,
        height: 38,
        borderRadius: 100,
        marginLeft: 5,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    quantityStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default TransactionHistoryScreen;