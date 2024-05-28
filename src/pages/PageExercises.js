import React, { useState, useEffect } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Components
import Header from '../basics/Header.js';
import PopupDelete from '../basics/PopupDelete.js';
import PopupExercise from '../basics/PopupExercise.js';

// Database
import { getMuscles, getMuscleByName } from '../../db/MuscleTable.js';
import { getExercises, addExercise, updateExercise, deleteExercise } from '../../db/ExerciseTable.js';
import { initDatabase } from '../../db/InitDatabase.js';

// Librairies
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

// Images - icons
import dumbbell from '../../assets/icons/gym.png';
import modify from '../../assets/icons/pencil_black.png';

// Images - muscles
import abs from '../../assets/muscles/abs.png';
import biceps from '../../assets/muscles/biceps.png';
import chest from '../../assets/muscles/chest.png';
import triceps from '../../assets/muscles/triceps.png';

const { height, width } = Dimensions.get('window');

// Component creation
const PageExercises = () => {
    // Initialization of variables
    const [showModifyButton, setShowModifyButton] = useState(true);                    // Modify button state
    const [modalVisiblePopupExercise, setModalVisiblePopupExercise] = useState(false); // Popup routine state
    const [selectedExercise, setSelectedExercise] = useState(null);                    // Exercise selected
    const [modalVisiblePopupDelete, setModalVisiblePopupDelete] = useState(false);     // Popup delete state
    const [muscles, setMuscles] = useState([]);                                        // Muscles list from database
    const [exercises, setExercises] = useState([]);                                    // Exercises list from database
    const [refreshIndicator, setRefreshIndicator] = useState(false);                   // Refresh page indicator
    const navigation = useNavigation();
    
    // Function to displau popup to delete exercise 
    const popupDelete = (exercise) => {
        setSelectedExercise(exercise);
        setModalVisiblePopupDelete(true);
    };  

    // Function to display popup to add or update an exercise
    const popupExercise = (exercise) => { 
        setSelectedExercise(exercise);
        setModalVisiblePopupExercise(true);
    };    

    // Function to swap buttons (when update is clicked, button ok is displayed, etc.)
    const toggleModifyButton = () => {
        setShowModifyButton(!showModifyButton);
    };

    useEffect(() => {
        initDatabase();

        fetchData();

        const unsubscribe = navigation.addListener('focus', () => {
            setShowModifyButton(true);
        });

        // Fonction de nettoyage
        return unsubscribe;
    }, [refreshIndicator, navigation]);

    // Function to load data
    const fetchData = () => {
        const muscles = getMuscles()
        setMuscles(muscles);
        const exercises = getExercises();
        setExercises(exercises);
    }; 
 
    // Function to add an exercise
    const handleAddExercise = (title, desc, img, muscleName, type) => {
        const muscle_id = getMuscleByName(muscleName);
        addExercise(title, desc, img, muscle_id, type);
        setModalVisiblePopupExercise(false);
        setRefreshIndicator(prevState => !prevState);
    }

    // Function to delete and exercise
    const handleDeleteExercise = () => { 
        deleteExercise(selectedExercise.id_exercise);
        setModalVisiblePopupDelete(false);
        setRefreshIndicator(prevState => !prevState);
    };

    // Function to update an exercise
    const handleUpdateExercise = (id, title, desc, img, muscleName, type) => {
        const muscle_id = getMuscleByName(muscleName);
        updateExercise(id, title, desc, img, muscle_id, type);
        setModalVisiblePopupExercise(false);
        setRefreshIndicator(prevState => !prevState);
    }

    // Supposons que vous ayez ces noms d'images dans votre base de données
    const muscleImages = {
        abs: abs,
        biceps: biceps,
        back: dumbbell,
        chest: chest,
        legs: dumbbell,
        shoulders: dumbbell,
        triceps: triceps,
        others: dumbbell,
        exercises: dumbbell, 
    };

    // Fonction pour obtenir le chemin de l'image en fonction du nom stocké en base de données
    const getImageSource = (imageName) => {
        return muscleImages[imageName];
    }; 

    const musclesWithExercises = muscles.map(muscle => {
        const muscleExercises = exercises.filter(exercise => exercise.muscle_id === muscle.id_muscle);
        const exercisesWithMuscleTitle = muscleExercises.map(exercise => ({ ...exercise, muscleTitle: muscle.title }));
        return { ...muscle, exercises: exercisesWithMuscleTitle };
    });
    

    return ( 
        <View style={styles.outerContainer}>
            <Header title='My exercises' desc={exercises.length + ' exercises'} toggleModifyButton={toggleModifyButton} onAdd={() => popupExercise(null)} page={'exercises'} />
            {/* Scroll view : All content of the page */}
            <ScrollView contentContainerStyle={styles.container}>
                {/* For eachelements */}
                {musclesWithExercises.map(muscle => (
                    <View key={muscle.id_muscle} style={styles.muscle_container}>
                        <View style={styles.muscle_header}>
                            <Image source={getImageSource(muscle.img)} style={styles.muscle_header_img}></Image>
                            <Text style={styles.muscle_header_title}>{muscle.title}</Text>
                        </View>
                        {muscle.exercises.map(exercise => (
                            <TouchableOpacity key={exercise.id_exercise} style={styles.muscle_exercise}>
                                {!showModifyButton && (
                                    <TouchableOpacity style={styles.remove_icon} onPress={() => popupDelete(exercise)}>
                                        <Icon name="remove-circle" size={30} color="#f44336" />
                                    </TouchableOpacity>
                                )}
                                <View style={styles.muscle_exercise_img_container}>
                                    <Image source={getImageSource(exercise.img)} style={styles.muscle_exercise_img}></Image>
                                </View>
                                <Text style={styles.muscle_exercise_title}>{exercise.title}</Text>
                                {!showModifyButton && (
                                    <TouchableOpacity style={styles.muscle_exercise_update_icon_container} onPress={() => popupExercise(exercise)}>
                                        <Image style={styles.muscle_exercise_update_icon_img} source={modify}></Image>
                                    </TouchableOpacity>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View> 
                ))}

                {/* Popups */}
                <PopupExercise title={'My exercises'} visible={modalVisiblePopupExercise} exercise={selectedExercise || {}} onClose={() => setModalVisiblePopupExercise(false)} onAdd={handleAddExercise} onUpdate={handleUpdateExercise} />
                <PopupDelete title={'Exercise'} visible={modalVisiblePopupDelete} onClose={() => setModalVisiblePopupDelete(false)} onConfirm={handleDeleteExercise}/>
            </ScrollView>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        paddingTop: 100,
        minHeight: height - 100,
    },
    // Header of the element : Group muscle (Biceps, Triceps, Legs, etc.)
    muscle_header: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'black', 
        backgroundColor: 'lightgrey',
    },
    // Section image
    muscle_header_img: {
        width: 50,
        height: 50,
        padding: 5,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 50,
        backgroundColor: 'white',
    },
    // Section name
    muscle_header_title: {
        marginLeft: 20,
        fontSize: 18,
        fontWeight: 'bold',
    },

    // Exercise
    muscle_exercise: {
        position: 'relative',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 4,
        paddingHorizontal: 30,
        backgroundColor: 'white',
    },
    // Exercise's image
    muscle_exercise_img_container: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 100,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    muscle_exercise_img: {
        width: 30,
        height: 30,
    },
    // Exercise's name
    muscle_exercise_title: {
        marginLeft: 20,
        fontSize: 16,
    },
    // Button to update an exercise
    muscle_exercise_update_icon_container: {
        position: 'absolute',
        right: 25,
    },
    muscle_exercise_update_icon_img: {
        width: 20,
        height: 20,
    },
    // Button to remove an exercise
    remove_icon: {
        marginRight: 10,
        marginLeft: -15,
    },
    remove_icon_inside: {
        height: 3,
        width: 10,
        backgroundColor: 'white',
    }
});

export default PageExercises;