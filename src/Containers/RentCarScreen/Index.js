import React, { useEffect, useRef, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Dimensions,
    Animated,
} from 'react-native';
import {
    images,
} from '../../Constants';
import { showMessage } from 'react-native-flash-message'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import {
    collection,
    firestore,
    getDocs,
    updateDoc,
    doc
} from '../../../config'
import LoadingComponent from '../../Components/LoadingComponent';
import { useIsFocused } from '@react-navigation/native';
import { FloatingAction } from "react-native-floating-action";
import ConfirmationPopupComponent from '../../Components/ConfirmationPopupComponent';

const { width, height } = Dimensions.get('window');
const CARD_HEIGHT = 200;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSERT = width * 0.1 - 10;

const IndexRentCarScreen = ({ navigation }) => {
    const [carListData, setCarListData] = useState([]);
    const isFocused = useIsFocused();
    let mapIndex = 0;
    let mapAnimation = new Animated.Value(0);

    const actions = [
        {
            text: "Go Back",
            icon: require("../../Assets/Image/left.png"),
            name: "bt_goback",
            position: 1
        },
    ]

    useEffect(() => {
        if (isFocused) {
            setIsLoading(true)
            fetchCars();
        } else {
            console.log('screenfocued === false');
        }

    }, [getDocs, collection, isFocused]);



    const fetchCars = async () => {
        try {
            setIsLoading(true)
            const carsSnapshot = await getDocs(collection(firestore, 'postCar'));
            const carsList = carsSnapshot.docs.map(doc => ({ ...doc.data(), 'documentId': doc.id }));
            let arr = carsList.map((item, index) => {
                item.isSelected = false;
                return { ...item };
            });
            console.log(arr);
            setCarListData(arr);
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    const initiaMapState = {
        carListData,
        region: {
            latitude: 3.152815,
            longitude: 101.703651,
            latitudeDelta: 0,
            longitudeDelta: 0.2,
        }
    }

    const [mapDataView, setMapDataView] = useState(initiaMapState);
    const _map = useRef(null);
    const _ScrollView = useRef(null);
    const [rentACar, setRentACar] = useState('Rent a car');
    const [isloading, setIsLoading] = useState(true);
    const [showBookedModal, setShowBookedModal] = useState(false);

    useEffect(() => {
        mapAnimation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3)

            if (index > carListData.length) {
                index = carListData.length - 1;
            }
            if (index < 0) {
                index = 0
            }

            clearTimeout(regionTimeOut);

            const regionTimeOut = setTimeout(() => {
                if (mapIndex === index) {
                    mapIndex = index;
                    const { coordinate } = carListData[index]
                    _map.current.animateToRegion(
                        {
                            coordinate,
                            latitudeDelta: mapDataView.region.latitudeDelta,
                            longitudeDelta: mapDataView.region.longitudeDelta
                        },
                        350
                    )
                }
            }, 10)
        });
    });

    const interpolations = carListData.map((marker, index) => {
        const inputRange = [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            ((index + 1) * CARD_WIDTH)
        ];


        const scale = mapAnimation.interpolate({
            inputRange,
            outputRange: [1, 1.5, 1],
            extrapolate: 'clamp',
        })

        return { scale };
    });

    const onMarkerPress = (mapEventData) => {
        const markerID = mapEventData._targetInst.return.key;
        let x = (markerID * CARD_WIDTH) + (markerID * 20);
        _ScrollView.current.scrollTo({ x: x, y: 0, Animated: true })
    }

    const makeBookingReservation = async (item, index) => {
        try {
            console.log('itemakeBookingReservationm-->', item)

            await updateDoc(doc(firestore, 'postCar', item.documentId), { booked: true }).then((value) => {
                showMessage({
                    message: `Thank you user! \nBooking reservation was successful! `,
                    backgroundColor: 'green',
                    duration: 3000,
                    color: 'white',
                });
                fetchCars();
            });
        } catch (error) {
            console.log(error)
        }
    }

    // console.log('initiaMapState-->', initiaMapState);

    return isloading ?
        (
            <LoadingComponent />
        ) : (
            <View style={{ flex: 1 }}>



                <ConfirmationPopupComponent
                    visibility={showBookedModal}
                    dismissModal={() => setShowBookedModal(false)}
                    title={`We are sorry!\n\n`}
                    message={`This Car is already Booked!\nKindly select a different car listed in the App\n\n`}
                    confirmAction={() => setShowBookedModal(false)}
                    rejectActionRequired={false}
                    confirmActionRequired={true} />



                <MapView
                    ref={_map}
                    initialRegion={mapDataView.region}
                    style={styles.map}
                //   provider={PROVIDER_GOOGLE}
                >
                    {carListData.map((marker, index) => {
                        const scaleStyle = {
                            transform: [
                                {
                                    scale: interpolations[index].scale,
                                },
                            ],
                        };

                        return (<>
                            <Marker key={index} coordinate={marker.coordinate}
                                onPress={(e) => onMarkerPress(e)}>
                                <Animated.View style={styles.markerWrap}>
                                    <Animated.Image
                                        source={require('../../Assets/Image/location-pin.png')}
                                        style={[scaleStyle, styles.marker]}
                                        resizeMode={'contain'}
                                    />
                                </Animated.View>
                            </Marker>

                        </>
                        )
                    })}

                </MapView>

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

                <Animated.ScrollView
                    ref={_ScrollView}
                    horizontal
                    scrollEventThrottle={1}
                    showsHorizontalScrollIndicator={false}
                    style={styles.scrollview}
                    pagingEnabled
                    snapToInterval={CARD_WIDTH + 20}
                    snapToAlignment={'center'}
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: {
                                        x: mapAnimation
                                    }
                                }
                            }
                        ],
                        { useNativeDriver: true }
                    )}
                >

                    {carListData.map((markerItem, index) => (

                        <TouchableOpacity
                            activeOpacity={0.9}
                            key={index}
                            onPress={() => {
                                navigation.navigate('PostACar-Details', {
                                    carName: markerItem.carType,
                                    location: markerItem.carLocation,
                                    price: markerItem.amount,
                                    fuelPump: markerItem.fuelPercentage,
                                    booked: markerItem.booked ? "Booked" : rentACar,
                                    imageUrl: markerItem.imageUri,
                                    distance: `11.5km`,
                                    time: `For 1 hour, 0 minute`,
                                })
                            }
                            }>

                            <View style={styles.card} key={markerItem.id}>

                                <View>
                                    <Text style={styles.carNames}>{markerItem.carType}</Text>
                                </View>
                                <Image
                                    source={{ uri: markerItem.imageUri }}
                                    style={styles.cardImage}
                                    resizeMode={'contain'} />

                                <View>
                                    <View style={styles.bottomItems}>
                                        <Text style={styles.textLocation}>{markerItem.carLocation}</Text>
                                        <Text style={styles.textPrice}>{`RM${markerItem.amount}:00`}</Text>
                                    </View>

                                    <View style={styles.itemBottom}>
                                        <View style={styles.bottomItemsView}>
                                            <Image
                                                source={images.gasStation}
                                                style={styles.imageCardStyle} />

                                            <Text style={styles.textCardStyle}>{`${markerItem.fuelPercentage}%`}</Text>

                                        </View>

                                        <View style={styles.bottomItemsView}>
                                            <Image
                                                source={images.mapPinCard}
                                                style={styles.imageCardStyle} />

                                            <Text style={styles.textCardStyle}>{`11.5km`}</Text>

                                        </View>

                                        <Text style={styles.time}>{`For 1 hour, 0 minute`}</Text>

                                    </View>

                                </View>

                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                                    <TouchableOpacity style={{ backgroundColor: '#2193b0', padding: 8, borderRadius: 10, marginBottom: 10 }}
                                        onPress={() => {

                                            if (markerItem.booked) {
                                                setShowBookedModal(true)
                                                return;
                                            } else {
                                                makeBookingReservation(markerItem, index)
                                            }
                                        }}
                                    >
                                        <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: 'bold' }}>{markerItem.booked ? "Booked" : rentACar}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}

                </Animated.ScrollView>

            </View>

        )
}

const styles = StyleSheet.create({
    map: {

        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
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
        marginTop: 70

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


export default IndexRentCarScreen
