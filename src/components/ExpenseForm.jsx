import { useEffect, useState } from "react"
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"

import { Picker } from "@react-native-picker/picker";
import Icon  from "react-native-vector-icons/Ionicons"

import { generateId } from "../helpers";


export const ExpenseForm = ({ setOpenModal, handleExpense, expense, setExpense }) => {

  
  

  const [ form, setForm] = useState({
    id: generateId(),
    expenseName: '',
    amountSpent: '',
    expenseCategory: '',
    date: Date.now()
  });

  useEffect(() => {
    if( expense?.expenseName ) {
    setForm({
      id: expense.id,
      expenseName: expense.expenseName,
      amountSpent: expense.amountSpent,
      expenseCategory: expense.expenseCategory,
      date: expense.date
    })
  }
    
  }, [expense])

  const { expenseName, amountSpent, expenseCategory } = form;

  const handleChange = (field , value) => {
    setForm({
      ...form,
        [field]: value
    })
    
  }

  // const completeForm = () => {
    
  //   setOpenModal(!openModal)
  // }

  return (

    <View style={ styles.containerModal }>
        <Pressable 
          style={styles.icon}
          onPress={ () => {
            setOpenModal(false);
            setExpense({})
          
          }}
        >
          <Icon 
            name="close-outline"
            size={ 30 }
            color="#0E83D0"
          />
        </Pressable>

        <View style={ styles.modalForm }>  

          <Text style={ styles.titleModal }>Expense Form</Text>

          <View style={ styles.containerInput }>
              <Text style={{ fontSize: 15, fontWeight: '700', color: '#FFF'}}>Expense Name</Text> 

              <TextInput
                placeholder="Ej. Food" 
                value={ expenseName }
                onChangeText={ value => handleChange('expenseName', value ) }
                style={ styles.Textinput }
              />    

          </View>

          <View style={ styles.containerInput }>
              <Text style={{ fontSize: 15, fontWeight: '700', color: '#FFF'}}>Amount Spent</Text> 

              <TextInput
                placeholder="Ej. 300" 
                value={ amountSpent }
                onChangeText={ value => handleChange('amountSpent', value ) }
                style={ styles.Textinput }
                keyboardType='numeric'
              />    

          </View>

          <View style={ styles.containerSelect }>
              <Text style={{ fontSize: 15, fontWeight: '700', color: '#FFF'}}>Expense Category</Text> 

              <Picker 
                onValueChange={ value => handleChange('expenseCategory', value )}
                selectedValue={ expenseCategory }
                style={{ backgroundColor: '#FFF', marginVertical: 25, width: 200, marginHorizontal: 60}}
              >
                    <Picker.Item label="-- selecct --" value="" style={{ color: '#9BA1A6'}} />
                    <Picker.Item label="savings" value="savings" />
                    <Picker.Item label="food" value="food" />
                    <Picker.Item label="health" value="health" />
                    <Picker.Item label="house" value="house" />

              </Picker>   

          </View>

          <Pressable 
            style={ styles.btnAdd }
            onPress={ () => {
              handleExpense(form)
            } }
          >
            <Text style={ styles.btnText }>Add </Text>
          </Pressable>

        </View>
    </View>
  )
}

const styles = StyleSheet.create({ 
    containerModal: { 
        backgroundColor: '#F0FFFF', 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.9
      },
      modalForm: { 
        backgroundColor: '#1E40AF', 
        width: 350, 
        height: 540,
        borderRadius: 10,
        paddingHorizontal: 15
    },
    titleModal: {
      textAlign: 'center',
      marginTop: 30,
      color: '#FFF',
      fontSize: 20
    },
    icon: {
      position: 'absolute',
      top: 20,
      right: 25,
    },
    containerInput:{
      marginTop: 20
    },
    containerSelect:{
      marginVertical: 30,
    },
    Textinput: {
      backgroundColor: '#FFF',
      marginTop: 5,
      borderRadius: 10
    },
    btnAdd:{
      backgroundColor: '#8BB43C',
      marginTop: 20,
      paddingVertical: 15,
      borderRadius: 5
    },
    btnText: {
      textAlign: 'center',
      color: '#FFF',
      fontSize: 20,
      fontWeight: '800'
    }
})