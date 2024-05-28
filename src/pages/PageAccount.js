import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

// Components
import Header from '../basics/Header.js';
import Popup from '../basics/Popup.js';

// Images
import user from '../../assets/icons/user_black.png';

// Librairies
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation  } from '@react-navigation/native';


// Component creation
const PageAccount = () => {
    // Initialization of variables
    const [modalVisible, setModalVisible] = useState(false);      // Popup state
    const [selectedElement, setSelectedElement] = useState(null); // Popup selected

    const popupAccount = (popup) => {
        setSelectedElement(popup);
        setModalVisible(true);
    }; 

    const navigation = useNavigation();

    const sections = [
        {
            title: 'Account settings',
            subsections: [
                {text: 'Personal information', icon: <Icon style={[styles.profil_section_icon, {fontSize: 25}]} name={'user'} />, onPress: () => console.log("TODO")},
                {text: 'Settings', icon: <Ionicons style={[styles.profil_section_icon, {fontSize: 25}]} name={'settings'} />, onPress: () => navigation.navigate("AccountSettings")}]
        },
        {
            title: 'Help',
            subsections: [
                {text: 'How it works ?', icon: <Icon style={[styles.profil_section_icon, {fontSize: 25}]} name={'question-circle-o'} />, onPress: () => popupAccount("How it works ?")},
                {text: 'Contact', icon: <Icon style={styles.profil_section_icon} name={'envelope'} />, onPress: () => popupAccount("Contact"),}]
        }, 
    ];
    
    const [selectedColor, setSelectedColor] = useState('lightgreen');

    useEffect(() => {
        // Récupérer la couleur sélectionnée dans AsyncStorage lors du chargement de l'application
        const getColorFromStorage = async () => {
            try {
                const storedColor = await AsyncStorage.getItem('selectedColor');
                if (storedColor !== null) {
                    setSelectedColor(storedColor);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération de la couleur depuis AsyncStorage :', error);
            }
        };
        getColorFromStorage();
    }, []);

    return (
        <View style={styles.outerContainer}>
            <Header title='My account' toggleModifyButton={null} onAdd={null} page={'account'} />
            <View style={styles.container}>
                <View style={styles.profil_picture_container}>
                    <Image source={user} style={styles.profil_picture} />
                </View>
                <Text style={styles.profil_name}>NOM PRENOM</Text>
                <View style={styles.profil_data_container}>
                    <View style={styles.profil_data}>
                        <Text style={styles.profil_data_elt}>X kg</Text>
                        <Text style={styles.profil_data_elt}>Weight</Text>
                    </View>
                    <View style={styles.profil_data}>
                        <Text style={styles.profil_data_elt}>X cm</Text>
                        <Text style={styles.profil_data_elt}>Height</Text>
                    </View>
                </View>
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
            <Popup title={selectedElement} visible={modalVisible} onClose={() => setModalVisible(false)} onReloadApp={null} />
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding: 25,
        paddingTop: 70,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    profil_picture_container: {
        position: 'relative',
        borderRadius: 100,
        padding: 8,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 110,
        height: 110,
        overflow: 'hidden',
    },
    profil_picture: {
        width: 110,
        height: 110,
    },
    profil_name: {
        fontSize: 24,
    },
    profil_data_container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
    },
    profil_data: {
        width: '45%',
        borderRadius: 5,
        paddingVertical: 15,
        backgroundColor: '#F1F1F1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profil_data_elt: {
        fontSize: 16,
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

export default PageAccount;
