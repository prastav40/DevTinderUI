import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userslice";
import { useNavigate, Link } from "react-router-dom";
import { BASEURL } from "../../utils/constant";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("prastav@gmail.com");
    const [password, setPassword] = useState("prastav@123");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Keyboard support: Pressing "Enter" triggers login
    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleLogin();
    };

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        setLoading(true);
        setError("");
        try {
            const res = await axios.post(
                BASEURL + "/login",
                { email, password },
                { withCredentials: true }
            );

            // Standardizing the user object regardless of backend nesting
            const userProfile = res?.data?.user || res?.data?.data || res?.data;
            dispatch(addUser(userProfile));
            navigate("/feed");
        } catch (err) {
            setError(err.response?.data?.error || "Connection refused. Check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        /* Deep tech-mesh background */
        <div className="flex justify-center items-center min-h-[90vh] bg-[#0f172a] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-900 to-black px-4">

            {/* Glassmorphism Card */}
            <div className="card w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
                <div className="card-body p-8 sm:p-10" onKeyDown={handleKeyDown}>

                    <header className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-blue-600 mb-4 shadow-lg shadow-primary/20 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                            <span className="text-5xl">🔥</span>
                        </div>
                        <h2 className="text-4xl font-black text-white tracking-tighter italic">Dev<span className="text-primary">Tinder</span></h2>
                        <p className="text-slate-400 mt-2 font-medium text-sm uppercase tracking-widest">Authentication Required</p>
                    </header>

                    {/* Error Alert with high contrast */}
                    {error && (
                        <div className="alert alert-error bg-error/10 border border-error/50 py-3 mb-6 text-sm flex justify-start rounded-xl animate-shake">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-error shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            <span className="text-error font-bold">{error}</span>
                        </div>
                    )}

                    <div className="space-y-6">
                        {/* Email Input */}
                        <div className="form-control">
                            <label className="label-text text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] mb-2 ml-1">Terminal ID (Email)</label>
                            <label className="input bg-slate-800/50 border-slate-700 flex items-center gap-3 focus-within:border-primary transition-all">
                                <svg className="h-5 w-5 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                                </svg>
                                <input
                                    type="email"
                                    className="grow text-white placeholder:text-slate-600"
                                    placeholder="dev@stack.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </label>
                        </div>

                        {/* Password Input */}
                        <div className="form-control">
                            <label className="label-text text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] mb-2 ml-1">Access Token (Password)</label>
                            <label className="input bg-slate-800/50 border-slate-700 flex items-center gap-3 focus-within:border-primary transition-all">
                                <svg className="h-5 w-5 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="grow text-white placeholder:text-slate-600"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="text-slate-500 hover:text-primary transition-colors pr-2"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </button>
                            </label>
                        </div>

                        {/* Login Button with Neon Shadow */}
                        <button
                            className={`btn btn-primary w-full text-lg mt-4 h-14 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-primary/50 transition-all border-none font-black uppercase tracking-widest ${loading && "loading"}`}
                            onClick={handleLogin}
                            disabled={loading}
                        >
                            {loading ? "" : "Login"}
                        </button>

                        <div className="divider text-[10px] opacity-20 uppercase font-bold tracking-[0.3em]">New to the cluster?</div>

                        <Link
                            to="/signup"
                            className="btn btn-outline btn-block border-slate-700 text-slate-400 hover:bg-slate-800 hover:border-slate-600 hover:text-white font-bold h-14"
                        >
                            Create Developer Profile
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;