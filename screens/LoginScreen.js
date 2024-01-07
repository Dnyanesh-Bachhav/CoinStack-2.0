import { useContext, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../Contexts/AuthProviderContext";
import { SizableText } from "tamagui";
import { COLORS } from "../components/constants";
import { Lock, Mail } from "@tamagui/lucide-icons";
import LottieView from 'lottie-react-native';
import { Modal } from "react-native";

function LoginScreen({ navigation }){
    const[ email, setEmail ] = useState();
    const[ password, setPassword ] = useState();
    const [visible, setVisible] = useState(false);
    const animationRef = useRef(null);
    const { signUp, login, authLoading, setAuthLoading, authError } = useContext(AuthContext);
    function handleLogin(){
        login(email,password);
    
    }
    
    const ModalPopUp = ({ visible, children }) => {
        return (
          <Modal transparent visible={authLoading} style={{ width: '100%', height: '100%' }} animationType="fade">
            <View style={styles.modalContainer}>
              <View style={styles.modalData}>{children}</View>
            </View>
            
          </Modal>
        );
      };

    
    useEffect(()=>{
        // setAuthLoading(true);
    },[]);
    return(
        <View style={styles.container}>

            {/* <ModalPopUp visible={authLoading}>
                <View style={{ width: '100%', height: '100%' }} >
                    <LottieView
                        ref={animationRef}
                        style={{
                                width: '100%',
                                height: '100%',
                                alignSelf: 'center',
                                color: COLORS.primary,
                        }}
                        autoPlay
                        loop
                        source={require('../assets/Loading (1).json')}
                    />
                </View>
            </ModalPopUp> */}
            <Image
            source={require('../assets/logo.png')}
            style={{
                width: 160,
                height: 200,
                tintColor: COLORS.primary,
                alignSelf: 'center'
            }}
            />
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <SizableText size={"$9"} color={COLORS.primary} fontWeight={"800"}>Welcome Back</SizableText>
                <SizableText size={"$4"} color={COLORS.primary} >Sign in to continue</SizableText>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', backgroundColor: COLORS.primaryFaint, paddingHorizontal: 5, paddingVertical: 10, borderRadius: 10, marginTop: 10, overflow: 'hidden' }} >
                <Mail size={"$1"} style={{ alignSelf: 'center', marginLeft: 5, color: COLORS.primary, fontWeight: '700' }} />
                <TextInput cursorColor={COLORS.grayDark} placeholder="Email" value={email} style={{ color: COLORS.grayDark, marginLeft: 10, width: '100%' }} onChangeText={setEmail} />
            </View>
            <View style={{ flexDirection: 'row', width: '100%', backgroundColor: COLORS.primaryFaint, paddingHorizontal: 5, paddingVertical: 10, borderRadius: 10, marginTop: 10, overflow: 'hidden' }} >
                <Lock size={"$1"} style={{ alignSelf: 'center', marginLeft: 5, color: COLORS.primary, fontWeight: '700' }} />
                <TextInput cursorColor={COLORS.grayDark} placeholder="Password" value={password} style={{ color: COLORS.grayDark, marginLeft: 10, width: '100%' }} onChangeText={setPassword} />
            </View>
            <View style={{ alignItems: 'flex-end', marginRight: 4 }} >
                <SizableText size={"$3"} color={COLORS.primary}>Forgot Password?</SizableText>
            </View>
            <TouchableOpacity onPress={()=>{
            handleLogin();
            if(authError.current!=null)
                   {
                     return Alert.alert('Alert Title', authError.current.message, [
                       {
                         text: 'Cancel',
                         onPress: () => console.log('Cancel Pressed'),
                         style: 'cancel',
                       },
                       {
                           text: 'OK', 
                           onPress: () => {
                               console.log('OK Pressed')
                            //    setAuthError(null);
                            authError.current = null;
                           },
                       }  
                     ]);
                   } 
            }} style={styles.btnStyle}>
                <SizableText size={"$5"} fontWeight={"600"} style={{ color: COLORS.white, textAlign: 'center' }} >Submit</SizableText>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                <SizableText>Don't have an account?</SizableText>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate("SignupScreen");
                }} >
                    <SizableText style={{color: COLORS.primary, fontWeight: 'bold' }}> Create a new account</SizableText>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.white,
        justifyContent: 'center'
    },
    btnStyle:{
        width: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginTop: 15,
        elevation: 5
    },
    modalContainer: {
        // flex: 1,
        width: '100%',
        height: '100%',
        // borderWidth: 2,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
      },
      modalData: {
        width: "65%",
        height: "16%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 10,
        elevation: 10,
      },
})
export default LoginScreen;