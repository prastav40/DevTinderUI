import axios from "axios";
import { BASEURL } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";


const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector((store) => store.user);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const res = await axios.get(BASEURL + "/profile/view", {
                withCredentials: true
            });

            // Supporting both nested and flat response structures
            const userData = res?.data?.data || res?.data;
            dispatch(addUser(userData));

        } catch (err) {
            // Check if we are already on auth pages to avoid redirect loops
            const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";
            if (!isAuthPage) {
                navigate("/login");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!user) {
            fetchUser();
        } else {
            setIsLoading(false);
        }
    }, [location.pathname]);

    // Premium Loading State
    if (isLoading) {
        return (
            <div className="flex h-screen flex-col gap-6 items-center justify-center bg-[#0f172a]">
                <div className="relative">
                    <span className="loading loading-ring w-24 h-24 text-primary"></span>
                    <span className="absolute inset-0 flex items-center justify-center text-2xl">🔥</span>
                </div>
                <div className="text-center space-y-2">
                    <p className="text-xl font-black text-white italic tracking-tighter">DevTinder Website</p>
                    <p className="text-xs font-mono text-slate-500 animate-pulse uppercase tracking-[0.2em]">
                        Initialising Environment...
                    </p>
                </div>
            </div>
        );
    }

    return (
        /* The main container uses the deep tech theme background */
        <div className="flex flex-col min-h-screen bg-[#0f172a] text-slate-200 font-sans antialiased selection:bg-primary selection:text-white">

            {/* 1. Global Background Mesh (Applied behind everything) */}
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-900 to-black pointer-events-none"></div>


            {/* 2. Main Content with Route Transitions */}
            <main className="flex-grow container mx-auto px-4 py-10 flex justify-center items-start">
                <div className="w-full max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Body;