import "./floating-label-input.css";
import { InputTypeFloatingLabelInputProps } from './input-type-floating-label-input-props';

export function FloatingLabelInput(props: InputTypeFloatingLabelInputProps) {

    return (
        <div className="floating-label-container w-full">
            <input id={props.name} name={props.name} placeholder=" " value={props.value} onChange={(e) => props.onValueChange(e.target.value)} type={props.inputType} className="floating-label-input"></input>
            <label htmlFor={props.name} className="floating-label-label">{props.label}</label>
        </div>
    )
}

