// Dépendances
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
// Méthode
import { formatFrDate } from "../../lib/time";

// Composant d'affichage dynamique de la date locale courante
const LocalDynamicDate = props => {
    const [date, setDate] = useState(null);

    /* Hooks */
    useEffect(() => {
        // Timer de refresh de l'affichage 1s
        setDate(formatFrDate(props.timestamp));
        setInterval(() => {
            setDate(formatFrDate(props.timestamp));
        }, 1000);
    }, []);


    return (
        <View>
            <Text style={{ fontSize: 20 }}>{date}</Text>
        </View>
    );
};

export default LocalDynamicDate;
