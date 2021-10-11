export interface TeeBoxBadgeProps {
    colour: (string & {});
};

export function TeeBoxBadge(props: TeeBoxBadgeProps) {

    return (
        <div className="tee-box-badge" style={{ backgroundColor: props.colour }} />
    );
}