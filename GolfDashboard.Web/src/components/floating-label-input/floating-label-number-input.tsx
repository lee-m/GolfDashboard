import { FloatingLabelInput } from './floating-label-input';
import { FloatingLabelInputProps } from './floating-label-input-props';

export function FloatingLabelNumberInput(props: FloatingLabelInputProps) {
    return (
        <FloatingLabelInput {...props} inputType="number" />
    );
}