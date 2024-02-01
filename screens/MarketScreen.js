import react,{useEffect,useState,useContext,useRef} from "react";
import {View,Text,StyleSheet,FlatList,ActivityIndicator,RefreshControl,TouchableOpacity,Pressable,Modal } from 'react-native';
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
    const fetchData = async(pageNumber)=>{
        if(loading)
        {
            return;
        }
        setLoading(true);
        setVisible(true);
        console.log("PageNumber: "+pageNumber);
        const data = await getCoins(pageNumber);
        setCoinsData((existingData)=> ([...existingData,...data]));
        setLoading(false);
        setVisible(false);
    }
    const refetchData = async()=>{
        if(loading)
        {
            return;
        }
        setLoading(true);
        const data = await getCoins(1);
        setCoinsData(data);
        setLoading(false);
    }
    useEffect(()=>{
        checkConnection();
        fetchData();
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
                    !loading && coinsData ? (
                    <FlatList
                    data={coinsData}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item})=>(
                        <TouchableOpacity onPress={()=>{
                                setCurrentCoin(item);
                                console.log("Item clicked: ",item.name);
                                navigation.navigate("coinDetails",{
                                    coin: item.name,
                                    coinId: item.id,
                                    imgUrl: item.image,
                                    symbol: item.symbol,
                                    currentPrice: item.current_price,
                                  });
                                // refRBSheet.current.open();
                                
                            }} >
                                <CoinItem coinName={item.name} coinId={item.id} symbol={item.symbol} current_price={item.current_price} uri={item.image} price_change_percentage_24h={item.price_change_percentage_24h} />
                        </TouchableOpacity>
                    )}
                    
                    onEndReached={()=>
                        {
                            console.log("End: ");
                            fetchData((coinsData.length/50)+1);
                        }}
                    maxToRenderPerBatch={16}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={refetchData} />}
                    keyExtractor={()=>count++}
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