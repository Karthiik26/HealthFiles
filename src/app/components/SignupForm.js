'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Loader from './Loader';
import InputField from './InputField';
import SelectField from './SelectField';

export default function SignupForm() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr('');
        setLoading(true);
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE}/auth/signup`,
                { fullName, email, gender, phone, password },
                { withCredentials: true }
            );
            if (res.status === 200) router.push('/dashboard');
        } catch (error) {
            setErr(error.response?.data?.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <InputField id="fullname" label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <InputField id="email" type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <SelectField
                id="gender"
                label="Select Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                options={['Male', 'Female', 'Other']}
            />
            <InputField id="phone" label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <InputField id="password" type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <button
                type="submit"
                disabled={loading}
                className={`w-full bg-blue-600 text-white p-4 rounded-xl font-semibold mt-3 transition-transform hover:scale-105 ${loading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
            >
                {loading ? <Loader text="Signing Up..." size={14} /> : 'Sign Up'}
            </button>

            {err && <div className="text-red-700 bg-red-100 p-3 rounded mt-3 text-center font-medium">{err}</div>}
        </form>
    );
}
