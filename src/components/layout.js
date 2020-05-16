import React from 'react';
import { Helmet } from 'react-helmet';
import Transition from './transition';
import Styles from '../styles/content.module.css';
import Header from './header';

export default ({children, location}) => {
    return (
        <div>
            <Helmet>
                <title>Lukas Hermann</title>
                <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@200;300;400;500;600;700;900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
            </Helmet>
            <Header />
            <div className={Styles.content}>
                <Transition location={location}>
                    { children }
                </Transition>
            </div>
        </div>
    );
}; 