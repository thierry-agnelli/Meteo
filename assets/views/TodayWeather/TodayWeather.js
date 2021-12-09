// Dépendances
import React, { useState, useEffect, useContext } from "react";
import { ImageBackground, Dimensions, View, Text, TextInput, Button, Image, ScrollView } from "react-native";
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
import { timestampToHour } from "../../lib/time.js";
// Config
import config from "../../config/config.json";
// Contexte
import { AppContext } from "../../../App.js";

// View temps actuel de la ville recherchée
const TodayWeather = () => {
    /* Variables d'états */
    const [currentWeather, setCurrentWeather] = useState(null);
    const [currentWeatherb, setCurrentWeatherb] = useState(null);
    const [city, setCity] = useState("");
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
                }
            });
    }, []);

    // Récupération de la météo courante en fonction des coordonnées
    useEffect(() => {
        if (context.getCoords()) {
            const { latitude, longitude } = context.getCoords();
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${config.API_KEY}`)
                .then(response => response.json())
                .then(json => setCurrentWeatherb(json))
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

    }, [context.getCoords()]);

    useEffect(() => console.log(forecast), [forecast]);

    /* Handlers */
    // Entrée utilisateur de la ville
    const searchCityInput = text => setCity(text);

    // Appuie sur le bouton recherche
    const searchButtonPress = (e) => {
        // Récupération des coordonnées de la recherche (France uniquement)
        fetch(`https://geo.api.gouv.fr/communes?nom=${city}&fields=centre`)
            .then(response => response.json())
            .then(json => {
                console.log(json);
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

    // functions
    // Mise au format fr du timestamp de la date
    const formatFrDate = (timestamp) => {
        const formatedDate = moment(tzMoment.tz(timestamp, "Etc/UTC")).locale("fr").format("dddd DD MMMM YYYY, HH:mm");

        return formatedDate[0].toUpperCase() + formatedDate.slice(1);
    };


    // const timestampToHour = timestamp => new Date(timestamp * 1000).toUTCString().slice(17, 22);


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
                {/* <Text>{context.getCoords() ? `${context.getCoords().latitude},${context.getCoords().longitude}` : ""}</Text> */}
                <View style={style.currentWeatherContainer}>
                    <View style={style.currentWeatherTop}>
                        <View style={style.cityContainer}>
                            <Text style={{ fontSize: 35 }}>{currentWeatherb?.name}</Text>
                        </View>
                        <View style={style.todayInfoContainer}>
                            <View style={style.dateContainer}>
                                {/* <Text style={{ fontSize: 25 }}>{currentWeather ? formatFrDate(Date.now() + currentWeather.timezone * 1000) : ""}</Text> */}
                                {currentWeatherb ? <LocalDynamicDate timestamp={currentWeatherb.timezone * 1000} /> : null}
                            </View>
                            <View style={style.sunInfoContainer}>
                                <View style={style.sunInfo}>
                                    <Text>{currentWeatherb ? `Lever: ${timestampToHour(currentWeatherb.sys.sunrise + currentWeatherb.timezone)}` : null}</Text>
                                </View>
                                <View style={style.sunInfo}>
                                    <Text>{currentWeatherb ? `Coucher: ${timestampToHour(currentWeatherb.sys.sunset + currentWeatherb.timezone)}` : null}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={style.currentWeatherMiddle}>
                        <View style={style.humidityAndPressure}>
                            {currentWeatherb ?
                                <>
                                    <Text>Pression: {currentWeatherb.main.pressure}hp</Text>
                                    <Text>humidité: {currentWeatherb.main.humidity}%</Text>
                                </>
                                : null}
                        </View>
                        <View style={style.todayCenterContainer}>
                            <View style={[style.sideTemp, { paddingLeft: 10 }]}>
                                {currentWeatherb ?
                                    <>
                                        <Text>Min:</Text>
                                        <Text>{`${(currentWeatherb.main.temp_min - 273.15).toFixed(1)}°C`}</Text>
                                    </>
                                    : null}
                            </View>
                            {/* <Image source={{uri:"http://openweathermap.org/img/wn/10d@2x.png"}} style={{height: 100, width: 100}}/> */}
                            <Image source={{ uri: `http://openweathermap.org/img/wn/${currentWeatherb?.weather[0].icon}@2x.png` }} style={{ height: 100, width: 100 }} />
                            <View style={[style.sideTemp, { paddingRight: 10 }]}>
                                {currentWeatherb ?
                                    <>
                                        <Text>Max:</Text>
                                        <Text>{`${(currentWeatherb.main.temp_max - 273.15).toFixed(1)}°C`}</Text>
                                    </>
                                    : null}
                            </View>
                        </View>
                        <View style={style.currentTempAndWind}>
                            <Text style={{ fontSize: 30, fontWeight: "bold" }}>{currentWeatherb ? `${(currentWeatherb.main.temp - 273.15).toFixed(1)}°C` : ""}</Text>
                            <Text>{currentWeatherb ? `Vent: ${(currentWeatherb.wind.speed * 3.6).toFixed(2)} km/h` : ""}</Text>
                        </View>
                    </View>
                    <View style={style.currentWeatherBottom}>
                        <View style={style.dailyForecastContainer}>
                            <Text>Prévisions du jour :</Text>
                            <ScrollView horizontal>
                                {forecast?.map((item, index) =>
                                    <View key={index} style={style.forecastItem}>
                                        <Text>{timestampToHour(item.dt)}</Text>
                                        <Image source={{ uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` }} style={{ height: 40, width: 40 }} />
                                        <Text>{(item.temp - 273.15).toFixed(1)}°C</Text>
                                    </View>
                                )}
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
};

export default TodayWeather;
