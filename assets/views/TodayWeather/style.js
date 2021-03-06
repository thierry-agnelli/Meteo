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
        flex:3,
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
        flex:4,
        alignSelf: "center",
        justifyContent: "center",
        width: getHeightWithRatio(31),
        borderRadius: 250,
        backgroundColor: "#45454560"
    },
    humidityAndPressure:{
        flex:1,
        alignItems: "center",
        justifyContent: "flex-start",
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
        justifyContent: "flex-end",
    },
    currentWeatherBottom:{
        flex: 3,
        paddingTop: 20,
        justifyContent: "center"
    },
    dailyForecastContainer:{
        flex: 0.5,
        margin: 10,
        marginTop: 50,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#45454560"
    },
    test:{
        backgroundColor:"red"
    }
});

export default style;
