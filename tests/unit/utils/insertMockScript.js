export default function insertMockScript(attributes = {}) {
    const script = document.createElement('script');
    script.src = 'https://www.paypalobjects.com/upstream/bizcomponents/js/messaging.js';

    Object.entries(attributes).forEach(([attribute, value]) => {
        script.setAttribute(`data-pp-${attribute}`, value);
    });

    document.head.appendChild(script);

    return () => document.head.removeChild(script);
}
