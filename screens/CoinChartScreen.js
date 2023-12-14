import react, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/CoinDetailedScreen/Header";
import { AntDesign } from "@expo/vector-icons";
import { getCoinHistory, getCoinDataById, getCoinMarketChart } from "../Services/requests";
import { COLORS, bitcoin_data } from "../components/constants";
import CoinData from "../components/CoinDetailedScreen/coinData";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryZoomContainer,
  createContainer,
} from "victory-native";
import FilterComponent from "../components/CoinDetailedScreen/FilterComponent";
const { width: SIZE } = Dimensions.get("window");

function CoinDetailedScreen({ route }) {
  const filterDaysArray = [
    { filterDay: "1", filterText: "24h" },
    { filterDay: "7", filterText: "7d" },
    { filterDay: "30", filterText: "30d" },
    { filterDay: "365", filterText: "1y" },
    { filterDay: "max", filterText: "All" },
  ];
  
  const [selectedRange, setSelectedRange ] = useState("1");
  const [coinMarketData, setCoinMarketData ] = useState();
  const [loading, setLoading] = useState(false);

  const fetchMarketCoinData = async (selectedRangeValue) => {
    setLoading(true);
    
    const fetchedCoinMarketData = await getCoinMarketChart(
      route.params.coinId,
      selectedRangeValue
    );
    setCoinMarketData(fetchedCoinMarketData);
    console.log("Data: "+coinMarketData);

    setLoading(false);
  };
  async function fetchdata() {
    getCoinDataById(route.params.coinId).then((data) => {
      // console.log("CoinName: "+route.params.coinId);
      // console.log("In a chartScreen"+data);
    });
  }
  useEffect(() => {
    // fetchdata();
    fetchMarketCoinData(1);
  }, []);
  const onSelectedRangeChange = (selectedRangeValue)=>{
    setSelectedRange(selectedRangeValue);
    fetchMarketCoinData(selectedRangeValue);


  }
  const navigation = useNavigation();
  const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

  return (
    <View style={styles.container}>
      <Header coinName={route.params.coin} imgUrl={route.params.imgUrl} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignSelf: "center" }}>
          <VictoryChart
            containerComponent={
              <VictoryZoomVoronoiContainer
                voronoiDimension="x"
                labels={({ datum }) => `${datum?.y?.toFixed(5)}`}
                labelComponent={
                  <VictoryTooltip
                    style={{ borderColor: "red" }}
                    cornerRadius={2}
                    flyoutPadding={{ top: 2, bottom: 2, left: 9, right: 9 }}
                    flyoutStyle={{ fill: "white" }}
                    renderInPortal={false}
                  />
                }
              />
            }
          >
            <VictoryAxis
              style={{
                axis: { stroke: "transparent" },
                ticks: { stroke: "transparent" },
                tickLabels: { fill: "none" },
              }}
            />
            <VictoryLine
              interpolation={"natural"}
              style={{
                data: { stroke: "#892ECC" },
                labels: { fill: "blue" },
                //   parent: { border: "1px solid #ccc" },
              }}
              data={bitcoin_data}
              labelComponent={<VictoryLabel active={false} />}
            />
            {/* <VictoryLine
        interpolation={"natural"}
        style={{
          data: { stroke: "red" },
          labels: { fill: "red" },
          //   parent: { border: "1px solid #ccc" },
        }}
        // labels={({ datum }) => `y: ${datum.y}`}
        labelComponent={<VictoryTooltip cornerRadius={2} />}
        data={data}
      /> */}
          </VictoryChart>
        </View>
        <View style={styles.filterContainer}>
          {
            filterDaysArray.map((day)=>(
              <FilterComponent filterDay={day.filterDay} filterText={day.filterText} selectedRange={selectedRange} setSelectedRange={onSelectedRangeChange}><Text>Day</Text></FilterComponent>
              ))
          }
              </View>
        <CoinData coinId={route.params.coinId} coinName={route.params.coin} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {},
  filterContainer:{
    flexDirection:  'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 10
  }
});
export default CoinDetailedScreen;
