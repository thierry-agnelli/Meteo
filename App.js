// Dépendances
import React, {useState, useEffect, createContext} from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// Composants
import TodayWeather from './assets/views/TodayWeather/TodayWeather.js';
import WeekForecast from './assets/views/WeekForecast/WeekForecast.js';
// Icones
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { faCalendarWeek } from '@fortawesome/free-solid-svg-icons';
// Images
import background from "./assets/medias/images/background.jpg";
// Lib
import Localization from './assets/lib/localization.js';

// Créatioons du ùenu de navigation
const Tab = createBottomTabNavigator();

// Création contexte
export const AppContext = createContext();

const App = () => {
  //Variable d'états
  const [coords, setCoords] = useState(null);
  const [refresh, setRefresh] = useState();

 /* Hooks */
 // Récupération des coordonnées de l'appareil (si l'utilisateur l'authorise) 
 useEffect (() => {
    console.log("start");
    setRefresh(true);
    Localization.getPermission()
    .then(async permission => {
        if (permission) {
            const { latitude, longitude } = await Localization.getLocation();
            // Enregistrement des coordonnées dans le contexte
            setCoords({ latitude, longitude });
        }
    });
  }, []);

  // Timer de refresh de l'app toutes les 30mn (si des coordoonnées sont présentes)
  useEffect(() =>{
    if(coords)
      setTimeout(() => setRefresh(!refresh), 600000);
   }, [refresh, coords]);
  
  // Contexte
  const contextValue= {
    getCoords: () => coords,
    setCoords,
    getRefresh: () => refresh,
    setRefresh
  };

  return (
    <AppContext.Provider value={contextValue}>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
              name="today"
              component={TodayWeather}
              options={{
                tabBarLabel:"Aujourd'hui",
                tabBarIcon: (options) =>{
                  let size = 25;
                  if (options.focused)
                    size= 28;
                  return(
                    <FontAwesomeIcon icon={faCalendarDay} size={size} color={options.color}/>
                  );
                }
              }}/>
            <Tab.Screen 
              name="week"
              component={WeekForecast}
              options={{
                tabBarLabel:"5 jours",
                tabBarIcon: (options) =>{
                  let size = 25;
                  if (options.focused)
                    size= 28;
                  return(
                    <FontAwesomeIcon icon={faCalendarWeek} size={size} color={options.color}/>
                  );
                }
              }}/>
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </AppContext.Provider>
  );
};

export default App;