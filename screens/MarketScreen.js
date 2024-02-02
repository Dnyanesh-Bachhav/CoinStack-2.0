import react,{useEffect,useState,useContext,useRef, useCallback} from "react";
import {View,Text,StyleSheet,FlatList,ActivityIndicator,RefreshControl,TouchableOpacity,Pressable,Modal, Alert } from 'react-native';
import CoinItem from "../components/marketScreen/CoinItem";
import SearchBar from "../components/marketScreen/SearchBar";
import TableHeader from "../components/marketScreen/TableHeader";
import { getCoins } from "../Services/requests";
import NoInternetScreen from "./NoInternetScreen";
import NetInfo from '@react-native-community/netinfo';
import { portfolioContext } from '../Contexts/PortfolioContext';
import BottomSheet from "../components/marketScreen/BottomSheet";
import {useNavigation} from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Button from "../components/marketScreen/Button";
import {COLORS} from '../components/constants';
import Button1 from "../components/marketScreen/Button1";
import SheetComponent from "../components/marketScreen/BottomSheetItem";
import { FlashList } from "@shopify/flash-list";
import { Spinner, YStack } from "tamagui";
import LottieView from 'lottie-react-native';

function MarketScreen(){
    const refRBSheet = useRef();
    const navigation = useNavigation();
    const[currentCoin,setCurrentCoin] = useState({});
    const {portfolioCoins,storePortfolioCoin,mergeCoin,updatePortfolioCoins } = useContext(portfolioContext);
    console.log("Portfolio Coins: "+portfolioCoins);
    const [coinsData,setCoinsData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [connected,setConnected] = useState(true);
    const [componentHeight,setComponentHeight] = useState();
    const [visible, setVisible] = useState(false);
    const animationRef = useRef(null);
    const page = useRef(1);
    console.log("Data length: "+coinsData.length);
    const checkConnection = async ()=>{
        const data = await NetInfo.fetch();
        setConnected(data.isConnected);
    }
    
    
    const ModalPopUp = ({ visible, children }) => {
        return (
          <Modal transparent visible={visible} style={{ width: '100%', height: '100%' }} animationType="fade">
            <View style={styles.modalContainer}>
              <View style={styles.modalData}>{children}</View>
            </View>
            
          </Modal>
        );
      };


    let count = 0;
    const fetchData = useCallback(async(pageNumber)=>{
        if(loading)
        {
            return;
        }
        setLoading(true);
        setVisible(true);
        console.log("PageNumber: "+pageNumber);
        const data = await getCoins(pageNumber);
        console.log("Data it is: "+data);
        if(data.error!=null)
        {
            return (
                Alert.alert('Network Error', 'There is something wrong with network or API response...', [
                    
                    {text: 'OK', onPress: () =>
                        {
                            setLoading(false);
                            setVisible(false);
                            console.log('OK Pressed')
                        },
                    }
                  ])
            );
        }
        console.log("Ok...");
        setCoinsData((existingData)=> [...existingData,...data]);
        setLoading(false);
        setVisible(false);
    },[]);
    const refetchData = useCallback(async()=>{
        if(loading)
        {
            return;
        }
        setLoading(true);
        const data = await getCoins(1);
        setCoinsData(data);
        setLoading(false);
    },[page.current]);
    useEffect(()=>{
        checkConnection();
        fetchData(1);
    },[]);
    return(
        <>
        {
            connected ? (
            <View style={styles.container}>
                <SearchBar refRBSheet={refRBSheet} setCurrentCoin={setCurrentCoin} />
                
                <TableHeader/>
                <ModalPopUp visible={visible}>
                    <View style={{ width: '100%', height: '100%' }} >
                        <LottieView
                            ref={animationRef}
                            style={{
                                    width: '100%',
                                    height: '100%',
                                    alignSelf: 'center',
                                    color: COLORS.primary,
                            }}
                            autoPlay
                            loop
                            source={require('../assets/Loading (1).json')}
                        />
                    </View>
                </ModalPopUp>

                {
                    !loading && (coinsData!=null) ? (
                    <FlatList
                    data={coinsData}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item})=>(
                        <CoinItem coinName={item.name} coinId={item.id} symbol={item.symbol} current_price={item.current_price} uri={item.image} price_change_percentage_24h={item.price_change_percentage_24h} />
                    )}
                    // ListFooterComponent={()=>(
                    //     <Text onPress={()=>{
                            
                    //     fetchData((coinsData.length/50)+1);
                    //     }} >Load more</Text>
                    // )}
                    onEndReached={()=> {
                        if(!loading)
                        {
                            console.log("End of a list...");
                            page.current = (coinsData.length/50)+1;
                            fetchData((coinsData.length/50)+1);
                        }
                        else{
                            return <ActivityIndicator size={"large"} color={COLORS.black} />
                        }
                    }}
                    onEndReachedThreshold={16}
                    maxToRenderPerBatch={16}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={()=>{
                        setPage(1);    
                        refetchData();
                    }} />}
                    keyExtractor={(item, index)=>`${item.id}-${index}`}
                    // debug={true}
                    />
                    // <FlashList
                    // data={coinsData}
                    // showsVerticalScrollIndicator={false}
                    // renderItem={({item,index})=>(
                    //     <TouchableOpacity onPress={()=>{
                    //             setCurrentCoin(item);
                    //             refRBSheet.current.open();                           
                    //         }} key={index}>
                    //             <CoinItem coinName={item.name} symbol={item.symbol} current_price={item.current_price} uri={item.image} price_change_percentage_24h={item.price_change_percentage_24h}  />
                    //     </TouchableOpacity>
                    // )}
                    // onEndReached={()=>fetchData((coinsData.length/50)+1)}
                    // // maxToRenderPerBatch={16}
                    // refreshControl={<RefreshControl refreshing={loading} onRefresh={refetchData} />}
                    // keyExtractor={()=>count++}
                    // estimatedItemSize={500}
                    // />
                    )
                    // : <ActivityIndicator/>
                    : 
                    
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                        <LottieView
                            ref={animationRef}
                            style={{
                                    width: '40%',
                                    height: '40%',
                                    alignSelf: 'center',
                                    color: COLORS.primary,
                            }}
                            autoPlay
                            loop
                            source={require('../assets/Loading (1).json')}
                        />
                    </View>
                }
                
            </View>)
            : <NoInternetScreen/>
        }
        </>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: COLORS.white,
    },
    
    reportItem:{
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray,
        marginBottom: 16,
        paddingBottom: 4
    },
    modalContainer: {
        // flex: 1,
        width: '100%',
        height: '100%',
        // borderWidth: 2,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
      },
      modalData: {
        width: "65%",
        height: "16%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 10,
        elevation: 10,
      },
      modalHeader: {
        width: "100%",
        alignItems: "flex-end",
      },
});
export default MarketScreen;