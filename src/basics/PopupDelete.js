import React, { useState } from 'react';
import { Dimensions, Modal , StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Database
// import { initVariousTable,  } from '../../db/VariousTable.js';

// Librairies
import { BlurView } from 'expo-blur';

const { height, width } = Dimensions.get('window');

const PopupDelete = ({ title, visible, onClose, onConfirm }) => {
  
    // Initialization of variable
    const [selectedColor, setSelectedColor] = useState('lightgreen');

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
                            <Text style={styles.popup_title}>Warning</Text>
                        </View>
                        <View style={styles.popup_content_container}>
                            {title === 'Routine' ? (
                                <Text>Do you want to delete this routine ?</Text>
                            ) : (
                                <>
                                    {title === 'Exercise' ? (
                                        <Text>Do you want to delete this exercise ?</Text>
                                    ) : (
                                        <>
                                            {title === 'Workouts' ? (
                                                <Text>Do you want to delete this workout ?</Text>
                                            ) : (
                                                <>
                                                    {title === 'Workout' ? (
                                                        <Text>Do you want to delete this exercise of your workout ?</Text>
                                                ) : (
                                                    <>
                                                        {title === 'Set' ? (
                                                            <Text>Do you want to delete this set ?</Text>
                                                        ) : (
                                                            <>
                                                            
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                                </>
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                        </View>

                        <View style={styles.btn_container}>
                            <TouchableOpacity style={[styles.btn, {backgroundColor: selectedColor}]} onPress={onClose}>
                                <Text>CANCEL</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.btn, {backgroundColor: selectedColor, marginLeft: 10}]} onPress={onConfirm}>
                                <Text>OK</Text>
                            </TouchableOpacity>
                        </View>
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
    popup_elt_text: {
        fontSize: 14,
    },
    btn_container: {
        position: 'absolute',
        bottom: 25,
        right: 25,
        display: 'flex',
        flexDirection: 'row',
    },
    btn: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 10,
    },
});

export default PopupDelete;
