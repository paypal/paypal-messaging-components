export const currencyFormat = string => {
    let formattedStr = string;
    const match = formattedStr.match(
        // eslint-disable-next-line security/detect-unsafe-regex
        /((\$|£)?(\d{1,5}(\.|,)){1,3}00)/g
    );
    if (match !== null) {
        match.forEach(foundString => {
            console.error(foundString);
            const filteredString = foundString
                .replace(/(\.|,)00-/g, '-')
                .replace(/(\.|,)00$/g, '')
                .replace(/(\.|,)00€/g, '€')
                .replace(/(\.|,)00(.|\s*)EUR/g, '€')
                .replace(/(\s*EUR)/g, '€');
            formattedStr = formattedStr.replace(foundString, filteredString);
        });
    }
    return formattedStr;
};
