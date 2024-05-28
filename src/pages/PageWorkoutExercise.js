import React, { useState, useEffect } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

// Components
import Header from '../basics/Header.js';
import PopupDelete from '../basics/PopupDelete.js';

// Images - icons
import exercises from '../../assets/icons/gym.png';
import modify from '../../assets/icons/pencil_black.png';

// Librairies
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute  } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

// Component creation
const PageExerciseWorkout = () => {
    // Initialization of variables 
    const [showModifyButton, setShowModifyButton] = useState(true);   // Modify button state
    const [modalVisiblePopupDelete, setModalVisiblePopupDelete] = useState(false);   // Popup delete state
    const navigation = useNavigation(); 
    const route = useRoute() 
    const exerciseInfo = route.params?.exerciseInfo;

    const popupDelete = () => { 
        setModalVisiblePopupDelete(true);
    }; 

    // Function to swap buttons (when update is clicked, button ok is displayed, etc.)
    const toggleModifyButton = () => {
        setShowModifyButton(!showModifyButton);
    }; 
 
    return (
        <View style={styles.outerContainer}>
            <Header title='Exercises' desc={exerciseInfo[1]} toggleModifyButton={toggleModifyButton} onAdd={() => popupDelete()} page={'workout'} />
            <ScrollView contentContainerStyle={styles.container}>
                {/* For eachelements */}
                {exerciseInfo[0].map((section, index) => (
                    // Element container
                    <TouchableOpacity key={index} style={styles.routine_container} activeOpacity={0.6} onPress={ () => navigation.navigate("Home")}>
                        {/* Button to remove an exercise */}
                        {!showModifyButton && (
                            <TouchableOpacity style={styles.remove_icon} onPress={ () => popupDelete()}>
                                <Icon name="remove-circle" size={30} color="#f44336" />
                            </TouchableOpacity>
                        )}

                        {/* Routine's image */}
                        <View style={styles.routine_img_container}>
                            <Image source={section.img} style={styles.routine_img}></Image>
                        </View>

                        {/* Routine's name */}
                        <Text style={styles.routine_title}>{section.title}</Text>

                        {/* Button to update an exercise */}
                        {!showModifyButton && (
                            <TouchableOpacity style={styles.routine_update_icon_container} onPress={() => popupRoutine(section)}>
                                <Image style={styles.routine_update_icon_img} source={modify}></Image>
                            </TouchableOpacity>
                        )}
                    </TouchableOpacity>
                ))}

                {/* Popups */}
                <PopupDelete title={'Workout'} visible={modalVisiblePopupDelete} onClose={() => setModalVisiblePopupDelete(false)} />
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

export default PageExerciseWorkout;
