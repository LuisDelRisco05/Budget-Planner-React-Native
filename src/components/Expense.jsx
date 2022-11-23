import { Image, Pressable, StyleSheet, Text, View } from "react-native"
import Icon  from "react-native-vector-icons/Ionicons";
import { formatAmount, formatDate } from "../helpers";


export const Expense = ({ expense, handlePress }) => {

    const dictionaryIcons = {
      savings: require('../assets/img/icono_ahorro.png'),
      food: require('../assets/img/icono_comida.png'),
      health: require('../assets/img/icono_salud.png'),
      house: require('../assets/img/icono_casa.png'),
    }

    const { expenseName, amountSpent, expenseCategory, date, id } = expense;

    

  return (

    <View style={ styles.container}>

        <Pressable 
          style={ styles.icon }
          onPress={ () => handlePress(id) }
        >
          <Icon 
            name="close-outline"
            size={ 25 }
            color="#FFF"
            
          />
        </Pressable>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

          <Image 
            source={ dictionaryIcons[expenseCategory] }
            style={{ width: 70, height: 70, marginRight: 10 }}
          />
          <View>
            <Text style={ {...styles.text, textTransform: 'uppercase', fontSize: 12 }}>{ expenseName }</Text>
            <Text style={ {...styles.text, fontSize: 20 } }>{ expenseCategory }</Text>
            <Text style={ {...styles.text, fontSize: 12 } }>{ formatDate(date) }</Text>
          </View>

        </View>


        <View>  
          <Text style={ {...styles.text, fontSize: 20} }>{ formatAmount( amountSpent ) }</Text>
        </View>

        
        
    </View>
  )
}

const styles = StyleSheet.create({
  container: { 
    backgroundColor: '#23A9F2', 
    width: 320, 
    height: 100,
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
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center'
  },
  text:{
    color: '#FFF',
    fontWeight: '700'
  },
  icon: {
    position:'absolute',
    top: 6,
    right: 12
  }
});


