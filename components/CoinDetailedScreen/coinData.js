import react, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  useWindowDimensions,
  Dimensions,
} from "react-native";
import { getCoinDataById } from "../../Services/requests";
import Button from "./Button";
import { COLORS } from "../constants";
import { Paragraph, SizableText } from "tamagui";
import ReadMore from "@fawazahmed/react-native-read-more";
import RenderHTML from "react-native-render-html";
function CoinData({ coinId, coinName }) {
  const [loading, setLoading] = useState(true);
  const [coinData, setCoinData] = useState(null);
  const { width } = useWindowDimensions();
  const width1 = Dimensions.get("window").width;

  const source = {
    html: `
      <p style='text-align:center;'>
        Hello World!
      </p>`,
  };
  const getCoinData = async () => {
    setLoading(true);
    console.log("CoinID in coindata: " + coinId);
    const data = await getCoinDataById(coinId);
    // console.log(data);
    setCoinData(data);

    // console.log("CoinID setCoinData: "+coinData);
    setLoading(false);
  };
  useEffect(() => {
    getCoinData();
  }, []);
  return (
    <View style={styles.container}>
      {!loading ? (
        <View style={styles.coinDataContainer}>
          <SizableText size="$7" fontWeight="800">
            {coinName}
          </SizableText>
          <ReadMore numberOfLines={7} seeMoreStyle={{ color: COLORS.primary, fontWeight: 700 }} seeLessStyle={{ color: COLORS.primary, fontWeight: 700 }} >
            <SizableText fontFamily={"$body"}>{ coinData?.description?.en }
            </SizableText>
          </ReadMore>
          {/* <Paragraph size="$2"> */}
          {/* <RenderHTML contentWidth={ 200 } source={{ html: !coinData ?
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam iusto doloremque dolores quis dolorum soluta id molestiae facere cumque ullam repellat ex, maiores perspiciatis? Reiciendis magnam quas possimus nemo at. Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui obcaecati cum explicabo est, suscipit architecto nam earum. Recusandae expedita iure consectetur sed nihil possimus, nisi optio alias sunt vel ducimus!"
                        : `${coinData.description.en} `
                    }}
                    /> */}

          {/* </Paragraph> */}
        
          <View style={styles.contractAddress}></View>
        </View>
      ) : (
        <ActivityIndicator size="large" color={COLORS.black} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 10,
    backgroundColor: 'transaparent',
  },
  textStyle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  coinDataContainer: {
    // marginBottom: 55,
    paddingVertical: 10
  },
  btnGroup: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 10,
  },
  descriptionText: {
    fontSize: 14,
  },
  contractAddress: {
    fontSize: 24,
  },
});
export default CoinData;
