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

export const useScrollPosition = () => {
    const [scrollPosition, setScrollPosition] = useState([0, 0])
    
    useLayoutEffect(() => {
        function updateScrollPos() {
            setScrollPosition([window.scrollX, window.scrollY]);
        }
        window.addEventListener('scroll', updateScrollPos);
        updateScrollPos();
        return () => window.removeEventListener('scroll', updateScrollPos);
    }, []);

    return scrollPosition;
}