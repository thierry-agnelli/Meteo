// Dépendances
import React, { useState, useEffect, useContext } from "react";
import { ImageBackground, Dimensions, View, Text, TextInput, Button, Image, YellowBox } from "react-native";
import moment from "moment";
import tzMoment from "moment-timezone";
import "moment/locale/fr";
// Composants
import LocalDynamicDate from "../../components/LocalDynamicDate.js";
// Style
import style from "./style.js";
// Lib
import imagesTable from "../../lib/imagesTable.js";
import Localization from "../../lib/localization.js";
// Config
import config from "../../config/config.json";
// Contexte
import { AppContext } from "../../../App.js";

// View temps actuel de la ville recherchée
const SearchWeatherbyCity = () => {
    /* Variables d'états */
    const [currentWeather, setCurrentWeather] = useState(null);
    const [city, setCity] = useState("Tokyo");
    const [forecast, setForecast] = useState(null);

    /* Contexte */
    const context = useContext(AppContext);

    /* Hooks */
    useEffect(() => {
        // Récupération des coordonnées de l'appareil (si l'utilisateur l'authorise)
        Localization.getPermission()
            .then(async permission => {
                if (permission) {
                    const { latitude, longitude } = await Localization.getLocation();
                    // Enregistrement des coordonnées dans le contexte
                    context.setCoords({ latitude, longitude });
                    // Récupération et affichage par défaut de la météo locale
                    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${config.API_KEY}`)
                        .then(response => response.json())
                        .then(json => setCurrentWeather(json))
                        .catch(err => console.log(err));
                }
            });
    }, []);

    /* Handlers */
    // Entrée utilisateur de la ville
    const searchCityInput = text => setCity(text);

    // Appuie sur le bouton recherche
    const searchButtonPress = (e) => {

        // Récupération du temps actuel de la vilel recherchée
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.API_KEY}`)
            .then(res => {
                if (res.status === 200)
                    return res.json();
                else
                    throw res;
            })
            .then(json => {
                let { lat, lon } = json.coord;
                context.setCoords({ latitude: lat, longitude: lon })
                setCurrentWeather(json);
            })
            .catch(err => {
                err.json()
                    .then(errJson => console.log(errJson.message));
            });
    };

    // functions
    // Mise au format fr du timestamp de la date
    const formatFrDate = (timestamp) => {
        const formatedDate = moment(tzMoment.tz(timestamp, "Etc/UTC")).locale("fr").format("dddd DD MMMM YYYY, HH:mm");

        return formatedDate[0].toUpperCase() + formatedDate.slice(1);
    };


    const timestampToHour = timestamp => new Date(timestamp * 1000).toUTCString().slice(17, 22);


    return (
        <ImageBackground
            source={imagesTable.background}
            style={{ height: Dimensions.get("screen").height }}
        >
            <View style={style.mainSearchWeatherContainer}>
                <View style={style.searchContainer}>
                    <TextInput placeholder="Ville..." style={style.searchInput} onChangeText={searchCityInput} />
                    <Button title="Chercher" onPress={searchButtonPress} />
                </View>
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
                        <View style={style.humidityAndPressure}>
                            {currentWeather ?
                                <>
                                    <Text>Pression: {currentWeather.main.pressure}hp</Text>
                                    <Text>humidité: {currentWeather.main.humidity}%</Text>
                                </>
                                : null}
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
                            {/* <Image source={{uri:"http://openweathermap.org/img/wn/10d@2x.png"}} style={{height: 100, width: 100}}/> */}
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
                        <View style={style.currentTempAndWind}>
                            <Text style={{ fontSize: 30, fontWeight: "bold" }}>{currentWeather ? `${(currentWeather.main.temp - 273.15).toFixed(1)}°C` : ""}</Text>
                            <Text>{currentWeather ? `Vent: ${(currentWeather.wind.speed * 3.6).toFixed(2)} km/h` : ""}</Text>
                        </View>
                    </View>
                    <View style={style.currentWeatherBottom}>
                        <Text>current Weather Bottom</Text>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
};

export default SearchWeatherbyCity;
