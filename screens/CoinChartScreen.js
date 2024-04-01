import react, { useState, useEffect, useRef } from "react";
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
import { FontAwesome } from "@expo/vector-icons";
import {
  getCoinHistory,
  getCoinDataById,
  getCoinMarketChart,
} from "../Services/requests";
import Button from "../components/CoinDetailedScreen/Button";
import candleStickChartLogo from "../assets/candlestick-chart.png";
import { COLORS, PREDICTION_AVAILABLE_COINS, PREDICTION_DATA } from "../components/constants";
import CoinData from "../components/CoinDetailedScreen/coinData";
import { WebView } from 'react-native-webview';
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
import { AntDesign } from "@expo/vector-icons";
import FilterComponent from "../components/CoinDetailedScreen/FilterComponent";
import { CandlestickChart, ExternalLink, XSquare } from "@tamagui/lucide-icons";
import NewsComponent from "../components/CoinDetailedScreen/NewsComponent";
import Converter from "../components/CoinDetailedScreen/Converter";
import Statistics from "../components/CoinDetailedScreen/Statistics";
import { useWatchlist } from "../Contexts/WatchListContext";
import LottieView from 'lottie-react-native';
import { ToggleGroup } from "tamagui";
import { Paragraph } from "tamagui";
import { Modal, Portal } from 'react-native-paper';
import axios from "axios";
const { width } = Dimensions.get("window");
const CHART_HEIGHT = Dimensions.get("window").height/1.6;

const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

