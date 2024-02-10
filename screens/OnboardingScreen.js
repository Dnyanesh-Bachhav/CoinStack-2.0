import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LottieView from "lottie-react-native";
import { COLORS } from "../components/constants";
import { useContext, useRef, useState } from "react";
import Onboarding from "react-native-onboarding-swiper";
import { AuthContext } from "../Contexts/AuthProviderContext";
import { StatusBar } from "react-native";

function OnboardingScreen({ navigation }) {
  const animationRef = useRef(null);
  const { user, setUser } = useContext(AuthContext);
  const [ bgColor, setBgColor ] = useState("#a7f3d0");
  function handleDone(){
    setUser(null);
    navigation.navigate("LoginScreen");

  }
  return (
    <View style={styles.container}>
      <Onboarding
      onDone={handleDone}
      pageIndexCallback={(val)=>{
        console.log('Index: '+val);
        switch(val)
        {
          case 0:
            setBgColor("#a7f3d0");
            break;
          case 1:
            setBgColor("#fef3c7");
            break;
          case 2:
            setBgColor("#a78bfa");
            break;
        }
        
      }}
        pages={[
          {
            backgroundColor: "#a7f3d0",
            image: (
                <View style={{ width: '100%', height: '60%', justifyContent: 'center', alignItems: 'center' }}>
              <LottieView
                ref={animationRef}
                style={{
                  width: "100%",
                  height: "100%",
                  alignSelf: "center",
                  color: COLORS.primary,
                }}
                autoPlay
                loop
                source={require("../assets/Cryptocurrency.json")}
                />
                </View>
            ),
            title: "Crypto World!",
            subtitle: "Demystify crypto. Trade smarter, not harder.",
          },
          {
            backgroundColor: "#fef3c7",
            image: (
                <View style={{ width: '100%', height: '60%', justifyContent: 'center', alignItems: 'center' }}>
              <LottieView
                ref={animationRef}
                style={{
                  width: "100%",
                  height: "100%",
                  alignSelf: "center",
                  color: COLORS.primary,
                }}
                autoPlay
                loop
                source={require("../assets/Learning.json")}
              />
              </View>
            ),
            title: "Trading Mastery!",
            subtitle: "Master virtual trading with our simple lessons.",
          },
          {
            backgroundColor: '#a78bfa',
            image:   <View style={{ width: '100%', height: '60%', justifyContent: 'center', alignItems: 'center' }}>
            <LottieView
            ref={animationRef}
            style={{
                    width: '100%',
                    height: '100%',
                    alignSelf: 'center',
                    // resizeMode: 'contain'
                    // color: COLORS.primary,
            }}
            autoPlay
            loop
            source={require('../assets/Security.json')}
        /></View>,
            title: 'Kickstart your Journey!',
            subtitle: 'Discover cryptos potential. Start trading now!',
            },
        ]}
      />
      <StatusBar backgroundColor={bgColor} animated={true} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default OnboardingScreen;
