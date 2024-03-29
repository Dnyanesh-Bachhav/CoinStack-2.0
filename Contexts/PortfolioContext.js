import react,{ useState,useEffect, useContext,createContext} from "react";
export const portfolioContext = createContext();
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import app from "../firebaseConfig";
import { AuthContext } from "./AuthProviderContext";
function PortfolioContextProvider({children}){
    const[portfolioCoins,setPortfolioCoins] = useState([]);
    const { firestoreUser } = useContext(AuthContext);
    
    const db = getFirestore(app);
    const getPortfolioCoins = async ()=>{
        try{
            const jsonValue = await AsyncStorage.getItem("@portfolio_coins");
            setPortfolioCoins(jsonValue != null ? JSON.parse(jsonValue) : []);
        }catch(err){
            console.log("Context: "+err);
        }
    }
    const updateFirebasePortfolio = async()=>{
        const doc1 = doc(db,"users", firestoreUser?.email);
        const collectionRef = doc(collection(doc1, "portfolio"),"data");
        await setDoc(collectionRef, {coins: portfolioCoins}, { merge: true})
    }
    const updatePortfolioCoins = async(newList)=>{
        try{
            const jsonValue = JSON.stringify(newList);
            await AsyncStorage.setItem("@portfolio_coins",jsonValue);
            setPortfolioCoins(newList);
        }catch(err)
        {
            console.log("Error: "+err);
        }
    }
    const storePortfolioCoin = async (coinId)=>{
        try{
            const newList = [...portfolioCoins,coinId];
            const jsonValue = JSON.stringify(newList);
            await AsyncStorage.setItem("@portfolio_coins",jsonValue);
            setPortfolioCoins(newList);
        }catch(err){
            console.log("Context: "+err);
        }
    }
    const mergeCoin = async (coin)=>{
        const jsonValue = JSON.stringify(coin);
        console.log("Coin to update: "+ jsonValue);
        const data = await AsyncStorage.mergeItem("@portfolio_coins",jsonValue);
        console.log("Coin data: "+ data);
        setPortfolioCoins(data);
    }
    const removeAllCoins = async ()=>{
        const array1 = [];
        const jsonValue = JSON.stringify(array1);
        await AsyncStorage.setItem("@portfolio_coins",jsonValue);
        setPortfolioCoins(array1);
    }
    useEffect(()=>{
        getPortfolioCoins();
    },[]);
    return(
        <portfolioContext.Provider value={{portfolioCoins, setPortfolioCoins, storePortfolioCoin,removeAllCoins,mergeCoin,updatePortfolioCoins, updateFirebasePortfolio }} >
            {children}
        </portfolioContext.Provider>
    );
}
export default PortfolioContextProvider;