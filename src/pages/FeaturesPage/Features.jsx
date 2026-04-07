import React from 'react'
import Navbar from '../../components/navbar.jsx';
import Footer from '../../components/Footer.jsx';
import FeatureHero from '../../components/Features/FeatureHero'
import AthenaFeatures from '../../components/Features/Feature'
import FeaturesExcellence from '../../components/Features/FeaturesExcellence'
import WorkshopSplitSection from '../../components/homepage/WorkshopSplitSection'

const Features = () => {
    return (
        <>
            <Navbar />
            <div>
                <FeatureHero />
                <AthenaFeatures />
                <FeaturesExcellence />
                <WorkshopSplitSection />
            </div>
            <Footer />
        </>
    )

}

export default Features;