import { collection, doc, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState, useCallback } from "react";
import { Text, View, StyleSheet, FlatList, Dimensions, Image, TouchableOpacity, ScrollView, Linking, Alert } from "react-native";
import app from "../firebaseConfig";
import { ListItem, Progress, SizableText } from "tamagui";
import Header from "../components/DetailLearningScreen/Header";
import { COLORS } from "../components/constants";
import { useNavigation } from "@react-navigation/native";
import { Check, Link, Moon } from "@tamagui/lucide-icons";
import RenderHTML from "react-native-render-html";
import YoutubePlayer from "react-native-youtube-iframe";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = WIDTH/1.9;

function DetailLearningScreen({ route }) {
  const [heading, setHeading] = useState(route.params.mainHeading);
  const [subHeading, setSubheading] = useState(route.params.subHeading);
  const [chaptersLength, setChaptersLength] = useState(1);
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState([]);
  const navigation = useNavigation();
  const [ progress, setProgress ] = useState(0);
  const [playing, setPlaying] = useState(false);
  let chapterRef = null;

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  async function getSubheadingData() {
    setLoading(true);
    const db = getFirestore(app);
    
    const detail_page_description_data = await getDocs(
      collection(db, "course", "chapter_data", subHeading)
    );
    // console.log(JSON.stringify(detail_page_description_data));
    setChaptersLength(detail_page_description_data.size);
    console.log("Chapters: " + detail_page_description_data.size);
    // console.log(detail_page_description_data);
    // console.log(typeof detail_page_description_data);
    
    let array = [];
    detail_page_description_data.forEach((doc1) => {
      // doc.data() is never undefined for query doc snapshots
      // let array = [];
      const dataItem = {
        subHeading: doc1.id,
        content: doc1.data(),
      };
      array.push(dataItem);
      // setListData(old=> [...old, dataItem]);
      console.log(doc1.id, " => ", doc1.data());
    });
    // for(let i=listData.length-1;i>=0;i--)
    // {
    //   array.push(listData[i]);
    // }
    setListData(array?.reverse());
    // console.log(array);
    setLoading(false);
  }
  function handleNextOnClick(index){
    setProgress((index+1/chaptersLength) * 100);
    try{
      chapterRef.scrollToIndex({ animated: true, index: index+1});
    }
    catch(e)
    {
      console.log(e);
      navigation.navigate("LearningScreen");
    }
  }
  useEffect(() => {
    console.log(route.params.mainHeading);
    console.log(route.params.subHeading);
    getSubheadingData();
  }, []);
  return (
    <View style={styles.container}>
      <Header mainHeading={route.params.mainHeading} />
      <View style={styles.contentContainer}>
        <Progress
          value={progress}
          style={{
            width: "90%",
            alignSelf: 'center',
            backgroundColor: COLORS.lightGreen,
            marginTop: 12,
          }}
        >
          <Progress.Indicator
            animation="bouncy"
            style={{
              color: COLORS.success,
              backgroundColor: "#51E445",
            }}
          />
        </Progress>
        {/* <SizableText>Detail Learning Screen</SizableText> */}
        <FlatList
          data={listData}
          horizontal={true}
          pagingEnabled
          ref={(ref) => {
            chapterRef = ref;
          }}
          // inverted={true}
          // getItemLayout={(data, index) => ({
          //   length: WIDTH*0.94,
          //   offset: WIDTH * index,
          //   index,
          // })}
          renderItem={({ item, index }) => (
            // <ScrollView style={{ height: '100%' }} >

            <View style={styles.listItem}>
              <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 20 }} >
                <SizableText size={"$5"} fontWeight={"bold"}>
                  {item.subHeading}
                </SizableText>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }} >

                  <SizableText style={{ color: COLORS.grey }}>
                    {item?.content?.time_to_read} min
                  </SizableText>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.success, color: COLORS.white }} >
                  <Check size="$1" color={COLORS.white} />
                  <SizableText color={COLORS.white} style={{ padding: 4,  }}>{item?.content?.XP} XP</SizableText>
                </View>
                </View>
                {
                  item?.content?.Is_Image ?
                  <View
                    style={{
                      width: WIDTH * 0.96,
                      height: HEIGHT,
                      justifyContent: "center",
                      alignItems: "cent?er",
                      alignSelf: "center",
                    }}
                  >
                    <Image
                      style={styles.imgStyle}
                      source={{
                        uri: item?.content?.img_url,
                      }}
                    />
                  </View>
                  : <YoutubePlayer
                  height={210}
                  style={{ borderWidth: 1 }}
                  play={playing}
                  videoId={item?.content?.video_url}
                  onChangeState={onStateChange}
                />
                }
                <View>
                <RenderHTML style={{ marginTop: 10 }} contentWidth={ WIDTH } source={{ html: !item?.content?.description ?
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam iusto doloremque dolores quis dolorum soluta id molestiae facere cumque ullam repellat ex, maiores perspiciatis? Reiciendis magnam quas possimus nemo at. Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui obcaecati cum explicabo est, suscipit architecto nam earum. Recusandae expedita iure consectetur sed nihil possimus, nisi optio alias sunt vel ducimus!"
                        : `${item?.content?.description} `
                      }}
                      />
                      </View>
                <SizableText size={"$5"} fontWeight={"bold"}>Links:</SizableText>
                {
                  Object.entries(item?.content?.links).map(([key, val])=>(
                    <ListItem hoverTheme icon={Link} style={{ marginTop: 10, elevation: 2, borderRadius: 5, width: '98%', alignSelf:'flex-end', marginRight: 4 }}  onPress={async ()=>{
                      const supported = await Linking.canOpenURL(val);
                      if (supported) {
                        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                        // by some browser in the mobile
                        await Linking.openURL(val);
                      } else {
                        Alert.alert(`Don't know how to open this URL: ${val}`);
                      }
                    }}>
                    {key}
                  </ListItem>
                  ))
                }
                <TouchableOpacity
                  onPress={() => {
                    handleNextOnClick(index);
                  }}
                  style={styles.btnStyle}
                >
                  <Text
                    style={{
                      color: COLORS.white,
                      fontSize: 24,
                      paddingHorizontal: 10,
                      paddingVertical: 7,
                      elevation: 5,
                      textAlign: "center",
                    }}
                  >
                    Next
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
            // </ScrollView>
          )}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    // backgroundColor: COLORS.white,
    width: WIDTH,
    height: '100%'
  },
  contentContainer:{
    height: '100%',
    marginTop: 10,
    // paddingHorizontal: 15,
  },
  btnStyle:{
    backgroundColor: COLORS.primary,
    width: '100%',
    marginTop: 10,
    // marginBottom: 40,
    borderRadius: 5,
    position: 'sticky',
    bottom: 0,
    alignSelf: 'center',
  },
  listItem:{
    width: Dimensions.get("window").width,
    height: '100%',
    marginBottom: 40,
    // marginRight: 15,
    // alignSelf: 'center',
    padding: 10,
    // marginBottom: 40,
    paddingBottom: 40
    // borderWidth: 1,
  },
  imgStyle:{
    width: '94%',
    height: '100%',
    alignSelf: "center",
    // aspectRatio: "16/9",
    marginTop: 5,
    borderWidth: 2,
    borderRadius: 16,
    resizeMode: 'contain'
  }
})
export default DetailLearningScreen;
