import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../components/constants";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { Info, XSquare } from "@tamagui/lucide-icons";
import { Modal, Portal } from "react-native-paper";
import { useEffect, useRef, useState } from "react";
import { SizableText } from "tamagui";
import { generatePortfolio } from "../components/portfolio_generation.js";
import { FontAwesome } from '@expo/vector-icons';
import { getWatchlistedCoins } from "../Services/requests";
import LottieView from 'lottie-react-native';

function GeneratedPortfolioScreen({ route }){
    const navigation = useNavigation();
    // Modal Hooks
    const [visible, setVisible] = useState(false);
    const animationRef = useRef(null);
    const APIData = useRef();
    const [portfolio, setPortfolio] = useState();
    const [keys, setKeys] = useState("");
    const [loading, setLoading] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const getCoinsData = async()=>{
        if (loading) {
            return;
          }
          setLoading(true);
          const portfolioCoinsAPIData = await getWatchlistedCoins(1, keys);
          APIData.current = portfolioCoinsAPIData;
          setLoading(false);
    }
    useEffect(()=>{
        const data = generatePortfolio( route.params.amount, route.params.risk.toUpperCase());
        // console.log("Data: ");
        // console.log(data, route.params.amount, route.params.risk.toUpperCase());
        let array = [];
        let keys = [];
        data.forEach((value, key)=>{
            array.push([key,value]);
            keys.push(key);
        });
        keys = keys.join("%2C");
        setKeys(keys);
        console.log(keys);
        getCoinsData().then(()=>{
            console.log(APIData.current[0]);
            // for(let i=0;i<APIData.current.length;i++)
            // {
            //     array[i][1].imgSrc = APIData.current[i].image;
            //     array[i][1].name = APIData.current[i].name;
            // }
            APIData.current.forEach((item,index)=>{
                array[index][1].imgSrc = item.image;
                array[index][1].name = item.name;
            })

        })
        console.log(typeof data);
        
        console.log(array);
        setPortfolio(array);
    },[]);
    return(
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={()=>{
                        navigation.goBack();
                    }} >
                    <AntDesign name="arrowleft" size={24} color={COLORS.white} />
                    </TouchableOpacity>
                    <Text style={{color: COLORS.white,fontSize: 21,marginLeft: 10}}>Generated Portfolio</Text>
                </View>
                <Info
                // size={"$1"}
                onPress={()=>{
                    showModal();
                }}
                style={{ color: COLORS.white, marginRight: 10, fontSize: 12, alignItems: 'flex-end' }}
                />
            </View>
            <View style={styles.contentContainer}>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalStyle}>
                    <Image
                    source={require("../assets/info.png")}
                    style={{width: "100%", top: 0 }}
                    />
                    <View style={{ paddingHorizontal: 10, marginTop: 10 }} >
                        <SizableText size={"$6"} fontWeight={"bold"} >Information</SizableText>
                        <SizableText style={{ color: COLORS.grayDark }} >Please remember to conduct your own research before making any investment decisions. The portfolio provided is for assistance purposes only.</SizableText>
                    </View>
                    
                <TouchableOpacity style={styles.btnStyle} onPress={()=>{
                    console.log("Clicked...");
                    hideModal();
                }} >
                    <SizableText size={"$5"} fontWeight={"600"} style={{ color: COLORS.white, textAlign: 'center' }}>Got it</SizableText>
                </TouchableOpacity>
                </Modal>
            </Portal>
            {
                !loading && portfolio!=null ?
                <FlatList
                data={portfolio}
                renderItem={({item, index})=>(
                    <TouchableOpacity onPress={() => {
                        console.log("Pressed...");
                        
                    }}>
                        <View style={styles.row}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{...styles.iconStyle,backgroundColor: COLORS.white }}>
                                    {/* <Octicons name="download" size={24} color={COLORS.success} /> */}
                                    <Image
                                        source={{
                                            uri: item[1].imgSrc
                                        }}
                                        style={styles.imgStyle}
                                    />
                                </View>
                                <View style={{ marginLeft: 10 }} >
                                    <SizableText size="$5" fontWeight={"600"} >{ item[1].name }</SizableText>
                                    <SizableText size={"$2"} style={{color: COLORS.grayDark }}>{ "Percentage: "+item[1].percentage + "%" }</SizableText>
                                </View>
                            </View>
                            <View style={styles.quantityStyle}>
                                <Text style={{ marginRight: 10, fontSize: 16 }} >₹{ item[1].amount }</Text>
                                <FontAwesome name="angle-right" size={22} color={COLORS.gray}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                    )}
                    />
                    :
                    <Portal>
                <Modal visible={true} onDismiss={hideModal} contentContainerStyle={styles.modalStyle2}>
                        <LottieView
                            ref={animationRef}
                            style={{
                                    width: '80%',
                                    height: '90%',
                                    // borderWidth: 1,
                                    alignSelf: 'center',
                                    color: COLORS.primary,
                            }}
                            autoPlay
                            loop
                            source={require('../assets/Processing - 2.json')}
                        />
                        <SizableText style={{ position: 'absolute', bottom: 10, fontSize: 16 }} >Processing</SizableText>
                </Modal>
            </Portal>
                }

            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    headerContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingLeft: 10,
        backgroundColor: COLORS.primary,
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
    btnStyle:{
        width: '70%',
        alignSelf: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 5,
        // marginTop: 15,
        bottom: 10,
        position: 'absolute',
        elevation: 5
    },

    contentContainer:{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 5
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
    },
    modalStyle:{
        width: "92%",
        height: "57%",
        alignSelf: 'center',
        justifyContent: 'flex-start',
        backgroundColor: COLORS.white,
        borderRadius: 10,
        // padding: 10,
        overflow: 'hidden',
        // padding: 20,
      },
      modalStyle2:{
        width: "65%",
        height: "21%",
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 10,
        elevation: 10,
        // padding: 20,
      }
})
export default GeneratedPortfolioScreen;