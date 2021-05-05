export function Separator(props: { cssClass?: string }) {
    return (
        <div className={"flex h-100 justify-center py-2 " + (props.cssClass ?? "")}>
            <div className="flex-grow h-px border-t border-gray-300"></div>
        </div>
    );
}