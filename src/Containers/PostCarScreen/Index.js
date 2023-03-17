import React, { useEffect, useState } from 'react';
import { Image, Keyboard, Modal, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { Divider } from 'react-native-paper';
import {
    addDoc,
    collection,
    firestore,
    getDownloadURL,
    serverTimestamp,
    uploadBytes,
    getStorage, ref
} from '../../../config'
import IconClose from 'react-native-vector-icons/Fontisto';
import * as ImagePicker from 'expo-image-picker';
import { showMessage } from "react-native-flash-message";
import { ModalPickerListComponent } from '../../Components/ModalPicker';
import { carLocation, dataCarType } from '../../Components/dataType';
import PrimaryButttonComponent from '../../Components/PrimaryButtonComponent';
import { ModalPickerListCarTypeComponent } from '../../Components/ModalPickerCarType';
import { FloatingAction } from "react-native-floating-action";

const IndexPostCarScreen = ({navigation}) => {
    const SCREEN_WIDTH = useWindowDimensions().width;
    const SCREEN_HEIGHT = useWindowDimensions().height;
    const [amountPerHour, setAmountPerHour] = useState('')
    const [fuelPercentage, setFuelPercentage] = useState('')
    const [imageUri, setImageUri] = useState(null);
    const [showModalCarType, setShowModalCarType] = useState(false);
    const [showModalCarLocation, setShowModalCarLocation] = useState(false);
    const [valueCarType, setValueCarType] = useState('Select Car Type')
    const [valueLocation, setValueLocation] = useState('Select Car Location')
    const [valueLocationCoordinate, setValueLocationCoordinate] = useState({})
    const [photoFileName, setPhotoFileName] = useState("")
    const [longitudeCar, setlongitudeCar] = useState(0)
    const [latitudeCar, setLatitudeCar] = useState(0)
    const [carListId, setCarListId]= useState(Math.random().toString())

    const actions = [
        {
            text: "Go Back",
            icon: require("../../Assets/Image/left.png"),
            name: "bt_goback",
            position: 1
        },
    ]

    const [placeholder, setPlaceholder] = useState({
        amount: 'Amount per hour',
        fuelPercentage: 'Fuel Percentage'
    });

    const changeModalLocVisibility = (bool) => {
        setShowModalCarLocation(bool);
    };

    const setFilterLocData = (option) => {
        setValueLocation(option);
        setShowModalCarLocation(false);
    };

    const changeModalVisibility = (bool) => {
        setShowModalCarType(bool);
    };

    const setFilterData = (option) => {
        setValueCarType(option);
        setShowModalCarType(false);
    };

    const setCarCoordinate = (cordinate) => {
        setValueLocationCoordinate(cordinate)
        setShowModalCarLocation(false);
    };

    const setlongitude = (longitude) => {
        setlongitudeCar(longitude)
        setShowModalCarLocation(false);

    }

    const setlatitude = (latitude) => {
        setLatitudeCar(latitude)
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.canceled && result.assets.length > 0) {
            let photoName = result.assets[0].uri.slice(-18)
            setImageUri(result.assets[0].uri);
            setPhotoFileName(photoName.replace(/-/g, '0'));
        }
    };


    const uploadImage = async () => {
        if (imageUri !== null && typeof imageUri === "string") {
            const response = await fetch(imageUri);
            const blob = await response.blob();
            const fileRef = ref(getStorage(), `carlistphoto/${photoFileName}`);
            const uploadTask = await uploadBytes(fileRef, blob);
            return await getDownloadURL(uploadTask.ref);
        }
    };


    const submitForm = async () => {
        if (amountPerHour.length > 0 &&
            valueCarType !== 'Select Car Type' &&
            valueLocation !== 'Select Car Location') {

            const imageUrl = await uploadImage();
            const timeStamp = serverTimestamp();

            const data = {
                imageUri: imageUrl,
                amount: amountPerHour,
                carType: valueCarType,
                createdAt: timeStamp,
                carLocation: valueLocation,
                fuelPercentage: fuelPercentage,
                coordinate: valueLocationCoordinate,
                longitude : longitudeCar,
                latitude : latitudeCar,
                id: carListId
            }

            await addDoc(collection(firestore, 'postCar'), data)
                .then((value) => {
                    showMessage({
                        message: `Thank you! Your post was successful! `,
                        backgroundColor: 'green',
                        duration: 3000,
                        color: 'white',
                    });
                    setValueLocation('Select Car Location');
                    setValueCarType('Select Car Type');
                    setAmountPerHour('');
                    setFuelPercentage('');
                    setImageUri(null)
                    Keyboard.dismiss();
                });

        } else {
            // handle input validation error message
            showMessage({
                message: 'All fields are required!',
                backgroundColor: 'red',
                duration: 3000,
                color: 'white',
            });
            return false;
        }
    }


    return (
        <View style={{ backgroundColor: "#ffffff", flex: 1, justifyContent: 'center', alignContent: 'center' }}>

            {/**car type starts here */}
            <Modal
                visible={showModalCarType}
                transparent={true}
                animationType={'slide'}
                onRequestClose={() => changeModalVisibility(false)}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.3)',
                    }}
                >
                    <View
                        style={{
                            backgroundColor: 'white',
                            height: SCREEN_HEIGHT * 0.5,
                            position: 'absolute',
                            bottom: 0,
                            right: 1,
                            left: 1,
                            borderTopLeftRadius: 16,
                            borderTopRightRadius: 16,
                        }}
                    >
                        <View style={{ marginTop: 28, marginHorizontal: 33 }}>
                            <IconClose
                                name="close-a"
                                size={18}
                                color={'#000000'}
                                style={{
                                    marginStart: 12,
                                    alignSelf: 'flex-end',
                                    backgroundColor: '#fff',
                                    padding: 3,
                                }}
                                onPress={() => changeModalVisibility(false)}
                            />
                        </View>

                        <View
                            style={{
                                marginTop: 10,
                                marginHorizontal: 33,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: '#000000',
                                    fontWeight: '800',
                                }}
                            >
                                Select Car Type
                            </Text>
                        </View>
                        <Divider
                            style={{
                                marginHorizontal: 33,
                                marginTop: 27,
                                borderColor: '#000000',
                                borderWidth: 1,
                            }}
                        />

                        <View
                            style={{
                                marginVertical: 23,
                                backgroundColor: '#ffff',
                                marginHorizontal: 33,
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <ModalPickerListCarTypeComponent
                                setData={setFilterData}
                                categories={dataCarType}
                                changeModalVisibility={changeModalVisibility}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
            {/**car type ends here */}

            {/**car location starts here */}
            <Modal
                visible={showModalCarLocation}
                transparent={true}
                animationType={'slide'}
                onRequestClose={() => changeModalLocVisibility(false)}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.3)',
                    }}
                >
                    <View
                        style={{
                            backgroundColor: 'white',
                            height: SCREEN_HEIGHT * 0.5,
                            position: 'absolute',
                            bottom: 0,
                            right: 1,
                            left: 1,
                            borderTopLeftRadius: 16,
                            borderTopRightRadius: 16,
                        }}
                    >
                        <View style={{ marginTop: 28, marginHorizontal: 33 }}>
                            <IconClose
                                name="close-a"
                                size={18}
                                color={'#000000'}
                                style={{
                                    marginStart: 12,
                                    alignSelf: 'flex-end',
                                    backgroundColor: '#fff',
                                    padding: 3,
                                }}
                                onPress={() => changeModalLocVisibility(false)}
                            />
                        </View>

                        <View
                            style={{
                                marginTop: 10,
                                marginHorizontal: 33,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: '#000000',
                                    fontWeight: '800',
                                }}
                            >
                                Select Car Location
                            </Text>
                        </View>
                        <Divider
                            style={{
                                marginHorizontal: 33,
                                marginTop: 27,
                                borderColor: '#000000',
                                borderWidth: 1,
                            }}
                        />

                        <View
                            style={{
                                marginVertical: 23,
                                backgroundColor: '#ffff',
                                marginHorizontal: 33,
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <ModalPickerListComponent
                                setData={setFilterLocData}
                                setCarCoordinate={setCarCoordinate}
                                setlongitude={setlongitude}
                                setlatitude={setlatitude}
                                categories={carLocation}
                                changeModalVisibility={changeModalLocVisibility}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
            {/**car location ends here */}


            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10
            }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Post A Car</Text>
            </View>
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: 15,
                }}
            >
                <View
                    style={{
                        width: '90%',
                        borderRadius: 20,
                        backgroundColor: '#f1f1f1',
                        elevation: 10,
                        shadowColor: '#000',
                        shadowRadius: 10,
                        shadowOpacity: 1,
                        marginVertical: 8,
                        shadowOffset: {
                            width: 0,
                            height: 4,
                        },
                    }}
                >
                    <View style={{ marginBottom: 20, marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <View
                            style={[
                                {
                                    width: 140,
                                    height: 140,
                                    borderRadius: 70,
                                    borderColor: '#184461',
                                    borderWidth: 1,
                                    backgroundColor: '#C4c4c4',
                                    shadowColor: 'rgba(0, 0, 0, 0.25)',
                                },
                            ]}
                        >
                            {imageUri == null ? (
                                <Image source={require('../../Assets/Image/defaultcar.jpg')}
                                    style={{
                                        width: 140,
                                        height: 140,
                                        borderRadius: 70,
                                        zIndex: 1,
                                        position: "absolute"
                                    }} />
                            ) : (
                                <Image
                                    source={{ uri: imageUri }}
                                    style={{
                                        width: 140,
                                        height: 140,
                                        borderRadius: 70,
                                        zIndex: 1,
                                        position: "absolute"
                                    }}
                                />
                            )}

                        </View>

                        <TouchableOpacity onPress={() => pickImage()}>
                            <Image
                                source={require('../../Assets/Image/camera.png')}
                                style={{
                                    width: 40,
                                    height: 40,
                                    marginTop: -20
                                }}
                            />
                        </TouchableOpacity>

                    </View>


                    <View style={{ marginHorizontal: 30 }}>
                        <View style={{ marginTop: 20 }}>

                            <View
                                style={{
                                    padding: 5,
                                    borderBottomWidth: 1,
                                    borderColor: '#45969A',
                                }}
                            >
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: '900',
                                    color: valueCarType == 'Select Car Type' ? '#A6A2A2' : '#457C9A',
                                }}
                                    onPress={() => setShowModalCarType(true)}>{valueCarType}</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 20 }}>

                            <View
                                style={{
                                    padding: 5,
                                    borderBottomWidth: 1,
                                    borderColor: '#45969A',
                                }}
                            >
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: '900',
                                    color: valueLocation == 'Select Car Location' ? '#A6A2A2' : '#457C9A',
                                }}
                                    onPress={() => setShowModalCarLocation(true)}>{valueLocation}</Text>
                            </View>
                        </View>

                        <View style={{
                            marginTop: 20, flexDirection: 'row', borderBottomWidth: 1,
                            borderColor: '#45969A',
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '900',
                                color: amountPerHour === '' ? '#A6A2A2' : '#457C9A',
                                padding: 5,
                            }}>RM</Text>

                            <TextInput
                                style={{
                                    fontSize: 16,
                                    fontWeight: '900',
                                    color: '#457C9A',
                                }
                                }
                                maxLength={3}
                                value={amountPerHour}
                                placeholder={placeholder.amount}
                                keyboardType={'number-pad'}
                                onChangeText={text => setAmountPerHour(text)}
                                placeholderTextColor={'#A6A2A2'}
                                onFocus={() => {
                                    setPlaceholder({ ...placeholder, amount: '' })
                                }}
                                onBlur={() => {
                                    setPlaceholder({
                                        ...placeholder,
                                        amount: 'Amount per hour',
                                    })
                                }}

                            />
                        </View>


                        <View style={{
                            marginTop: 20, flexDirection: 'row', borderBottomWidth: 1,
                            borderColor: '#45969A',
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '900',
                                color: fuelPercentage === '' ? '#A6A2A2' : '#457C9A',
                                padding: 5,
                            }}>GAS</Text>

                            <TextInput
                                style={{
                                    fontSize: 16,
                                    fontWeight: '900',
                                    color: '#457C9A',
                                }
                                }
                                maxLength={2}
                                value={fuelPercentage}
                                placeholder={placeholder.fuelPercentage}
                                keyboardType={'number-pad'}
                                onChangeText={text => setFuelPercentage(text)}
                                placeholderTextColor={'#A6A2A2'}
                                onFocus={() => {
                                    setPlaceholder({ ...placeholder, fuelPercentage: '' })
                                }}
                                onBlur={() => {
                                    setPlaceholder({
                                        ...fuelPercentage,
                                        amount: 'Fuel Percentage',
                                    })
                                }}
                            />
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <PrimaryButttonComponent
                            label="Submit"
                            onPress={() => submitForm()}

                        />
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
                    bottom: 0,
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
    )
}


export default IndexPostCarScreen
