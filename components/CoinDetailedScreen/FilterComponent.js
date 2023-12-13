import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../constants";
import { memo } from "react";

function FilterComponent({ filterDay, filterText, selectedRange, setSelectedRange }){
    const isFilterSelected = (filter)=>filter===selectedRange;
    return(
        <TouchableOpacity style={{backgroundColor: isFilterSelected(filterDay) ? COLORS.primary : COLORS.white, ...styles.filter}} onPress={()=>{
            setSelectedRange(filterDay);
        }} >
            <Text style={{ color: isFilterSelected(filterDay) ? COLORS.white : COLORS.black }}>{filterText}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    filter:{
        
        borderRadius: 40,
        paddingVertical: 7,
        paddingHorizontal: 20,
        elevation: 5
      }
})
export default memo(FilterComponent);