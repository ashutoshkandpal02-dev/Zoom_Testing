import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../../components/navbar.jsx';
import Footer from '../../components/Footer.jsx';
import AthenoraLiveHero from '../../components/Product/AthenoraLive/AthenoraLiveHero.jsx';
import AthenoraLiveEfficiency from '../../components/Product/AthenoraLive/AthenoraLiveEfficiency.jsx';
import AthenoraLiveModes from '../../components/Product/AthenoraLive/AthenoraLiveModes.jsx';
import AthenoraLiveIntelligence from '../../components/Product/AthenoraLive/AthenoraLiveIntelligence.jsx';
import AthenoraLiveAudience from '../../components/Product/AthenoraLive/AthenoraLiveAudience.jsx';
import AthenoraLivePedagogy from '../../components/Product/AthenoraLive/AthenoraLivePedagogy.jsx';
import AthenoraLiveProblem from '../../components/Product/AthenoraLive/AthenoraLiveProblem.jsx';
import AthenoraLiveStrategic from '../../components/Product/AthenoraLive/AthenoraLiveStrategic.jsx';

gsap.registerPlugin(ScrollTrigger);

const AthenoraLivePage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);

        // Kill any existing ScrollTriggers first
        ScrollTrigger.getAll().forEach(st => st.kill());

        // Force refresh after a short delay to ensure DOM is ready
        const refresh = () => {
            try {
                ScrollTrigger.refresh();
                console.log('ScrollTrigger refreshed');
            } catch (error) {
                console.warn('ScrollTrigger refresh failed:', error);
            }
        };

        // Handle page load - immediate and delayed refreshes
        refresh();

        const timers = [
            setTimeout(refresh, 50),
            setTimeout(refresh, 200),
            setTimeout(refresh, 500),
            setTimeout(refresh, 1000)
        ];

        // Also refresh on window resize
        window.addEventListener('resize', refresh);

        return () => {
            window.removeEventListener('resize', refresh);
            timers.forEach(clearTimeout);
        };
    }, []);

    return (
        <div
            className="bg-white min-h-screen relative z-10"
            style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                opacity: 1,
                visibility: 'visible'
            }}
        >
            {/* Force visibility styles for all animated elements */}
            <style>{`
                .gsap-reveal,
                .aud-header,
                .aud-card,
                .intel-header,
                .feature-pill,
                .mode-card {
                    opacity: 1 !important;
                    visibility: visible !important;
                }
            `}</style>
            <Navbar />
            <AthenoraLiveHero />
            <AthenoraLiveProblem />
            <AthenoraLiveEfficiency />
            <AthenoraLiveModes />
            <AthenoraLiveIntelligence />
            <AthenoraLivePedagogy />
            <AthenoraLiveAudience />
            {/* <AthenoraLiveStrategic /> */}
            <Footer />
        </div>
    );
};

export default AthenoraLivePage;
