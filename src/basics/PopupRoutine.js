import React, { useState, useEffect } from 'react';
import { Dimensions, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Images
import modify from '../../assets/icons/pencil.png';

// Librairies
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { height, width } = Dimensions.get('window');

const PopupRoutine = ({ title, visible, routine, onClose, onAdd, onUpdate }) => {
    if (!visible || !routine) {
        return null;
    } 

    // Initialization of variables
    const [routineNameValue, setRoutineNameValue] = useState('');               // Routine name input
    const [routineDescriptionValue, setRoutineDescriptionValue] = useState(''); // Description input

    // Popup preprocessing
    useEffect(() => {
        // If the popup is used to update a routine, input the routine's value to the inputs
        if (routine) {
            setRoutineNameValue(routine.title || '');
            setRoutineDescriptionValue(routine.desc || '');
        }
    }, [routine]);

    // Function to check the form
    const handleSubmit = () => {
        if (routineNameValue !== '' && routineDescriptionValue !== '') {
            if (routine && Object.keys(routine).length > 0){
                onUpdate(routine.id_routine, routineNameValue, routineDescriptionValue, 'R', 'lightgray')
            }
            else {
                onAdd(routineNameValue, routineDescriptionValue, 'R', 'lightgray');
            }
        }
    };

    // Fonction to close the popup and reset inputs and selectbox value
    const closePopup = () => {
        setRoutineNameValue('');
        setRoutineDescriptionValue('');
    }

    const [selectedColor, setSelectedColor] = useState('lightgreen');

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                {/* Popup header */}
                <View style={[styles.header_container, {backgroundColor: selectedColor}]}>
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
                    {/* Routine's image */}
                    <View style={styles.routine_img_container}>
                            <Text style={styles.routine_img}>P</Text>
                        <View style={[styles.routine_img_container, styles.exercise_img_update_container]}>
                            <TouchableOpacity style={[styles.routine_img_update_subcontainer]} activeOpacity='0.7'>
                                <Image source={modify} style={styles.routine_img_update} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Form */}
                    <View style={styles.inputs_container}>
                        {/* Routine's name */}
                        <Text style={styles.label}>Routine's Name</Text>
                        <TextInput
                            style={[styles.input, styles.input_name]}
                            value={routineNameValue}
                            onChangeText={text => setRoutineNameValue(text)}
                            placeholder="Exemple of routine's name..."
                        />

                        {/* Description */}
                        <Text style={styles.label}>Description</Text>
                        <TextInput
                            style={[styles.input, styles.input_description]}
                            value={routineDescriptionValue}
                            onChangeText={text => setRoutineDescriptionValue(text)}
                            placeholder="Exemple of description..."
                            multiline={true}
                        />
                    </View>
                    
                    {/* Button to save the routine */}
                    <TouchableOpacity style={[styles.button, {backgroundColor: selectedColor}]} onPress={handleSubmit} activeOpacity='0.8'>
                        <Text style={styles.text_btn}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
    },
    // Popup header
    header_container: {
        height: 100,
        paddingTop: 50,
        paddingBottom: 10,
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
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10,
    },
    //  Close popup button
    icon: {
        color: 'white',
        fontSize: 35,
    },

    // Popup content
    content: {
        height: height - 100,
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 25,
    },
    // Routine image
    routine_img_container: {
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 80,
        backgroundColor: 'lightgray'
    },
    routine_img: {
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
    routine_img_update_subcontainer: {
        width: 36,
        height: 36,
        borderRadius: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    routine_img_update: {
        width: 20,
        height: 20,
    },
    // Form
    inputs_container: {
        width: width - 50,
    },
    // Labels
    label:{
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
    // Button to save the routine
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

export default PopupRoutine;
