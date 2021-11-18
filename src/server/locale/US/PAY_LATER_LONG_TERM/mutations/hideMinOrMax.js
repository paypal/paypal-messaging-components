const hideMinOrMax = ({ amount, min: minString, max: maxString }) => {
    const min = Number(minString);
    const max = Number(maxString);

    if (amount < min) return '.message__headline .max { display: none; }';
    if (amount > max) return '.message__headline .min { display: none; }';
};

export default hideMinOrMax;
