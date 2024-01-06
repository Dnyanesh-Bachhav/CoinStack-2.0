import { useContext, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../Contexts/AuthProviderContext";

function LoginScreen(){
    const[ email, setEmail ] = useState();
    const[ password, setPassword ] = useState();
    const { signUp } = useContext(AuthContext);
    return(
        <View>
            <Text>Login Screen</Text>
            <Text>Email</Text>
            <TextInput onChangeText={setEmail} />
            <Text>Password</Text>
            <TextInput onChangeText={setPassword} />
            <TouchableOpacity onPress={()=>signUp(email,password)}>
                <Text>Submit</Text>
            </TouchableOpacity>
        </View>
    );
}
export default LoginScreen;