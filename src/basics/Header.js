import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Librairies
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
 
const Header = ({ title, desc, toggleModifyButton, onAdd, page }) => {
    // Display & hide modify on content from header button
    const [showOKButton, setShowOKButton] = useState(false);
    const navigation = useNavigation();
    const [selectedColor, setSelectedColor] = useState('lightgreen');

    // Function to display/hide button to modify
    const handleModifyButtonClick = () => {
        toggleModifyButton();
        setShowOKButton(!showOKButton);
    };

    // Function to return to the previous page
    const changePage = (link) => {
        if (showOKButton){
            toggleModifyButton();
            setShowOKButton(false);
        }
        navigation.navigate(link);
    };

    return ( 
        <View style={[styles.container, {backgroundColor: selectedColor, paddingTop: page === 'home' || page === 'workouts' || page === 'workout' || page === 'set' || page === 'exercises' ? 40 : 50,}]}>
            <View style={styles.header}>
                {/* Shortcut buttons */}
                <View style={[styles.buttons_container]}>
                    {page === 'account-settings' || page === 'account-personnal-infos' ? (
                        <TouchableOpacity onPress={() => changePage('Account')}>
                            <FontAwesome6 style={[styles.icons,{fontSize: 30, marginRight: 20}]} name={'chevron-left'} />
                        </TouchableOpacity>
                    ) : (
                        <>
                            {page === 'workouts' ? (
                                <TouchableOpacity onPress={() => changePage('Home')}>
                                    <FontAwesome6 style={[styles.icons,{fontSize: 30, marginRight: 20}]} name={'chevron-left'} />
                                </TouchableOpacity>
                            ) : (
                                <>
                                    {page === 'workout' ? (
                                        <TouchableOpacity onPress={() => changePage('Workouts')}>
                                            <FontAwesome6 style={[styles.icons,{fontSize: 30, marginRight: 20}]} name={'chevron-left'} />
                                        </TouchableOpacity>
                                    ) : (
                                        <>
                                            {page === 'set' ? (
                                                <TouchableOpacity onPress={() => changePage('Workout')}>
                                                    <FontAwesome6 style={[styles.icons,{fontSize: 30, marginRight: 20}]} name={'chevron-left'} />
                                                </TouchableOpacity>
                                            ) : (
                                                <>
                                                
                                                </>
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </View> 
                
                <View>
                    {/* Title of the page */}
                    <Text style={styles.header_title}>{title}</Text>
                    {desc != '' ? (
                        <Text style={styles.header_desc}>{desc}</Text>
                    ) : (
                        <>

                        </>
                    )
                    }
                </View>
                
                {/* Shortcut buttons */}
                <View style={[styles.buttons_container, styles.buttons_right_container]}>
                    {/* If it's the home or exercise page */}
                    {page === 'home' || page === 'workouts' || page === 'workout' || page === 'set' || page === 'exercises' ? (
                        // Close modify button
                        showOKButton ? (
                            <TouchableOpacity onPress={handleModifyButtonClick}>
                                <Text style={styles.header_btn_ok}>OK</Text>
                            </TouchableOpacity>
                        ) : (
                            // Modify and add button
                            <>
                                <TouchableOpacity onPress={handleModifyButtonClick}>
                                    <MaterialIcons style={[styles.icons,{fontSize: 30}]} name={'pencil'} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={onAdd}>
                                    <MaterialIcons style={[styles.icons,{fontSize: 40}]} name={'plus'} />
                                </TouchableOpacity>
                            </>
                        )
                    ) : (
                        <>
                            {/* Else if it's the diary page */}
                            {page === 'diary' ? (
                                <TouchableOpacity onPress={handleModifyButtonClick}>
                                    <MaterialIcons style={[styles.icons,{fontSize: 35}]} name={'calendar-month-outline'} />
                                </TouchableOpacity>
                            ) : (
                                <>
                                    {/* Else if it's the timer page */}
                                    {page === 'timer' && (
                                        <TouchableOpacity onPress={handleModifyButtonClick}>
                                            <MaterialIcons style={[styles.icons,{fontSize: 35}]} name={'timer-outline'} />
                                        </TouchableOpacity>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </View>
            </View>
        </View>
    );
};

// Window dimensions
const { height, width } = Dimensions.get('window');

// Styles
const styles = StyleSheet.create({
    container: {
        paddingBottom: 10,
        position: 'absolute',
        top: 0,
        zIndex: 1000,
        height: 100,
        width: width,
    },
    header: {
        position: 'relative', 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
    },
    header_title: {
        fontSize: 26,
        color: 'white',
    },
    header_desc: {
        fontSize: 16,
        color: 'white',
    },
    buttons_container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttons_right_container: {
        position: 'absolute',
        top: 0,
        right: 0,
        paddingRight: 10,
    },
    icon: {
        width: 24,
        height: 24,
        marginHorizontal: 10,
    },
    header_btn_ok: {
        fontSize: 25,
        color: 'white',
        paddingRight: 10,
        position: 'absolute',
        top: 5,
        right: 0,
    },
    icons: {
        color: 'white',
    }
});

export default Header;

