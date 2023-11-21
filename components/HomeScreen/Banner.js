import React,{useRef} from 'react';
import {View,StyleSheet,Dimensions,Image} from 'react-native';
import {COLORS } from '../constants';
const BANNER_HEIGHT = Dimensions.get('window').height/4.5;
import Carousel from 'react-native-reanimated-carousel';
import { banners  } from '../constants';

function Banner(){
  
  const width = Dimensions.get('window').width;
  const CardItem = ({item,index})=>{
    return(
      <View style={styles.container} >
        
        <Image source={item.imgSrc } 
          style={{
            width: '100%',
            resizeMode: 'contain'

          }}
          />
        </View>
    );
  }
  const ref = useRef(null);
  return(
    <View>
        {/* <View style={styles.bannerDotsView} >
            <View style={styles.bannerDot}></View>
            <View style={styles.bannerDot}></View>
            <View style={styles.bannerDot}></View>
            <View style={styles.bannerDot}></View>
            <View style={styles.bannerDot}></View>
        </View> */}
        <View style={{ justifyContent: 'center' }}>
        <Carousel
              loop
              width={width}
              height={BANNER_HEIGHT}
              // autoPlay={true}
              snapEnabled={false}
              data={banners}
              scrollAnimationDuration={1000}
              
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
              onSnapToItem={(index) => console.log('current index:', index)}
              
              renderItem={ CardItem }
                  />
            </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
    width: '100%',
    height: BANNER_HEIGHT,
    backgroundColor: COLORS.gray,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  bannerDotsView:{
    position: 'absolute',
    bottom: 2,
    width: '100%',
    height: 12,
    backgroundColor: COLORS.gray,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bannerDot:{
    width: 8,
    height: 8,
    backgroundColor:COLORS.white,
    marginLeft: 5,
    borderRadius: 50
  }
});
export default Banner;