// Dépendances
import React, { useState, useEffect} from "react";
import {View, Text} from "react-native";
import moment from "moment";
import tzMoment from "moment-timezone";
import "moment/locale/fr";

// Composant d'affichage dynamique de la date locale courante
const LocalDynamicDate = props => {
    const [date, setDate] = useState(null);

    /* Hooks */
    useEffect(() => {
        const formatedDate = moment(tzMoment.tz(Date.now() + props.timestamp, "Etc/UTC")).locale("fr").format("dddd DD MMMM YYYY, HH:mm:ss");
        setDate(formatedDate[0].toUpperCase() + formatedDate.slice(1));
    },[])

    // Timer de refresh de 1s
    setTimeout(() => {
        const formatedDate = moment(tzMoment.tz(Date.now() + props.timestamp, "Etc/UTC")).locale("fr").format("dddd DD MMMM YYYY, HH:mm:ss");
        setDate(formatedDate[0].toUpperCase() + formatedDate.slice(1));
    }, 1000);

    return(
        <View>
            <Text style={{ fontSize: 20 }}>{date}</Text>
        </View>
    );
};

export default LocalDynamicDate;
