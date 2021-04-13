export function Separator(props: { cssClass?: string}) {
    return (
        <div className={"h-px pt-2 pb-2 border-t border-gray-300 " + props.cssClass}></div>
    );
}