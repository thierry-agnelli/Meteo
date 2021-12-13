// Dépendances
import React from "react";
import { ScrollView, View, Text, Image } from "react-native";
// Lib
import { timestampToHour } from "../../lib/time";
import { getHeightWithRatio } from "../../lib/device";
// Style
import style from "./style.js";

const ForecastContainer = props => {

    return (
        <View style={[style.forecastContainer, {flex: props.flex}]}>
            <Text style={style.title}>{props.title}</Text>
            <ScrollView horizontal>
                {props.forecast?.map((item, index) =>
                    <View key={index} style={style.forecastItem}>
                        <Text>{timestampToHour(item.dt)}</Text>
                        <Image source={{ uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` }} style={{ height: getHeightWithRatio(5), width: getHeightWithRatio(5) }} />
                        <Text>{(item.temp - 273.15).toFixed(1)}°C</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default ForecastContainer;