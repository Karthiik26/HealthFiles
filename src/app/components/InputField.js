export default function InputField({ id, label, type = 'text', value, onChange }) {
    return (
        <div className="relative">
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={label}
                className="peer w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent"
            />
            <label
                htmlFor={id}
                className="absolute left-4 top-0 text-gray-400 text-base transition-all
        peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
        peer-focus:top-[-8px] peer-focus:text-blue-500 peer-focus:bg-white peer-focus:px-2 peer-focus:text-sm"
            >
                {label}
            </label>
        </div>
    );
}
