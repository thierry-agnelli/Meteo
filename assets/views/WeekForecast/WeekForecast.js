// Dépendances
import React, { useState, useEffect, useContext } from "react";
import { ImageBackground, Dimensions, View, Text } from "react-native";
// Composant
import ForecastContainer from "../../components/ForecastContainer/ForecastContainer";
// Config
import config from "../../config/config.json";
// Context
import { AppContext } from "../../../App";
// Lib
import imagesTable from "../../lib/imagesTable";
import { formatFrDate } from "../../lib/time";
// Style
import style from "./style.js";

const WeekForecast = () => {
    /* Variables d'états */
    const [forecasts, setForecasts] = useState([]);

    /* Contexte */
    const context = useContext(AppContext);

    /* Hooks */
    // Récupération des prévisions sur 5 jours toutes les 3h (au chargement ou au moment de récupération des coordonnées)
    useEffect(() => {
        console.log("forecast");
        if (context.getCoords()) {
            const { latitude, longitude } = context.getCoords();
            console.log("week");
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${config.API_KEY}`)
                .then(res => res.json())
                .then(json => {
                    // let weeklyForecast = {};
                    let weeklyForecast = {};
                    // let currentDay = "";

                    json.list.map((element, index) => {
                        // let elementDay = new Date(element.dt * 1000).getDay();

                        let currentDay = formatFrDate(element.dt * 1000,"short", false);
                        if (!Array.isArray(weeklyForecast[currentDay]))
                            weeklyForecast[currentDay] = [];
                        
                        // weeklyForecast[currentDay].push(element);
                        weeklyForecast[currentDay].push({
                            dt: element.dt,
                            weather: element.weather,
                            temp: element.main.temp
                            });

                    });
                    // setForecasts(weeklyForecast);
                    setForecasts(Object.entries(weeklyForecast));
                })
                .catch(err => console.log(err));
        }
    }, [context.getCoords()]);


    return (
        <ImageBackground
            source={imagesTable.background}
            style={{ flex: 1 }}>
            <View style={style.mainForecastContainer}>
                {/* {forecasts.map((element, index) => <Text key={index}>{element[0]}</Text>)} */}
                {forecasts.map((element, index) => <ForecastContainer key={index} title={element[0]} forecast={element[1]} flex={0.8}/>)}
            </View>
        </ImageBackground>
    );
};

export default WeekForecast;
