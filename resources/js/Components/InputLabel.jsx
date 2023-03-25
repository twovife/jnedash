export default function InputLabel({
    forInput,
    value,
    className,
    children,
    optional,
}) {
    return (
        <label
            htmlFor={forInput}
            className={
                `block font-medium text-sm text-gray-700 dark:text-gray-200 ` +
                className
            }
        >
            {value ? value : children}
            {optional ? (
                <i className="text-xs opacity-70">&nbsp;(optional)</i>
            ) : null}
        </label>
    );
}
