import { useState } from 'react';
import Button from 'devextreme-react/button'

import './animated-button.css';
import SpinnerLogo from '../images/arrow-repeat.svg';

export interface AnimatedButtonProps {
    onClick: () => Promise<void>,
    type: 'back' | 'danger' | 'default' | 'normal' | 'success',
    text: string,
};

export function AnimatedButton(props: AnimatedButtonProps) {

    const [isAnimated, setIsAnimating] = useState(false);

    const clickHandler = () => {

        //Wait for the spinner expansion animation to complete before we forward on the 
        //click event. It's probably better to use the animationend event but that's a lot of
        //faffing for something simple so go with this simple bodge 
        setIsAnimating(true);

        setTimeout(async () => {
            await props.onClick();
            setIsAnimating(false);
        }, 300);
    }

    return (
        <Button
            text={props.text}
            icon={SpinnerLogo}
            onClick={clickHandler}
            stylingMode="contained"
            type={props.type}
            elementAttr={{ class: "button-sm animated-btn text-semibold " + (isAnimated ? "animated" : "") }} />
    )
}