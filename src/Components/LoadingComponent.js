import { View } from 'react-native';
import React, { useRef } from 'react';
import LottieView from 'lottie-react-native';
import loadingLottie from '../Assets/Lottie/loadingLottie.json';

const LoadingComponent = () => {
    const animation = useRef(null);
    return (
        <View
            style={[
                {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                },
            ]}
        >
            <LottieView
                autoPlay
                ref={animation}
                style={{
                    width: 200,
                    height: 200,
                    backgroundColor: 'white'
                }}
                source={loadingLottie}
            />
        </View>
    );
};

export default LoadingComponent;