import React, { useState } from 'react';
import { Alert, Dimensions, Linking, Modal , StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Librairies
import { BlurView } from 'expo-blur';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';

const { height, width } = Dimensions.get('window');

const Popup = ({ title, visible, onClose, onReloadApp }) => {
    // Initialization of variable
    const phoneNumber = '0649245834';                                // Contact - phone number
    const email = 'alexandre.pauly@cy-tech.fr';                      // Contact - email

    const handleCall = () => {
        Alert.alert(
            'Confirmation',
            `Do you wan to call ${phoneNumber} ?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                { 
                    text: 'OK',
                    onPress: () => Linking.openURL(`tel:${phoneNumber}`)
                },
            ],
            { cancelable: false }
        );
    };

    const handleEmail = () => {
        Alert.alert(
            'Confirmation',
            `Do you want to send an email to ${email} ?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => Linking.openURL(`mailto:${email}`)
                },
            ],
            { cancelable: false }
        );
    };

    const [selectedColor, setSelectedColor] = useState('lightgreen');
    const [storage, setStorage] = useState([]);

    const applyModif = () => {
        if (title == 'Application color') {
            console.log(storage.id_various);
            console.log(storage.app_notif_sound);
            onReloadApp(storage.id_various, selectedColor, storage.app_notif_sound);
        }
        onClose();
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <View style={styles.overlay}></View>
                <BlurView
                    style={styles.blurContainer}
                    blurType="light"
                    blurAmount={0}
                >
                    <View style={styles.modalContent}>
                        <View style={styles.popup_title_container}>
                            <Text style={styles.popup_title}>{title}</Text>
                        </View>
                        <View style={styles.popup_content_container}>
                            {title === 'Contact' ? (
                                <>
                                    <TouchableOpacity style={styles.popup_elt_container} onPress={handleCall}>
                                        <Icon style={styles.popup_elt_icon} name={'phone'} />
                                        <Text style={styles.popup_elt_text}>06 49 24 58 34</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.popup_elt_container} onPress={handleEmail}>
                                        <Icon style={styles.popup_elt_icon} name={'envelope'} />
                                        <Text style={styles.popup_elt_text}>{email}</Text>
                                    </TouchableOpacity>
                                </>
                            ) : (
                                <>
                                    {title === 'How it works ?' ? (
                                        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet neque deleniti ipsam molestiae expedita, fugit possimus quasi excepturi optio quia debitis? Temporibus perspiciatis ea sequi ratione sed! Sunt, autem soluta!</Text>
                                    ) : (
                                        <>
                                            {title === 'Privacy policy' ? (
                                                <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet neque deleniti ipsam molestiae expedita, fugit possimus quasi excepturi optio quia debitis? Temporibus perspiciatis ea sequi ratione sed! Sunt, autem soluta!</Text>
                                            ) : (
                                                <>
                                                    {title === 'About' ? (
                                                        <View>
                                                            <Text>
                                                                Version : 1.0{'\n'}
                                                                Developed by : Alexandre Pauly{'\n'}
                                                                You can contact us at{' '}
                                                                <Text style={{ color: 'blue', textDecorationLine: 'underline' }} onPress={handleEmail}>{email}</Text>
                                                                {' '}for any information, suggestion or problem.
                                                            </Text>
                                                        </View>
                                                    ) : (
                                                        <>
                                                            {title === 'Application color' ? (
                                                                <View style={styles.pickerContainer}>
                                                                    <Picker
                                                                        selectedValue={selectedColor}
                                                                        style={styles.picker}
                                                                        onValueChange={(itemValue, itemIndex) =>
                                                                            setSelectedColor(itemValue)
                                                                        }>
                                                                        <Picker.Item label="Default" value="lightgreen" />
                                                                        <Picker.Item label="Lightblue" value="lightblue" />
                                                                        <Picker.Item label="Lightgrey" value="lightgrey" />
                                                                        <Picker.Item label="Canard" value="#048B9A" />
                                                                    </Picker>
                                                                </View>
                                                            ) : (
                                                                <>

                                                                </>
                                                            )}
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </>
                                    )
                                }
                                </>
                            )}
                        </View>
                        <TouchableOpacity style={[styles.close_button, {backgroundColor: selectedColor}]} onPress={applyModif}>
                            <Text>OK</Text>
                        </TouchableOpacity>
                    </View>
                </BlurView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    blurContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: width * 0.8,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    popup_title_container: {
        width: '80%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.5)',
    },
    popup_title: {
        fontSize: 24,
    },
    popup_content_container: {
        width: '100%',
        marginTop: 25,
        marginBottom: 50,
    },
    popup_elt_container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    popup_elt_icon: {
        width: 30,
        textAlign: 'center',
        marginRight: 10,
        fontSize: 25,
    },
    popup_elt_text: {
        fontSize: 14,
    },
    close_button: {
        position: 'absolute',
        bottom: 25,
        right: 25,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 10,
    },
});

export default Popup;
