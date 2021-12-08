// Dépendances
import { StyleSheet, StatusBar } from "react-native";
// lib
import { getHeightWithRatio, getWidthWithRatio } from "../../lib/device.js";

const style = StyleSheet.create({
    mainSearchWeatherContainer:{
        flex : 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: "#00000030"
    },
    searchContainer:{
        flex: 1,
        justifyContent: "flex-end",
    },
    searchInput:{
        flex: 0.75,
        backgroundColor: "#C0C0C0A0",
        borderWidth: 1,
        paddingLeft: 10,
        color: "black",
    },
    currentWeatherContainer:{
        flex: 9,
    },
    currentWeatherTop:{
        flex:2.5
    },
    cityContainer:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    todayInfoContainer:{
        flex: 1,
    },
    dateContainer:{
        flex: 1,
        alignItems: "center",
    },
    sunInfoContainer:{
        flex:1,
        flexDirection: "row",
    },
    sunInfo:{
        flex: 1,
        alignItems:"center"
    },
    currentWeatherMiddle:{
        flex:3,
        alignSelf: "center",
        width: getHeightWithRatio(26.5),
        borderRadius: 200,
        backgroundColor: "#45454560"
    },
    humidityAndPressure:{
        flex:1,
        alignItems: "center",
        justifyContent: "center",
    },
    todayCenterContainer:{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    sideTemp:{
        flex: 1,
        alignItems: "center",
    },
    currentTemp:{
        flex: 1,
        fontSize: 20,
    },
    currentTempAndWind:{
        flex:1,
        alignItems: "center",
        justifyContent:"flex-start",
    },
    currentWeatherBottom:{
        flex:4.5,
        // backgroundColor: "#0000FF"
    },
    test:{
        backgroundColor:"red"
    }
});

export default style;
