import '@testing-library/jest-dom/extend-expect';
import globals from '../../../packages/library/globals';

// Tests will currently fail with non-US locale
Object.assign(window, {
    __LOCAL__: false,
    ...globals({
        TARGET: 'standalone'
    })
});
