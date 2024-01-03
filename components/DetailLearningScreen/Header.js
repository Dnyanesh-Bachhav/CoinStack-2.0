import { AntDesign, FontAwesome5, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import React from 'react';
import { Image, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants';
import { useNavigation } from '@react-navigation/native';
import { SizableText } from 'tamagui';
// import { COLORS } from './constants';
function Header({ mainHeading }){
    const navigation = useNavigation();
  return(
    <View style={styles.container}>
      <View style={{justifyContent: 'center'}}>
        {/* App Logo */}
        <TouchableOpacity onPress={()=>{
                navigation.goBack();
            }} >
            <AntDesign name="arrowleft" size={24} color={COLORS.black} style={styles.iconStyle}/>
            </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '90%' }}>
          <SizableText style={styles.textStyle} size={"$5"} fontWeight={"600"}>{ mainHeading }</SizableText>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    // borderWidth: 1,
  },
  textStyle:{
    // marginLeft: 10,
    // paddingVertical: 5,
    // width: 'auto',
    textAlign: 'center',
    alignSelf: 'center'
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
