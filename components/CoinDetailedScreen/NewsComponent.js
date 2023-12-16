import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SizableText, Image, YStack } from "tamagui";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../constants";
import { useEffect, useState } from "react";
import { getAllNews } from "../../Services/requestsNewsApi";
import { Spinner } from "tamagui";
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";

const WIDTH = Dimensions.get("window").width;
function NewsComponent({ coinName }) {
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(null);
  async function getNewsData() {
    setLoading(true);
    const data = await getAllNews(coinName);
    console.log(data.articles[0] );
    setNewsData([data.articles[0], data.articles[1], data.articles[2]]);
    setLoading(false);
  }
  const navigation = useNavigation();
  useEffect(() => {
    getNewsData();
  }, []);
  return (
    <View style={styles.container}>
      {loading ? (
        <YStack padding="$3" space="$4" alignItems="center">
          <Spinner size="large" color="$green10" />
        </YStack>
      ) : (
        // <View></View>
        <FlashList
          data={newsData}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>{
                navigation.navigate("DetailNews",{
                    sourceName : item.source.name,
                    imageUrl : item.urlToImage,
                    title: item.title,
                    author: item.author,
                    description: item.description,
                    url: item.url,
                    publishedAt : item.publishedAt,
                    content : item.content

                })
            }} style={{  }} >

            <View style={styles.NewsContainer}>
              <View style={styles.imgContainer}>
                <Image
                  source={{
                    uri: item?.urlToImage,
                  }}
                //   width="100%"
                  height="100%"
                  style={{
                    resizeMode: "cover",
                    borderRadius: 10,
                    // marginLeft: 40
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: 5,
                  alignSelf: 'center',
                }}
              >
                <SizableText
                  style={{ flexWrap: "wrap",}}
                  numberOfLines={3}
                  adjustsFontSizeToFit={true}
                >
                  { item?.title }
                </SizableText>
              </View>
            </View>
            </TouchableOpacity>

          )}
          estimatedItemSize={114}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: WIDTH,
    marginHorizontal: 10,
    marginBottom: 50,
    marginTop: 10
    // marginVertical: 10
  },

  imgContainer: {
    width: 100,
    height: 100,
    padding: 2,
    alignSelf: 'flex-start'
  },

  NewsContainer: {
    flexDirection: "row",
    // borderWidth: 1,
    width: '97%',
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    marginTop: 5,
    marginBottom: 10,
    paddingRight: 100,
    borderRadius: 10,
    padding: 4,
    overflow: "hidden",
    elevation: 5,
  },
});
export default NewsComponent;
