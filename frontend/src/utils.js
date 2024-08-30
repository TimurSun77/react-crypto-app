/* eslint-disable no-unused-vars */
export function percentDifference(a,b) {
    return +(100 * Math.abs((a-b)/((a+b)/2))).toFixed(2) // занком + перед выражением мы перевели все в чилсловой формат/ также у весго вырожения мы использовали функцию toFixed(2) чтобы обрезать до двух знаков после запятой
};

export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.substr(1)

}