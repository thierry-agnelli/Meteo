// Dépendances
import moment from "moment";
import tzMoment from "moment-timezone";
import "moment/locale/fr";


// Conversion timestamp au format hh:mm (24h)
export const timestampToHour = timestamp => new Date(timestamp * 1000).toUTCString().slice(17, 22);

// Mise au format fr du timestamp de la date (ex: Samedi 11 décembre 2021, 16:04)
export const formatFrDate = (timestamp = 0, model = "long", isOffset = true) => {
    // let formatedDate = "";
    let format = "";

    switch (model) {
        case "long":
            format ="dddd DD MMMM YYYY, HH:mm    ";
            break;

        case "short":
            format = "ddd DD/MM";
            break;

        default:
            format = "";
            break;
    }

    const formatedDate = moment(tzMoment.tz(timestamp + (isOffset? Date.now() : 0), "Etc/UTC")).locale("fr").format(format);

    return formatedDate[0].toUpperCase() + formatedDate.slice(1);
};
