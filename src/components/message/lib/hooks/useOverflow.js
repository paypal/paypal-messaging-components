import { useEffect } from 'preact/hooks';

export default function useOverflow(ref) {
    useEffect(() => {
        const overflow = {
            _state: [false, false],
            _checkOverflow() {
                if (this._state.some(Boolean)) {
                    ref.current.style.setProperty('opacity', 0, 'important');
                    ref.current.style.setProperty('pointer-events', 'none', 'important');
                } else {
                    ref.current.style.setProperty('opacity', null);
                    ref.current.style.setProperty('pointer-events', null);
                }
            },
            get width() {
                return this._state[0];
            },
            set width(val) {
                if (val !== this._state[0]) {
                    this._state[0] = val;
                    this._checkOverflow();
                }
            },
            get height() {
                return this._state[1];
            },
            set height(val) {
                if (val !== this._state[1]) {
                    this._state[1] = val;
                    this._checkOverflow();
                }
            }
        };

        const handleResize = () => {
            if (window.innerWidth < ref.current.offsetWidth) {
                overflow.width = true;
            } else {
                overflow.width = false;
            }

            if (window.innerHeight < ref.current.offsetHeight) {
                overflow.height = true;
            } else {
                overflow.height = false;
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('window', handleResize);
    }, []);
}
