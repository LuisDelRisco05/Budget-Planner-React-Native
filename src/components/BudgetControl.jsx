import { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, Pressable } from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator';
import { formatAmount } from '../helpers';


export const BudgetControl = ({ budget, expenses, resetApp }) => {

    const [ available, setAvailable ] = useState(0) //* Disponible
    const [ spent, setSpent ] = useState(0) //! Gastó
    const[ percentage, setPercentage ] = useState(0)

    useEffect(() => {

        const totalExpenses = expenses.reduce( (total, expense) =>  
        Number(expense.amountSpent) + total, 0 ) 

        const TotalAvailable = budget - totalExpenses 

       //* para porcentaje
        const loadPercentage = (
            ((budget - TotalAvailable) / budget) * 100
        )

        setTimeout(() => {
            setPercentage(loadPercentage)    
        }, 1000);
       
        setAvailable( TotalAvailable )
        setSpent( totalExpenses );
        

    }, [expenses])
    
const colorsPercentage = () => {
    if(percentage >= 70){
        return '#DC143C'
    }
    if(percentage < 70 && percentage > 30 ){
        return '#FFD700'
    }
    if(percentage <= 30 ){
        return '#228B22'
    }
}

  return (

    <View style={ styles.container }>
        <View style={ styles.containerImg }>
            <CircularProgress 
                value={ percentage }
                duration={ 1500 }
                radius={ 90 }
                valueSuffix='%'
                title='Spent'
                inActiveStrokeColor='#F5F5F5'
                inActiveStrokeWidth={ 15 }
                activeStrokeColor={colorsPercentage()}
                activeStrokeWidth={ 15 }
                titleStyle={{ fontWeight: '700', fontSize: 20, color: '#64748B' }}
            />
        </View>
        <Pressable 
            style={ styles.btnReset }
            onLongPress={ resetApp }
        >
            <Text style={{ color: '#FFF', fontWeight: 'bold' }}>RESET APP</Text>
        </Pressable>

        <View style={styles.containerMoney}>
            <Text style={ styles.textPrimary }>Budget: </Text>
            <Text style={ styles.amount}>{ formatAmount(budget) }</Text>
        </View>

        <View style={styles.containerMoney}>
            <Text style={ styles.textPrimary }>available: </Text>
            <Text style={ styles.amount}>{ formatAmount(available) }</Text>
        </View>

        <View style={styles.containerMoney}>
            <Text style={ styles.textPrimary }>spent: </Text>
            <Text style={ styles.amount}>{ formatAmount(spent) }</Text>
        </View>

    </View>

  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginHorizontal: 30,
        padding: 30,
        transform: [{ translateY: -200 }],
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        
        elevation: 9,
        zIndex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        height: 430,
    },
    containerImg:{
        height: 240 ,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerMoney: {
        marginTop: 5,
        flexDirection: 'row',
        width: 150,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textPrimary: { 
        color: '#0E83D0', 
        fontSize: 17, 
        fontWeight: '700'
    },
    amount:{
        fontSize: 18,
        fontWeight: '800'
    },
    btnReset: {
        backgroundColor: '#DA2AAD',
        width: 250,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10
    }
});
