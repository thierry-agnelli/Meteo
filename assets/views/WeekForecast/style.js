// Dépenedances
import { StyleSheet, StatusBar } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const bottomBar = createBottomTabNavigator();

const style = StyleSheet.create({
    mainForecastContainer:{
        flex: 1,
        marginTop: bottomBar.currentHeight,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: "#00000030",
    }
});

export default style;