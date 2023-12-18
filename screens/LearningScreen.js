import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../components/constants";
import { H3, Paragraph, SizableText, Square } from "tamagui";
import { ResizeMode, Video } from "expo-av";
import { useRef } from "react";
import { Accordion } from "tamagui";
import { ChevronDown } from "@tamagui/lucide-icons";
import { Progress } from "tamagui";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = WIDTH/1.9;

function LearningScreen() {
  const video = useRef();
  return (
    <View style={styles.container}>
      <H3>Learn Crypto Trading</H3>
      <ScrollView style={{ marginBottom: 10 }} showsVerticalScrollIndicator={ false }>
      {/* Video Section */}
      <Video
        ref={video}
        style={styles.videoStyle}
        source={{
          uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        }}
        isLooping={true}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
      />
      {/* ABOUT SECTION */}
      <SizableText fontFamily={"$body"} size={"$6"} fontWeight={800} style={{ marginTop: 10 }} >
        About
      </SizableText>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hello ad nam
        qui, alias iste, cum expedita cupiditate quibusdam et perspiciatis
        placeat.orem ipsum dolor sit amet consectetur adipisicing elit. Impedit
        quae omnis quibusdam voluptatibus veritatis iusto nobis sint dolores
        culpa laboriosam{" "}
      </Paragraph>
      {/* COURSE CONTENT */}
      <SizableText fontFamily={"$body"} size={"$6"} fontWeight={800} style={{ marginTop: 10 }} >
        Course Content
      </SizableText>
        <Accordion overflow="hidden" type="multiple" style={{ width: "100%", borderRadius: 10 }}>
          <Accordion.Item value="a1">
            <Accordion.Trigger flexDirection="row" justifyContent="space-between">
              {({ open }) => (
                <View style={{ width: "100%", elevation: 10 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%" }} >
                      <Paragraph size="$5" >1. Introduction</Paragraph>
                      <View style={{ backgroundColor: COLORS.lightGreen, borderRadius: 50, justifyContent: 'center', alignItems: 'center', padding: 4, borderWidth: 1, borderColor: COLORS.gray }} >
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
              12Cold showers can help reduce inflammation
                fatigue.
              </Paragraph>
            </Accordion.Content>
            <Accordion.Content style={{ marginTop: 10, width: '90%', alignSelf: 'flex-end' }} >
              <Paragraph>
              12Cold showers can help reduce inflammation
                fatigue.
              </Paragraph>
            </Accordion.Content>
            <Accordion.Content style={{ marginTop: 10, width: '90%', alignSelf: 'flex-end' }} >
              <Paragraph>
              12Cold showers can help reduce inflammation
                fatigue.
              </Paragraph>
            </Accordion.Content>
            <Accordion.Content style={{ marginTop: 10, width: '90%', alignSelf: 'flex-end' }} >
              <Paragraph>
              12Cold showers can help reduce inflammation
                fatigue.
              </Paragraph>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="a2" style={{ marginTop: 10 }} >
            <Accordion.Trigger flexDirection="row" justifyContent="space-between">
              {({ open }) => (
                <View style={{ width: "100%", elevation: 10 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%" }} >
                      <Paragraph size="$5" >2. Introduction</Paragraph>
                      <View style={{ backgroundColor: COLORS.lightGreen, borderRadius: 50, justifyContent: 'center', alignItems: 'center', padding: 4, borderWidth: 1, borderColor: COLORS.gray }} >
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
          </Accordion.Item>
        </Accordion>
      </ScrollView>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
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
});
export default LearningScreen;
