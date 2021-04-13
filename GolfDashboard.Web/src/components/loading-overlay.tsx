import { useSpring, animated } from 'react-spring';
import { ScaleLoader } from 'react-spinners';

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
            <div className="flex absolute top-0 left-0 right-0 bottom-0 -z-1">
                <div className="flex flex-grow justify-center items-center">
                    <animated.div style={loadingAnim}>
                        <ScaleLoader loading={props.loading} height={35} width={4} radius={2} margin={2} color={"#3E517A"} />
                    </animated.div>
                </div>
            </div>
            {props.children}
        </>
    );
}