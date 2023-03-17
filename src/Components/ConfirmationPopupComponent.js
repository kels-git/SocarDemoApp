import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Modal, PixelRatio } from 'react-native';
import IconClose from 'react-native-vector-icons/Fontisto';
import PrimaryButtonComponent from './PrimaryButtonComponent';
import { COLORS, GUTTERS, LAYOUTS, SIZES } from '../Constants';
import { Divider } from 'react-native-paper';

function ConfirmationPopupComponent({
  confirmAction,
  rejectAction,
  title,
  message,
  note,
  dismissModal,
  visibility,
  actionRequired,
  rejectActionRequired,
  confirmActionRequired,
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visibility}
      onRequestClose={() => {
        console.log('Action modal has been closed.');
      }}
    >
      <TouchableOpacity
        style={[
          
          {
            flex: 1,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'rgba(0, 0, 0, 0.5)',
          },
        ]}
        activeOpacity={1}
        onPress={dismissModal}
      >
        <View
          paddingTop={40}
          paddingBottom={40}
          style={[
            
            {
              backgroundColor: '#ffffff',
              borderRadius: 16,
              width: '90%',
            },
          ]}
        >
          <View position="absolute" right={0} padding={10}>
            <TouchableOpacity onPress={dismissModal}>
              <IconClose
                name="close-a"
                size={18}
                color={'#000000'}
                style={{
                  marginEnd: 12,
                  alignSelf: 'flex-end',
                  backgroundColor: '#fff',
                  padding: 10,
                }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={[
                {
                  color:'#AE7B1E',
                  fontWeight: '700',
                  textAlign: 'center',
                  fontSize: 18,
                  fontWeight:'900',
                  lineHeight: 24 / PixelRatio.getFontScale(),
                },
              ]}
            >
              {title}
            </Text>
            
            <Text
              style={[
                {
                  fontSize: 16,
                  fontWeight: '400',
                  textAlign: 'center',
                  color: '#000000',
                  lineHeight: 24 / PixelRatio.getFontScale(),
                  marginHorizontal: 30
                },
              ]}
            >
              {message}
            </Text>
            {!!note && (
              <Text
                style={[
                  {
                    color: '#666666',
                    lineHeight: 24 / PixelRatio.getFontScale(),
                  },
                ]}
              >
                {note}
              </Text>
            )}
          </View>
          {actionRequired ? (
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-evenly',
                marginBottom: 20,
               
              }}
            >
              {rejectActionRequired ? (
                <View
                  style={{
                    marginEnd: 10,
                    marginBottom: 20,
                    width: rejectActionRequired == true ? '50%' : '100%',
                  }}
                >
                  <PrimaryButtonComponent
                    label={'No'}
                    style={{
                      height: 35,
                      borderWidth: 3,
                      
                    }}
                    labelStyle={{
                      color: '#AE7B1E',
                      fontSize: 14,
                      fontWeight: '700',
                      marginHorizontal: 10,
                    }}
                    onPress={rejectAction}
                  />
                </View>
              ) : null}

              {confirmActionRequired ? (
                <View
                  style={{
                    marginStart: 10,
                    width: confirmActionRequired == true ? '100%' : '100%',
                  }}
                >
                  <PrimaryButtonComponent
                    label={'Thank You'}
                    style={{ height: 35 }}
                    labelStyle={{
                      color: 'white',
                      fontSize: 14,
                      fontWeight: '700',
                    }}
                    onPress={confirmAction}
                  />
                </View>
              ) : null}
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

ConfirmationPopupComponent.propTypes = {
  confirmAction: PropTypes.func,
  rejectAction: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
  note: PropTypes.string,
  dismissModal: PropTypes.func,
  visibility: PropTypes.bool,
  actionRequired: PropTypes.bool,
};

ConfirmationPopupComponent.defaultProps = {
  actionRequired: true,
  note: '',
};

export default ConfirmationPopupComponent;