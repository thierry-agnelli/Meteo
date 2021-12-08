import { Dimensions } from "react-native";

// Méthode de récupération de la hauteur écran au ration demandé
export const getHeightWithRatio = (ratio = 100) => Dimensions.get("screen").height*ratio/100;
// Méthode de récupération de la largeur écran au ration demandé
export const getWidthWithRatio = (ratio = 100) => Dimensions.get("screen").width*ratio/100;
