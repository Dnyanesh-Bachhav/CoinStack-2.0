import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../components/constants";

function LearningScreen(){
    return(
        <View>
            <Text>Learning Screen</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLORS.white,
    }
});
export default LearningScreen;