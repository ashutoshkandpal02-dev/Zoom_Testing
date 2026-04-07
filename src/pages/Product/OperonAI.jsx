import React, { useLayoutEffect } from 'react';
import Navbar from '../../components/navbar.jsx';
import Footer from '../../components/Footer.jsx';
import OperonAIHero from '../../components/Product/OperonAI/OperonAIHero.jsx';
import OperonAIFunctions from '../../components/Product/OperonAI/OperonAIFunctions.jsx';
import OperonAIImpact from '../../components/Product/OperonAI/OperonAIImpact.jsx';
import OperonAIWorkforce from '../../components/Product/OperonAI/OperonAIWorkforce.jsx';
import OperonAIAudience from '../../components/Product/OperonAI/OperonAIAudience.jsx';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const OperonAIPage = () => {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);

        // Multiple refreshes to catch async content/images
        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener('load', refresh);

        const timers = [
            setTimeout(refresh, 100),
            setTimeout(refresh, 500),
            setTimeout(refresh, 1500),
            setTimeout(refresh, 3000)
        ];

        return () => {
            window.removeEventListener('load', refresh);
            timers.forEach(clearTimeout);
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);

    return (
        <div className="bg-white min-h-screen relative z-10 selection:bg-blue-100 selection:text-blue-900" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            <Navbar />
            <OperonAIHero />
            <OperonAIImpact />
            <OperonAIWorkforce />
            <OperonAIFunctions />

            <OperonAIAudience />
            <Footer />
        </div>
    );
};

export default OperonAIPage;
