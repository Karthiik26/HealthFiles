export default function SelectField({ id, label, value, onChange, options }) {
    return (
        <div className="relative">
            <select
                id={id}
                value={value}
                onChange={onChange}
                className="peer w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
                <option value="">{label}</option>
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
            <label
                htmlFor={id}
                className="absolute left-4 text-gray-400 text-base transition-all top-[-8px] peer-focus:text-blue-500 bg-white px-2 peer-focus:text-sm"
            >
                {label}
            </label>
        </div>
    );
}
