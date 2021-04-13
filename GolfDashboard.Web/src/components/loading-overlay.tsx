import { useSpring, animated } from 'react-spring';
import { ScaleLoader } from 'react-spinners';

import './loading-overlay.css';

export interface LoadingOverlayProps {
    loading: boolean;
    children: React.ReactElement[]
}

export function LoadingOverlay(props: LoadingOverlayProps) {
 
    const loadingAnim = useSpring({
        from: { opacity: 1 },
        to: { opacity: props.loading ? 1 : 0 }
    });

    return (
        <>
            <div className="loading-overlay d-flex">
                <div className="d-flex flex-grow-1 justify-content-center align-items-center">
                    <animated.div style={loadingAnim}>
                        <ScaleLoader loading={props.loading} height={35} width={4} radius={2} margin={2} color={"#3E517A"} />
                    </animated.div>
                </div>
            </div>
            {props.children}
        </>
    );
}