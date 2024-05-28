import React, { useState, useEffect } from 'react';
import { Dimensions, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Libraries
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { height, width } = Dimensions.get('window');

const PopupSet = ({ title, visible, set, onClose, onAdd, onUpdate }) => {
    // Initialization of variables
    const [setNbReps, setSetNbReps] = useState('');  // Number of reps value
    const [setWeight, setSetWeight] = useState('');  // Weight value

    // Popup preprocessing
    useEffect(() => {
        if (set && Object.keys(set).length > 0) {
            setSetNbReps(set.nb_reps !== undefined ? set.nb_reps.toString() : '');
            setSetWeight(set.weight !== undefined ? set.weight.toString() : '');
        }
    }, [set]);

    // Function to check the form
    const handleSubmit = () => {
        if (setNbReps !== '' && setWeight !== '') {
            if (set && Object.keys(set).length > 0) {
                onUpdate(set.id_set, setNbReps, setWeight);
            } else {
                onAdd(setNbReps, setWeight);
            }
        }
    };

    // Fonction to close the popup and reset inputs value
    const closePopup = () => {
        setSetNbReps('');
        setSetWeight('');
    }

    const handleNbRepsChange = (text) => {
        // Remove non-numeric characters
        const filteredText = text.replace(/[^0-9]/g, '');
        setSetNbReps(filteredText);
    }

    const handleWeightChange = (text) => {
        // Remove non-numeric characters
        const filteredText = text.replace(/[^0-9]/g, '');
        setSetWeight(filteredText);
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <View style={[styles.header_container, { backgroundColor: 'lightgreen' }]}>
                        <View style={styles.header}>
                            {/* Title of the page */}
                            <Text style={styles.header_title}>{title}</Text>
                            
                            {/* Shortcut buttons */}
                            <View style={styles.buttonsContainer}>
                                {/* Close popup button */}
                                <TouchableOpacity onPress={() => {closePopup();onClose();}}>
                                    <MaterialIcons name='close' style={styles.icon} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Popup content */}
                    <View style={styles.content}>
                        {/* Inputs for reps and weight */}
                        <View style={styles.inputs_container}>
                            <Text style={styles.label}>Reps</Text>
                            <TextInput
                                style={styles.input}
                                value={setNbReps}
                                onChangeText={handleNbRepsChange}
                                keyboardType='numeric'
                                placeholder="10"
                                maxLength={3}
                            />
                            <Text style={styles.label}>Weight</Text>
                            <TextInput
                                style={styles.input}
                                value={setWeight}
                                onChangeText={handleWeightChange}
                                placeholder="100"
                                keyboardType='numeric'
                                maxLength={3}
                            />
                        </View>

                        {/* Button to save the workout */}
                        <TouchableOpacity style={[styles.button, { backgroundColor: 'lightgreen' }]} onPress={handleSubmit} activeOpacity={0.8}>
                            <Text style={styles.text_btn}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    container: {
        width: width,
        height: height * 0.6,
        backgroundColor: '#f1f1f1',
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
    // Popup header
    header_container: {
        height: 50,
        paddingVertical: 10,
    },
    header: {
        position: 'relative', 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    // Title of the page
    header_title: {
        fontSize: 26,
        color: 'white',
    },
    // Shortcut buttons
    buttonsContainer: {
        position: 'absolute',
        left: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    //  Close popup button
    icon: {
        color: 'white',
        fontSize: 30,
    },
    // Popup content
    content: {
        height: height * 0.6 - 50,
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 25,
    },
    // Workout image
    workout_img_container: {
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 80,
        backgroundColor: 'lightgray'
    },
    workout_img: {
        color: 'white',
        margin: 0,
        fontSize: 26,
    },
    exercise_img_update_container: {
        position: 'absolute',
        bottom: -10,
        right: -10,
        backgroundColor: 'white',
        width: 38,
        height: 38,
        overflow: 'hidden',
    },
    workout_img_update_subcontainer: {
        width: 36,
        height: 36,
        borderRadius: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    workout_img_update: {
        width: 20,
        height: 20,
    },
    // Form
    inputs_container: {
        width: width - 50,
    },
    // Labels
    label: {
        position: 'relative',
        right: -10,
        bottom: -8,
        backgroundColor: 'white',
        zIndex: 2,
        paddingHorizontal: 5,
        alignSelf: 'flex-start',
        fontSize: 16,
    },
    // Inputs
    input: {
        padding: 12,
        borderWidth: 1,
        borderColor: '#808080',
        borderRadius: 5,
        marginBottom: 10,
        fontSize: 14,
        flexDirection: 'row',
    },
    // Description
    input_description: {
        height: 200,
        paddingTop: 12,
    },
    // Button to save the workout
    button: {
        position: 'absolute',
        bottom: 25,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 20,
        width: width - 50,
    },
    text_btn: {
        fontSize: 20,
        color: 'white',
    },
});

export default PopupSet;