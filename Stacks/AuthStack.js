import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../screens/OnboardingScreen";

const Stack = createNativeStackNavigator();
function AuthStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{
                headerShown: false
            }} />
        </Stack.Navigator>
    );
}
export default AuthStack;