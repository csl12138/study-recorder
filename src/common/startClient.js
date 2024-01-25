import { StrictMode } from 'react';
import ReactDom from 'react-dom';

export function startClient(App) {
    ReactDom.hydrate(
        <StrictMode>
            <App />
        </StrictMode>,
        document.getElementById('root'),
    );
}
