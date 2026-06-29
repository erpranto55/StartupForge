"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "@/lib/axios";
import useCustomUser from "@/hooks/useCustomUser";
import uploadImage from "@/utils/uploadImage";
import { authClient } from "@/lib/auth-client";
import SafeAvatar from "./SafeAvatar";
import DashboardShell from "@/components/dashboard/DashboardShell";
import {
    ArrowLeft,
    Mail,
    User,
    Briefcase,
    Globe,
    FileText,
    Camera,
    Check,
} from "lucide-react";
import { LogoGithub } from "@gravity-ui/icons";

export default function EditProfilePageView() {
    const router = useRouter();
    const fileInputRef = useRef(null);
    const { customUser, loading } = useCustomUser();
    const [updating, setUpdating] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        bio: "",
        skills: "",
        github: "",
        portfolio: "",
    });

    useEffect(() => {
        if (!customUser) return;

        setFormData({
            name: customUser.name || "",
            image: customUser.image || "",
            bio: customUser.bio || "",
            skills: Array.isArray(customUser.skills)
                ? customUser.skills.join(", ")
                : customUser.skills || "",
            github: customUser.github || "",
            portfolio: customUser.portfolio || "",
        });
        setPreviewUrl(customUser.image || "");
    }, [customUser]);

    useEffect(() => {
        return () => {
            if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === "image") {
            setSelectedFile(null);
            setPreviewUrl(value);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please select a valid image file");
            return;
        }

        setSelectedFile(file);
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!customUser?.email) return;

        try {
            setUpdating(true);
            let imageUrl = formData.image.trim();

            if (selectedFile) {
                imageUrl = await uploadImage(selectedFile);
            }

            const payload = {
                name: formData.name.trim(),
                image: imageUrl,
                bio: formData.bio.trim(),
                skills: formData.skills
                    .split(",")
                    .map((skill) => skill.trim())
                    .filter(Boolean),
                github: formData.github.trim(),
                portfolio: formData.portfolio.trim(),
            };

            await axios.patch(`/api/users/${customUser.email}`, payload);

            try {
                await authClient.updateUser({
                    name: payload.name,
                    image: payload.image,
                });
            } catch (err) {
                console.error("Error updating Better Auth profile:", err);
            }

            toast.success("Profile updated successfully");
            router.refresh();
            router.push(`/dashboard/${customUser.role}/profile`);
        } catch (error) {
            console.error(error);
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to update profile";
            toast.error(message);
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-[70vh] items-center justify-center">
                <div className="text-lg font-semibold">Loading Profile...</div>
            </div>
        );
    }

    const role = customUser?.role || "collaborator";

    return (
        <DashboardShell role={role} customUser={customUser}>
            <div className="mx-auto max-w-7xl px-4 py-8">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <Link
                        href={`/dashboard/${role}/profile`}
                        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-brand-primary hover:underline"
                    >
                        <ArrowLeft size={18} />
                        Back to Profile
                    </Link>
                    <h1 className="text-4xl font-black text-brand-ink">Edit Profile</h1>
                    <p className="mt-2 text-gray-500">
                        Update your personal information and social links.
                    </p>
                </div>
            </div>

            <div className="mb-10 overflow-hidden rounded-3xl border bg-white shadow-xl">
                <div className="h-48 bg-linear-to-r from-brand-primary via-fuchsia-600 to-indigo-600" />
                <div className="px-8 pb-8">
                    <div className="-mt-16 flex flex-col items-center md:flex-row md:items-end md:justify-between">
                        <div className="flex items-end gap-5">
                            <SafeAvatar
                                src={previewUrl || formData.image}
                                name={formData.name || customUser?.name}
                                alt="Profile preview"
                                className="h-32 w-32 rounded-full border-4 border-white bg-white object-cover shadow-xl"
                            />
                            <div className="pb-2">
                                <h2 className="text-3xl font-bold">
                                    {formData.name || "Your Name"}
                                </h2>
                                <p className="text-gray-500">{customUser?.email}</p>
                            </div>
                        </div>
                        <span className="mt-6 rounded-full bg-brand-primary/10 px-5 py-2 font-semibold capitalize text-brand-primary md:mt-0">
                            {role}
                        </span>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
                <div className="space-y-8 lg:col-span-2">
                    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
                        <div className="mb-8 flex items-center gap-3">
                            <User className="text-brand-primary" />
                            <h2 className="text-2xl font-bold">Basic Information</h2>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="John Doe"
                                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />
                                    <input
                                        type="email"
                                        value={customUser?.email || ""}
                                        readOnly
                                        className="w-full cursor-not-allowed rounded-2xl border border-gray-200 bg-gray-100 py-3 pl-12 pr-4 text-gray-500"
                                    />
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Profile Image
                                </label>
                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-brand-primary px-5 py-3 font-semibold text-brand-primary transition hover:bg-brand-primary hover:text-white"
                                    >
                                        <Camera size={18} />
                                        Upload Image
                                    </button>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                    <input
                                        type="url"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleChange}
                                        placeholder="Or paste a direct image URL"
                                        className="min-w-0 flex-1 rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                                    />
                                </div>
                                <p className="mt-2 text-sm text-gray-500">
                                    Upload a file with imgbb or paste an image URL. Uploaded file wins when saving.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
                        <div className="mb-8 flex items-center gap-3">
                            <Briefcase className="text-brand-primary" />
                            <h2 className="text-2xl font-bold">Professional Information</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">Skills</label>
                                <input
                                    type="text"
                                    name="skills"
                                    value={formData.skills}
                                    onChange={handleChange}
                                    placeholder="React, Next.js, Node.js, MongoDB"
                                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                                />
                                <p className="mt-2 text-sm text-gray-500">Separate each skill with a comma.</p>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">GitHub Profile</label>
                                <div className="relative">
                                    <LogoGithub className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="url"
                                        name="github"
                                        value={formData.github}
                                        onChange={handleChange}
                                        placeholder="https://github.com/username"
                                        className="w-full rounded-2xl border border-gray-200 py-3 pl-12 pr-4 outline-none transition focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">Portfolio Website</label>
                                <div className="relative">
                                    <Globe
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />
                                    <input
                                        type="url"
                                        name="portfolio"
                                        value={formData.portfolio}
                                        onChange={handleChange}
                                        placeholder="https://yourportfolio.com"
                                        className="w-full rounded-2xl border border-gray-200 py-3 pl-12 pr-4 outline-none transition focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
                        <div className="mb-8 flex items-center gap-3">
                            <FileText className="text-brand-primary" />
                            <h2 className="text-2xl font-bold">About You</h2>
                        </div>
                        <textarea
                            rows={7}
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder="Tell founders and collaborators about yourself..."
                            className="w-full resize-none rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                        />
                    </div>
                </div>

                <div className="h-fit lg:sticky lg:top-8">
                    <div className="rounded-3xl border bg-white p-8 shadow-sm">
                        <div className="flex flex-col items-center">
                            <SafeAvatar
                                src={previewUrl || formData.image}
                                name={formData.name || customUser?.name}
                                alt="Preview"
                                className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg"
                            />
                            <h3 className="mt-5 text-center text-2xl font-bold">
                                {formData.name || "Your Name"}
                            </h3>
                            <p className="text-center text-gray-500">{customUser?.email}</p>
                            <span className="mt-4 rounded-full bg-brand-primary/10 px-4 py-2 text-sm font-semibold capitalize text-brand-primary">
                                {role}
                            </span>
                        </div>

                        <div className="my-8 border-t" />
                        <h3 className="text-xl font-bold">Profile Tips</h3>
                        <div className="mt-5 space-y-4">
                            {[
                                "Professional profile photo",
                                "GitHub profile",
                                "Portfolio website",
                                "Write a strong bio",
                                "Keep skills updated",
                            ].map((tip) => (
                                <div key={tip} className="flex items-start gap-3">
                                    <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                                        <Check size={14} className="text-green-600" />
                                    </div>
                                    <p className="text-sm text-gray-600">{tip}</p>
                                </div>
                            ))}
                        </div>

                        <div className="my-8 border-t" />
                        <button
                            type="submit"
                            disabled={updating}
                            className="w-full rounded-2xl bg-brand-primary py-4 text-lg font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
                        >
                            {updating ? "Saving..." : selectedFile ? "Upload & Save" : "Save Changes"}
                        </button>

                        <Link
                            href={`/dashboard/${role}/profile`}
                            className="mt-4 block text-center text-gray-500 hover:text-brand-primary"
                        >
                            Cancel
                        </Link>
                    </div>
                </div>
            </form>
        </div>
        </DashboardShell>
    );
}
