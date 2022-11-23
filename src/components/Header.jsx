import { StyleSheet, Text, View } from "react-native";
import { NewBudget } from "./NewBudget";


export const Header = () => {
  return (
    <View style={ styles.header }>
        <Text style={ styles.text }>Budget planner</Text>
        
    </View>
  )
};

const styles = StyleSheet.create({
    header:{
        backgroundColor: '#0082FA',
        paddingVertical: 170,

    },
    text: {
        color:'#FFF',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '700',
        position: 'absolute',
        right: 100,
        top: 40
    }
})