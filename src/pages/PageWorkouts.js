import React, { useState, useEffect } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

// Components
import Header from '../basics/Header.js';
import PopupDelete from '../basics/PopupDelete.js';
import PopupWorkout from '../basics/PopupWorkout.js';

// Database
import { addWorkout, updateWorkout, deleteWorkout, getWorkoutsById } from '../../db/WorkoutsTable.js';

// Images - icons
import exercises from '../../assets/icons/gym.png';
import modify from '../../assets/icons/pencil_black.png';

// Librairies
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute  } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

// Component creation
const PageWorkouts = () => {
    // Initialization of variables 
    const [showModifyButton, setShowModifyButton] = useState(true);   // Modify button state
    const [modalVisiblePopupWorkout, setModalVisiblePopupWorkout] = useState(false); // Popup routine state
    const [modalVisiblePopupDelete, setModalVisiblePopupDelete] = useState(false);   // Popup delete state
    const [selectedWorkout, setSelectedWorkout] = useState(null);                    // Selected workout
    const navigation = useNavigation(); 
    const [refreshIndicator, setRefreshIndicator] = useState(false); 
    const route = useRoute() 
    const routineInfo = route.params?.rand;
    const [workouts, setWorkouts] = useState(null);

    const popupDelete = (workout) => { 
        setSelectedWorkout(workout);
        setModalVisiblePopupDelete(true);
    }; 

    const popupWorkout = (workout) => {
        setSelectedWorkout(workout);
        setModalVisiblePopupWorkout(true);
    };  

    // Function to swap buttons (when update is clicked, button ok is displayed, etc.)
    const toggleModifyButton = () => {
        setShowModifyButton(!showModifyButton);
    }; 

    useEffect(() => {
        const fetchValeurStockee = async () => {
            try {
                // Récupérer la valeur stockée dans le stockage local
                const valeur = await AsyncStorage.getItem('routine');
                if (valeur !== null) {                    
                    // Utiliser votre requête pour récupérer les données de votre base de données
                    const data = await getWorkoutsById(Number(valeur))
                    setWorkouts(data);
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
    }, [refreshIndicator, navigation, routineInfo]); 

    const handleAddWorkout = (title, desc, img, color) => {
        try { 
            addWorkout(title, desc, img, color, routineInfo);
            setModalVisiblePopupWorkout(false);
            setRefreshIndicator(prevState => !prevState);
        }
        catch { 

        }
        setModalVisiblePopupWorkout(false);
    } 

    const handleUpdateWorkout = (title, desc, img, color) => {
        updateWorkout(selectedWorkout.id_workout, title, desc, img, color)
        setModalVisiblePopupWorkout(false);
        setRefreshIndicator(prevState => !prevState);
    }

    const handleDeleteWorkout = () => {
        deleteWorkout(selectedWorkout.id_workout);
        setModalVisiblePopupDelete(false);
        setRefreshIndicator(prevState => !prevState);
    }

    const navigateToWorkout = async (id_workout, workout_title) => {
        if(showModifyButton) { 
            try {
                // Stocker la valeur dans le stockage local
                await AsyncStorage.setItem('workout', JSON.stringify(id_workout));
                await AsyncStorage.setItem('workout_title', JSON.stringify(workout_title));

                const randomNum = Math.random();
                navigation.navigate("Workout", { rand: id_workout });
            } catch (error) {
                // Gérer les erreurs éventuelles
                console.error("Une erreur s'est produite lors du stockage de la valeur :", error);
            }
        }
    }
 
    return (
        <View style={styles.outerContainer}>
            <Header title='My workouts' desc={workouts && workouts.length > 0 ? workouts.length + ' workouts' : '0 workout'} toggleModifyButton={toggleModifyButton} onAdd={() => popupWorkout(null)} page={'workouts'} />
            <ScrollView contentContainerStyle={styles.container}>
                {/* For eachelements */}
                {workouts && workouts.map(workout => (
                    // Element container 
                    <TouchableOpacity key={workout.id_workout} style={styles.routine_container} activeOpacity={0.6} onPress={ () => { if(showModifyButton){navigateToWorkout(workout.id_workout, workout.title);}}}>
                        {/* Button to remove an exercise */}
                        {!showModifyButton && (
                            <TouchableOpacity style={styles.remove_icon} onPress={ () => popupDelete(workout)}>
                                <Icon name="remove-circle" size={30} color="#f44336" />
                            </TouchableOpacity>
                        )}

                        {/* Routine's image */}
                        <View style={[styles.routine_img_container, {backgroundColor: workout.color}]}>
                            <Text style={styles.routine_img}>{workout.img}</Text>
                        </View>

                        <View>
                            {/* Routine's name */}
                            <Text style={styles.routine_title}>{workout.title}</Text>
  
                            <Text style={styles.routine_desc}>{workout.desc}</Text>
                        </View>

                        {/* Button to update an exercise */}
                        {!showModifyButton && (
                            <TouchableOpacity style={styles.routine_update_icon_container} onPress={() => popupWorkout(workout)}>
                                <Image style={styles.routine_update_icon_img} source={modify}></Image>
                            </TouchableOpacity>
                        )}
                    </TouchableOpacity>
                ))}
                {/* Popups */}
                <PopupWorkout title={'My workouts'} visible={modalVisiblePopupWorkout} routine={selectedWorkout || {}} onClose={() => setModalVisiblePopupWorkout(false)} onAdd={handleAddWorkout} onUpdate={handleUpdateWorkout} />
                <PopupDelete title={'Workouts'} visible={modalVisiblePopupDelete} onClose={() => setModalVisiblePopupDelete(false)} onConfirm={handleDeleteWorkout} />
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
    },
    routine_img: {
        color: 'white',
        margin: 0,
        fontSize: 20,
    },

    // Exercise's name
    routine_title: {
        marginLeft: 20,
        fontSize: 16,
    },

    routine_desc: {
        marginLeft: 20,
        fontSize: 14,
        color: 'gray'
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

export default PageWorkouts;
