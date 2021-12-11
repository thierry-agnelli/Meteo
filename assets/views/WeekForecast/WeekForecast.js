// Dépendances
import React, { useState, useEffect, useContext } from "react";
import { ImageBackground, Dimensions, View, Text } from "react-native";
// Config
import config from "../../config/config.json";
// Context
import { AppContext } from "../../../App";
// Lib
import imagesTable from "../../lib/imagesTable";

const WeekForecast = () => {
    /* Variables d'états */
    const [forecast, setForecast] = useState([]);

    /* Contexte */
    const context = useContext(AppContext);

    /* Hooks */
    // Récupération des prévisions sur 5 jours toutes les 3h
    useEffect(() => {

        // api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
        // fetch(`https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`)

    }, []);


    return (
        <ImageBackground 
            source={imagesTable.background}
            style={{ height: Dimensions.get("screen").height }}
        >
            <View>
                <Text>Local Forecast</Text>
            </View>
        </ImageBackground>
    );
};

export default WeekForecast;
