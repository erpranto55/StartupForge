export default function ProfilePage() {
    return (
        <div>
            <h1 className="text-4xl font-black text-brand-ink">
                My Profile
            </h1>

            <p className="mt-2 text-gray-500">
                Update your personal information.
            </p>

            <div className="mt-10 rounded-3xl bg-white p-8 shadow-sm">
                <form className="space-y-6">
                    <div>
                        <label className="mb-2 block font-medium">
                            Name
                        </label>

                        <input
                            className="w-full rounded-xl border p-3"
                            placeholder="Your Name"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">
                            Image URL
                        </label>

                        <input
                            className="w-full rounded-xl border p-3"
                            placeholder="https://..."
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">
                            Skills
                        </label>

                        <input
                            className="w-full rounded-xl border p-3"
                            placeholder="React, Node.js, MongoDB"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">
                            Bio
                        </label>

                        <textarea
                            rows={6}
                            className="w-full rounded-xl border p-3"
                            placeholder="Tell us about yourself..."
                        />
                    </div>

                    <button className="rounded-xl bg-brand-primary px-6 py-3 font-semibold text-white">
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
}