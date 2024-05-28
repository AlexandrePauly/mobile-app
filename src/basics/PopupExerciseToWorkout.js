import React, { useState, useEffect } from 'react';
import { Dimensions, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Images - icons
import dumbbell from '../../assets/icons/gym.png';
import modify from '../../assets/icons/pencil.png';

// Librairies
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { height, width } = Dimensions.get('window');

const PopupExerciseToWorkout = ({ visible, routine, onClose, onAdd, onUpdate }) => {
    if (!visible || !routine) {
        return null;
    } 

    // Initialization of variables
    const [exerciseGoalValue, setExerciseGoalValue] = useState('');   // Workout name input
    const [exerciseRestValue, setExerciseRestValue] = useState('');   // Description input
    const [exerciseDescValue, setExerciseDescValue] = useState('');
    const [selectedColor, setSelectedColor] = useState('lightgreen');

    // Popup preprocessing
    useEffect(() => {
        // If the popup is used to update a workout, input the workout's value to the inputs
        if (routine) {
            setExerciseGoalValue(routine.goal || '');
            setExerciseDescValue(routine.comment || '');
            setExerciseRestValue(routine.rest !== undefined ? routine.rest.toString() : '');
        }
    }, [routine]);

    // Function to check the form
    const handleSubmit = () => {
        if (routine && Object.keys(routine).length > 0 && routine.comment){
            onUpdate(routine.id_exercise, routine.id_workout, exerciseGoalValue, exerciseRestValue, exerciseDescValue);
        }
        else {
            onAdd(routine.id_exercise, exerciseGoalValue, exerciseRestValue, exerciseDescValue);
        }
    };

    // Fonction to close the popup and reset inputs and selectbox value
    const closePopup = () => {
        setExerciseGoalValue('');
        setExerciseRestValue('');
        setExerciseDescValue('');
    }

    // Supposons que vous ayez ces noms d'images dans votre base de données
    const images = {
        exercises: dumbbell, 
    };

    // Fonction pour obtenir le chemin de l'image en fonction du nom stocké en base de données
    const getImageSource = (imageName) => {
        return images[imageName];
    }; 

    const handleRestChange = (text) => {
        // Remove non-numeric characters
        const filteredText = text.replace(/[^0-9]/g, '');
        setExerciseRestValue(filteredText);
    };

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
                        <Text style={styles.header_title}>{routine.title}</Text>
                        
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
                    {/* Workout's image */}
                    <View style={styles.exercise_img_container}>
                        <Image source={getImageSource(routine.img)} style={styles.exercise_img}></Image>
                        <View style={[styles.workout_img_container, styles.exercise_img_update_container]}>
                            <TouchableOpacity style={[styles.workout_img_update_subcontainer]} activeOpacity='0.7'>
                                <Image source={modify} style={styles.workout_img_update} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Form */}
                    <View style={styles.inputs_container}>
                        {/* Workout's name */}
                        <Text style={styles.label}>Goal</Text>
                        <TextInput
                            style={[styles.input, styles.input_name]}
                            value={exerciseGoalValue}
                            maxLength={30}
                            onChangeText={text => setExerciseGoalValue(text)}
                            placeholder="Example : 3 x 10 reps"
                        />

                        {/* Workout's name */}
                        <Text style={styles.label}>Rest</Text>
                        <TextInput
                            style={[styles.input, styles.input_name]}
                            value={exerciseRestValue}
                            maxLength={3}
                            onChangeText={handleRestChange}
                            placeholder="90"
                            keyboardType="numeric"
                        />

                        {/* Description */}
                        <Text style={styles.label}>Comments</Text>
                        <TextInput
                            style={[styles.input, styles.input_description]}
                            value={exerciseDescValue}
                            maxLength={300}
                            onChangeText={text => setExerciseDescValue(text)}
                            placeholder="Exemple of description..."
                            multiline={true}
                        />
                    </View>
                    
                    {/* Button to save the workout */}
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
    // Exercise image
    exercise_img_container: {
        position: 'relative',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 100,
        padding: 8,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    exercise_img: {
        width: 67,
        height: 67,
        margin: 6,
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

export default PopupExerciseToWorkout;
