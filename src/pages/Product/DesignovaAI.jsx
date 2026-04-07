import React, { useEffect } from 'react';
import Navbar from '../../components/navbar.jsx';
import Footer from '../../components/Footer.jsx';

// Components
import DesignovaAIHero from '../../components/Product/DesignovaAI/DesignovaAIHero.jsx';
import DesignovaTemplateLibrary from '../../components/Product/DesignovaAI/DesignovaTemplateLibrary.jsx';
// import SocialProofSection from '../../components/Product/DesignovaAI/SocialProofSection.jsx';
import CreateSection from '../../components/Product/DesignovaAI/CreateSection.jsx';
// import AIPoweredDesign from '../../components/Product/DesignovaAI/AIPoweredDesign.jsx';
import VideoandMotionGraphics from '../../components/Product/DesignovaAI/VideoandMotionGraphics.jsx';
import WhoIsItFor from '../../components/Product/DesignovaAI/WhoIsItFor.jsx';
// import BuiltForTeam from '../../components/Product/DesignovaAI/BuiltForTeam.jsx';
// import WhyDesignovaAISection from '../../components/Product/DesignovaAI/WhyDesignovaAISection.jsx';
import CTA from '../../components/Product/DesignovaAI/CTA.jsx';


const DesignovaAI = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white text-primary-text selection:bg-blue-100 selection:text-blue-900" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            <Navbar />
            <DesignovaAIHero />
            <DesignovaTemplateLibrary />
            <CreateSection />
            {/* <AIPoweredDesign /> */}
            <VideoandMotionGraphics />
            <WhoIsItFor />
            {/* <BuiltForTeam /> */}
            {/* <WhyDesignovaAISection /> */}
            {/* <SocialProofSection /> */}
            <CTA />
            <Footer />
        </div>
    );
};

export default DesignovaAI;
