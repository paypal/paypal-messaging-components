export default function xPropsMock(initialProps) {
    const onPropsListeners = [];

    window.xprops = {
        ...initialProps,
        onProps: fn => onPropsListeners.push(fn)
    };

    return newProps => {
        window.xprops = {
            ...window.xprops,
            ...newProps
        };
        onPropsListeners.forEach(fn => fn({ ...window.xprops }));
    };
}
