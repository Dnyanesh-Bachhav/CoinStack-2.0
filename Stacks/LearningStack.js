import react from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LearningScreen from '../screens/LearningScreen';
const LearningScreenStack = createNativeStackNavigator();
function LearningStack(){
    return(
        <LearningScreenStack.Navigator>
            <LearningScreenStack.Screen name="BasketsScreen" component={LearningScreen} 
            options={{
                headerShown: false,
            }}
            />
            
        </LearningScreenStack.Navigator>
    );
}

export default LearningStack;