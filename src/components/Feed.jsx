import axios from "axios";
import { BASEURL } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { useEffect, useState } from "react";
import { addfeed } from "../../utils/feedslice";
import Card from "./Card";

const Feed = () => {
    const dispatch = useDispatch();
    const feed = useSelector((store) => store.feed);
    const [isInitialLoading, setIsInitialLoading] = useState(false);



    const getFeed = async () => {
        // Only show full-screen loader if we have zero cards
        if (!feed || feed.length === 0) setIsInitialLoading(true);

        try {
            // Sync user profile

            const profileRes = await axios.get(BASEURL + "/profile/view", { withCredentials: true });
            dispatch(addUser(profileRes?.data));

            // Fetch 30-user feed
            const feedRes = await axios.get(BASEURL + "/feed", { withCredentials: true });
            dispatch(addfeed(feedRes?.data));
        } catch (err) {
            console.error("Feed fetch failed:", err);
        } finally {
            setIsInitialLoading(false);
        }
    };



    useEffect(() => {
        try {
            getFeed();
        } catch (err) {
            console.error("Error fetching feed on mount:", err);
        }
    }, []);

    // 1. Premium Loading State
    if (isInitialLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
                <span className="loading loading-infinity w-20 text-primary"></span>
                <p className="text-xs font-mono text-slate-500 uppercase tracking-[0.3em] animate-pulse">
                    Scanning for Collaborators...
                </p>
            </div>
        );
    }

    // 2. Premium Empty State (End of Stack)
    if (!feed || feed.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6 animate-in fade-in zoom-in duration-500">
                <div className="relative mb-8">
                    <div className="text-9xl opacity-20">📡</div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="loading loading-ping w-24 h-24 bg-primary/20 rounded-full"></span>
                    </div>
                </div>
                <h2 className="text-4xl font-black text-white italic tracking-tighter">Stack Overflow!</h2>
                <p className="text-slate-400 mt-3 max-w-sm font-medium">
                    You've swiped through all available developers. Try updating your own skills to match with new people.
                </p>
                <div className="flex gap-4 mt-10">
                    <button onClick={getFeed} className="btn btn-primary px-8 shadow-lg shadow-primary/20">
                        Refresh Stack
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center p-4 min-h-[75vh]">
            <div className="relative w-full max-w-md group">

                {/* 3. The Top Card (feed[0]) */}
                <div className="relative z-30 transition-all duration-500 group-hover:-translate-y-2">
                    <Card userData={feed[0]} />
                </div>

                {/* 4. Decorative Background Stack Cards */}
                {feed.length > 1 && (
                    <>
                        {/* Second Card Peek */}
                        <div className="absolute z-20 top-4 left-0 w-full h-full bg-slate-800/80 border border-white/5 rounded-[2rem] shadow-xl scale-[0.96] -translate-y-2"></div>
                        {/* Third Card Peek */}
                        {feed.length > 2 && (
                            <div className="absolute z-10 top-8 left-0 w-full h-full bg-slate-900/60 border border-white/5 rounded-[2rem] shadow-lg scale-[0.92] -translate-y-4"></div>
                        )}
                    </>
                )}
            </div>

            <p className="mt-8 text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                {feed.length} developers remaining in your stack
            </p>
        </div>
    );
};

export default Feed;