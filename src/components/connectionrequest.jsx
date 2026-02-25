import { showconnectionrequest, removerequest } from "../../utils/connectionrequestslice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { BASEURL } from "../../utils/constant";
import { addUser } from "../../utils/userslice";

const ConnectionRequest = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.showconnectionrequest);

    const getConnectionRequests = async () => {
        try {
            const res = await axios.get(BASEURL + "/user/requests/pending", {
                withCredentials: true
            });
            dispatch(showconnectionrequest(res?.data?.data));
        } catch (err) {
            console.error("Failed to fetch requests:", err);
        }
    };

    const handleRefresh = async () => {

        const profileRes = await axios.get(BASEURL + "/profile/view", { withCredentials: true });
        dispatch(addUser(profileRes?.data));
    }

    const reviewRequest = async (status, requestId) => {
        try {
            await axios.post(
                `${BASEURL}/request/review/${status}/${requestId}`,
                {},
                { withCredentials: true }
            );
            // Instant UI feedback
            dispatch(removerequest(requestId));
        } catch (err) {
            console.error("Review failed:", err);
        }
    };

    useEffect(() => {
        handleRefresh();
        getConnectionRequests();
    }, []);

    // 1. Premium Loading State
    if (!requests) {
        return (
            <div className="flex flex-col gap-4 justify-center items-center min-h-[60vh]">
                <span className="loading loading-infinity loading-lg text-primary"></span>
                <p className="text-xs font-mono text-slate-500 animate-pulse uppercase tracking-widest">
                    Fetching Incoming Requests...
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto my-10 px-4">
            <header className="mb-10 text-center">
                <h2 className="text-4xl font-black italic tracking-tighter bg-gradient-to-r from-blue-400 to-primary bg-clip-text text-transparent inline-block">
                    Pending Requests
                </h2>
                <p className="text-slate-500 text-sm font-mono mt-2 uppercase tracking-widest">
                    {requests.length} Pending Approvals
                </p>
            </header>

            {requests.length === 0 ? (
                <div className="flex flex-col items-center gap-4 py-20 bg-slate-900/40 backdrop-blur-md rounded-3xl border-2 border-dashed border-white/5">
                    <div className="text-6xl grayscale opacity-50">☕</div>
                    <p className="text-slate-400 font-medium italic">Inbox zero. Time for a coffee break.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {requests.map((item) => {
                        const sender = item?.senderid;
                        return (
                            <div
                                key={item._id}
                                className="flex items-center justify-between p-5 bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-white/5 shadow-2xl hover:border-primary/30 transition-all duration-300 group"
                            >
                                <div className="flex items-center gap-5">
                                    {/* Squircle Avatar with Glow */}
                                    <div className="avatar">
                                        <div className="w-16 h-16 rounded-2xl ring ring-primary/20 ring-offset-slate-900 ring-offset-2 group-hover:ring-primary/50 transition-all">
                                            <img
                                                src={sender?.photourl || "https://vectorified.com/images/default-user-icon-33.png"}
                                                alt="sender"
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-xl text-white capitalize group-hover:text-primary transition-colors">
                                            {sender?.firstname} {sender?.lastname}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            {sender?.skills?.[0] && (
                                                <div className="badge badge-primary badge-outline badge-xs text-[9px] uppercase font-black">
                                                    {sender.skills[0]}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Modern Action Controls */}
                                <div className="flex items-center gap-3">
                                    <button
                                        className="btn btn-square btn-ghost text-slate-500 hover:text-error hover:bg-error/10 transition-colors"
                                        onClick={() => reviewRequest("rejected", item._id)}
                                        title="Ignore"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                    <button
                                        className="btn btn-primary btn-circle shadow-lg shadow-primary/20 hover:scale-110 active:scale-90 transition-all"
                                        onClick={() => reviewRequest("accepted", item._id)}
                                        title="Connect"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ConnectionRequest;