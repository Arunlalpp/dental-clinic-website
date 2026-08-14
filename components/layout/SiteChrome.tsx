"use client";

import { type ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FloatingActionBar from "./FloatingActionBar";
import Loader from "./Loader";
import CustomCursor from "@/components/ui/CustomCursor";

/**
 * Wraps every page with the persistent chrome. Kept as one client component so
 * the server layout stays lean. `pb-[env(safe-area)]` room for the mobile bar
 * is added per-section where needed; the footer already clears it.
 */
export default function SiteChrome({ children }: { children: ReactNode }) {
    return (
        <>
            <Loader />
            <CustomCursor />
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <FloatingActionBar />
            {/* spacer so the fixed mobile bar never covers footer content */}
            <div className="h-16 lg:hidden" aria-hidden />
        </>
    );
}
