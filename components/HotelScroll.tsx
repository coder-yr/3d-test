"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import Header from "./Header";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 80;
const FRAME_PATH = "/frames/Conceptual_cinematic_architectural_2026011709_";

export default function HotelScroll() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const frameRef = useRef({ index: 0 });

    // Preload images
    useEffect(() => {
        let loadedCount = 0;
        const images: HTMLImageElement[] = [];

        // Safety timeout: Forced load after 5 seconds to prevent infinite loading state
        const timeout = setTimeout(() => {
            if (!imagesLoaded) {
                console.warn("Image loading timeout - forcing show");
                setImagesLoaded(true);
            }
        }, 5000);

        for (let i = 0; i < FRAME_COUNT; i++) {
            const img = new Image();
            const paddedIndex = i.toString().padStart(3, "0");
            img.src = `${FRAME_PATH}${paddedIndex}.jpg`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === FRAME_COUNT) {
                    setImagesLoaded(true);
                    clearTimeout(timeout);
                }
            };
            img.onerror = () => {
                // Count it as loaded to avoid getting stuck
                loadedCount++;
                if (loadedCount === FRAME_COUNT) {
                    setImagesLoaded(true);
                    clearTimeout(timeout);
                }
            }
            images.push(img);
        }
        imagesRef.current = images;
        return () => clearTimeout(timeout);
    }, []);

    useGSAP(
        () => {
            // Always allow running if images are "loaded" (either real or forced by timeout)
            // verify canvas ref exists
            if (!imagesLoaded || !canvasRef.current || !containerRef.current) return;

            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            if (!context) return;

            // Initial Draw
            const render = () => {
                context.clearRect(0, 0, canvas.width, canvas.height);

                const currentIndex = Math.min(
                    FRAME_COUNT - 1,
                    Math.max(0, Math.round(frameRef.current.index))
                );
                const img = imagesRef.current[currentIndex];

                if (img && img.complete && img.naturalHeight !== 0) {
                    // "Contain" fit logic for seamless blending
                    const fitScale = Math.min(canvas.width / img.width, canvas.height / img.height);

                    const w = img.width * fitScale;
                    const h = img.height * fitScale;
                    const x = (canvas.width - w) / 2;
                    const y = (canvas.height - h) / 2;

                    context.drawImage(img, x, y, w, h);
                }
            };

            const handleResize = () => {
                const dpr = window.devicePixelRatio || 1;
                // Use container dimensions if possible, or window minus header
                // For accurate fit in the new shorter container:
                const width = window.innerWidth;
                const height = window.innerHeight - 80; // Subtract header height (5rem = 80px)

                canvas.width = width * dpr;
                canvas.height = height * dpr;
                canvas.style.width = `${width}px`;
                canvas.style.height = `${height}px`;

                context.scale(dpr, dpr);
                render();
            };

            window.addEventListener("resize", handleResize);
            handleResize();

            // Scroll Animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0,
                },
            });

            tl.to(frameRef.current, {
                index: FRAME_COUNT - 1,
                ease: "none",
                onUpdate: render,
            });

            // Text Animations
            gsap.to(".text-overlay-1", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "10px top",
                    end: "10% top",
                    scrub: true,
                },
                opacity: 0,
                y: -50,
            });

            // Scroll Indicator Fade Out
            gsap.to(".scroll-indicator", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "10px top",
                    end: "5% top",
                    scrub: true,
                },
                opacity: 0
            });

            // 35% - Entering
            gsap.fromTo(".text-overlay-2",
                { opacity: 0, x: -50 },
                {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "30% top",
                        end: "40% top",
                        scrub: true,
                        toggleActions: "play reverse play reverse"
                    },
                    opacity: 1,
                    x: 0,
                }
            );
            gsap.to(".text-overlay-2", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "50% top",
                    end: "60% top",
                    scrub: true,
                },
                opacity: 0,
            }
            );

            // 65% - Reception
            gsap.fromTo(".text-overlay-3",
                { opacity: 0, x: 50 },
                {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "60% top",
                        end: "70% top",
                        scrub: true,
                    },
                    opacity: 1,
                    x: 0,
                }
            );
            gsap.to(".text-overlay-3", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "80% top",
                    end: "85% top",
                    scrub: true,
                },
                opacity: 0,
            }
            );

            // 90% - Final
            gsap.fromTo(".text-overlay-4",
                { opacity: 0, scale: 0.9 },
                {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "88% top",
                        end: "95% top",
                        scrub: true,
                    },
                    opacity: 1,
                    scale: 1,
                }
            );

            return () => {
                window.removeEventListener("resize", handleResize);
                ScrollTrigger.getAll().forEach(t => t.kill());
            };
        },
        { scope: containerRef, dependencies: [imagesLoaded] }
    );

    return (
        <div ref={containerRef} className="relative h-[400vh] bg-[#050505] selection:bg-[#d4af37] selection:text-black">

            {/* Global Header */}
            <Header />

            {/* Loading Screen */}
            {!imagesLoaded && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505] text-white">
                    <div className="flex flex-col items-center gap-4">
                        <div className="h-full w-full animate-pulse text-2xl font-thin tracking-[0.3em] text-[#d4af37] uppercase">Logify</div>
                        <div className="text-[10px] text-white/40 uppercase tracking-[0.4em]">Loading Experience</div>
                    </div>
                </div>
            )}

            {/* Sticky Canvas Container - Adjusted for 80px (h-20) header */}
            <div className="sticky top-20 h-[calc(100vh-5rem)] w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                />

                {/* Overlays Container */}
                <div className="pointer-events-none absolute inset-0 h-full w-full">

                    {/* 0% Scroll - Centered Headline */}
                    <div className="text-overlay-1 absolute inset-0 flex flex-col items-center justify-center text-center">
                        <h1 className="text-8xl md:text-9xl font-thin tracking-tighter text-white mb-6">
                            Logify<span className="text-[#d4af37] text-2xl align-top">.</span>
                        </h1>
                        <p className="text-sm md:text-base text-white/50 font-light tracking-[0.3em] uppercase max-w-md leading-relaxed">
                            Luxury Stays<br />Redefined
                        </p>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
                        <span className="text-[10px] tracking-[0.2em] uppercase text-white/70">Explore</span>
                        <div className="w-[1px] h-12 bg-gradient-to-b from-[#d4af37] to-transparent"></div>
                    </div>

                    {/* 35% Scroll */}
                    <div className="text-overlay-2 absolute top-1/2 left-10 md:left-32 -translate-y-1/2 opacity-0 pl-8 border-l border-[#d4af37]/30">
                        <p className="text-xs text-[#d4af37] tracking-widest uppercase mb-4">The Arrival</p>
                        <h2 className="text-5xl md:text-7xl font-thin tracking-tight text-white leading-[1.1]">
                            Designed to<br /><span className="italic font-normal font-serif">Welcome</span>
                        </h2>
                    </div>

                    {/* 65% Scroll */}
                    <div className="text-overlay-3 absolute top-1/2 right-10 md:right-32 -translate-y-1/2 text-right opacity-0 pr-8 border-r border-[#d4af37]/30">
                        <p className="text-xs text-[#d4af37] tracking-widest uppercase mb-4">Interiors</p>
                        <h2 className="text-5xl md:text-7xl font-thin tracking-tight text-white leading-[1.1]">
                            Where Comfort<br /><span className="italic font-normal font-serif">Meets Care</span>
                        </h2>
                    </div>

                    {/* 90% Scroll - Final Message */}
                    <div className="text-overlay-4 absolute inset-0 flex flex-col items-center justify-center opacity-0 bg-black/40 backdrop-blur-sm">
                        <h2 className="text-4xl md:text-6xl font-thin tracking-widest text-white text-center">
                            <span className="block text-2xl text-[#d4af37] mb-6 font-serif italic">Namaste</span>
                            Welcome to Logify
                        </h2>
                        <div className="flex flex-col items-center gap-2 mt-8">
                            <p className="text-[10px] text-white/50 uppercase tracking-[0.3em]">Scroll for more</p>
                            <div className="w-[1px] h-8 bg-white/20"></div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
