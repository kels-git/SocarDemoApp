import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { FloatingAction } from "react-native-floating-action";


const IndexSettingScreen = ({ navigation }) => {
    const actions = [
        {
            text: "Go Back",
            icon: require("../../Assets/Image/left.png"),
            name: "bt_goback",
            position: 1
        },
    ]

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#184461' }}>
            <Text style={{ fontSize: 18, color: 'white' }}>Setting Screen</Text>
            <View style={{
                position: 'absolute',
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                right: 20,
                bottom: 50,
            }}>
                <FloatingAction
                    actions={actions}
                    onPressItem={name => {
                        console.log(`selected button: ${name}`);
                        navigation.goBack()
                    }}
                    position={'right'}
                    floatingIcon={<Image
                        source={require("../../Assets/Image/left.png")}
                        style={{ width: 30, height: 30 }}
                        color={'#184461'}
                    />}
                />
            </View>
        </View>
    )
}

export default IndexSettingScreen