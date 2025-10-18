import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  return (
    <div className=" flex items-start justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Login</h2>
        <LoginForm />
        <div className="mt-6 text-center text-gray-500 text-sm">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-600 font-medium hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
