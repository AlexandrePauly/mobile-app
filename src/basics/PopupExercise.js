import React, { useState, useEffect } from 'react';
import { Dimensions, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Images
import dumbbell from '../../assets/icons/gym.png'
import modify from '../../assets/icons/pencil.png';

// Librairies
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectDropdown from 'react-native-select-dropdown'

const { height, width } = Dimensions.get('window');

const PopupExercise = ({ title, visible, exercise, onClose, onAdd, onUpdate }) => {
    if (!visible || !exercise) {
        return null;
    }

    // Initialization of variables
    const [exerciseNameValue, setExerciseNameValue] = useState('');                                                                                                   // Exercise name input
    const [exerciseDescriptionValue, setExerciseDescriptionValue] = useState('');                                                                                     // Description input
    const [exerciseMusclegroupValue, setExerciseMuscleGroupValue] = useState(null);                                                                                   // Muscle group select box
    const [exerciseTypeOfExerciseValue, setExerciseTypeOfExerciseValue] = useState(null);                                                                             // Type of exercise select box
    const muscle_grp = [{title: 'Abs'},{title: 'Biceps'},{title: 'Back'},{title: 'Chest'},{title: 'Legs'},{title: 'Shoulders'},{title: 'Triceps'},{title: 'Others'}]; // List muscle groups
    const type_of_exercise = [{title: 'Weights and reps'},{title: 'Time'}];                                                                                           // List type of exercise
 
    // Popup preprocessing
    useEffect(() => {
        // If the popup is used to update an exercise, input the exercise's value to the inputs
        if (exercise && Object.keys(exercise).length > 0) {
            setExerciseNameValue(exercise.title || '');
            setExerciseDescriptionValue(exercise.desc || '');
            if (muscle_grp.some(item => item.title === exercise.muscleTitle)) {
                const muscleGroup = muscle_grp.find(item => item.title === exercise.muscleTitle);
                setExerciseMuscleGroupValue(muscleGroup);
            }            
            if (type_of_exercise.some(item => item.title === exercise.type)) {
                const typeOfExercise = type_of_exercise.find(item => item.title === exercise.type);
                setExerciseTypeOfExerciseValue(typeOfExercise);
            }
        }
    }, [exercise]);

    // Function to check the form
    const handleSubmit = () => {
        if (exerciseNameValue !== '' && exerciseDescriptionValue !== '' && exerciseMusclegroupValue && exerciseMusclegroupValue !== undefined && exerciseTypeOfExerciseValue && exerciseTypeOfExerciseValue !== undefined) {
            if (exercise && Object.keys(exercise).length > 0){
                onUpdate(exercise.id_exercise, exerciseNameValue, exerciseDescriptionValue, 'exercises' ,exerciseMusclegroupValue.title, exerciseTypeOfExerciseValue.title)
            }
            else {
                onAdd(exerciseNameValue, exerciseDescriptionValue, 'exercises' ,exerciseMusclegroupValue, exerciseTypeOfExerciseValue);
            }
        }
    }; 

    // Fonction to close the popup and reset inputs and selectbox value
    const closePopup = () => {
        setExerciseNameValue('');
        setExerciseDescriptionValue('');
        setExerciseMuscleGroupValue('');
        setExerciseTypeOfExerciseValue('');
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
                    {/* Exercise image */}
                    <View style={styles.exercise_img_container}>
                        <Image source={exercise.img === 'exercises' ? dumbbell : modify} style={styles.exercise_img} />
                        <View style={[styles.exercise_img_container, styles.exercise_img_update_container]}>
                            <TouchableOpacity style={[styles.exercise_img_update_subcontainer]} activeOpacity='0.7'>
                                <Image source={modify} style={styles.exercise_img_update} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Form */}
                    <View style={styles.inputs_container}>
                        {/* Exercise's name */}
                        <Text style={styles.label}>Exercise's Name</Text>
                        <TextInput
                            style={[styles.input, styles.input_name]}
                            value={exerciseNameValue}
                            onChangeText={text => setExerciseNameValue(text)}
                            placeholder="Exemple of exercise's name..."
                        />

                        {/* Description */}
                        <Text style={styles.label}>Description</Text>
                        <TextInput
                            style={[styles.input, styles.input_description]}
                            value={exerciseDescriptionValue}
                            onChangeText={text => setExerciseDescriptionValue(text)}
                            placeholder="Exemple of description..."
                            multiline={true}
                        />

                        {/* Muscle group */}
                        <Text style={styles.label}>Muscle group</Text>
                        <SelectDropdown
                            data={muscle_grp}
                            onSelect={(selectedItem, index) => {
                                setExerciseMuscleGroupValue(selectedItem.title);
                            }}
                            renderButton={(selectedItem, isOpened) => {
                                const textColor = selectedItem ? 'black' : 'lightgray';
                                return (
                                    <View style={[styles.input, styles.dropdownButtonStyle]}>
                                        <Text style={[styles.dropdownButtonTxtStyle, { color: textColor }]}>
                                            {(selectedItem && selectedItem.title) || 'Choose from the list'}
                                        </Text>
                                        <MaterialIcons name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                                    </View>
                                );
                            }}
                            renderItem={(item, index, isSelected) => {
                                return (
                                    <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: 'lightgrey'})}}>
                                        <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                                    </View>
                                );
                            }}
                            showsVerticalScrollIndicator={false}
                            dropdownStyle={[styles.input, styles.dropdown]}
                            defaultValue={exerciseMusclegroupValue ? exerciseMusclegroupValue : 'Choose from the list'}
                        />

                        {/* Type of exercise */}
                        <Text style={styles.label}>Type of exercise</Text>
                        <SelectDropdown
                            data={type_of_exercise}
                            onSelect={(selectedItem, index) => {
                                setExerciseTypeOfExerciseValue(selectedItem.title);
                            }}
                            renderButton={(selectedItem, isOpened) => {
                                const textColor = selectedItem ? 'black' : 'lightgray';
                                return (
                                    <View style={[styles.input, styles.dropdownButtonStyle]}>
                                        <Text style={[styles.dropdownButtonTxtStyle, { color: textColor }]}>
                                            {(selectedItem && selectedItem.title) || 'Choose from the list'}
                                        </Text>
                                        <MaterialIcons name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                                    </View>
                                );
                            }}
                            renderItem={(item, index, isSelected) => {
                                return (
                                    <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: 'lightgrey'})}}>
                                        <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                                    </View>
                                );
                            }}
                            showsVerticalScrollIndicator={false}
                            dropdownStyle={[styles.input, styles.dropdown]}
                            defaultValue={exerciseTypeOfExerciseValue ? exerciseTypeOfExerciseValue : 'Choose from the list'}
                        />
                    </View>
                    
                    {/* Button to save the exercise */}
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
        bottom: -20,
        right: -12,
        backgroundColor: 'white',
        width: 38,
        height: 38,
        overflow: 'hidden',
    },
    exercise_img_update_subcontainer: {
        width: 36,
        height: 36,
        borderRadius: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    exercise_img_update: {
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
    // Select box
    dropdownButtonStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 14,
        color: 'lightgray',
    },
    dropdownButtonArrowStyle: {
        fontSize: 28,
    },
    dropdownItemStyle: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 14,
        color: 'black',
    },
    // Button to save the exercise
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

export default PopupExercise;
