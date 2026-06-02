export function mapClasses(classMap) {
    return Object.entries(classMap)
        .filter(([name, on]) => on && !name.includes(' ') && name.trim().length > 0)
        .map(([name]) => name.toLowerCase().replace(/_/g, '-'))
        .join(' ');
}
