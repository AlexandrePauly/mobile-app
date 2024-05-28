import React, { useState, useEffect } from 'react';
import { Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Database
import { initDatabase } from '../../db/InitDatabase.js';
import { getExercisesAsync } from '../../db/ExerciseTable.js';
import { getMusclesAsync } from '../../db/MuscleTable.js';

// Images - muscles
import abs from '../../assets/muscles/abs.png';
import biceps from '../../assets/muscles/biceps.png';
import chest from '../../assets/muscles/chest.png';
import triceps from '../../assets/muscles/triceps.png';
import dumbbell from '../../assets/icons/gym.png';

// Librairies
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute  } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

const PopupAddExerciseToWorkout = ({ visible, onClose, onChooseExercise }) => {
    // Initialization of variables
    const [showModifyButton, setShowModifyButton] = useState(true);  
    const [selectedColor, setSelectedColor] = useState('lightgreen');
    const [muscles, setMuscles] = useState([]);                                        // Muscles list from database
    const [exercises, setExercises] = useState([]);    
    const [refreshIndicator, setRefreshIndicator] = useState(false);                   // Refresh page indicator
    const navigation = useNavigation();

    // Fonction to close the popup and reset inputs and selectbox value
    const closePopup = () => {

    }

    useEffect(() => {
        const fetchData = async () => {
            const muscles_data = await getMusclesAsync();
            setMuscles(muscles_data);
            const exercises_data = await getExercisesAsync();
            setExercises(exercises_data);
        }; 

        initDatabase();
        fetchData();

        const unsubscribe = navigation.addListener('focus', () => {
            setShowModifyButton(true);
        });

        // Fonction de nettoyage
        return unsubscribe;
    }, [refreshIndicator, navigation, visible]);

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
                        <Text style={styles.header_title}>My exercises</Text>
                        
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
                <ScrollView style={styles.content}>
                   {/* For eachelements */}
                    {musclesWithExercises.map(muscle => (
                        <View key={muscle.id_muscle} style={styles.muscle_container}>
                            <View style={styles.muscle_header}>
                                <Image source={getImageSource(muscle.img)} style={styles.muscle_header_img}></Image>
                                <Text style={styles.muscle_header_title}>{muscle.title}</Text>
                            </View>
                            {muscle.exercises.map(exercise => (
                                <TouchableOpacity key={exercise.id_exercise} style={styles.muscle_exercise} onPress={() => {onChooseExercise(exercise.id_exercise)}}>
                                    <View style={styles.muscle_exercise_img_container}>
                                        <Image source={getImageSource(exercise.img)} style={styles.muscle_exercise_img}></Image>
                                    </View>
                                    <Text style={styles.muscle_exercise_title}>{exercise.title}</Text>
                                </TouchableOpacity>
                            ))}
                        </View> 
                    ))}
                </ScrollView>
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
    // Button to save the exercise
    button: {
        position: 'absolute',
        bottom: 25,
        left: 25,
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

export default PopupAddExerciseToWorkout;