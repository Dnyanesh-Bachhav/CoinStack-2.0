import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../constants";
import { memo } from "react";

function FilterComponent({ filterDay, filterText, selectedRange, setSelectedRange }){
    const isFilterSelected = (filter)=>filter===selectedRange;
    return(
        <TouchableOpacity style={{backgroundColor: isFilterSelected(filterDay) ? COLORS.primary : COLORS.primaryFaint, ...styles.filter}} onPress={()=>{
            setSelectedRange(filterDay);
        }} >
            <Text style={{ color: isFilterSelected(filterDay) ? COLORS.white : COLORS.black, fontWeight: 500 }}>{filterText}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    filter:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        paddingVertical: 3,
        paddingHorizontal: 12,
        elevation: 5
      }
})
export default memo(FilterComponent);