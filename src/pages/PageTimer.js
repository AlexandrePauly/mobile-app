import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';

// Components
import Header from '../basics/Header.js';

// Librairies
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

// Component creation
const PageTimer = () => {
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

    const [counter, setCounter] = useState(60);
    const [isActive, setIsActive] = useState(true);
    const [key, setKey] = useState(0); // To re-render the timer
  
    const restart = () => {
      setCounter(60);
      setIsActive(true);
      // Increment the key to re-render the timer
      setKey((prevKey) => prevKey + 1);
    };
  
    const clear = () => {
      setCounter(0);
      setIsActive(false);
      // Increment the key to re-render the timer
      setKey((prevKey) => prevKey + 1);
    };
    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
          setIsActive(false);
          return <Text style={styles.timer}>Time's Up!...</Text>;
        }
    
        return (
          <View style={styles.timer}>
            <Text style={styles.text}>Time</Text>
            <Text style={styles.value}>{remainingTime}</Text>
            <Text style={styles.text}>seconds</Text>
          </View>
        );
    };

    useEffect(() => {
        let timer;
        if (isActive && counter > 0) {
          timer = setInterval(
            () => setCounter((prevCounter) => prevCounter - 1),
            1000
          );
        } else if (!isActive && counter !== 0) {
          clearInterval(timer);
        }
    
        return () => clearInterval(timer);
      }, [counter, isActive]);

    return (
        <View style={styles.outerContainer}>
            <Header title='Timer' toggleModifyButton={toggleModifyButton} onAdd={() => popupRoutine(null)} page={'timer'} />
            {/* Scroll view : All content of the page */}
            <View style={[styles.App, styles.container, {height: '100%', justifyContent: 'center', alignItems: 'center'}]}>
                <Text>Work in progress</Text>
                {/* <View key={key} style={[styles.Progressbar, styles.pomodoro_timer]}>
                    <CountdownCircleTimer
                        onComplete={() => setIsActive(false)}
                        isPlaying={isActive}
                        duration={counter}
                        colors={"#004777"}
                        >
                        {renderTime}
                    </CountdownCircleTimer>
                </View>

                <View>
                    <Button title="Re-start" onClick={restart}/>
                    <Button title="CLEAR" onClick={clear}/>
                    <Text>https://codesandbox.io/p/sandbox/progressbar-timer-78pvrr?file=%2Fsrc%2FApp.js%3A81%2C31</Text>
                </View> */}
            </View>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        paddingTop: 100,
    },      
    Progressbar: {
        display: 'flex',
        alignItems: 'center',
    },
    App: {
        textAlign: 'center',
        padding: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    pomodoro_timer: {
        marginBottom: 20
    },    
    timer: {
        fontSize: 24
    },
    text: {
        fontSize: 12,
        color: '#888'
    },
    value: {
        fontDize: 28
    },
    button: {
        margin: 6,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
        fontSize: 16
    }      
});

export default PageTimer;
