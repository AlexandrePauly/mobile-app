import React, { useState, useEffect } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

// Components
import Header from '../basics/Header.js';
import PopupAddExerciseToWorkout from '../basics/PopupAddExerciseToWorkout.js';
import PopupExerciseToWorkout from '../basics/PopupExerciseToWorkout.js';
import PopupDelete from '../basics/PopupDelete.js';

// Database
import { getExerciseById } from '../../db/ExerciseTable.js';
import { getExerciseWorkoutSets } from '../../db/WorkoutExerciseSetTable.js';
import { addExerciseToWorkout, updateExerciseToWorkout, deleteExerciseFromWorkout, getExercisesByWorkoutId } from '../../db/WorkoutExerciseTable.js';

// Images - icons
import dumbbell from '../../assets/icons/gym.png';
import modify from '../../assets/icons/pencil_black.png';

// Librairies
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute  } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

// Component creation
const PageWorkout = () => {
    // Initialization of variables 
    const [showModifyButton, setShowModifyButton] = useState(true);   // Modify button state
    const [modalVisiblePopupDelete, setModalVisiblePopupDelete] = useState(false);   // Popup delete state
    const [modalVisiblePopupExerciseToWorkout, setModalVisiblePopupExerciseToWorkout] = useState(null);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [modalVisiblePopupAddExerciseToWorkout, setModalVisiblePopupAddExerciseToWorkout] = useState(null);
    const navigation = useNavigation(); 
    const [refreshIndicator, setRefreshIndicator] = useState(false); 
    const route = useRoute() ;
    const workoutInfo = route.params?.rand;
    const [exercises, setExercises] = useState(null);
    const [title, setTitle] = useState(null);

    useEffect(() => {
        const fetchValeurStockee = async () => {
            try {
                // Gets values from local storage
                const valeur = await AsyncStorage.getItem('workout');
                let title = await AsyncStorage.getItem('workout_title');

                if (valeur !== null) {
                    // La valeur a été récupérée avec succès
                    title = title.replace(/"/g, '');

                    // Utiliser votre requête pour récupérer les données de votre base de données
                    const data = await getExercisesByWorkoutId(Number(valeur));
                    setExercises(data);
                    setTitle(title);
                } else {
                    // Aucune valeur n'a été trouvée dans le stockage local
                    console.log("Aucune valeur n'a été trouvée dans le stockage local.");
                }
            } catch (error) {
                // Gérer les erreurs éventuelles
                console.error("Une erreur s'est produite lors de la récupération de la valeur :", error);
            }
        };

        // Appeler la fonction pour récupérer la valeur stockée
        fetchValeurStockee();

        const unsubscribe = navigation.addListener('focus', () => {
            setShowModifyButton(true);
        });

        // Fonction de nettoyage
        return unsubscribe; 
    }, [refreshIndicator, navigation, workoutInfo]);

    // Supposons que vous ayez ces noms d'images dans votre base de données
    const images = {
        exercises: dumbbell, 
    };

    // Fonction pour obtenir le chemin de l'image en fonction du nom stocké en base de données
    const getImageSource = (imageName) => {
        return images[imageName];
    }; 

    const popupDelete = (exercise) => { 
        setSelectedExercise(exercise);
        setModalVisiblePopupDelete(true);
    }; 

    const popupWorkout = (exercise) => {
        setSelectedExercise(exercise); 
        setModalVisiblePopupExerciseToWorkout(true);
    }

    // Function to swap buttons (when update is clicked, button ok is displayed, etc.)
    const toggleModifyButton = () => {
        setShowModifyButton(!showModifyButton);
    }; 
 
    // Function to choose the exercise to add at a workout
    const handleChooseExercise = (id_exercise) => {
        setModalVisiblePopupAddExerciseToWorkout(false);
        exercise_chosen = getExerciseById(id_exercise);
        popupWorkout(exercise_chosen);
    }

    // Function to add an exercise to a workout
    const handleAddExerciseToWorkout = (id_exercise, new_goal, new_rest, new_comment) => {    
        addExerciseToWorkout(workoutInfo, id_exercise, new_goal, new_rest, new_comment);
        setModalVisiblePopupExerciseToWorkout(false);
        setRefreshIndicator(prevState => !prevState); 
    }

    // Function to update an exercise from a workout
    const handleUpdateExerciseToWorkout = (id_exercise, id_workout, new_goal, new_rest, new_comment) => {
        updateExerciseToWorkout(id_exercise, id_workout, new_goal, new_rest, new_comment);
        setModalVisiblePopupExerciseToWorkout(false);
        setRefreshIndicator(prevState => !prevState);
    }

    // Function to delete an exercise from a workout
    const handleDeleteExercise = () => {
        deleteExerciseFromWorkout(selectedExercise.id_exercise);
        setModalVisiblePopupDelete(false);
        setRefreshIndicator(prevState => !prevState);
    };

    // Function to navigate from Workout page to set page
    const navigateToSet = async (id_workout, id_exercise, title, goal, rest) => {
        if (showModifyButton) {
            try {
                // Créer un objet avec tous les paramètres
                const workout_exercise_data = {
                    id_workout,
                    id_exercise,
                    title,
                    goal,
                    rest
                };

                const randomNum = Math.random();
    
                // Stocker l'objet dans le stockage local
                await AsyncStorage.setItem('workout_exercise', JSON.stringify(workout_exercise_data));

                const sets_data = await getExerciseWorkoutSets(id_workout, id_exercise);

                // Naviguer vers l'écran "Sets" avec les informations nécessaires
                navigation.navigate("Sets", { rand: randomNum, infosExerciseRoad: sets_data });
            } catch (error) {
                // Gérer les erreurs éventuelles
                console.error("Une erreur s'est produite lors du stockage de la valeur :", error);
            }
        }
    };
 
    return (
        <View style={styles.outerContainer}>
            <Header title='Exercises' desc={title ? title : ''} toggleModifyButton={toggleModifyButton} onAdd={ () => {setModalVisiblePopupAddExerciseToWorkout(true)} } page={'workout'} />
            <ScrollView contentContainerStyle={styles.container}>
                {/* For eachelements */}
                {exercises && exercises.map(exercise => (
                    // Element container
                    <TouchableOpacity key={exercise.id_exercise} style={styles.routine_container} activeOpacity={0.6} onPress={ () => {if(showModifyButton){navigateToSet(exercise.id_workout, exercise.id_exercise, exercise.title ,exercise.goal, exercise.rest)}}}>
                        {/* Button to remove an exercise */}
                        {!showModifyButton && (
                            <TouchableOpacity style={styles.remove_icon} onPress={ () => popupDelete(exercise)}>
                                <Icon name="remove-circle" size={30} color="#f44336" />
                            </TouchableOpacity>
                        )}

                        {/* Routine's image */}
                        <View style={styles.routine_img_container}>
                            <Image source={getImageSource(exercise.img)} style={styles.routine_img}></Image>
                        </View>
 
                        <View>
                            {/* Routine's name */}
                            <Text style={styles.routine_title}>{exercise.title}</Text>
  
                            {/* Routine's desc */}
                            {exercise.goal && exercise.rest ? (
                                <Text style={styles.routine_desc}>{exercise.goal} - {exercise.rest} sec</Text>
                            ) : exercise.goal ? (
                                <Text style={styles.routine_desc}>{exercise.goal}</Text>
                            ) : exercise.rest ? (
                                <Text style={styles.routine_desc}>{exercise.rest} sec</Text>
                            ) : null}
                        </View>

                        {/* Button to update an exercise */}
                        {!showModifyButton && (
                            <TouchableOpacity style={styles.routine_update_icon_container} onPress={() => popupWorkout(exercise)}>
                                <Image style={styles.routine_update_icon_img} source={modify}></Image>
                            </TouchableOpacity>
                        )}
                    </TouchableOpacity>
                ))}

                {/* Popups */}
                <PopupDelete title={'Workout'} visible={modalVisiblePopupDelete} onClose={() => setModalVisiblePopupDelete(false)}  onConfirm={handleDeleteExercise} />
                <PopupAddExerciseToWorkout visible={modalVisiblePopupAddExerciseToWorkout} onClose={() => setModalVisiblePopupAddExerciseToWorkout(false)} onChooseExercise={handleChooseExercise}/>
                <PopupExerciseToWorkout visible={modalVisiblePopupExerciseToWorkout} routine={selectedExercise || {}} onClose={() => setModalVisiblePopupExerciseToWorkout(false)} onAdd={handleAddExerciseToWorkout} onUpdate={handleUpdateExerciseToWorkout}/>
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
    routine_container: {
        position: 'relative',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 25,
        backgroundColor: 'white',
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
    },

    // Routine's image
    routine_img_container: {
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        width: 55,
        height: 55,
        borderColor: 'black',
        borderWidth: 1,
    },
    routine_img: {
        color: 'white',
        margin: 0,
        width: 30,
        height: 30,
    },

    // Exercise's name
    routine_title: {
        marginLeft: 20,
        fontSize: 16,
    },

    routine_desc: {
        marginLeft: 20,
        fontSize: 14,
        color: 'grey',
    },
    
    // Button to update a routine
    routine_update_icon_container: {
        position: 'absolute',
        right: 25,
    },
    routine_update_icon_img: {
        width: 20,
        height: 20,
    },

    // Button to remove a routine
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

export default PageWorkout;
