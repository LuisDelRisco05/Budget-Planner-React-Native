import { useEffect, useState } from "react";
import { Alert, Image, Pressable, SafeAreaView, StyleSheet, View, Modal, ScrollView } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Header, NewBudget } from "./src/components";
import { BudgetControl } from "./src/components/BudgetControl";
import { ExpenseForm } from "./src/components/ExpenseForm";
import { ListExpense } from "./src/components/ListExpense";



const App = () => {

  const [ isValidBudget, setIsValidBudget ] = useState(false) //TODO validar Presupuesto
  const [ budget, setBudget ] = useState(0) //* Presupuesto
  const [ expenses, setExpenses] = useState([]) //! Gastos
  const [ expense, setExpense] = useState({}) //! Gasto
  const [ openModal, setOpenModal] = useState(false)

  
  useEffect(() => {

    const getBudget = async () => {
          //* obtener el prosupuesto de Storage
      try {
        const budgetStorage = await AsyncStorage.getItem('Budget_planner') ?? 0

        if( budgetStorage > 0){
          setBudget(budgetStorage) //* el prosupuesto obtenido del storage y actualizando el state budget
          setIsValidBudget(true)

        } 

      } catch (error) {
        console.log("🚀 ~ file: App.jsx ~ line 28 ~ getBudget ~ error", error)
        
      }
    }
    getBudget()
  }, [])
  

  useEffect(() => {
          //* almacenar en Storage el presupuesto (budget)
    if( isValidBudget ){
      const saveBudgetStorage = async () => {
          try {
            
            await AsyncStorage.setItem('Budget_planner',  budget )

          } catch (error) {
            
          }
      }
      saveBudgetStorage()
    }

  
  }, [ isValidBudget ])

  useEffect(() => {

    const getExpensesStorage = async () => {

      try {
        const getExpenses = await AsyncStorage.getItem('Expense_planner') ?? []

        if( JSON.parse( getExpenses ).length > 0){
          setExpenses(JSON.parse(getExpenses))

          // console.log('getExpenses', getExpenses);
        }
      } catch (error) {
        console.log("🚀 ~ file: App.jsx ~ line 88 ~ getExpensesStorage ~ error", error)
        
      }
    }

    getExpensesStorage()
    
  }, [])

  useEffect( () => {
        //* Gastos en Storage
      const saveExpensesStorage = async () => {

        try {
          await AsyncStorage.setItem('Expense_planner', JSON.stringify( expenses ))
          
        } catch (error) {
          console.log("🚀 ~ file: App.jsx ~ line 69 ~ saveExpensesStorage ~ error", error)
          
        }

      }
      saveExpensesStorage()

  }, [ expenses ])


  
  

  const handleNewBudget = (budget) => {
    if(budget > 0){
      setIsValidBudget(true);
    }else {
      Alert.alert('Error','invalid budget')
    }
  }

  const handleExpense = expenseItem => { 
  
    if( Object.values( expenseItem ).includes('') ){ 
      Alert.alert('Error', 
        'All fields are required',
        [{ text: 'I get it!'}]
        )

      return
    } 

    

    if(Object.keys(expense).length > 0){
      const updateExpenses = expenses.map( exp => {
        return exp.id === expenseItem.id ? expenseItem : exp
      })

      setExpenses(updateExpenses);
      setOpenModal(false);
      setExpense({});
      // console.log('desde edit', updateExpenses);
      return
    }

    
    setExpenses([...expenses, expenseItem]);
    setOpenModal(false)
    
    
  }

  const resetApp = () => {
    Alert.alert(
      'Warning',
      'Are you sure to restart the app?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Accept', onPress: async() => {
          try {
            await AsyncStorage.clear()
            setIsValidBudget(false)
            setBudget(0)
            setExpenses([])
            console.log('Eliminandoo');
          } catch (error) {
            console.log("🚀 ~ file: App.jsx ~ line 155 ~ {text:'Accept',onPress:async ~ error", error)
            
          }
        }}
      ]
    )
  }

  return (
    <SafeAreaView style={ styles.container }>

      <ScrollView>
      
        <Header />

        { isValidBudget 
          ? ( 
                <View style={{ height: 250 }}>
                  <BudgetControl
                    budget={ budget }
                    expenses={ expenses }
                    resetApp={ resetApp }
                  />
                  
                </View>
            )

          : (
                <NewBudget 
                  budget={ budget }
                  setBudget={ setBudget }
                  handleNewBudget={handleNewBudget} 
                />
            )
          
        }
        

        { isValidBudget  && 
          (
            <ListExpense 
              expenses={ expenses } 
              setOpenModal={ setOpenModal } 
              setExpense={ setExpense } 
              setExpenses={ setExpenses }
            />
          )
        }
      </ScrollView>

      { isValidBudget  &&
          (
            
              <Pressable
                onPress={ () => setOpenModal(true) }
                style={ styles.btnAdd }
              >
                <Image
                  source={ require('./src/assets/img/nuevo-gasto.png')}
                  style={ styles.btnImg }
                />
              </Pressable>
         
          )
        }

      {
        openModal && 
        (
          <Modal 
            animationType="fade"
            visible={openModal}
            transparent={true}
          >
           <ExpenseForm 
              setOpenModal={ setOpenModal } 
              handleExpense={ handleExpense } 
              expense={ expense }
              setExpense={ setExpense }
            />
            
          </Modal>
        )
      }

      
      
    </SafeAreaView>
  )
}

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    
  },
  btnAdd:{
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 500,
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    
    elevation: 9,
  },
  btnImg: {
    width: 70, 
    height: 70,
  },


})
