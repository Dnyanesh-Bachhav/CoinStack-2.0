import { Dimensions, StyleSheet, Text, View } from "react-native";
import { SizableText, Image, YStack } from "tamagui";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../constants";
import { useEffect, useState } from "react";
import { getAllNews } from "../../Services/requestsNewsApi";
import { Spinner } from "tamagui";
import { FlashList } from "@shopify/flash-list";

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
                  flexWrap: "wrap",
                  marginLeft: 5,
                  paddingRight: 4,
                }}
              >
                <Text
                  style={{ flexWrap: 'wrap' }}
                  numberOfLines={3}
                  adjustsFontSizeToFit={true}
                >
                  { item?.title }
                </Text>
              </View>
            </View>
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
    marginBottom: 25,
    // marginVertical: 10
  },

  imgContainer: {
    width: 100,
    height: 100,
    padding: 2,
    alignSelf: 'center'
    // marginLeft: 40,
    // elevation: 5
    // borderWidth: 1,
  },

  NewsContainer: {
    flexDirection: "row",
    // borderWidth: 1,
    backgroundColor: COLORS.white,
    marginTop: 10,
    borderRadius: 10,
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    elevation: 5,
  },
});
export default NewsComponent;
