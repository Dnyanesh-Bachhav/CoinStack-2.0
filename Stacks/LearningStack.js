import react from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LearningScreen from '../screens/LearningScreen';
import DetailLearningScreen from '../screens/DetailLearningScreen';
const LearningScreenStack = createNativeStackNavigator();
function LearningStack(){
    return(
        <LearningScreenStack.Navigator>
            <LearningScreenStack.Screen name="LearningScreen" component={LearningScreen} 
            options={{
                headerShown: false,
            }}
            />
            <LearningScreenStack.Screen name="DetailLearningScreen" component={DetailLearningScreen} 
            options={{
                headerShown: false,
            }}
            />
            
        </LearningScreenStack.Navigator>
    );
}

export default LearningStack;