// Dépendances
import React, {useState, useEffect} from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createContext } from 'react';
// Composants
import TodayWeather from './assets/views/TodayWeather/TodayWeather.js';
import LocalForecast from './assets/views/LocalForecast/LocalForcast.js';
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


  // useEffect(() =>{
  //   console.log(coords);
  // }, [coords])

  // Contexte
  const contextValue= {
    getCoords: () => coords,
    setCoords
  };

  return (
    <AppContext.Provider value={contextValue}>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Tab.Navigator screenOptions={{ headerShown: false }} >
            <Tab.Screen name="Aujourd'hui" component={TodayWeather} />
            <Tab.Screen name="Semaine" component={LocalForecast} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </AppContext.Provider>
  );
};

export default App;