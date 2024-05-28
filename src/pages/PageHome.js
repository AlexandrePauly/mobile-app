import React, { useState, useEffect } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Components
import Header from '../basics/Header.js';
import PopupDelete from '../basics/PopupDelete.js';
import PopupRoutine from '../basics/PopupRoutine.js';

// Database
import { addRoutine, deleteRoutine, updateRoutine, getRoutines } from '../../db/RoutineTable.js';
import { initDatabase } from '../../db/InitDatabase.js';

// Librairies
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
 
// Images - icons
import exercise from '../../assets/icons/gym.png';
import modify from '../../assets/icons/pencil_black.png';

const { height, width } = Dimensions.get('window');
  
// DB - Routines
const sections = [
    { 
        title: 'Programme 1',
        desc: 'Entraînement en salle', 
        img: 'P',
        color: 'lightgray',
        workouts: [
            {
                title: 'Program from April to June',
                img: 'P', 
                color: 'lightgreen',
                exercises: []
            },
            {
                title: 'Day 1 - Back & Biceps',
                img: 'D',
                color: 'lightgray',
                exercises: [
                    {title: 'Exercise 1', img: exercise, color: 'lightgray'},
                    {title: 'Exercise 2', img: exercise, color: 'lightgray'},
                    {title: 'Exercise 3', img: exercise, color: 'lightgray'},
                ]
            },
            {
                title: 'Day 2 - Legs',
                img: 'D', 
                color: 'lightgray',
                exercises: [
                    {title: 'Exercise 1', img: exercise, color: 'lightgray'},
                    {title: 'Exercise 2', img: exercise, color: 'lightgray'},
                    {title: 'Exercise 3', img: exercise, color: 'lightgray'},
                ]
            },
            {
                title: 'Day 3 - Shoulders & Abs',
                img: 'D',
                color: 'lightgray',
                exercises: [
                    {title: 'Exercise 1', img: exercise, color: 'lightgray'},
                    {title: 'Exercise 2', img: exercise, color: 'lightgray'},
                    {title: 'Exercise 3', img: exercise, color: 'lightgray'},
                ] 
            },
            {
                title: 'Day 4 - Legs',
                img: 'D',
                color: 'lightgray',
                exercises: [
                    {title: 'Exercise 1', img: exercise, color: 'lightgray'},
                    {title: 'Exercise 2', img: exercise, color: 'lightgray'},
                    {title: 'Exercise 3', img: exercise, color: 'lightgray'},
                ]
            },
            {
                title: 'Day 5 - Chest & triceps',
                img: 'D',
                color: 'lightgray',
                exercises: [
                    {title: 'Exercise 1', img: exercise, color: 'lightgray'},
                    {title: 'Exercise 2', img: exercise, color: 'lightgray'},
                    {title: 'Exercise 3', img: exercise, color: 'lightgray'},
                ]
            },
        ]
    },{
        title: 'Programme 2',
        desc: 'Entraînement en salle',
        img: 'P',
        color: 'lightgray',
        workouts: [
            {
                title: 'Program from April to June',
                img: 'P', 
                color: 'lightgreen',
                exercises: []
            },
            {
                title: 'Day 1 - Back & Biceps',
                img: 'D',
                color: 'lightgray',
                exercises: [
                    {title: 'Exercise 1', img: exercise, color: 'lightgray'},
                    {title: 'Exercise 2', img: exercise, color: 'lightgray'},
                    {title: 'Exercise 3', img: exercise, color: 'lightgray'},
                ]
            },
            {
                title: 'Day 2 - Legs',
                img: 'D', 
                color: 'lightgray',
                exercises: [
                    {title: 'Exercise 1', img: exercise, color: 'lightgray'},
                    {title: 'Exercise 2', img: exercise, color: 'lightgray'},
                    {title: 'Exercise 3', img: exercise, color: 'lightgray'},
                ]
            },
            {
                title: 'Day 3 - Shoulders & Abs',
                img: 'D',
                color: 'lightgray',
                exercises: [
                    {title: 'Exercise 1', img: exercise, color: 'lightgray'},
                    {title: 'Exercise 2', img: exercise, color: 'lightgray'},
                    {title: 'Exercise 3', img: exercise, color: 'lightgray'},
                ]
            },
            {
                title: 'Day 4 - Legs',
                img: 'D',
                color: 'lightgray',
                exercises: [
                    {title: 'Exercise 1', img: exercise, color: 'lightgray'},
                    {title: 'Exercise 2', img: exercise, color: 'lightgray'},
                    {title: 'Exercise 3', img: exercise, color: 'lightgray'},
                ]
            },
            {
                title: 'Day 5 - Chest & triceps',
                img: 'D',
                color: 'lightgray',
                exercises: [
                    {title: 'Exercise 1', img: exercise, color: 'lightgray'},
                    {title: 'Exercise 2', img: exercise, color: 'lightgray'},
                    {title: 'Exercise 3', img: exercise, color: 'lightgray'},
                ]
            },
        ]
    },{
        title: 'Programme 3',
        desc: 'Entraînement en salle',
        img: 'P',
        color: 'lightgray',
        workouts: [
            {
                title: 'Program from April to June',
                img: 'P', 
                color: 'lightgreen',
                exercises: []
            },
            {
                title: 'Day 1 - Back & Biceps',
                img: 'D',
                color: 'lightgray',
                exercises: [
                    {title: 'Exercise 1', img: exercise, color: 'lightgray'},
                    {title: 'Exercise 2', img: exercise, color: 'lightgray'},
                    {title: 'Exercise 3', img: exercise, color: 'lightgray'},
                ]
            },
            {
                title: 'Day 2 - Legs',
                img: 'D', 
                color: 'lightgray',
                exercises: [
                    {title: 'Exercise 1', img: exercise, color: 'lightgray'},
                    {title: 'Exercise 2', img: exercise, color: 'lightgray'},
                    {title: 'Exercise 3', img: exercise, color: 'lightgray'},
                ]
            },
            {
                title: 'Day 3 - Shoulders & Abs',
                img: 'D',
                color: 'lightgray',
                exercises: [
                    {title: 'Exercise 1', img: exercise, color: 'lightgray'},
                    {title: 'Exercise 2', img: exercise, color: 'lightgray'},
                    {title: 'Exercise 3', img: exercise, color: 'lightgray'},
                ]
            },
            {
                title: 'Day 4 - Legs',
                img: 'D',
                color: 'lightgray',
                exercises: [
                    {title: 'Exercise 1', img: exercise, color: 'lightgray'},
                    {title: 'Exercise 2', img: exercise, color: 'lightgray'},
                    {title: 'Exercise 3', img: exercise, color: 'lightgray'},
                ]
            },
            {
                title: 'Day 5 - Chest & triceps',
                img: 'D',
                color: 'lightgray',
                exercises: [
                    {title: 'Exercise 1', img: exercise, color: 'lightgray'},
                    {title: 'Exercise 2', img: exercise, color: 'lightgray'},
                    {title: 'Exercise 3', img: exercise, color: 'lightgray'},
                ]
            },
        ]
    },{
        title: 'Programme 4',
        desc: 'Entraînement en salle',
        img: 'P',
        color: 'lightgray',
        workouts: [
            {
                title: 'Program from April to June',
                img: 'P', 
                color: 'lightgreen',
                exercises: []
            },
            {
                title: 'Day 1 - Back & Biceps',
                img: 'D',
                color: 'lightgray',
                exercises: [
                    {title: 'Exercise 1', img: exercise, color: 'lightgray'},
                    {title: 'Exercise 2', img: exercise, color: 'lightgray'},
                    {title: 'Exercise 3', img: exercise, color: 'lightgray'},
                ]
            },
            {
                title: 'Day 2 - Legs',
                img: 'D', 
                color: 'lightgray',
                exercises: [
                    {title: 'Exercise 1', img: exercise, color: 'lightgray'},
                    {title: 'Exercise 2', img: exercise, color: 'lightgray'},
                    {title: 'Exercise 3', img: exercise, color: 'lightgray'},
                ]
            },
            {
                title: 'Day 3 - Shoulders & Abs',
                img: 'D',
                color: 'lightgray',
                exercises: [
                    {title: 'Exercise 1', img: exercise, color: 'lightgray'},
                    {title: 'Exercise 2', img: exercise, color: 'lightgray'},
                    {title: 'Exercise 3', img: exercise, color: 'lightgray'},
                ]
            },
            {
                title: 'Day 4 - Legs',
                img: 'D',
                color: 'lightgray',
                exercises: [
                    {title: 'Exercise 1', img: exercise, color: 'lightgray'},
                    {title: 'Exercise 2', img: exercise, color: 'lightgray'},
                    {title: 'Exercise 3', img: exercise, color: 'lightgray'},
                ]
            },
            {
                title: 'Day 5 - Chest & triceps',
                img: 'D',
                color: 'lightgray',
                exercises: [
                    {title: 'Exercise 1', img: exercise, color: 'lightgray'},
                    {title: 'Exercise 2', img: exercise, color: 'lightgray'},
                    {title: 'Exercise 3', img: exercise, color: 'lightgray'},
                ]
            },
        ]
    },
];

