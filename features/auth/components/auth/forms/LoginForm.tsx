"use client";
import { LoginFormData, Role, ExtendedLoginFormData } from "../types/auth.types";
import RoleDropdown from "../shared/RoleDropdown";
import SocialLogin from "../shared/SocialLogin";
import Logo from "../shared/Logo";

interface LoginFormProps {
    form: ExtendedLoginFormData;
    setForm: (form: ExtendedLoginFormData) => void;
    isLoading: boolean;
    onSubmit: (e: React.FormEvent) => void;
}

export default function LoginForm({ form, setForm, isLoading, onSubmit }: LoginFormProps) {
    return (
        <div className="w-full overflow-y-auto max-h-full">
            <div className="flex justify-center items-center mb-4">
                <Logo size="lg" />
            </div>
            
            <form onSubmit={onSubmit} className="w-full">
                <h1 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">Login</h1>
                
                <div className="relative my-4">
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        disabled={isLoading}
                        className="w-full py-2.5 px-4 pr-11 bg-gray-100 dark:bg-gray-700 rounded-lg border-none outline-none text-gray-800 dark:text-white font-medium placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:ring-2 focus:ring-cyan-500"
                    />
                    <i className="bx bxs-envelope absolute right-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-600 dark:text-gray-400"></i>
                </div>

                <div className="relative my-4">
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        disabled={isLoading}
                        className="w-full py-2.5 px-4 pr-11 bg-gray-100 dark:bg-gray-700 rounded-lg border-none outline-none text-gray-800 dark:text-white font-medium placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:ring-2 focus:ring-cyan-500"
                    />
                    <i className="bx bxs-lock-alt absolute right-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-600 dark:text-gray-400"></i>
                </div>

                <div className="mb-3 relative">
                    <label className="font-semibold text-xs block mb-1.5 text-left text-gray-800 dark:text-white">
                        Select Role:
                    </label>
                    <RoleDropdown
                        selectedRole={form.role as Role}
                        onSelect={(role) => setForm({ ...form, role })}
                        disabled={isLoading}
                    />
                </div>

                <div className="my-3">
                    <a href="#" className="text-xs text-gray-800 dark:text-gray-300 hover:underline hover:text-cyan-600">
                        Forgot Password?
                    </a>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 rounded-lg shadow-lg border-none cursor-pointer text-white font-semibold text-base mb-3 disabled:opacity-50 transition-all"
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>

                <SocialLogin mode="login" />
            </form>
        </div>
    );
}