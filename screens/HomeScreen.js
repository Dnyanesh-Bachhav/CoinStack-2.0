import React,{useContext, useEffect,useRef,useState} from "react";
import {View,Text,StyleSheet,ScrollView,TouchableOpacity, Modal} from 'react-native';
import Banner from "../components/HomeScreen/Banner";
import Header from '../components/Header';
import MainLists from "../components/MainLists";
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import NoInternetScreen from "./NoInternetScreen";
import Carousel from 'react-native-snap-carousel';
import PortfolioContextProvider from "../Contexts/PortfolioContext";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthContext } from "../Contexts/AuthProviderContext";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import app from "../firebaseConfig";
import LottieView from 'lottie-react-native';
import { COLORS } from "../components/constants";
function HomeScreen({navigation}){
    const [connected,setConnected] = useState(true);
    const { user, firestoreUser, setFirestoreUser } = useContext(AuthContext);
    const [ loading, setLoading ] = useState(false);
    const animationRef = useRef(null);

    const checkConnection = async ()=>{
        const data = await NetInfo.fetch();

        setConnected(data.isConnected);
    }
        
    const ModalPopUp = ({ visible, children }) => {
        return (
          <Modal transparent visible={loading} style={{ width: '100%', height: '100%' }} animationType="fade">
            <View style={styles.modalContainer}>
              <View style={styles.modalData}>{children}</View>
            </View>
            
          </Modal>
        );
      };

    async function getUserdataFirestore(){
        setLoading(true);
        const db = getFirestore(app);
        const collection_ref = collection(db, "users");
        const userdata = await getDoc(doc(collection_ref, user.uid));
        console.log(JSON.stringify(userdata.data()));
        setFirestoreUser(userdata.data());
        setLoading(false);
    }
    useEffect(()=>{
        checkConnection();
        getUserdataFirestore();
    },[]);
    const Drawer = createDrawerNavigator();
    return(
        <>
        
            { 
                connected ? 
                    <View style={styles.container}>
                        <Header navigation={navigation} />
                        
                <ModalPopUp visible={loading}>
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
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Banner/>
                            <MainLists/>
                        </ScrollView>
                    </View>
                : <NoInternetScreen/>
            }
        </>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        height: '100%',
        marginBottom: 10,
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

})
export default HomeScreen;