import { StyleSheet, Text, View } from "react-native"
import { Picker } from "@react-native-picker/picker"


export const Filter = () => {
  return (
    <View style={styles.container}>

        <Text style={{ fontSize: 20, fontWeight: '900'}}>Data Filtering</Text>

        <Picker         
        >
            <Picker.Item label="-- selecct --" value="" style={{ color: '#9BA1A6'}} />
            <Picker.Item label="savings" value="savings" />
            <Picker.Item label="food" value="food" />
            <Picker.Item label="health" value="health" />
            <Picker.Item label="house" value="house" />

        </Picker> 
        
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        width: 320, 
        height: 120,
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
        justifyContent:'center',
      
    
    }
})
