import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';

// Components
import PageAccount from '../pages/PageAccount.js';
import PageAccountSettings from '../pages/pageAccountSettings.js';
import PageDiary from '../pages/PageDiary.js';
import PageExercises from '../pages/PageExercises.js';
import PageExerciseSets from '../pages/PageExerciseSets.js'
import PageHome from '../pages/PageHome.js';
import PageTimer from '../pages/PageTimer.js';
import PageWorkout from '../pages/PageWorkout.js';
import PageWorkouts from '../pages/PageWorkouts.js';
 
// Images
import account from '../../assets/icons/user.png';
import diary from '../../assets/icons/calendar.png';
import exercises from '../../assets/icons/dumbell.png';
import home from '../../assets/icons/menu.png';
import timer from '../../assets/icons/stopwatch.png';
 
// Librairies
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation  } from '@react-navigation/native';

// React nav-bar
const Tab = createBottomTabNavigator();

const NavBar = () => {
  const [selectedColor, setSelectedColor] = useState('lightgreen');

  return (
    <NavigationContainer> 
      <Tab.Navigator screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'white',
          tabBarStyle: {
            display: 'flex',
            alignItems: 'center',
            paddingVertical: 20,
            paddingHorizontal: 20,
            backgroundColor: selectedColor,
          },
          tabBarLabel: '',
          tabBarIcon: () => { 
            if (route.name === 'Home') {
              iconName = home;
            } else if (route.name === 'Exercises') {
              iconName = exercises;
            } else if (route.name === 'Diary') {
              iconName = diary;
            } else if (route.name === 'Timer') {
              iconName = timer;
            } else if (route.name === 'Account') {
              iconName = account;
            }
            return (
              <NavButton iconName={iconName} routeName={route.name} />
            );
          }  
        })}
      >
        <Tab.Screen name="Home" component={PageHome} options={{tabBarItemStyle: {marginTop: 5}}}/>
        <Tab.Screen name="Workouts" component={PageWorkouts} options={{tabBarItemStyle: {display: 'none'}}}/>
        <Tab.Screen name="Workout" component={PageWorkout} options={{tabBarItemStyle: {display: 'none'}}}/>
        <Tab.Screen name="Sets" component={PageExerciseSets} options={{tabBarItemStyle: {display: 'none'}}}/>
        <Tab.Screen name="Exercises" component={PageExercises} options={{tabBarItemStyle: {marginTop: 5}}}/>
        <Tab.Screen name="Diary" component={PageDiary} options={{tabBarItemStyle: {marginTop: 5}}}/> 
        <Tab.Screen name="Timer" component={PageTimer} options={{tabBarItemStyle: {marginTop: 5}}}/>
        <Tab.Screen name="Account" component={PageAccount} options={{tabBarItemStyle: {marginTop: 5}}}/>
        <Tab.Screen name="AccountSettings" component={PageAccountSettings} options={{tabBarItemStyle: {display: 'none'}}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const NavButton = ({ iconName, routeName }) => {
  const navigation = useNavigation();

  const handlePress = () => {
      navigation.navigate(routeName);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Image source={iconName} style={styles.menu_elt} />
    </TouchableOpacity>
  );
};

// Styles
const styles = StyleSheet.create({
  menu_elt: {
    width: 35,
    height: 35,
    margin: 8,
  }
});

export default NavBar; 