import { showconnections } from "../../utils/conectionslice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { BASEURL } from "../../utils/constant";
import { Link } from "react-router-dom";
import { addUser } from "../../utils/userSlice";

const Connection = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connections);

    const handleRefresh = async () => {

        const profileRes = await axios.get(BASEURL + "/profile/view", { withCredentials: true });
        dispatch(addUser(profileRes?.data));
    }

    const getConnections = async () => {
        try {
            const res = await axios.get(BASEURL + "/user/requests/accepted", {
                withCredentials: true
            });
            dispatch(showconnections(res?.data?.data || res?.data));
        } catch (err) {
            console.error("Error fetching connections:", err);
        }
    };

    useEffect(() => {
        handleRefresh();
        getConnections();
    }, []);

    // 1. Premium Empty State
    if (!connections || connections.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 animate-in fade-in zoom-in duration-700">
                <div className="w-24 h-24 mb-6 rounded-full bg-slate-800 flex items-center justify-center text-5xl shadow-inner border border-white/5">
                    🛰️
                </div>
                <h2 className="text-3xl font-black text-white italic tracking-tighter">Quiet Space...</h2>
                <p className="text-slate-400 mt-2 max-w-xs font-medium">
                    Your network is currently empty. Head back to the feed to find your next collaborator.
                </p>
                <Link to="/feed" className="btn btn-primary mt-8 px-10 shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                    Discover Developers
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto my-12 px-6">
            <header className="mb-12 text-center">
                <h1 className="text-5xl font-black tracking-tighter italic bg-gradient-to-r from-blue-400 via-primary to-purple-500 bg-clip-text text-transparent inline-block">
                    My Tech Network
                </h1>
                <p className="text-slate-500 mt-3 font-mono text-sm uppercase tracking-[0.3em]">
                    {connections.length} Established {connections.length === 1 ? 'Connection' : 'Connections'}
                </p>
            </header>

            <div className="grid gap-6">
                {connections.map((user) => (
                    <div
                        key={user._id}
                        className="flex items-center justify-between p-6 bg-slate-900/40 backdrop-blur-md rounded-3xl border border-white/5 shadow-xl hover:border-primary/40 hover:bg-slate-800/60 transition-all duration-500 group"
                    >
                        <div className="flex items-center gap-6">
                            {/* 2. Squircle Avatar with Glow */}
                            <div className="avatar online">
                                <div className="w-16 h-16 rounded-2xl ring ring-primary/30 ring-offset-slate-900 ring-offset-2 transition-all duration-500 group-hover:ring-primary group-hover:scale-110">
                                    <img
                                        src={user.photourl}
                                        alt={user.firstname}
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            {/* 3. Connection Details */}
                            <div>
                                <h3 className="text-xl font-bold capitalize text-white group-hover:text-primary transition-colors">
                                    {user.firstname} {user.lastname}
                                </h3>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {user.skills?.slice(0, 3).map((skill) => (
                                        <span key={skill} className="text-[10px] font-bold uppercase tracking-widest text-slate-500 border border-slate-700 px-2 py-0.5 rounded-md group-hover:border-primary/30 group-hover:text-slate-300 transition-all">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 4. Action Center */}
                        <div className="flex items-center gap-3">
                            <button className="btn btn-square btn-ghost hover:bg-primary/10 text-xl" title="Message">
                                💬
                            </button>
                            <button className="btn btn-outline btn-primary btn-sm rounded-xl px-6 hidden sm:flex border-2 font-bold hover:shadow-lg hover:shadow-primary/20">
                                View Profile
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Connection;