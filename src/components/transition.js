import React from 'react';
import { TransitionGroup, Transition as ReactTransition } from 'react-transition-group';

const timeout = 300;
const getTransitionStyles = {
    entering: {
        position: 'absolute',
        opacity: 0,
        zIndex: '-100'
    },
    entered: {
        transition: `all ${timeout}ms ease-in-out`,
        opacity: 1,
    },
    exiting: {
        transition: `all ${timeout}ms ease-in-out`,
        opacity: 0,
        //transform: 'translate3d(-300px, 0px, 0px)',
        //WebkitTransform: 'translate3d(-300px, 0px, 0px)'
    },
}

export default (props) => {
    const { children, location } = props;
    const pathname = location ? location.pathname : '/';
    return (
        <div>
        <TransitionGroup>
            <ReactTransition
                key={pathname}
                className="TransitionGroup"
                timeout={{
                    enter: timeout,
                    exit: timeout,
                }}>
                    {status => (
                        <div style={{
                        ...getTransitionStyles[status],
                        }}>
                            {children}
                        </div>
                    )}
            </ReactTransition>
        </TransitionGroup>
        </div>
    )
}