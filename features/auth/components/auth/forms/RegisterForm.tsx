"use client";
import { RegisterFormData, Role, ExtendedRegisterFormData } from "../types/auth.types";
import RoleDropdown from "../shared/RoleDropdown";
import SocialLogin from "../shared/SocialLogin";
import Logo from "../shared/Logo";

interface RegisterFormProps {
    form: ExtendedRegisterFormData;
    setForm: (form: ExtendedRegisterFormData) => void;
    isLoading: boolean;
    onSubmit: (e: React.FormEvent) => void;
}

export default function RegisterForm({ form, setForm, isLoading, onSubmit }: RegisterFormProps) {
    return (
        <div className="w-full overflow-y-auto max-h-full">
            <div className="flex justify-center items-center mb-4">
                <Logo size="md" showText={false} />
            </div>
            
            <form onSubmit={onSubmit} className="w-full">
                <h1 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">Register</h1>
                
                <div className="relative my-3">
                    <input
                        type="text"
                        placeholder="Full Name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        disabled={isLoading}
                        className="w-full py-2.5 px-4 pr-11 bg-gray-100 dark:bg-gray-700 rounded-lg border-none outline-none text-gray-800 dark:text-white font-medium placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:ring-2 focus:ring-cyan-500"
                    />
                    <i className="bx bxs-user absolute right-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-600 dark:text-gray-400"></i>
                </div>

                <div className="relative my-3">
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

                <div className="relative my-3">
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        disabled={isLoading}
                        className="w-full py-2.5 px-4 pr-11 bg-gray-100 dark:bg-gray-700 rounded-lg border-none outline-none text-gray-800 dark:text-white font-medium placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:ring-2 focus:ring-cyan-500"
                    />
                    <i className="bx bxs-phone absolute right-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-600 dark:text-gray-400"></i>
                </div>

                <div className="grid grid-cols-2 gap-2 my-3">
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            disabled={isLoading}
                            className="w-full py-2.5 px-3 pr-8 bg-gray-100 dark:bg-gray-700 rounded-lg border-none outline-none text-gray-800 dark:text-white font-medium placeholder-gray-500 dark:placeholder-gray-400 text-xs focus:ring-2 focus:ring-cyan-500"
                        />
                        <i className="bx bxs-lock-alt absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-600 dark:text-gray-400"></i>
                    </div>
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Confirm"
                            required
                            value={form.confirm}
                            onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                            disabled={isLoading}
                            className="w-full py-2.5 px-3 pr-8 bg-gray-100 dark:bg-gray-700 rounded-lg border-none outline-none text-gray-800 dark:text-white font-medium placeholder-gray-500 dark:placeholder-gray-400 text-xs focus:ring-2 focus:ring-cyan-500"
                        />
                        <i className="bx bxs-lock-alt absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-600 dark:text-gray-400"></i>
                    </div>
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

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 rounded-lg shadow-lg border-none cursor-pointer text-white font-semibold text-base mb-3 disabled:opacity-50 transition-all"
                >
                    {isLoading ? "Registering..." : "Register"}
                </button>

                <SocialLogin mode="register" />
            </form>
        </div>
    );
}