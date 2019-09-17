import '@testing-library/jest-dom/extend-expect';
import globals from '../../globals';

// Tests will currently fail with non-US locale
Object.assign(window, globals({}));
