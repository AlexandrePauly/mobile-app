import React, { useState } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';

// Components
import Header from '../basics/Header.js';

// Librairies
import AsyncStorage from '@react-native-async-storage/async-storage';

const PageDiary = () => {
    const [selected, setSelected] = useState('');

    // Initialization of variables
    const [showModifyButton, setShowModifyButton] = useState(true); // Modify button state
    const [modalVisible, setModalVisible] = useState(false);        // Popup state
    const [selectedRoutine, setSelectedRoutine] = useState(null); // Selected routine

    // Function to display popup to add or update a routine
    const popupRoutine = (routine) => {
        setSelectedRoutine(routine);
        setModalVisible(true);
    };    

    // Function to swap buttons (when update is clicked, button ok is displayed, etc.)
    const toggleModifyButton = () => {
        setShowModifyButton(!showModifyButton);
    };

    const [selectedColor, setSelectedColor] = useState('lightgreen');
    
    return (
        <View style={styles.container}>
            <Header title='Diary' toggleModifyButton={toggleModifyButton} onAdd={() => popupRoutine(null)} page={'diary'} />

            <Calendar 
                style={styles.calendar}            
                onDayPress={day => {
                    setSelected(day.dateString);
                    console.log(day)
                }}
                markedDates={{
                    [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'green'},
                    '2024-04-01': {selected: true, marked: true, selectedColor: selectedColor},
                    '2024-04-02': {marked: true, markedColor: 'red'},
                }}
                // Show week numbers to the left. Default = false
                showWeekNumbers={true}
                // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                onPressArrowLeft={substractMonth => substractMonth()}
                // Handler which gets executed when press arrow icon left. It receive a callback can go next month
                onPressArrowRight={addMonth => addMonth()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 100
    },
    calendar: {
        borderWidth: 1,
        borderColor: 'gray',
        height: 'auto',
    },
    dayContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayText: {
        fontSize: 18,
    },
    disabledDayText: {
        color: 'gray',
    },
});

export default PageDiary;

