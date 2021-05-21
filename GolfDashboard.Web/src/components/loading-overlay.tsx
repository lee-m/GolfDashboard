import { ScaleLoader } from 'react-spinners';

export function LoadingOverlay(props: any) {

    return (
        <div className={"flex absolute top-0 left-0 right-0 bottom-0"}>
            <div className="flex flex-grow justify-center items-center">
                <ScaleLoader loading={props.loading} height={35} width={4} radius={2} margin={2} color={"#3E517A"} />
            </div>
        </div>
    );
}