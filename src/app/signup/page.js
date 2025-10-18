import SignupForm from '../components/SignupForm';

export default function SignupPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Create Your Account</h2>
                <SignupForm />
                <p className="mt-6 text-center text-gray-500 text-sm">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-600 font-medium hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}
