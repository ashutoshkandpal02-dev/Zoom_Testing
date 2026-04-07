import React, { useEffect } from 'react';
import Navbar from '../../components/navbar.jsx';
import Footer from '../../components/Footer.jsx';

// Components
import Hero from './Hero.jsx'
import Workshop from './Workshop.jsx'
import AboutLE from './AboutLE.jsx'
import MeettheHost from './MeettheHost.jsx'
import CTA from './CTA.jsx'
import WorkshopFormSection from './WorkshopFormSection.jsx'

const WorkshopPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white text-primary-text selection:bg-blue-100 selection:text-blue-900" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            <Navbar />
            <Hero />
            <Workshop />
            <AboutLE />
            <MeettheHost />
            <CTA />
            <WorkshopFormSection />
            <Footer />
        </div>
    );
};

export default WorkshopPage;

