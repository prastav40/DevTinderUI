import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASEURL } from "../../utils/constant";
import { removeUser } from "../../utils/userSlice";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Accessing the user object from the Redux store
    const user = useSelector((store) => store.user);

    const handleLogout = async () => {
        try {
            await axios.post(
                BASEURL + "/logout",
                {},
                { withCredentials: true }
            );
            dispatch(removeUser());
            navigate("/login");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    return (
        <div className="navbar bg-slate-900/70 backdrop-blur-xl px-4 md:px-12 shadow-2xl sticky top-0 z-[100] border-b border-white/5 transition-all duration-300">
            {/* 1. Logo Section */}
            <div className="flex-1">
                <Link to="/" className="flex items-center gap-2 group">
                    <span className="text-3xl transition-transform group-hover:rotate-12 duration-300">🔥</span>
                    <span className="font-black text-2xl tracking-tighter hidden sm:block text-white">
                        Dev<span className="text-primary italic">Tinder</span>
                    </span>
                </Link>
            </div>

            {/* 2. User Actions Section */}
            <div className="flex-none gap-3">
                {user ? (
                    <div className="flex items-center gap-4">
                        {/* Desktop Welcome Message - Checking both casing possibilities */}
                        <span className="hidden lg:block font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
                            User: <span className="font-bold text-white relative">
                                {user?.firstname || "User"}
                            </span>
                        </span>

                        <div className="dropdown dropdown-end">
                            {/* 3. Squircle Avatar */}
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar online">
                                <div className="w-11 rounded-2xl ring ring-primary/40 ring-offset-slate-900 ring-offset-2 hover:ring-primary transition-all duration-300">
                                    <img
                                        alt="User Profile"
                                        src={user?.photourl || "https://vectorified.com/images/default-user-icon-33.png"}
                                        className="object-cover"
                                    />
                                </div>
                            </label>

                            {/* 4. Dropdown Menu */}
                            <ul tabIndex={0} className="menu menu-md dropdown-content mt-4 z-[100] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-slate-900/95 backdrop-blur-2xl rounded-2xl w-64 border border-white/10">
                                <li className="menu-title px-4 py-2 text-slate-500 font-bold uppercase tracking-widest text-[10px]">Command Center</li>

                                <li className="hover:bg-primary/10 rounded-lg transition-colors">
                                    <Link to="/ProfileEdit" className="flex justify-between py-3 text-slate-200">
                                        <span className="flex items-center gap-3">👤 Edit Profile</span>
                                    </Link>
                                </li>

                                <li className="hover:bg-primary/10 rounded-lg transition-colors">
                                    <Link to="/Connections" className="py-3 text-slate-200">🌐 My Tech Network</Link>
                                </li>

                                <li className="hover:bg-primary/10 rounded-lg transition-colors">
                                    <Link to="/ConnectionRequest" className="py-3 text-slate-200">📩 Pending Requests</Link>
                                </li>

                                <div className="divider my-1 opacity-10"></div>

                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="text-error font-black hover:bg-error/10 py-3 uppercase text-xs tracking-widest w-full text-left"
                                    >
                                        Log Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <Link to="/login" className="btn btn-ghost btn-sm text-slate-400 hover:text-white transition-colors">Login</Link>
                        <Link to="/signup" className="btn btn-primary btn-sm px-6 shadow-lg shadow-primary/20 font-bold uppercase tracking-tighter h-10">
                            SignUp
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;