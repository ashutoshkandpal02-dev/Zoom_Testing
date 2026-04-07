import React, { useEffect } from 'react';
import Navbar from '../../components/navbar.jsx';
import Footer from '../../components/Footer.jsx';

// Components
import Hero from '../../components/Product/Buildora/Hero.jsx';
import PlatformOverview from '../../components/Product/Buildora/PlatformOverview.jsx';
import CustomWebsite from '../../components/Product/Buildora/CustomWebsite.jsx';
// import CoreFunction from '../../components/Product/Buildora/CoreFunction.jsx';
import AdminandScalability from '../../components/Product/Buildora/AdminandScalability.jsx';
import Workflow from '../../components/Product/Buildora/Workflow.jsx';
import WhoitsFor from '../../components/Product/Buildora/WhoitsFor.jsx';


const Buildora = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white text-[#001D3D] selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
            <Navbar />
            <Hero />
            <PlatformOverview />
            <CustomWebsite />
            {/* <AdminandScalability /> */}
            <Workflow />
            <WhoitsFor />
            <Footer />
        </div>
    );
};

export default Buildora;
