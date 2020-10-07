import arrayIncludes from 'core-js-pure/stable/array/includes';

export function getProductForOffer(offer) {
    if (
        arrayIncludes(
            ['EZP:ANY:EQZ', 'EZP:ANY:GTZ', 'PALA:MULTI:EQZ', 'PALA:MULTI:GTZ', 'PALA:SINGLE:EQZ', 'PALA:SINGLE:GTZ'],
            offer.toUpperCase()
        )
    ) {
        return 'EZP';
    }

    if (arrayIncludes(['GPL', 'GPLQ'], offer.toUpperCase())) {
        return 'GPL';
    }

    return 'NI';
}
