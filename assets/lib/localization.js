// Dépendances
import * as Location from "expo-location";

const Localization = {
    getPermission: async () => {
        const { granted } = await Location.requestForegroundPermissionsAsync()
        return granted;
    },
    getLocation: async () => {
        const location = await Location.getCurrentPositionAsync();

        return location.coords;
    }
};

export default Localization;