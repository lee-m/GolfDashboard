import "./floating-label-input.css";

export interface FloatingLabelInputProps {
    name: string;
    label: string;
    value: string | number | undefined;
    onValueChange: (value: string) => void
};

interface InputTypeFloatingLabelInputProps extends FloatingLabelInputProps {
    inputType: string;
}

function FloatingLabelInput(props: InputTypeFloatingLabelInputProps) {

    return (
        <div className="floating-label-container w-full">
            <input id={props.name} name={props.name} placeholder=" " value={props.value} onChange={(e) => props.onValueChange(e.target.value)} type={props.inputType} className="floating-label-input"></input>
            <label htmlFor={props.name} className="floating-label-label">{props.label}</label>
        </div>
    )
}

export function FloatingLabelTextInput(props: FloatingLabelInputProps) {
    return (
        <FloatingLabelInput {...props} inputType="text" />
    );
}

export function FloatingLabelNumberInput(props: FloatingLabelInputProps) {
    return (
        <FloatingLabelInput {...props} inputType="number" />
    );
}