import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../screens/OnboardingScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
const Stack = createNativeStackNavigator();
function AuthStack(){
    return(
        <>
        <Stack.Navigator>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{
                headerShown: false
            }} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{
                headerShown: false
            }} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} options={{
                headerShown: false
            }} />
        </Stack.Navigator>
        </>
    );
}
export default AuthStack;