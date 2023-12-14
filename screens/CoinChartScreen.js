import react, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/CoinDetailedScreen/Header";
import { AntDesign } from "@expo/vector-icons";
import {
  getCoinHistory,
  getCoinDataById,
  getCoinMarketChart,
} from "../Services/requests";
import Button from "../components/CoinDetailedScreen/Button";
import candleStickChartLogo from "../assets/candlestick-chart.png";
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
import {
  H5,
  Separator,
  SizableText,
  Tabs,
  TabsContentProps,
  XStack,
  YStack,
  isWeb,
} from "tamagui";
import FilterComponent from "../components/CoinDetailedScreen/FilterComponent";
import { CandlestickChart } from "@tamagui/lucide-icons";
const { width } = Dimensions.get("window");

function CoinDetailedScreen({ route }) {
  const filterDaysArray = [
    { filterDay: "1", filterText: "24h" },
    { filterDay: "7", filterText: "7d" },
    { filterDay: "30", filterText: "30d" },
    { filterDay: "365", filterText: "1y" },
    { filterDay: "max", filterText: "All" },
  ];

  const [selectedRange, setSelectedRange] = useState("1");
  const [coinMarketData, setCoinMarketData] = useState();
  const [loading, setLoading] = useState(false);

  const fetchMarketCoinData = async (selectedRangeValue) => {
    setLoading(true);

    const fetchedCoinMarketData = await getCoinMarketChart(
      route.params.coinId,
      selectedRangeValue
    );
    console.log(fetchedCoinMarketData.prices);
    setCoinMarketData(
      fetchedCoinMarketData.prices.map(([marketCap, price]) => ({ y: price }))
    );
    // console.log(coinMarketData);

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
  const onSelectedRangeChange = (selectedRangeValue) => {
    setSelectedRange(selectedRangeValue);
    fetchMarketCoinData(selectedRangeValue);
  };
  const navigation = useNavigation();
  const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

  return (
    <View style={styles.container}>
      <Header coinName={route.params.coin} imgUrl={route.params.imgUrl} />
      <View style={styles.btnGroup}>
            <Button button_text="Buy" backColor={COLORS.success} />
            <Button button_text="Sell" backColor={COLORS.red} />
          </View>
      <View style={{ marginVertical: 5, marginBottom: 100 }}>
        <ScrollView style={{  }} showsVerticalScrollIndicator={false}>
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
                data={coinMarketData}
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
            {filterDaysArray.map((day) => (
              <FilterComponent
                filterDay={day.filterDay}
                filterText={day.filterText}
                selectedRange={selectedRange}
                setSelectedRange={onSelectedRangeChange}
                key={day.filterDay}
              >
                <Text>Day</Text>
              </FilterComponent>
            ))}
            <TouchableOpacity
              style={{ backgroundColor: COLORS.white, ...styles.filter }}
            >
              <CandlestickChart />
            </TouchableOpacity>
          </View>
          <HorizontalTabs
            coinId={route.params.coinId}
            coinName={route.params.coin}
          />
          
          {/* <CoinData coinId={route.params.coinId} coinName={route.params.coin} /> */}
        </ScrollView>
          
      </View>
      
    </View>
  );
}
const HorizontalTabs = ({ coinId, coinName }) => {
  return (
    <Tabs
      defaultValue="tab1"
      orientation="horizontal"
      flexDirection="column"
      width={width}
      height={"auto"}
      borderRadius="$4"
      borderWidth="$0.25"
      overflow="hidden"
      borderColor="$borderColor"
    >
      <Tabs.List
        separator={<Separator vertical />}
        disablePassBorderRadius="bottom"
        aria-label="Manage your account"
      >
        <Tabs.Tab value="tab1">
          <SizableText fontFamily="$body">About</SizableText>
        </Tabs.Tab>
        <Tabs.Tab value="tab2">
          <SizableText fontFamily="$body">News</SizableText>
        </Tabs.Tab>
        <Tabs.Tab value="tab3">
          <SizableText fontFamily="$body">Suggestions</SizableText>
        </Tabs.Tab>
      </Tabs.List>
      <Separator />
      <Tabs.Content flex={1} value="tab1">
        {/* <H5>Profile</H5> */}
        <CoinData coinId={coinId} coinName={coinName} />
      </Tabs.Content>

      <Tabs.Content value="tab2">
        <H5>Connections</H5>
      </Tabs.Content>

      <Tabs.Content value="tab3">
        <H5>Notifications</H5>
      </Tabs.Content>
    </Tabs>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    // marginBottom: 40,
    // padding: 5
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  filter: {
    borderRadius: 40,
    paddingVertical: 5,
    paddingHorizontal: 14,
    elevation: 5,
  },
  
  btnGroup:{
    position: 'absolute',
    width: '100%',
    paddingVertical: 7,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 10,
    backgroundColor: COLORS.white,
    bottom: 0,
    right: 0,
},
});
export default CoinDetailedScreen;
