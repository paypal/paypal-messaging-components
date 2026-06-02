export default ({
    fontFamily = '"PayPal Pro", Helvetica, Arial, "Liberation Sans", sans-serif',
    fontSize = 12,
    textAlign = 'left'
} = {}) => `
.pp-message {
    font-family: ${fontFamily};
    font-weight: 450;
    font-size: ${fontSize}px;
    text-align: ${textAlign};
}

.pp-message .main.black { color: #000; }
.pp-message .main.monochrome { color: #000; }
.pp-message .main.grayscale { color: #000; }
.pp-message .main.white { color: #fff; }

.pp-message .action [data-iframe-url] {
    color: #0070ba;
    white-space: nowrap;
}
.pp-message .action.monochrome > [data-iframe-url] { color: #000; }
.pp-message .action.grayscale > [data-iframe-url] { color: #000; }
.pp-message .action.white > [data-iframe-url] { color: #fff; }

.pp-message .logo { display: inline-block; }
.pp-message .logo.top { display: block; }

.pp-message img {
    max-height: 1.25em;
    height: 1.25em;
    width: auto;
    vertical-align: middle;
    margin-right: 0.3125em;
}
`;
