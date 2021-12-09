
// Conversion timestamp au format hh:mm (24h)
export const timestampToHour = timestamp => new Date(timestamp * 1000).toUTCString().slice(17, 22);