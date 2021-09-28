export interface FloatingLabelInputProps {
    name: string;
    label: string;
    value: string | number | undefined;
    onValueChange: (value: string) => void
};