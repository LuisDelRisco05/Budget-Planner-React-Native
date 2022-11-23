import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
;



export const NewBudget = ({ budget, setBudget, handleNewBudget }) => {
    

  return (
   
        <View style={ styles.container }>

            <Text style={ styles.text }>Define Budget</Text>

            <TextInput
                style={ styles.input } 
                placeholder="0"
                keyboardType='numeric'
                value={ budget }
                onChangeText={ setBudget }
                
            />

            <Pressable
                onPress={ () => handleNewBudget(budget) }
                style={ styles.btn }
            >
                <Text style={ styles.textPress }>Add Budget</Text>
            </Pressable>

        </View>
   
  )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DA2AAD',
        borderRadius: 10,
        marginHorizontal: 30,
        marginTop: 5,
        paddingVertical: 30,
        transform: [{ translateY: -150 }],
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        
        elevation: 9,
        zIndex: 2,
        borderBottomWidth: 1.8,
        borderLeftWidth: 0.3,
        borderRightWidth: 0.3,
        borderColor:'#9C9C9C',
    },
    text:{
        color: '#FFF',
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginHorizontal: 10,
        textAlign: 'center'
    },
    btn: {
        backgroundColor: '#0082FA',
        borderRadius: 5,
        marginHorizontal: 10,
        marginTop: 15,
        paddingVertical: 7,
    },
    textPress: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
    },
})

