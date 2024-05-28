import React, { useState } from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

// Components
import Header from '../basics/Header.js';
import Popup from '../basics/Popup.js'

// Librairies
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontistoIcons from 'react-native-vector-icons/Fontisto';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation  } from '@react-navigation/native';
 
// Component creation
const PageAccountSettings = () => {
    // Initialization of variables
    const [modalVisible, setModalVisible] = useState(false);      // Popup state
    const [selectedElement, setSelectedElement] = useState(null); // Popup selected
    const navigation = useNavigation();

    const popupAccount = (popup) => { 
        setSelectedElement(popup);
        setModalVisible(true);
    }; 

    const handleRateApp = () => {
        // URL pour l'App Store (iOS)
        const iOSUrl = 'itms-apps://itunes.apple.com/app/idYOUR_APP_ID?mt=8';
    
        // URL pour le Google Play Store (Android)
        const androidUrl = 'market://details?id=YOUR_APP_PACKAGE_NAME';
    
        // Ouvrir l'URL appropriée selon la plateforme
        // const url = Platform.OS === 'ios' ? iOSUrl : androidUrl;
        const url = iOSUrl;
    
        Linking.openURL(url)
            .catch(() => {
                console.error('Impossible d\'ouvrir l\'URL de notation de l\'application.');
            });
    };

    const [selectedColor, setSelectedColor] = useState('lightgreen');
    const [refreshIndicator, setRefreshIndicator] = useState(false);  // Refresh page indicator

    const handleReloadApp = (id, color, notif_sound) => {
        try {
            updateVarious(id, color, notif_sound);
            setRefreshIndicator(prevState => !prevState);
        } catch (error) {
            
        }
    }

    const sections = [
        {
            title: 'Settings',
            subsections: [
                {text: 'Application color', icon: <Ionicons style={[styles.profil_section_icon, {fontSize: 25, transform: [{ rotate: '45deg'}]}]} name={'color-palette'} />, onPress: () => popupAccount("Application color")},
                {text: 'Notification sound', icon: <FontistoIcons style={[styles.profil_section_icon, {fontSize: 25}]} name={'music-note'} />, onPress: () => popupAccount("Notification sound")},
                {text: 'Weight', icon: <FontAwesome5Icons style={[styles.profil_section_icon, {fontSize: 25}]} name={'weight-hanging'} />, onPress: () => navigation.navigate("AccountSettings")}]
        },
        {
            title: 'About',
            subsections: [
                {text: 'Rate this app', icon: <Icon style={[styles.profil_section_icon, {fontSize: 25}]} name={'question-circle-o'} />, onPress: () => handleRateApp()},
                {text: 'Privacy policy', icon: <MaterialIcons style={[styles.profil_section_icon, {fontSize: 25}]} name={'privacy-tip'} />, onPress: () => popupAccount("Privacy policy")},
                {text: 'About', icon: <MaterialCommunityIcons style={[styles.profil_section_icon, {fontSize: 25}]} name={'information'} />, onPress: () => popupAccount("About")}]
        },
    ];
    

    return (
        <View style={styles.outerContainer}>
            <Header title='My account' toggleModifyButton={null} onAdd={null} page={'account-settings'} />
            <View style={styles.container}>
                {sections.map((section, index) => (
                    <View key={index} style={[styles.profil_data_container, styles.profil_section_container]}>
                        <Text style={styles.profil_section_title}>{section.title}</Text>
                        {section.subsections.map((elt, index) => (
                            <TouchableOpacity key={index} style={styles.profil_section_subcontainer} activeOpacity={0.7} onPress={elt.onPress}>
                                <View style={styles.profil_section_content}>
                                    {elt.icon}
                                    <Text style={styles.profil_section_text}>{elt.text}</Text>
                                </View>
                                <Icon style={styles.profil_section_arrow} name={'chevron-right'} />
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </View>
            <Popup title={selectedElement} visible={modalVisible} onClose={() => setModalVisible(false)} onReloadApp={handleReloadApp} />
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding: 25,
        paddingTop: 95,
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: 'white',
    },
    profil_data_container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
    },
    profil_section_title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    profil_section_container: {
        flexDirection: 'column',
        padding: 2,
        marginTop: 25,
    },
    profil_section_subcontainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F1F1F1',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
    },
    profil_section_content: {
        display: 'flex',
        flexDirection: 'row',       
        alignItems: 'center', 
    },
    profil_section_icon: {
        fontSize: 20,
        width: 25,
        textAlign: 'center',
    },
    profil_section_text: {
        marginLeft: 10,
        fontSize: 14,
    },
    profil_section_arrow: {
        fontSize: 20,
    }
});

export default PageAccountSettings;
