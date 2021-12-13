// Dépendances
import React, { useState, useEffect, useContext } from "react";
import { ImageBackground, Dimensions, View, Text, TextInput, Button, Image, ScrollView } from "react-native";
import moment from "moment";
import tzMoment from "moment-timezone";
import "moment/locale/fr";
// Composants
import LocalDynamicDate from "../../components/LocalDynamicDate/LocalDynamicDate.js";
import ForecastContainer from "../../components/ForecastContainer/ForecastContainer.js";
// Style
import style from "./style.js";
// Lib
import imagesTable from "../../lib/imagesTable.js";
import { timestampToHour } from "../../lib/time.js";
// Config
import config from "../../config/config.json";
// Contexte
import { AppContext } from "../../../App.js";

// View temps actuel de la ville recherchée
const TodayWeather = () => {
    /* Variables d'états */
    const [currentWeather, setCurrentWeather] = useState(null);
    const [city, setCity] = useState("");
    const [forecast, setForecast] = useState(null);
    const [timerRefresh, setTimerRefresh] = useState(false);

    /* Contexte */
    const context = useContext(AppContext);

    /* Hooks */
    // Récupération de la météo courante en fonction des coordonnées
    useEffect(() => {
        console.log("today");
        if (context.getCoords()) {
            const { latitude, longitude } = context.getCoords();
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${config.API_KEY}`)
                .then(response => response.json())
                .then(json => setCurrentWeather(json))
                .catch(err => console.log(err));


            //https://pro.openweathermap.org/data/2.5/forecast/hourly?q={city name}&appid={API key}
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,daily,alerts&appid=${config.API_KEY}`)
                .then(response => response.json())
                .then(json => {
                    setForecast(json.hourly.slice(0, 24));
                });
        }
        else
            console.log("coords null");
    }, [context.getCoords(), context.getRefresh()]);

    /* Handlers */
    // Entrée utilisateur de la ville
    const searchCityInput = text => setCity(text);

    // Appuie sur le bouton recherche
    const searchButtonPress = (e) => {
        // Récupération des coordonnées de la recherche (France uniquement)
        fetch(`https://geo.api.gouv.fr/communes?nom=${city}&fields=centre`)
            .then(response => response.json())
            .then(json => {
                let latitude = json[0].centre.coordinates[1];
                let longitude = json[0].centre.coordinates[0];
                context.setCoords({ latitude, longitude })
            })
            .catch(err => {
                // Si ça me marche pas par openweather map (moins précise)
                // fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${config.API_KEY}`)
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.API_KEY}`)
                    .then(res => {
                        if (res.status === 200)
                            return res.json();
                        else
                            throw res;
                    })
                    .then(json => {
                        let { lat, lon } = json.coord;
                        context.setCoords({ latitude: lat, longitude: lon });
                    })
                    .catch(err => {
                        err.json()
                            .then(errJson => console.log(errJson.message));
                    });
            });
    };

    return (
        <ImageBackground
            source={imagesTable.background}
            style={{ flex: 1 }}>
            <View style={style.mainSearchWeatherContainer}>
                <View style={style.searchContainer}>
                    <TextInput placeholder="Ville..." style={style.searchInput} onChangeText={searchCityInput} />
                    <Button title="Chercher" onPress={searchButtonPress} />
                </View>
                {/* <Text>{context.getCoords() ? `${context.getCoords().latitude},${context.getCoords().longitude}` : ""}</Text> */}
                <View style={style.currentWeatherContainer}>
                    <View style={style.currentWeatherTop}>
                        <View style={style.cityContainer}>
                            <Text style={{ fontSize: 35 }}>{currentWeather?.name}</Text>
                        </View>
                        <View style={style.todayInfoContainer}>
                            <View style={style.dateContainer}>
                                {/* <Text style={{ fontSize: 25 }}>{currentWeather ? formatFrDate(Date.now() + currentWeather.timezone * 1000) : ""}</Text> */}
                                {currentWeather ? <LocalDynamicDate timestamp={currentWeather.timezone * 1000} /> : null}
                            </View>
                            <View style={style.sunInfoContainer}>
                                <View style={style.sunInfo}>
                                    <Text>{currentWeather ? `Lever: ${timestampToHour(currentWeather.sys.sunrise + currentWeather.timezone)}` : null}</Text>
                                </View>
                                <View style={style.sunInfo}>
                                    <Text>{currentWeather ? `Coucher: ${timestampToHour(currentWeather.sys.sunset + currentWeather.timezone)}` : null}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={style.currentWeatherMiddle}>
                        <View style={style.currentTempAndWind}>
                            <Text style={{ fontSize: 30, fontWeight: "bold" }}>{currentWeather ? `${(currentWeather.main.temp - 273.15).toFixed(1)}°C` : ""}</Text>
                            <Text style={{ fontSize: 15 }}>{currentWeather ? `Ressenti: ${(currentWeather.main.feels_like - 273.15).toFixed(1)}°C` : ""}</Text>
                        </View>
                        <View style={style.todayCenterContainer}>
                            <View style={[style.sideTemp, { paddingLeft: 10 }]}>
                                {currentWeather ?
                                    <>
                                        <Text>Min:</Text>
                                        <Text>{`${(currentWeather.main.temp_min - 273.15).toFixed(1)}°C`}</Text>
                                    </>
                                    : null}
                            </View>
                            <Image source={{ uri: `http://openweathermap.org/img/wn/${currentWeather?.weather[0].icon}@2x.png` }} style={{ height: 100, width: 100 }} />
                            <View style={[style.sideTemp, { paddingRight: 10 }]}>
                                {currentWeather ?
                                    <>
                                        <Text>Max:</Text>
                                        <Text>{`${(currentWeather.main.temp_max - 273.15).toFixed(1)}°C`}</Text>
                                    </>
                                    : null}
                            </View>
                        </View>
                        <View style={style.humidityAndPressure}>
                            {currentWeather ?
                                <>
                                    <Text>Pression: {currentWeather.main.pressure}hp / Humidité: {currentWeather.main.humidity}%</Text>
                                    <Text>Vent: {(currentWeather.wind.speed * 3.6).toFixed(2)}km/h</Text>
                                </>
                                : null}
                        </View>
                    </View>
                    <View style={style.currentWeatherBottom}>
                        <ForecastContainer title={"Prévision du jour:"} forecast={forecast} flex={0.6}/>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
};

export default TodayWeather;
