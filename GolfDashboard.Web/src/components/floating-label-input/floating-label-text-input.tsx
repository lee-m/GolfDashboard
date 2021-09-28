import { FloatingLabelInput } from './floating-label-input';
import { FloatingLabelInputProps } from './floating-label-input-props';

export function FloatingLabelTextInput(props: FloatingLabelInputProps) {
    return (
        <FloatingLabelInput {...props} inputType="text" />
    );
}