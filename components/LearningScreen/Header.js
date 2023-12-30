import { AntDesign, FontAwesome5, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import React from 'react';
import { Image, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants';
// import { COLORS } from './constants';
function Header(){
  return(
    <View style={styles.container}>
      <View style={{justifyContent: 'center'}}>
        {/* App Logo */}
        <Pressable onPress={()=>{
          // navigation.openDrawer();
        }} >
          {/* <FontAwesome5 name="bars" size={21} color={COLORS.white}/> */}
          {/* <MaterialCommunityIcons name="bookshelf" size={21} color={COLORS.white} /> */}
          <Entypo name="open-book" size={22} color={COLORS.white} />
          </Pressable>
      </View>
      <Text style={styles.textStyle}>Learn Crypto Trading</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  textStyle:{
    color: "#fff",
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 10,
    paddingVertical: 5
  },
  imgStyle:{
    width: 24,
    height: 24,
    resizeMode: 'contain',
    justifyContent:'center',
    alignContent: 'center'
  },

  iconStyle:{
    justifyContent: 'center',
    alignItems:'center',
    marginLeft: 'auto'
  }
})
export default Header;
