import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native"
import { Expense } from "./Expense"
import { Filter } from "./Filter"


export const ListExpense = ({ expenses, setOpenModal, setExpense, setExpenses }) => {

    // console.log(JSON.stringify(expenses, null, 3));

    const handlePress = id => {
        
        Alert.alert(
            'Warning', 
            'Are you sure you want to delete?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Accept', onPress: () => {
                    const deleteExpense = expenses.filter( exp => exp.id !== id )
                    setExpenses(deleteExpense)
                }}
            ]
        )
    }
    
  return (

    <View style={ styles.container }>
        { expenses.length === 0 && <Text style={{ fontSize: 20, fontWeight: '800' }}>There are no expenses</Text>}

        { expenses.length > 0  && (
            <>
                {/* <Filter /> */}
                <Text style={{ fontSize: 25, fontWeight: '800', marginBottom: 5 }}>Expenses</Text>
            </>
        )}
        { 
            expenses.map( expense => (
                <Pressable 
                    key={ expense.id }
                    onLongPress={ () => {
                        setOpenModal(true)
                        setExpense(expense)
                    }}
                >
                    <Expense  expense={ expense } handlePress={ handlePress } />
                </Pressable>
            ))
        }
    </View>

  )
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        flex: 1,
        paddingBottom: 50
    }
})
