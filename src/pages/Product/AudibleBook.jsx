import React, { useEffect } from 'react';
import Navbar from '../../components/navbar.jsx';
import Footer from '../../components/Footer.jsx';

// Components
import EbookHero from '../../components/Product/Ebook/EbookHero.jsx';
// import EbookFeaturesHighlights from '../../components/Product/Ebook/EbookFeaturesHighlights.jsx';
import EbookFeatureDetail from '../../components/Product/Ebook/EbookFeatureDetail.jsx';
import EbookAudience from '../../components/Product/Ebook/EbookAudience.jsx';

const AudibleBook = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white text-primary-text selection:bg-blue-100 selection:text-blue-900" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            <Navbar />
            <EbookHero />
            {/* <EbookFeaturesHighlights /> */}
            <EbookFeatureDetail />
            <EbookAudience />
            <Footer />
        </div>
    );
};

export default AudibleBook;
