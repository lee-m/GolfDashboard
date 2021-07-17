import "./floating-label-input.css";

export interface FloatingLabelInputProps {
    name: string;
    label: string;
    value: string | undefined;
    onValueChange: (value: string) => void
};

export function FloatingLabelInput(props: FloatingLabelInputProps) {

    return (
        <div className="floating-label-container w-full">
            <input id={props.name} name={props.name} placeholder=" " value={props.value} onChange={(e) => props.onValueChange(e.target.value)} type="text" className="floating-label-input"></input>
            <label htmlFor={props.name} className="floating-label-label">{props.label}</label>
        </div>
    )
}