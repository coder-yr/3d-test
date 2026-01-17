"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const suites = [
    { name: "The Royal Suite", desc: "A sanctuary of gold and velvet.", price: "From ₹45,000" },
    { name: "Ocean Panorama", desc: "Wake up to infinity.", price: "From ₹32,000" },
    { name: "Garden Villa", desc: "Nature's private embrace.", price: "From ₹28,000" },
];

export default function LuxurySections() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // Reveal animations for sections
            const sections = gsap.utils.toArray<HTMLElement>(".reveal-section");

            sections.forEach((section) => {
                gsap.fromTo(
                    section,
                    { opacity: 0, y: 100 },
                    {
                        scrollTrigger: {
                            trigger: section,
                            start: "top 80%",
                            end: "top 50%",
                            scrub: 1,
                        },
                        opacity: 1,
                        y: 0,
                    }
                );
            });

            // Horizontal text move
            gsap.to(".marquee-text", {
                xPercent: -20,
                ease: "none",
                scrollTrigger: {
                    trigger: ".marquee-container",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });

        },
        { scope: containerRef }
    );

    return (
        <div ref={containerRef} className="relative z-10 bg-[#050505] text-white">

            {/* Spacer to separate from scrolling canvas if needed, though scrollytelling ends cleanly */}

            {/* Marquee Section */}
            <div className="marquee-container py-32 overflow-hidden border-t border-white/5">
                <h2 className="marquee-text text-[12vw] font-thin whitespace-nowrap leading-none tracking-tighter text-white/5 uppercase select-none">
                    Luxury Redefined &nbsp;—&nbsp; Logify Hospitality &nbsp;—&nbsp;
                </h2>
            </div>

            {/* SUITES SECTION */}
            <section id="suites" className="reveal-section px-8 md:px-20 py-32 border-t border-white/5">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20">
                    <div>
                        <span className="block text-[#d4af37] text-xs tracking-[0.3em] uppercase mb-4">Accommodations</span>
                        <h3 className="text-5xl md:text-7xl font-thin tracking-tight">
                            Curated <span className="font-serif italic text-white/80">Stays</span>
                        </h3>
                    </div>
                    <button className="hidden md:block border border-white/20 px-8 py-3 text-xs tracking-widest hover:bg-white hover:text-black transition-colors uppercase">
                        View All Suites
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {suites.map((suite, i) => (
                        <div key={i} className="group relative overflow-hidden bg-white/5 aspect-[3/4] cursor-pointer hover:bg-white/10 transition-colors duration-500">
                            {/* Placeholder for Suite Image */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60"></div>

                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <h4 className="text-2xl font-light mb-2">{suite.name}</h4>
                                <p className="text-white/60 text-sm font-light mb-4">{suite.desc}</p>
                                <div className="flex justify-between items-center border-t border-white/10 pt-4">
                                    <span className="text-[#d4af37] text-xs tracking-widest">{suite.price}</span>
                                    <span className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 text-xs tracking-widest uppercase">Explore</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* DINING & WELLNESS SPLIT */}
            <section id="dining" className="reveal-section grid grid-cols-1 md:grid-cols-2 min-h-screen border-t border-white/5">
                {/* Dining */}
                <div className="relative p-12 md:p-24 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/5 hover:bg-white/[0.02] transition-colors duration-700">
                    <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase mb-6">Culinary</span>
                    <h3 className="text-6xl font-thin tracking-tight mb-8">
                        The <span className="font-serif italic">Grand</span> Table
                    </h3>
                    <p className="text-white/60 max-w-md font-light leading-relaxed mb-12">
                        An experiential journey of flavors. Savor authentic ingredients sourced from local artisans, crafted into masterpieces.
                    </p>
                    <button className="self-start text-xs tracking-[0.2em] uppercase border-b border-[#d4af37] pb-1 hover:text-[#d4af37] transition-colors">
                        Discover Menus
                    </button>
                </div>

                {/* Wellness */}
                <div id="wellness" className="relative p-12 md:p-24 flex flex-col justify-center hover:bg-white/[0.02] transition-colors duration-700">
                    <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase mb-6">Wellness</span>
                    <h3 className="text-6xl font-thin tracking-tight mb-8">
                        Serenity <span className="font-serif italic">Spa</span>
                    </h3>
                    <p className="text-white/60 max-w-md font-light leading-relaxed mb-12">
                        Rejuvenate your senses with ancient therapies designed to restore balance and harmony to your body and soul.
                    </p>
                    <button className="self-start text-xs tracking-[0.2em] uppercase border-b border-[#d4af37] pb-1 hover:text-[#d4af37] transition-colors">
                        Book Therapy
                    </button>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="px-8 md:px-20 py-24 border-t border-white/10 flex flex-col items-center text-center">
                <h2 className="text-[15vw] leading-none font-thin opacity-10 select-none">LOGIFY</h2>
                <div className="mt-12 flex flex-col md:flex-row gap-8 md:gap-24 text-xs tracking-[0.2em] uppercase text-white/50">
                    <a href="#" className="hover:text-white transition-colors">Instagram</a>
                    <a href="#" className="hover:text-white transition-colors">Twitter</a>
                    <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                </div>
                <p className="mt-24 text-[10px] text-white/20 tracking-widest">
                    © {new Date().getFullYear()} Logify Hospitality. All Rights Reserved.
                </p>
            </footer>

        </div>
    );
}
