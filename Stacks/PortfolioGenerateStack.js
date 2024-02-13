import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../screens/OnboardingScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import PortfolioGenerationScreen from "../screens/PortfolioGenerationScreen";
import GeneratedPortfolioScreen from "../screens/GeneratedPortfolioScreen";
const Stack = createNativeStackNavigator();
function PortfolioGenerateStack(){
    return(
        <>
        <Stack.Navigator>
            <Stack.Screen name="PortfolioGenerationScreen" component={PortfolioGenerationScreen} options={{
                headerShown: false
            }} />
            <Stack.Screen name="GeneratedPortfolioScreen" component={GeneratedPortfolioScreen} options={{
                headerShown: false
            }} />
        </Stack.Navigator>
        </>
    );
}
export default PortfolioGenerateStack;