export function buildContentLabel(items) {
    return items
        .map(item => (item.alternative_text || item.text)?.trim())
        .filter(Boolean)
        .reduce((label, item) => (label && /^[,.;:!?…)]/.test(item) ? `${label}${item}` : `${label} ${item}`), '')
        .trim();
}
