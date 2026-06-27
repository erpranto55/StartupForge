import { NextResponse } from "next/server";

// Decode JWT payload without cryptographic verification (Edge-compatible)
// Full signature verification happens on the Express backend APIs
function decodeJWTPayload(token) {
    try {
        const base64Url = token.split(".")[1];
        if (!base64Url) return null;

        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const padded = base64.padEnd(
            base64.length + ((4 - (base64.length % 4)) % 4),
            "="
        );
        const decoded = atob(padded);
        return JSON.parse(decoded);
    } catch {
        return null;
    }
}

const ROLE_DASHBOARD_MAP = {
    founder: "/dashboard/founder",
    collaborator: "/dashboard/collaborator",
    admin: "/dashboard/admin",
};

const ROLE_SEGMENTS = new Set(["founder", "collaborator", "admin"]);

export function middleware(request) {
    const pathname = request.nextUrl.pathname;
    const token = request.cookies.get("token")?.value;

    // ── 1. No token → redirect to login ──────────────────────────────────
    if (!token) {
        const loginUrl = new URL("/login", request.url);
        // Preserve the intended destination for post-login redirect
        if (pathname !== "/dashboard") {
            loginUrl.searchParams.set("callbackUrl", pathname);
        }
        return NextResponse.redirect(loginUrl);
    }

    // ── 2. Decode payload ─────────────────────────────────────────────────
    const payload = decodeJWTPayload(token);

    // Malformed / unreadable token → force re-login
    if (!payload) {
        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect(loginUrl);
    }

    const { role, isBlocked } = payload;

    // ── 3. Blocked account → sign out and redirect ────────────────────────
    if (isBlocked) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("error", "account_blocked");
        const response = NextResponse.redirect(loginUrl);
        // Clear the token cookie
        response.cookies.delete("token");
        return response;
    }

    // ── 4. /dashboard root → let page.jsx handle the role redirect ────────
    if (pathname === "/dashboard") {
        return NextResponse.next();
    }

    // ── 5. Shared routes inside /dashboard that are role-agnostic ─────────
    const sharedPaths = ["/dashboard/profile"];
    if (sharedPaths.some((p) => pathname.startsWith(p))) {
        return NextResponse.next();
    }

    // ── 6. Role-segment mismatch → redirect to correct dashboard ──────────
    // e.g. /dashboard/admin/users  → pathParts[2] = "admin"
    const pathParts = pathname.split("/");
    const dashboardRoleSegment = pathParts[2]; // index 2 after empty string + "dashboard"

    if (
        dashboardRoleSegment &&
        ROLE_SEGMENTS.has(dashboardRoleSegment) &&
        dashboardRoleSegment !== role
    ) {
        const correctPath = ROLE_DASHBOARD_MAP[role] ?? "/dashboard";
        return NextResponse.redirect(new URL(correctPath, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
