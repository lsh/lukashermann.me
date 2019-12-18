import React from 'react';
import { Helmet } from 'react-helmet';
import Transition from './transition';
import Styles from '../styles/content.module.css';
import Header from './header';

export default ({children, location}) => {
    console.log(Styles);
    return (
        <div>
            <Helmet>
                <title>Lukas Hermann</title>
                <link href="https://fonts.googleapis.com/css?family=Merriweather:900|Montserrat&display=swap" rel="stylesheet"></link>
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