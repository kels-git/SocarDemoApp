import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    Pressable,
    StyleSheet,
    Dimensions
} from 'react-native';

import {
    images,
} from '../../Constants';
import { FloatingAction } from "react-native-floating-action";


const { width, height } = Dimensions.get('window');
const CARD_HEIGHT = 200;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSERT = width * 0.1 - 10;

const IndexPostCarDetailScreen = ({ navigation, route }) => {
    const { carName, location, price, fuelPump, distance, time, booked, imageUrl } =
        route.params;

    const actions = [
        {
            text: "Go Back",
            icon: require("../../Assets/Image/left.png"),
            name: "bt_goback",
            position: 1
        },
    ]

    return (
        <>
            <View style={{ marginTop: 60, flex: 1, }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.card}>
                        <Image
                            source={{ uri: imageUrl }}
                            style={{ width: 200, height: 200 }}
                            resizeMode={'contain'}
                        />
                    </View>
                    <View style={styles.card}>
                        <View>
                            <Text style={styles.carNames}>{carName}</Text>
                        </View>
                        <View>
                            <View style={styles.bottomItems}>
                                <Text style={styles.textLocation}>{location}</Text>
                                <Text style={styles.textPrice}>{`RM${price}`}</Text>
                            </View>
                            <View style={styles.itemBottom}>
                                <View style={styles.bottomItemsView}>
                                    <Text style={styles.textCardStyle}>{fuelPump}</Text>
                                </View>
                                <View style={styles.bottomItemsView}>
                                    <Image
                                        source={images.mapPinCard}
                                        style={styles.imageCardStyle} />
                                    <Text style={styles.textCardStyle}>{distance}</Text>
                                </View>
                                <Text style={styles.time}>{time}</Text>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Pressable style={{ backgroundColor: '#2193b0', padding: 8, borderRadius: 10, marginBottom: 10 }}
                                disable={true}
                            >
                                <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: 'bold' }}>{booked}</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View style={{
                    position: 'absolute',
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    right: 20,
                    bottom: 20,
                }}>
                    <FloatingAction
                        actions={actions}
                        onPressItem={name => {
                            console.log(`selected button: ${name}`);
                            navigation.goBack()
                        }}
                        position={'right'}
                        floatingIcon={
                        <Image
                            source={require("../../Assets/Image/left.png")}
                            style={{ width: 30, height: 30 }}
                            color={'#184461'} />
                        }
                    />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    map: {
        height: '100%'
    },

    bubble: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 15,
        width: 150
    },
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#ffffff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32,

    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5
    },

    name: {
        fontSize: 16,
        marginBottom: 5,
        color: 'blue'
    },
    image: {
        width: 50,
        height: 50,
    },
    scrollview: {
        position: 'absolute',
        //bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
        // marginBottom: 40

    },
    endPadding: {
        paddingRight: width - CARD_WIDTH
    },
    card: {
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 1,
        marginVertical: 8,
        shadowOffset: {
            width: 0,
            height: 4,
        },

        backgroundColor: "#ffffff",
        borderRadius: 15,
        marginHorizontal: 10,
        shadowRadius: 5,
        //shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: 'hidden',

        justifyContent: 'center',
        alignItems: 'center'
    },
    cardImage: {
        flex: 3,
        width: "80%",
        height: "80%",
        alignSelf: 'center'
    },
    textContent: {
        flex: 2,
        padding: 10
    },
    cardTitle: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    cardDescription: {
        fontSize: 12,
        color: "#444"
    },
    markerWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
    },
    marker: {
        width: 30,
        height: 30
    },
    button: {
        alignItems: 'center',
        marginTop: 5
    },
    carNames: {
        color: '#495057',
        fontSize: 18,
        fontWeight: 'bold',
        paddingLeft: 20,
        paddingTop: 10
    },

    bottomItems: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15
    },

    textLocation: {
        color: '#495057',
        fontSize: 16,
        fontWeight: '400'
    },

    textPrice: {
        color: '#00509D',
        fontSize: 20,
        fontWeight: 'bold'
    },
    bottomItemsView: {
        flexDirection: 'row',
        marginStart: 13,
        marginBottom: 10,


    },
    imageCardStyle: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    textCardStyle: {
        color: '#495057',
        fontSize: 16,
        fontWeight: '600',
        marginStart: 3
    },
    itemBottom: {
        flexDirection: 'row'
    },
    time: {
        fontSize: 11,
        fontWeight: '400',
        marginStart: 18
    }


});

export default IndexPostCarDetailScreen