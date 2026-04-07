import React, { useEffect } from 'react';
import Navbar from '../../components/navbar.jsx';
import Footer from '../../components/Footer.jsx';

// Components
import Hero from '../../components/Product/AthenaLMS/Hero.jsx';
import DashboardOverview from '../../components/Product/AthenaLMS/DashboardOverview.jsx';
// import CourseandLearning from '../../components/Product/AthenaLMS/CourseandLearning.jsx';
import CommunityEngagement from '../../components/Product/AthenaLMS/CommunityandEngagement.jsx';
import Attendance from '../../components/Product/AthenaLMS/Attendance.jsx';
import Sponsor from '../../components/Product/AthenaLMS/Sponsor.jsx';
import Support from '../../components/Product/AthenaLMS/Support.jsx';
import CTA from '../../components/Product/AthenaLMS/CTA.jsx';



const AthenaLMS = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white text-primary-text selection:bg-blue-100 selection:text-blue-900" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            <Navbar />
            <Hero />
            <DashboardOverview />
            {/* <CourseandLearning /> */}
            <CommunityEngagement />
            <Attendance />
            <Sponsor />
            <Support />
            <CTA />
            <Footer />
        </div>
    );
};

export default AthenaLMS;
