import { collection, doc, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import app from "../firebaseConfig";

function DetailLearningScreen({ route }){
    const [ heading, setHeading ] = useState(route.params.mainHeading);
    const [ subHeading, setSubheading ] = useState(route.params.subHeading);
    const [ chaptersLength, setChaptersLength ] = useState(1);

    async function getSubheadingData(){
        
    const db = getFirestore(app);
    
    const detail_page_description_data = await getDocs(collection(db, "testing","demo1", subHeading));
    // console.log(JSON.stringify(detail_page_description_data));
    setChaptersLength(detail_page_description_data.size);
    console.log("Chapters: "+detail_page_description_data.size);
    console.log(detail_page_description_data);
    detail_page_description_data.forEach((doc1) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc1.id, " => ", doc1.data());
      });
    }
    useEffect(()=>{
        console.log(route.params.mainHeading);
        console.log(route.params.subHeading);
        getSubheadingData();
    },[]);
    return(
        <View>
            <Text>Detail Learning Screen</Text>
        </View>
    );
}
export default DetailLearningScreen;