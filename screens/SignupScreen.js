import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS } from "../components/constants";
import { SizableText } from "tamagui";
import { Lock, Mail, Smartphone, User } from "@tamagui/lucide-icons";
import { useContext, useState } from "react";
import { AuthContext } from "../Contexts/AuthProviderContext";

function SignupScreen({ navigation }){
    const[ email, setEmail ] = useState();
    const[ password, setPassword ] = useState();
    const[ phone, setPhone ] = useState();
    const[ username, setUsername ] = useState();
    const { signUp, authLoading } = useContext(AuthContext);
    if(authLoading)
    {
      return <ActivityIndicator size={"large"} color={COLORS.primary} />
    }
    return(
        <View style={styles.container}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <SizableText size={"$7"} fontWeight={"bold"}>Create Account</SizableText>
            <SizableText>Create a new Account</SizableText>
        </View>
        <View style={{ flexDirection: 'row', width: '100%', backgroundColor: COLORS.primaryFaint, paddingHorizontal: 5, paddingVertical: 10, borderRadius: 10, marginTop: 10, overflow: 'hidden' }} >
            <User size={"$1"} style={{ alignSelf: 'center', marginLeft: 5, color: COLORS.primary, fontWeight: '700' }} />
            <TextInput cursorColor={COLORS.grayDark} value={username} style={{ color: COLORS.grayDark, marginLeft: 10, width: '100%' }} onChangeText={setUsername} />
        </View>
        <View style={{ flexDirection: 'row', width: '100%', backgroundColor: COLORS.primaryFaint, paddingHorizontal: 5, paddingVertical: 10, borderRadius: 10, marginTop: 10, overflow: 'hidden' }} >
            <Mail size={"$1"} style={{ alignSelf: 'center', marginLeft: 5, color: COLORS.primary, fontWeight: '700' }} />
            <TextInput cursorColor={COLORS.grayDark} value={email} style={{ color: COLORS.grayDark, marginLeft: 10, width: '100%' }} onChangeText={setEmail} />
        </View>
        <View style={{ flexDirection: 'row', width: '100%', backgroundColor: COLORS.primaryFaint, paddingHorizontal: 5, paddingVertical: 10, borderRadius: 10, marginTop: 10, overflow: 'hidden' }} >
            <Smartphone size={"$1"} style={{ alignSelf: 'center', marginLeft: 5, color: COLORS.primary, fontWeight: '700' }} />
            <TextInput keyboardType="numeric" cursorColor={COLORS.grayDark} value={phone} style={{ color: COLORS.grayDark, marginLeft: 10, width: '100%' }} onChangeText={setPhone} />
        </View>
        <View style={{ flexDirection: 'row', width: '100%', backgroundColor: COLORS.primaryFaint, paddingHorizontal: 5, paddingVertical: 10, borderRadius: 10, marginTop: 10, overflow: 'hidden' }} >
            <Lock size={"$1"} style={{ alignSelf: 'center', marginLeft: 5, color: COLORS.primary, fontWeight: '700' }} />
            <TextInput cursorColor={COLORS.grayDark} value={password} style={{ color: COLORS.grayDark, marginLeft: 10, width: '100%' }} onChangeText={setPassword} />
        </View>
        <TouchableOpacity onPress={()=>{
            signUp(email,password)
        }} style={styles.btnStyle}>
            <SizableText size={"$5"} fontWeight={"600"} style={{ color: COLORS.white, textAlign: 'center' }} >Submit</SizableText>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
            <SizableText>Already have an account?</SizableText>
            <TouchableOpacity onPress={()=>{
                navigation.navigate("LoginScreen");
            }} >
                <SizableText style={{color: COLORS.primary, fontWeight: 'bold' }}> Login</SizableText>
            </TouchableOpacity>
        </View>
    </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.white
    },
    btnStyle:{
        width: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginTop: 10
    }});
export default SignupScreen;