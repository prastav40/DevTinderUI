import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BASEURL } from "../../utils/constant";
import { addUser } from "../../utils/userslice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        age: "",
        gender: "male",
        photourl: "",
        about: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await axios.post(
                BASEURL + "/signup",
                formData,
                { withCredentials: true }
            );

            const reslogin = await axios.post(
                BASEURL + "/login",
                { email: formData.email, password: formData.password },
                { withCredentials: true }
            );


            dispatch(addUser(res.data.user));
            navigate("/feed");
        } catch (err) {
            setError(err.response?.data?.error || "Registration failed. Please check your inputs.");
        } finally {
            setLoading(false);
        }
    };




    return (
        <div className="min-h-screen bg-[#0f172a] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900 to-black flex justify-center items-center p-6 py-16">
            <div className="card w-full max-w-3xl bg-slate-900/50 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
                <div className="card-body p-8 md:p-12">

                    <header className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-blue-500 mb-4 shadow-lg shadow-primary/30 transform -rotate-3 hover:rotate-0 transition-transform">
                            <span className="text-3xl text-white">🚀</span>
                        </div>
                        <h2 className="text-4xl font-black text-white tracking-tight italic">
                            Create <span className="text-primary">Dev Account</span>
                        </h2>
                    </header>

                    {error && (
                        <div className="alert alert-error bg-error/10 border-error/50 text-red-800 mb-8 text-sm animate-shake rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span className="font-bold">{error}</span>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Row 1: First & Last Name */}
                        <div className="form-control">
                            <label className="label-text text-slate-500 font-bold uppercase text-[10px] tracking-widest mb-2 ml-1">First Name</label>
                            <input name="firstname" type="text" placeholder="Rudransh" className="input bg-slate-800/50 border-slate-700 text-white focus:border-primary transition-all"
                                value={formData.firstname} onChange={handleChange} required />
                        </div>
                        <div className="form-control">
                            <label className="label-text text-slate-500 font-bold uppercase text-[10px] tracking-widest mb-2 ml-1">Last Name</label>
                            <input name="lastname" type="text" placeholder="Pawar" className="input bg-slate-800/50 border-slate-700 text-white focus:border-primary transition-all"
                                value={formData.lastname} onChange={handleChange} required />
                        </div>

                        {/* Row 2: Email & Password */}
                        <div className="form-control">
                            <label className="label-text text-slate-500 font-bold uppercase text-[10px] tracking-widest mb-2 ml-1">Email Address</label>
                            <input name="email" type="email" placeholder="dev@stack.com" className="input bg-slate-800/50 border-slate-700 text-white focus:border-primary transition-all"
                                value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="form-control">
                            <label className="label-text text-slate-500 font-bold uppercase text-[10px] tracking-widest mb-2 ml-1">Password</label>
                            <input name="password" type="password" placeholder="••••••••" className="input bg-slate-800/50 border-slate-700 text-white focus:border-primary transition-all"
                                value={formData.password} onChange={handleChange} required />
                        </div>

                        {/* Row 3: Age & Gender */}
                        <div className="form-control">
                            <label className="label-text text-slate-500 font-bold uppercase text-[10px] tracking-widest mb-2 ml-1">Age</label>
                            <input name="age" type="number" placeholder="21" className="input bg-slate-800/50 border-slate-700 text-white focus:border-primary transition-all"
                                value={formData.age} onChange={handleChange} required />
                        </div>
                        <div className="form-control">
                            <label className="label-text text-slate-500 font-bold uppercase text-[10px] tracking-widest mb-2 ml-1">Gender Identity</label>
                            <select name="gender" className="select bg-slate-800/50 border-slate-700 text-white focus:border-primary transition-all w-full"
                                value={formData.gender} onChange={handleChange}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Row 4: Photo URL (Full Width) */}
                        <div className="form-control md:col-span-2">
                            <label className="label-text text-slate-500 font-bold uppercase text-[10px] tracking-widest mb-2 ml-1">Avatar Link (Photo URL)</label>
                            <input name="photourl" type="text" placeholder="https://github.com/profile.png" className="input bg-slate-800/50 border-slate-700 text-white focus:border-primary transition-all"
                                value={formData.photourl} onChange={handleChange} />
                        </div>

                        {/* Row 5: About (Full Width) */}
                        <div className="form-control md:col-span-2">
                            <label className="label-text text-slate-500 font-bold uppercase text-[10px] tracking-widest mb-2 ml-1">Tech Stack & Bio</label>
                            <textarea name="about" placeholder="Tell the cluster about your tech stack..." className="textarea bg-slate-800/50 border-slate-700 text-white h-24 focus:textarea-primary transition-all"
                                value={formData.about} onChange={handleChange} />
                        </div>
                    </div>

                    <button
                        className={`btn btn-primary btn-block mt-10 h-14 text-lg font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[1.01] transition-all ${loading ? 'loading' : ''}`}
                        onClick={handleSignup}
                        disabled={loading}
                    >
                        {loading ? "" : "Sign Up"}
                    </button>

                    <p className="text-center mt-8 text-slate-500 text-sm font-medium">
                        Already in the cluster? <Link to="/login" className="text-primary font-black hover:underline underline-offset-4">LOG IN</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;