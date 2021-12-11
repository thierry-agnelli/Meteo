// Dépendances
import React, { useState, useEffect, useContext} from "react";
import {View, Text} from "react-native";
import moment from "moment";
import tzMoment from "moment-timezone";
import "moment/locale/fr";
// Context
import { AppContext } from "../../../App";

// Composant d'affichage dynamique de la date locale courante
const LocalDynamicDate = props => {
    const [date, setDate] = useState(null);

    // Contexte
    const context = useContext(AppContext);

    /* Hooks */
    useEffect(() => {
        formatDate();
    },[]);

    // Timer de refresh de l'affichage 1s
    setInterval(() => {
        formatDate();
    }, 1000);

    

    // Méthodes
    const formatDate = () =>{
        // Maj de l'afficchage de l'heure
        const formatedDate = moment(tzMoment.tz(Date.now() + props.timestamp, "Etc/UTC")).locale("fr").format("dddd DD MMMM YYYY, HH:mm");
        setDate(formatedDate[0].toUpperCase() + formatedDate.slice(1));
    };

    return(
        <View>
            <Text style={{ fontSize: 20 }}>{date}</Text>
        </View>
    );
};

export default LocalDynamicDate;
