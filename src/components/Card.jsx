import { BASEURL } from "../../utils/constant";
import axios from "axios";
import { removefeed } from "../../utils/feedslice";
import { useDispatch } from "react-redux";

const Card = ({ userData }) => {
    const dispatch = useDispatch();

    const {
        firstname = "Developer",
        lastname = "",
        photourl,
        age,
        gender,
        about,
        _id
    } = userData;

    const handleInterest = async (status, senderId) => {
        try {
            await axios.post(
                `${BASEURL}/request/send/${status}/${senderId}`,
                {},
                { withCredentials: true }
            );
            dispatch(removefeed(userData));
        } catch (err) {
            console.error("Connection request failed", err);
        }
    };

    return (
        /* perspective-1000 allows for future 3D rotation animations */
        <div className="flex justify-center my-6 perspective-1000">
            <div className="card w-96 bg-slate-900 border border-white/10 shadow-2xl transition-all duration-500 hover:shadow-primary/20 overflow-hidden group">

                {/* 1. Profile Figure with Tech Overlay */}
                <figure className="relative h-[400px] overflow-hidden">
                    <img
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        src={photourl}
                        alt={`${firstname}'s profile`}
                    />

                    {/* Floating Info Header (Glassmorphism) */}
                    <div className="absolute top-4 left-4">
                        <span className="badge badge-primary bg-primary/80 backdrop-blur-md border-none text-white font-bold px-3 py-3 shadow-lg">
                            {gender === 'male' ? '♂' : gender === 'female' ? '♀' : '⚥'} {gender}
                        </span>
                    </div>

                    {/* Gradient Info Footer */}
                    <div className="absolute bottom-0 left-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent w-full p-6">
                        <h2 className="text-white text-3xl font-black capitalize tracking-tight flex items-center gap-2">
                            {firstname} {lastname}
                            {age && <span className="text-primary-content/60 text-xl font-light">| {age}</span>}
                        </h2>
                    </div>
                </figure>

                <div className="card-body p-6 bg-slate-900/90 text-slate-200">


                    {/* 3. Bio */}
                    <p className="text-sm text-slate-400 leading-relaxed italic line-clamp-3 mb-4">
                        "{about || "This dev is busy coding and hasn't written a bio yet."}"
                    </p>

                    {/* 4. Custom Interaction Buttons */}
                    <div className="card-actions justify-between items-center mt-2 px-4">
                        <button
                            className="btn btn-circle btn-ghost border border-white/10 hover:bg-error/20 hover:border-error text-slate-400 hover:text-error transition-all duration-300"
                            onClick={() => handleInterest("ignored", _id)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <button
                            className="btn btn-circle bg-gradient-to-tr from-blue-600 to-primary border-none text-white shadow-lg shadow-primary/20 hover:scale-110 active:scale-95 transition-all duration-300"
                            onClick={() => handleInterest("interested", _id)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;