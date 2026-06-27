"use client";

export default function SafeAvatar({
    src,
    name = "User",
    className = "",
    alt = "Avatar",
}) {
    const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name || "User"
    )}&background=A62BA6&color=fff&bold=true`;

    const imageSrc = typeof src === "string" && src.trim() ? src.trim() : fallback;

    return (
        <img
            src={imageSrc}
            alt={alt}
            className={className}
            referrerPolicy="no-referrer"
            onError={(event) => {
                if (event.currentTarget.src !== fallback) {
                    event.currentTarget.src = fallback;
                }
            }}
        />
    );
}
