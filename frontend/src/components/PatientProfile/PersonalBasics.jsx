

const PersonalBasics = ({ formData, handleChange }) => {
    return (
        <div className="space-y-4">
            {/* Age Input */}
            <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-semibold text-slate-800">
                    Age
                </label>
                <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Enter your age"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488]"
                />
            </div>

            {/* Gender Select */}
            <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-semibold text-slate-800">
                    Gender
                </label>
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488] bg-white"
                >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                </select>
            </div>
        </div>
    );
};

export default PersonalBasics;
