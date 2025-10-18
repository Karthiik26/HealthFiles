'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Loader from './Loader';
import InputField from './InputField';

export default function LoginForm() {
    const [email, setEmail] = useState('');
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
                `${process.env.NEXT_PUBLIC_API_BASE}/auth/login`,
                { email, password },
                { withCredentials: true }
            );
            if (res.status === 200) router.push('/dashboard');
        } catch (error) {
            setErr(error.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <InputField id="email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <InputField id="password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <button
                type="submit"
                disabled={loading}
                className={`w-full bg-blue-600 text-white p-4 rounded-xl font-semibold transition-transform hover:scale-105 ${loading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
            >
                {loading ? <Loader text="Logging in..." size={14} /> : 'Login'}
            </button>

            {err && <div className="text-red-700 bg-red-100 p-3 rounded mt-3 text-center font-medium">{err}</div>}
        </form>
    );
}