// Component creation
const PageHome = () => {
    // Initialization of variables
    const [showModifyButton, setShowModifyButton] = useState(true);                  // Modify button state
    const [modalVisiblePopupRoutine, setModalVisiblePopupRoutine] = useState(false); // Popup routine state
    const [selectedRoutine, setSelectedRoutine] = useState(null);                    // Selected routine
    const [modalVisiblePopupDelete, setModalVisiblePopupDelete] = useState(false);   // Popup delete state
    const navigation = useNavigation();
    const [refreshIndicator, setRefreshIndicator] = useState(false);                   // Refresh page indicator
    const [routines, setRoutines] = useState([]);

    const popupDelete = (routine) => { 
        setSelectedRoutine(routine);
        setModalVisiblePopupDelete(true);
    }; 

    // Function to display popup to add or update a routine
    const popupRoutine = (routine) => {
        setSelectedRoutine(routine);
        setModalVisiblePopupRoutine(true);
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
        const routines = getRoutines()
        setRoutines(routines);
    };

    // Function to add a routine
    const handleAddRoutine = (title, desc, img, color) => {
        addRoutine(title, desc, img, color);
        setModalVisiblePopupRoutine(false);
        setRefreshIndicator(prevState => !prevState);
    }

    // Function to update a routine
    const handleUpdateRoutine = (id, title, desc, img, color) => {
        updateRoutine(id, title, desc, img, color);
        setModalVisiblePopupRoutine(false);
        setRefreshIndicator(prevState => !prevState);
    }

    // Function to delete a routine
    const handleDeleteRoutine = () => {
        deleteRoutine(selectedRoutine.id_routine);
        setModalVisiblePopupDelete(false);
        setRefreshIndicator(prevState => !prevState);
    } 

    const navigateToWorkouts = async (id_routine) => {
        if(showModifyButton) { 
            try {
                // Stocker la valeur dans le stockage local
                await AsyncStorage.setItem('routine', JSON.stringify(id_routine));

                const randomNum = Math.random();
                navigation.navigate("Workouts", { rand: randomNum });
            } catch (error) {
                // Gérer les erreurs éventuelles
                console.error("Une erreur s'est produite lors du stockage de la valeur :", error);
            }
        }
    }

    return (
        <View style={styles.outerContainer}>
            <Header title='My routines' desc={routines.length > 0 ? routines.length + ' routines' : '0 routines'} toggleModifyButton={toggleModifyButton} onAdd={() => popupRoutine(null)} page={'home'} />
            {/* Scroll view : All content of the page */}
            <ScrollView contentContainerStyle={styles.container}>
                {/* For eachelements */}
                {routines.map((routine, index) => (
                    // Element container 
                    <TouchableOpacity key={index} style={styles.routine_container} activeOpacity={0.6} onPress={() => navigateToWorkouts(routine.id_routine)}>
                        {/* Button to remove an exercise */} 
                        {!showModifyButton && (
                            <TouchableOpacity style={styles.remove_icon} onPress={ () => popupDelete(routine)}>
                                <Icon name="remove-circle" size={30} color="#f44336" />
                            </TouchableOpacity>
                        )}

                        {/* Routine's image */}
                        <View style={[styles.routine_img_container, {backgroundColor: routine.color}]}>
                            <Text style={styles.routine_img}>{routine.img}</Text>
                        </View>

                        {/* Routine's infos */}
                        <View>
                            {/* Routine's name */}
                            <Text style={styles.routine_title}>{routine.title}</Text>

                            {/* Routine's desc */}
                            <Text style={styles.routine_desc}>{routine.desc}</Text>
                        </View>
 
                        {/* Button to update an exercise */}
                        {!showModifyButton && (
                            <TouchableOpacity style={styles.routine_update_icon_container} onPress={() => popupRoutine(routine)}>
                                <Image style={styles.routine_update_icon_img} source={modify}></Image>
                            </TouchableOpacity>
                        )}
                    </TouchableOpacity>
                ))}

                {/* Popups */}
                <PopupRoutine title={'My routines'} visible={modalVisiblePopupRoutine} routine={selectedRoutine || {}} onClose={() => setModalVisiblePopupRoutine(false)} onAdd={handleAddRoutine} onUpdate={handleUpdateRoutine} />
                <PopupDelete title={'Routine'} visible={modalVisiblePopupDelete} onClose={() => setModalVisiblePopupDelete(false)} onConfirm={handleDeleteRoutine} />
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
        fontSize: 20,
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

export default PageHome;
