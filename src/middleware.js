import { NextResponse } from "next/server";

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

    if (!token) {
        if (pathname === "/dashboard") {
            return NextResponse.next();
        }

        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
    }

    const payload = decodeJWTPayload(token);

    if (!payload) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
    }

    const { role, isBlocked } = payload;

    if (isBlocked) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("error", "account_blocked");
        const response = NextResponse.redirect(loginUrl);
        response.cookies.delete("token");
        return response;
    }

    if (pathname === "/dashboard") {
        const correctPath = ROLE_DASHBOARD_MAP[role] ?? "/dashboard";
        return NextResponse.redirect(new URL(correctPath, request.url));
    }

    const sharedPaths = ["/dashboard/profile"];
    if (sharedPaths.some((p) => pathname.startsWith(p))) {
        return NextResponse.next();
    }

    const pathParts = pathname.split("/");
    const dashboardRoleSegment = pathParts[2];

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

