import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    View,
    Image,
} from 'react-native';
import {
    images,
} from '../../Constants';
import PrimaryButttonComponent from '../../Components/PrimaryButtonComponent';

const IndexWelcomeContainer = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: "#ffffff", flex: 1 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                    <Image
                        source={images.logoSocar}
                        style={{
                            width: 100, height: 100,
                        }}
                        resizeMode={'contain'}
                    />

                    <Text style={{ marginBottom: 30, fontSize: 24, fontWeight: 'bold', color: '#0077B6' }}>SOCAR</Text>
                    <Image
                        source={images.yaris}
                        style={{
                            width: 140,
                            height: 140, borderRadius: 140 / 2, borderColor: '#0077B6', borderWidth: 2
                        }}
                        resizeMode={'contain'}
                    />
                </View>

                <View style={{}}>
                    <PrimaryButttonComponent
                        label="Post a car"
                        onPress={() => { navigation.navigate('PostACar') }}
                    />
                    <View
                        style={{
                            backgroundColor: '#0077B6',
                            borderColor: "#4c669f",
                            borderWidth: 1,
                            marginHorizontal: 30
                        }}
                    />
                    <PrimaryButttonComponent
                        label="Rent a car"
                        onPress={() => { navigation.navigate('Root', { screen: 'CarRent' }) }}
                        rentCar
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default IndexWelcomeContainer
