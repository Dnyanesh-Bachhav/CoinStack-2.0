import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { useWatchlist } from '../Contexts/WatchListContext';
import CoinItem from '../components/marketScreen/CoinItem';
import { getWatchlistedCoins } from '../Services/requests';
import TableHeader from '../components/marketScreen/TableHeader';
import LottieView from 'lottie-react-native';
import { COLORS } from '../components/constants';

const WatchlistScreen = () => {
  const {watchlistCoinIds} = useWatchlist();
  const animationRef = useRef(null);
  // const [ laoding, setLoading ] = useState(false);

  console.log(watchlistCoinIds);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const transformCoinIds = () => watchlistCoinIds.join('%2C');

  const fetchWatchlistedCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const watchlistedCoinsData = await getWatchlistedCoins(1, transformCoinIds());
    setCoins(watchlistedCoinsData);
    setLoading(false);
  };

  useEffect(() => {
    if (watchlistCoinIds.length > 0) {
      fetchWatchlistedCoins();
    }
  }, [watchlistCoinIds]);

  return (
    <View style={ styles.container }>
      <TableHeader/>
      {
        !loading && coins ?
          <FlatList 
          data={coins}
          renderItem={({ item }) => 
            <CoinItem coinName={item.name} coinId={item.id} symbol={item.symbol} current_price={item.current_price} uri={item.image} price_change_percentage_24h={item.price_change_percentage_24h} />}
            refreshControl={
              <RefreshControl 
              refreshing={loading}
                tintColor="white"
                onRefresh={watchlistCoinIds.length > 0 ? fetchWatchlistedCoins : null}
                />
              }
              />
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
  )
};

const styles = StyleSheet.create({
  container:{
      flex: 1,
      marginTop: 10,
      paddingHorizontal: 10
  },
});
export default WatchlistScreen;