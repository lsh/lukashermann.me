import { useLayoutEffect, useState } from 'react';

export const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState([0,0]);

    useLayoutEffect(() => {
        function updateDimensions() {
            setWindowDimensions([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateDimensions);
        updateDimensions();
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    return windowDimensions;
}