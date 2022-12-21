export default function Checkbox({ name, value, ...props }) {
    return (
        <input
            type="checkbox"
            name={name}
            value={value}
            className="rounded border-gray-300 text-brand-600 shadow-sm focus:ring-brand-500"
            {...props}
        />
    );
}
