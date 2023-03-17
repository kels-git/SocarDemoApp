import React from 'react'
import {
    TouchableOpacity,
    View,
    Text,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
const PrimaryButttonComponent = (props) => {

    return (
        <View>
            <TouchableOpacity style={{
                marginHorizontal: props.rentCar ? 44 : 30, marginTop: props.rentCar ? 20 : 50, marginBottom: 20,
                backgroundColor: props.rentCar ? "#ffffff" : '',
                paddingLeft: 15,
                paddingRight: 15,
                borderRadius: 15,
                borderColor: props.rentCar ? '#4c669f' : "#3b5998",
                borderWidth: props.rentCar ? 2 : 0
            }}
                onPress={props.onPress}>

                <LinearGradient colors={props.rentCar ? ["#ffffff", "#ffffff"] : ['#2193b0', '#6dd5ed']}
                    style={{
                        borderRadius: 15
                    }}>

                    <Text style={{
                        fontSize: 18,
                        textAlign: 'center',
                        margin: 10,
                        color: props.rentCar ? "#000000" : '#ffffff',
                        backgroundColor: 'transparent',
                        fontWeight: 'bold'
                    }}>
                        {props.label || 'Submit'}
                    </Text>

                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}

export default PrimaryButttonComponent
