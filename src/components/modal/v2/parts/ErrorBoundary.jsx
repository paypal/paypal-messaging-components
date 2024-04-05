import { Component } from 'preact';
import { useXProps } from '../lib';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }

    static getDerivedStateFromError(error) {
        return { error: error.message };
    }

    componentDidCatch(error) {
        // eslint-disable-next-line no-console
        console.error(error);
        this.setState({ error: error.message });
    }

    render() {
        const { onError } = useXProps();
        const {
            state: { error },
            props: { children }
        } = this;
        if (error && onError) {
            onError({
                message: 'Preact modal rendering error'
            });
        }
        return children;
    }
}

export default ErrorBoundary;
