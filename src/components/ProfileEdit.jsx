import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";
import { BASEURL } from "../../utils/constant";
import { addUser } from "../../utils/userslice";
import { useNavigate } from "react-router-dom";

const ProfileEdit = () => {
    const user = useSelector((store) => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Initial state helper function
    const mapUserToForm = (u) => ({
        firstname: u?.firstname || "",
        lastname: u?.lastname || "",
        age: u?.age || "",
        gender: u?.gender || "male",
        photourl: u?.photourl || "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
        about: u?.about || ""
    });

    const [formData, setFormData] = useState(mapUserToForm(user));

    const handleRefresh = async () => {
        try {
            const res = await axios.get(BASEURL + "/profile/view", { withCredentials: true });
            dispatch(addUser(res?.data?.data || res?.data));
        } catch (err) {
            console.error("Refresh failed", err);
        }
    };

    // Split useEffects to prevent infinite loops
    useEffect(() => {
        handleRefresh();
    }, []); // Only runs on mount

    useEffect(() => {
        if (user) setFormData(mapUserToForm(user));
    }, [user]); // Syncs form if Redux store updates

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            // Convert comma-separated string back to array for backend
            const updatedData = {
                ...formData
            };

            const res = await axios.patch(BASEURL + "/profile/edit", updatedData, { withCredentials: true });
            dispatch(addUser(res?.data?.data || res?.data));

            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
                navigate("/feed");
            }, 3000);

        } catch (err) {
            console.error("Update failed:", err);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-12 justify-center items-start min-h-[85vh] p-6 animate-in fade-in duration-700">
            {/* Form Section */}
            <div className="card bg-slate-900/40 backdrop-blur-xl w-full max-w-lg shadow-2xl border border-white/10">
                <div className="card-body gap-5 p-8">
                    <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-4">
                        <h1 className="text-3xl font-black text-white italic tracking-tighter">Edit Profile</h1>
                        <button onClick={() => navigate("/")} className="btn btn-ghost btn-sm hover:bg-error/10 text-error">✕</button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label-text font-bold text-[10px] uppercase tracking-widest text-slate-500 mb-2">First Name</label>
                            <input name="firstname" type="text" className="input bg-slate-800/50 border-slate-700 text-white" value={formData.firstname} onChange={handleChange} />
                        </div>
                        <div className="form-control">
                            <label className="label-text font-bold text-[10px] uppercase tracking-widest text-slate-500 mb-2">Last Name</label>
                            <input name="lastname" type="text" className="input bg-slate-800/50 border-slate-700 text-white" value={formData.lastname} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label-text font-bold text-[10px] uppercase tracking-widest text-slate-500 mb-2">Age</label>
                            <input name="age" type="number" className="input bg-slate-800/50 border-slate-700 text-white" value={formData.age} onChange={handleChange} />
                        </div>
                        <div className="form-control">
                            <label className="label-text font-bold text-[10px] uppercase tracking-widest text-slate-500 mb-2">Gender</label>
                            <select name="gender" className="select bg-slate-800/50 border-slate-700 text-white" value={formData.gender} onChange={handleChange}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label-text font-bold text-[10px] uppercase tracking-widest text-slate-500 mb-2">Image URL</label>
                        <input name="photourl" type="text" className="input bg-slate-800/50 border-slate-700 text-white" value={formData.photourl} onChange={handleChange} />
                    </div>


                    <div className="form-control">
                        <label className="label-text font-bold text-[10px] uppercase tracking-widest text-slate-500 mb-2">Tech Bio</label>
                        <textarea name="about" className="textarea bg-slate-800/50 border-slate-700 text-white h-24" value={formData.about} onChange={handleChange} />
                    </div>

                    <button className={`btn btn-primary mt-6 uppercase tracking-[0.2em] font-black h-14 ${isSaving ? 'loading' : ''}`} onClick={handleSave} disabled={isSaving}>
                        {isSaving ? "" : "Save Profile"}
                    </button>
                </div>
            </div>

            {/* Live Preview Section */}
            <div className="sticky top-24 hidden lg:block text-center group">
                <div className="flex items-center justify-center gap-2 mb-6">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                    </span>
                    <span className="text-[10px] font-mono font-bold tracking-[0.4em] text-slate-500 uppercase">Live Preview</span>
                </div>
                <Card userData={{ ...formData }} />
            </div>

            {/* Success Toast */}
            {showToast && (
                <div className="toast toast-top toast-center z-[200]">
                    <div className="alert bg-primary text-white shadow-2xl font-bold px-10 py-4 rounded-2xl animate-bounce">
                        <span>✨ Edit Succesfully</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileEdit;