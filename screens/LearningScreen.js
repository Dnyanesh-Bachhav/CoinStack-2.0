import { ActivityIndicator, Alert, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../components/constants";
import { H3, Paragraph, SizableText, Square } from "tamagui";
import { ResizeMode, Video } from "expo-av";
import { useCallback, useEffect, useRef, useState } from "react";
import { Accordion } from "tamagui";
import { ChevronDown } from "@tamagui/lucide-icons";
import { Progress } from "tamagui";
import Header from "../components/LearningScreen/Header";
import app from "../firebaseConfig";
import { collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import YoutubePlayer from "react-native-youtube-iframe";
import LottieView from 'lottie-react-native';
import { Modal } from "react-native";
import { Circle } from "tamagui";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = WIDTH/1.9;

function LearningScreen() {
  const video = useRef();
  const animationRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const navigation = useNavigation();
  var currentKey = [];
  var currentSubHeadings = [];
  const [ courseDescription, setCourseDescription ] = useState(null);
  const [ curriculum, setCurriculum ] = useState(null);
  var key = "", value = [];

  async function getFirestoreData(){
    setLoading(true);
    const db = getFirestore(app);
    // Get Access to course collection
    const collection_ref = collection(db, "course");
    // Get course description data i.e. needed on landing screen
    const course_description_data = await getDoc(doc(collection_ref,"description"));
    console.log(JSON.stringify(course_description_data.data()));
    setCourseDescription(course_description_data.data());
    // Get Curriculum list
    const curriculum = await getDoc(doc(collection_ref,"curriculum"));
    console.log(JSON.stringify(curriculum.data()));
    setCurriculum(curriculum.data().data);
    setLoading(false);
  }
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const ModalPopUp = ({ visible, children }) => {
    return (
      <Modal transparent visible={visible} style={{ width: '100%', height: '100%' }} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalData}>{children}</View>
        </View>
        
      </Modal>
    );
  };


  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  useEffect(()=>{
    console.log("In a Learning Screen...");
    getFirestoreData();
  },[]);
  return (
    <View style={styles.container}>
      {/* <H3>Learn Crypto Trading</H3> */}
      <Header title={courseDescription?.title} />
      {/* <ModalPopUp visible={loading}>
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
                </ModalPopUp> */}

      {!loading ? (
        <View style={styles.contentContainer}>
          <ScrollView
            style={{ marginBottom: 20 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Video Section */}
            {/* <Video
              ref={video}
              style={styles.videoStyle}
              source={{
                uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
              }}
              isLooping={true}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
            /> */}
            <YoutubePlayer
              height={210}
              style={{ borderWidth: 1 }}
              play={playing}
              videoId={courseDescription?.video_id}
              onChangeState={onStateChange}
            />
            {/* ABOUT SECTION */}
            <SizableText
              fontFamily={"$body"}
              size={"$6"}
              fontWeight={800}
              // style={{ marginTop: 10 }}
            >
              About
            </SizableText>
            <Paragraph>{courseDescription?.about}</Paragraph>
            {/* COURSE CONTENT */}
            <SizableText
              fontFamily={"$body"}
              size={"$6"}
              fontWeight={800}
              style={{ marginTop: 10 }}
            >
              Course Content
            </SizableText>
            <Accordion
              overflow="hidden"
              type="multiple"
              style={{ width: "100%", borderRadius: 10, paddingBottom: 40 }}
            >
              {curriculum?.map((item, index) => (
                <Accordion.Item
                  value={`"a"${index + 1}`}
                  style={{ marginTop: 5, elevation: 5 }}
                  key={index}
                >
                  {console.log(Object.entries(item))}
                  <Accordion.Trigger
                    flexDirection="row"
                    justifyContent="space-between"
                    style={{
                      elevation: 5,
                    }}
                  >
                    {({ open }) => (
                      <View style={{ width: "100%", elevation: 5 }}>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                          <View style={{ flexDirection: "row" }}>
                            <Circle
                              size={25}
                              style={{ backgroundColor: COLORS.lightGreen, alignSelf: 'center', marginRight: 5  }}
                              // elevation="$1"
                            >
                              <Paragraph size={"$4"} fontWeight={"bold"}>
                                {index + 1}
                              </Paragraph>
                            </Circle>
                            <Paragraph size={"$5"} fontWeight={"bold"} style={{ marginLeft: 5, width: '80%' }}>
                              {Object.entries(item)[0][0]}
                            </Paragraph>
                          </View>
                          <View
                            style={{
                              backgroundColor: COLORS.primaryFaint,
                              borderRadius: 50,
                              width: 30,
                              height: 30,
                              justifyContent: "center",
                              alignItems: "center",
                              padding: 4,
                              borderWidth: 1,
                              borderColor: COLORS.gray,
                            }}
                          >
                            <Square
                              animation="quick"
                              rotate={open ? "180deg" : "0deg"}
                            >
                              <ChevronDown size="$1" />
                            </Square>
                          </View>
                        </View>
                        <Progress
                          size={"$2"}
                          value={60}
                          style={{
                            width: "100%",
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
                      </View>
                    )}
                  </Accordion.Trigger>
                  {Object.entries(item)[0][1].map((subHeading, index1) => (
                    <TouchableOpacity
                      onPress={() => {
                        console.log("Move to Detail Learning...");
                        navigation.navigate("DetailLearningScreen", {
                          mainHeading: Object.entries(item)[0][0],
                          subHeading: subHeading,
                        });
                      }}
                      key={index1}
                    >
                      <Accordion.Content
                        style={{
                          marginTop: 10,
                          width: "90%",
                          alignSelf: "flex-end",
                          elevation: 2,
                          borderRadius: 5,
                        }}
                      >
                        <Paragraph>{subHeading}</Paragraph>
                      </Accordion.Content>
                    </TouchableOpacity>
                  ))}
                </Accordion.Item>
              ))}

              {/* <Accordion.Item value="a2" style={{ marginTop: 10 }} >
            <Accordion.Trigger flexDirection="row" justifyContent="space-between">
              {({ open }) => (
                <View style={{ width: "100%", elevation: 10 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%" }} >
                      <Paragraph size="$5" >2. Introduction</Paragraph>
                      <View style={{ backgroundColor: COLORS.primaryFaint, borderRadius: 50, justifyContent: 'center', alignItems: 'center', padding: 4, borderWidth: 1, borderColor: COLORS.gray }} >
                          <Square animation="quick" rotate={open ? "180deg" : "0deg"}>
                              <ChevronDown size="$1" />
                          </Square>
                      </View>
                  </View>
                  <Progress size={"$2"} value={60} style={{ width: "100%", backgroundColor: COLORS.lightGreen, marginTop: 12 }} >
                    <Progress.Indicator animation="bouncy" style={{ color: COLORS.success, backgroundColor: "#51E445" }}  />
                  </Progress>
                </View>
              )}
            </Accordion.Trigger>
            <Accordion.Content style={{ marginTop: 10, width: '90%', alignSelf: 'flex-end' }} >
              <Paragraph>
              Cold showers can help reduce inflammation
              
              </Paragraph>
            </Accordion.Content>
          </Accordion.Item> */}
            </Accordion>
          </ScrollView>
        </View>
      ) : (
        <ModalPopUp visible={loading}>
          <View style={{ width: "100%", height: "100%" }}>
            <LottieView
              ref={animationRef}
              style={{
                width: "100%",
                height: "100%",
                alignSelf: "center",
                color: COLORS.primary,
              }}
              autoPlay
              loop
              source={require("../assets/Loading (1).json")}
            />
          </View>
        </ModalPopUp>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingBottom: 40
    // backgroundColor: COLORS.white,
  },
  videoStyle: {
    width: WIDTH ,
    height: HEIGHT,
    alignSelf: "center",
    aspectRatio: "16/9",
    marginTop: 5,
    // borderWidth: 1,
    borderRadius: 16,
  },
  contentContainer:{
    paddingVertical: 10,
    paddingHorizontal: 10,
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

});
export default LearningScreen;
