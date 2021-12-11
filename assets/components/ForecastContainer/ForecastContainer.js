// Dépendances
import React from "react";
import { ScrollView, View, Text, Image } from "react-native";
// Lib
import { timestampToHour } from "../../lib/time";

const ForecastContainer = props => {

    return (
        <ScrollView horizontal>
            {props.forecast?.map((item, index) =>
                <View key={index} style={{ flex: 1, margin:10, justifyContent:"center" }}>
                    <Text>{timestampToHour(item.dt)}</Text>
                    <Image source={{ uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` }} style={{ height: 40, width: 40 }} />
                    <Text>{(item.temp - 273.15).toFixed(1)}°C</Text>
                </View>
            )}
        </ScrollView>
    );
};

export default ForecastContainer;