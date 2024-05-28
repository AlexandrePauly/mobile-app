import React, { useState, useEffect } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

// Components
import Header from '../basics/Header.js';
import PopupDelete from '../basics/PopupDelete.js';
import PopupSet from '../basics/PopupSet.js';

// Database
import { addSet, updateSet, deleteSet } from '../../db/WorkoutExerciseSetTable.js';

// Images - icons
import modify from '../../assets/icons/pencil_black.png';

// Librairies
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute  } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

// Component creation
const PageExerciseSets = () => {
    // Initialization of variables
    const navigation = useNavigation();          // Variable to use navigation
    const [refreshIndicator, setRefreshIndicator] = useState(false); // Variable to refresh the page
    const route = useRoute() ;                   // Variable to use routes
    const routesInfo = route.params?.rand; // Routes infos
    const infosExercisesByRoad = route.params?.infosExerciseRoad
    const [showModifyButton, setShowModifyButton] = useState(true);   // Modify button state
    const [infosExercise, setInfosExercise] = useState(null);
    const [sets, setSets] = useState(null);
    const [modalVisiblePopupSet, setModalVisiblePopupSet] = useState(null);
    const [selectedSet, setSelectedSet] = useState(null);
    const [modalVisiblePopupDelete, setModalVisiblePopupDelete] = useState(false);     // Popup delete state

    useEffect(() => {
        const fetchValeurStockee = async () => {
            try {
                // Gets values from local storage
                const values = await AsyncStorage.getItem('workout_exercise');

                if (values !== null) {
                    const data = JSON.parse(values);
                    setInfosExercise(data);  

                    const groupedData = infosExercisesByRoad.reduce((acc, currentValue) => {
                        const date = currentValue.date;
                        if (!acc[date]) {
                            acc[date] = [];
                        }
                        acc[date].push(currentValue);
                        return acc;
                    }, {});

                    // Sort the keys (dates) in descending order
                    const sortedDates = Object.keys(groupedData).sort((a, b) => new Date(b) - new Date(a));

                    // Create a new object with the sorted dates
                    const sortedGroupedData = sortedDates.reduce((acc, date) => {
                        acc[date] = groupedData[date];
                        return acc;
                    }, {});
                
                    setSets(sortedGroupedData);
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
    }, [refreshIndicator, navigation, routesInfo]);    

    const popupDelete = (value) => {
        setSelectedSet(value);
        setModalVisiblePopupDelete(true);
    }

    const popupSet = (value) => {
        setSelectedSet(value);
        setModalVisiblePopupSet(true);
    }

    // Function to swap buttons (when update is clicked, button ok is displayed, etc.)
    const toggleModifyButton = () => {
        setShowModifyButton(!showModifyButton);
    }; 

    const toggleAddButton = (set) => {
        setSelectedSet(set);
        setModalVisiblePopupSet(true);
    }

    // Function to add an exercise
    const handleAddSet = (nb_reps, weight) => {
        const getCurrentDate = () => {
            const date = new Date();
            
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
            const day = String(date.getDate()).padStart(2, '0');
          
            return `${year}-${month}-${day}`;
        };

        // Initialization of variables
        date = getCurrentDate()
        id_workout = infosExercisesByRoad[0].id_workout
        id_exercise = infosExercisesByRoad[0].id_exercise

        addSet(id_workout, id_exercise, date, nb_reps, weight);
        setModalVisiblePopupSet(false);
        setRefreshIndicator(prevState => !prevState);
    }

    // Funcrion to update a set
    const handleUpdateSet = (id_set, new_nb_reps, new_weight) => {
        updateSet(id_set, new_nb_reps, new_weight);
        setModalVisiblePopupSet(false);
        setRefreshIndicator(prevState => !prevState);
    }

    // Function to delete a set
    const handleDeleteSet = () => {
        deleteSet(selectedSet.id_set); 
        setModalVisiblePopupDelete(false);
        setRefreshIndicator(prevState => !prevState);
    }

    // Function to modify a date
    const formatDate = (date) => {
        const dateObj = new Date(date);
        const day = dateObj.getDate().toString().padStart(2, '0');
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
        const year = dateObj.getFullYear().toString();
        return { dayMonth: `${day}/${month}`, year };
    };

    // Function to calculate the tonnage
    const calculateTotals = (sets) => {
        let totalReps = 0;
        let totalWeight = 0;
        sets.forEach(set => {
            totalReps += set.nb_reps;
            totalWeight += set.nb_reps * set.weight;
        });
        return { totalReps, totalWeight };
    };
    
    return (
        <View style={styles.outerContainer}>
            {/* Hedaer of the page */}
            <Header title={infosExercise ? infosExercise.title : ''} desc={infosExercise ? infosExercise.goal + ' - ' + infosExercise.rest + ' sec' : ''} toggleModifyButton={toggleModifyButton} onAdd={() => toggleAddButton(null)} page={'set'} />
            
            {/* Content of the page */}
            <ScrollView contentContainerStyle={styles.container}>
                {/* For each date */}
                {sets && Object.keys(sets).map(date => {
                    const formattedDate = formatDate(date);
                    const { totalReps, totalWeight } = calculateTotals(sets[date]);
                    
                    return (
                        <View key={date}>
                            <View style={styles.header}>
                                {/* Date of the day */}
                                <View style={styles.date_container}>
                                    <Text style={styles.date}>{formattedDate.dayMonth}</Text>
                                    <Text style={styles.date}>{formattedDate.year}</Text>
                                    {/* <Text style={styles.date}>{new Date(date).toLocaleDateString()}</Text> */}
                                </View>

                                {/* Tonnage of the day */}
                                <View style={styles.tonnage_container}>
                                    <Text style={styles.total}>Total :</Text>
                                    <Text style={styles.total_value}>{totalReps} reps x {totalWeight} kg</Text>
                                </View>
                            </View>

                            <View style={styles.set_container}>
                                {sets[date].map((set, index) => (
                                    <View key={set.id_set} style={styles.set}>
                                        {!showModifyButton && (
                                            <TouchableOpacity style={styles.remove_icon} onPress={() => {popupDelete(set)}}>
                                                <Icon name="remove-circle" size={30} color="#f44336" />
                                            </TouchableOpacity>
                                        )}

                                        <Text style={[styles.date_container, styles.set_content]}>Set {index + 1}</Text>
                                        <View style={styles.tonnage_container}>
                                            <Text style={[styles.tonnage, styles.tonnage_value]}>{set.nb_reps} </Text>
                                            <Text style={[styles.tonnage, styles.tonnage_text]}>reps</Text>
                                            <Text style={[styles.tonnage, styles.times]}> x </Text>
                                            <Text style={[styles.tonnage, styles.tonnage_value]}>{set.weight}</Text>
                                            <Text style={[styles.tonnage, styles.tonnage_text]}> kg</Text>
                                        </View>

                                        {!showModifyButton && (
                                            <TouchableOpacity style={styles.muscle_exercise_update_icon_container} onPress={() => popupSet(set)}>
                                                <Image style={styles.muscle_exercise_update_icon_img} source={modify}></Image>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                ))}
                            </View>
                        </View>
                    );
                })}

                {/* Popups */}
                <PopupDelete title={'Set'} visible={modalVisiblePopupDelete} onClose={() => setModalVisiblePopupDelete(false)} onConfirm={handleDeleteSet}/>
                <PopupSet title={'Sets'} visible={modalVisiblePopupSet} set={selectedSet || {}} onClose={() => setModalVisiblePopupSet(false)} onAdd={handleAddSet} onUpdate={handleUpdateSet}/>
            </ScrollView>
        </View>
    ); 
};

// Styles
const styles = StyleSheet.create({
    // Content of the page
    container: {
        paddingHorizontal: 20,
        paddingTop: 120,
        minHeight: height - 100,
    },
    header: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'lightgreen',
        padding: 10,
        borderRadius: 10,
    },
    set_container: {
        marginVertical: 20,
        backgroundColor: 'rgba(211, 211, 211, 0.3)',
        borderRadius: 10,
        paddingVertical: 10,
    },
    set: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    set_content: {
        marginLeft: 10,
    },
    // Date of the day
    date_container: {
        width: width * 0.15,
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 16,
        color: 'grey',
    },
    date: {
        fontSize: 20,
        color: 'white',
    },
    // Tonnage of the day
    tonnage_container: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 30,
        alignItems: 'center',
    },
    tonnage: {
        fontSize: 20,
    },
    tonnage_value: {
        color: 'black',
        fontSize: 22,
    },
    tonnage_text: {
        fontSize: 16,
    },
    total: {
        marginRight: 10,
        fontSize: 20,
        color: 'white',
    },
    total_value: {
        fontSize: 20,
        color: 'white',
    },
    times: {
        color: 'grey',
        fontSize: 14,
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
        // marginRight: 10,
        marginLeft: 10,
    },
});

export default PageExerciseSets;