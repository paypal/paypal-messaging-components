import { Component } from 'preact';
import { useXProps } from '../lib';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch() {
        this.setState({ hasError: true });
        // console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }

    render() {
        const { onError } = useXProps();
        const {
            state: { hasError },
            props: { children }
        } = this;

        // Call the onError handler provided via xprops
        if (hasError && onError) {
            onError({
                message: 'Preact modal rendering error'
            });
        }
        return children;
    }
}

export default ErrorBoundary;