function CoinDetailedScreen({ route }) {
  const filterDaysArray = [
    { filterDay: "1", filterText: "24h" },
    { filterDay: "7", filterText: "7d" },
    { filterDay: "30", filterText: "30d" },
    { filterDay: "365", filterText: "1y" },
    { filterDay: "max", filterText: "All" },
  ];
  const predictionFilterDaysArray = [
    { filterDay: "7", filterText: "7d" },
    { filterDay: "30", filterText: "30d" }
  ];
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const[predictionData, setPredictionData] = useState(null);
  const[predictionChartData, setPredictionChartData] = useState(null);
  const[fetchingPredictionData, setFetchingPredictionData] = useState(false);
  const isPredictionChart = useRef(false);
  const animationRef = useRef(null);
  
  const containerStyle = {backgroundColor: 'white', padding: 20};
  const [selectedRange, setSelectedRange] = useState("1");
  const [selectedPredictionRange, setSelectedPredictionRange] = useState("7");
  const [chartType, setChartType] = useState("tab1");
  const [coinMarketData, setCoinMarketData] = useState();
  const [loading, setLoading] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(route.params.currentPrice);
  const { watchlistCoinIds, removeWatchlistCoinId, storeWatchlistCoinId } = useWatchlist();
  const source = {
    html : `<!-- TradingView Widget BEGIN -->
    <div class="tradingview-widget-container" style="height:100%;width:100%">
      <div class="tradingview-widget-container__widget" style="height:calc(100% - 32px);width:100%"></div>
      <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js" async>
      {
      "autosize": true,
      "symbol": "BITSTAMP:${route?.params?.symbol || "BTC"}USD",
      "interval": "D",
      "timezone": "Etc/UTC",
      "theme": "light",
      "style": "1",
      "locale": "en",
      "hide_side_toolbar": false,
      "enable_publishing": false,
      "withdateranges": true,
      "details": true,
      "hotlist": true,
      "calendar": true,
      "save_image": false,
      "allow_symbol_change": true,
      "support_host": "https://www.tradingview.com"
    }
      </script>
    </div>
    <!-- TradingView Widget END -->`
}

    function checkIfCoinPredictionIsAvailable(symbol){
      return PREDICTION_AVAILABLE_COINS.some((coin_symbol)=> coin_symbol==symbol.toUpperCase());
    }
  
    function checkIfCoinIsWatchListed(coinId){
        return watchlistCoinIds.some((coinIdValue)=> coinIdValue===coinId);
    }
    function handleWatchListCoin(){
        if(checkIfCoinIsWatchListed(route.params.coinId))
        {
            return removeWatchlistCoinId(route.params.coinId);
        }
        return storeWatchlistCoinId(route.params.coinId);
    }
    
  const fetchMarketCoinData = async (selectedRangeValue) => {
    setLoading(true);

    const fetchedCoinMarketData = await getCoinMarketChart(
      route.params.coinId,
      selectedRangeValue
    );
    // console.log(fetchedCoinMarketData.prices);
    setCoinMarketData(
      fetchedCoinMarketData.prices.map(([marketCap, price]) => ({ y: price }))
    );
    // console.log(coinMarketData);

    setLoading(false);
  };
  const fetchPredictionData = async (symbol = "BTC") => {
    setFetchingPredictionData(true);
    if(fetchingPredictionData)
    {
      return;
    }
    try {
      const response = await axios.get(`https://prediction-api-78xq.onrender.com/prediction/${symbol}`);
  
      console.log("Prediction Data:");
      console.log(response.data);
      setPredictionData(JSON.parse(response.data));
      console.log(JSON.parse(response.data));
      // Use the response data for your app's functionality
      // ...
    } catch (error) {
      console.error("Error fetching prediction data:", error);
    }
    setFetchingPredictionData(false);
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
    // if(checkIfCoinPredictionIsAvailable(route.params.symbol))
    // {
    //   setIsPredictionChart(true);
    //   // fetchPredictionData();
    // }
    // else{
    //   setIsPredictionChart(false);
    // }
  }, []);

  function getFormattedPredictionData(range)
  {
    const chart_data = [];
    let x_axis_data = range=="7" ? predictionData.one_week_dates : predictionData.one_month_dates;
    let y_axis_data = range=="7" ? predictionData.one_week_dollars : predictionData.one_month_dollars;
    for(let i=0;i<x_axis_data.length;i++)
    {
      chart_data.push({
        x: x_axis_data[i],
        y: y_axis_data[i]
      })
    }
    console.log(chart_data);
    setPredictionChartData(chart_data);
  }

  const onSelectedRangeChange = (selectedRangeValue) => {
    setSelectedRange(selectedRangeValue);
    fetchMarketCoinData(selectedRangeValue);
  };
  const onSelectedPredictionRangeChange = (range) => {
    setSelectedPredictionRange(range);
    if(predictionData)
    {
      getFormattedPredictionData(range);
    }
    console.log("Range: "+range);
    // fetchMarketCoinData(selectedRangeValue);
  };
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header coinName={route.params.coin} imgUrl={route.params.imgUrl} />
      <View style={styles.btnGroup}>
        <Button button_text="Buy" backColor={COLORS.success} screenName={"BuyCoinScreen"} name={ route.params.coin } price={ currentPrice } symbol={ route.params.symbol } imgSrc={ route.params.imgUrl } />
        <Button button_text="Sell" backColor={COLORS.red} screenName={"SellCoinScreen"} name={ route.params.coin } price={ currentPrice } symbol={ route.params.symbol } imgSrc={ route.params.imgUrl } />
      </View>
      {
            !fetchingPredictionData ?  
      <View style={{ marginVertical: 5, marginBottom: 100 }}>
        <ScrollView style={{}} showsVerticalScrollIndicator={false}>
          
          
          <View style={styles.coinInfoContainer}>
            <View style={{ flexDirection: 'row' }} >
            {/* LOGO */}
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: route.params.imgUrl,
                }}
                width={34}
                height={34}
              />
            </View>
            {/* COIN DATA */}
            <View style={{ alignSelf: 'center', marginLeft: 7, color: COLORS.primary }}>
              <SizableText size={"$5"} style={{ color: COLORS.primary, fontWeight: 600 }} >
                {route.params.coin} ({route.params?.symbol.toUpperCase()})
              </SizableText>
              <SizableText size={"$4"} style={{ color: COLORS.primary, fontWeight: 600 }} >₹{currentPrice}</SizableText>
            </View>
            </View>
            {/* LOGOS */}
            <View style={{ alignItems: 'flex-end' }} >
              <FontAwesome name={ checkIfCoinIsWatchListed(route.params.coinId) ? "star" : "star-o" }  size={24} color={ checkIfCoinIsWatchListed(route.params.coinId) ? "#FFBF00" : "black" }  onPress={()=>
                {
                  handleWatchListCoin();
                }} />
                
                {
                  checkIfCoinPredictionIsAvailable(route.params.symbol) 
                  ?
                  <View style={{ backgroundColor: isPredictionChart.current ? COLORS.primary : COLORS.primaryFaint, marginTop: 5, paddingVertical: 4, paddingHorizontal: 8, borderRadius: 5 }} >
                    <FontAwesome name="magic" size={18} color={ isPredictionChart.current ? COLORS.white : COLORS.primary } style={{ marginTop: 5 }} onPress={()=>{
                      isPredictionChart.current = !isPredictionChart.current;
                      if(isPredictionChart.current)
                      {
                        if(selectedRange==null)
                        {
                          setSelectedRange("7");
                        }

                        fetchPredictionData(route.params.symbol.toUpperCase());

                      }
                    }} />
                  </View>
                  : null  
          }
            </View>
          </View>
          
          <View style={{ alignSelf: "center" }}>
          <ChartTabs coinMarketData={coinMarketData} source={source} setChartType={setChartType} isPredictionChart={isPredictionChart.current} predictionChartData={predictionChartData} />
            
        
        
          </View>
            {

            chartType == "tab1" ?
          <View style={styles.filterContainer}>
              { !isPredictionChart.current ? filterDaysArray.map((day) => (
                <FilterComponent
                filterDay={day.filterDay}
                filterText={day.filterText}
                selectedRange={selectedRange}
                setSelectedRange={onSelectedRangeChange}
                key={day.filterDay}
                >
                <Text>Day</Text>
                </FilterComponent>
                ))
              : 
              predictionFilterDaysArray.map((day) => (
                <FilterComponent
                filterDay={day.filterDay}
                filterText={day.filterText}
                selectedRange={selectedPredictionRange}
                setSelectedRange={onSelectedPredictionRangeChange}
                key={day.filterDay}
                >
                <Text>Day</Text>
                </FilterComponent>
                ))
              }


            <TouchableOpacity
              style={{ backgroundColor: COLORS.primaryFaint, ...styles.filter }}
              >
              <CandlestickChart />
            </TouchableOpacity>
          </View>
              : null
            }
            {/* Full Screen Trading View Chart */}
            {
              chartType=="tab2" ?
              <View style={{ width: "98%", justifyContent: 'flex-end', alignItems:"flex-start", marginLeft: 5, marginVertical: 5  }}>
                <ExternalLink style={{paddingVertical: 10, paddingHorizontal: 10, backgroundColor: COLORS.primaryFaint, borderRadius: 5 }} onPress={()=>{
                  console.log("Clicked...")
                  showModal();
                }} />
              </View>
      : null
      }
      {/* Modal */}
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalStyle}>
            <XSquare style={{ alignSelf: "flex-end" }} onPress={hideModal} />
            <WebView
            style={{
              borderWidth: 2,
              height: "100%",
            }
          }
          originWhitelist={['*']}
          source={{ html: source.html }}
          /> 
        </Modal>
        </Portal>
          <HorizontalTabs
            coinId={route.params.coinId}
            coinName={route.params.coin}
            currentPrice={currentPrice}
            coinSymbol={ route.params.symbol }
          />

          {/* <CoinData coinId={route.params.coinId} coinName={route.params.coin} /> */}
        </ScrollView>
      </View>
      :
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
            <LottieView
                ref={animationRef}
                style={{
                        width: '40%',
                        height: '40%',
                        alignSelf: 'center',
                        color: COLORS.primary,
                }}
                autoPlay
                loop
                source={require('../assets/Loading (1).json')}
            />
        </View>
      }
    </View>
  );
}
const ChartTabs = ({ coinMarketData, source, setChartType, isPredictionChart, predictionChartData }) => {
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
      onValueChange={(val)=>{
        setChartType(val);
      }}
    >
      <Tabs.List
        separator={<Separator vertical />}
        disablePassBorderRadius="bottom"
        aria-label="Manage your account"
      >
        <Tabs.Tab value="tab1">
          <SizableText fontFamily="$body">Prices</SizableText>
        </Tabs.Tab>
        <Tabs.Tab value="tab2">
          <SizableText fontFamily="$body">Trading View</SizableText>
        </Tabs.Tab>
      </Tabs.List>
      <Separator />
      <Tabs.Content flex={1} value="tab1">
        <View style={{ marginBottom: 20 }} >

          {
            !isPredictionChart
          ?
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
          : 
          <VictoryChart
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 }
              }}
              containerComponent={
                <VictoryZoomVoronoiContainer
                  voronoiDimension="x"
                  labels={({ datum }) => `${datum?.y} \n ${datum.x} `}
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
              data={predictionChartData}
            />
        </VictoryChart>
        }
        </View>
      </Tabs.Content>

      <Tabs.Content value="tab2">
        <View style={{ height: CHART_HEIGHT }}>
          <WebView
          style={{
            borderWidth: 2,
            height: "100%",
          }
        }
        originWhitelist={['*']}
        source={{ html: source.html }}
        />  
      </View>
      </Tabs.Content>
    </Tabs>
  );
};
const HorizontalTabs = ({ coinId, coinName, currentPrice, coinSymbol }) => {
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
        <View style={{ marginBottom: 20 }} >
          {/* COIN INFORMATION */}
          <View style={{ backgroundColor: COLORS.primaryFaint, marginTop: 10, marginHorizontal: 15, borderRadius: 10, paddingHorizontal: 10 }} >
            <CoinData coinId={coinId} coinName={coinName} />
          </View>
          {/* COIN CONVERTER */}
          <View style={{ backgroundColor: COLORS.primaryFaint, marginTop: 10, marginHorizontal: 15, borderRadius: 10, paddingHorizontal: 10 }} >
            <Converter coinName={coinName} coinSymbol={coinSymbol} currentPrice={currentPrice} />
          </View>
          {/* COIN STATISTICS */}
          <View style={{ backgroundColor: COLORS.primaryFaint, marginTop: 10, marginHorizontal: 15, borderRadius: 10, paddingHorizontal: 10 }} >
            <Statistics coinId={coinId} coinName={coinName} coinSymbol={coinSymbol} />
          </View>
        </View>
      </Tabs.Content>

      <Tabs.Content value="tab2">
        {/* <H5>Connections</H5> */}
        <NewsComponent coinName={coinName} />
      </Tabs.Content>

      <Tabs.Content value="tab3">
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <H5>Notifications</H5>
        </View>
      </Tabs.Content>
    </Tabs>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    // marginBottom: 40,
    // padding: 5
    backgroundColor: COLORS.white,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
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
  imageContainer: {
    borderRadius: 50,
    alignItems: 'center',
    alignSelf: 'center'
  },
  btnGroup: {
    position: "absolute",
    width: "100%",
    paddingVertical: 7,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 10,
    backgroundColor: COLORS.white,
    bottom: 0,
    right: 0,
  },
  coinInfoContainer: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 5,
    marginHorizontal: 10,
    justifyContent: 'space-between'
  },
  modalStyle:{
    width: "94%",
    height: "90%",
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 5
    // padding: 20,
  }
});
export default CoinDetailedScreen;
