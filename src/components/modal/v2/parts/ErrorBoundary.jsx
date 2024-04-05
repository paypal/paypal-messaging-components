// import { Component } from 'preact';
// import { useXProps } from '../lib';

// class ErrorBoundary extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { hasError: false };
//     }

//     componentDidCatch(error, errorInfo) {
//         this.setState({ hasError: true });
//         // eslint-disable-next-line no-console
//         console.error('Error caught by ErrorBoundary:', error, errorInfo);
//     }

//     render() {
//         const { onError } = useXProps();
//         const {
//             state: { hasError },
//             props: { children }
//         } = this;

//         // Call the onError handler provided via xprops
//         if (hasError) {
//             if (onError) {
//                 onError({
//                     message: 'Preact modal rendering error'
//                 });
//             }
//         }
//         return children;
//     }
// }

// export default ErrorBoundary;
