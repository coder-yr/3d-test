"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useRef } from "react";

export default function Header() {
    const headerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from(headerRef.current, {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.5,
        });
    }, { scope: headerRef });

    return (
        <header
            ref={headerRef}
            className="fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between bg-[#050505] px-8 py-0 shadow-lg shadow-black/20"
        >
            {/* Logo */}
            <Link href="/" className="text-2xl font-light tracking-[0.2em] text-[#d4af37] uppercase z-50">
                Logify
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-12">
                {["Suites", "Dining", "Wellness", "Offers"].map((item) => (
                    <Link
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="text-sm font-light tracking-widest text-white/80 hover:text-[#d4af37] transition-colors uppercase"
                    >
                        {item}
                    </Link>
                ))}
                <button className="border border-white/20 px-8 py-3 text-xs tracking-widest text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all duration-300 uppercase">
                    Book Stay
                </button>
            </nav>

            {/* Mobile Menu Toggle (Visual only for now) */}
            <button className="md:hidden text-white group flex flex-col gap-1.5 p-2">
                <span className="block w-6 h-[1px] bg-white group-hover:bg-[#d4af37] transition-colors"></span>
                <span className="block w-4 h-[1px] bg-white group-hover:bg-[#d4af37] transition-colors ml-auto"></span>
            </button>
        </header>
    );
}
