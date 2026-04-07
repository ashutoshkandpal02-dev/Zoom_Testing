import React, { useLayoutEffect } from 'react';
import Navbar from '../../components/navbar.jsx';
import Footer from '../../components/Footer.jsx';
import CourseCreatorHero from '../../components/Product/CourseCreator/CourseCreatorHero.jsx';
import CourseCreatorPedagogy from '../../components/Product/CourseCreator/CourseCreatorPedagogy.jsx';
import CourseCreatorWorkflow from '../../components/Product/CourseCreator/CourseCreatorWorkflow.jsx';
import CourseCreatorEditor from '../../components/Product/CourseCreator/CourseCreatorEditor.jsx';
import CourseCreatorAudience from '../../components/Product/CourseCreator/CourseCreatorAudience.jsx';
import CourseCreatorPricing from '../../components/Product/CourseCreator/CourseCreatorPricing.jsx';

const CourseCreatorPage = () => {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div
            className="bg-white min-h-screen relative z-10"
            style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
            }}
        >
            <Navbar />
            <CourseCreatorHero />
            <CourseCreatorPedagogy />
            <CourseCreatorWorkflow />
            {/* <CourseCreatorEditor /> */}
            <CourseCreatorAudience />
            {/* <CourseCreatorPricing /> */}
            <Footer />
        </div>
    );
};

export default CourseCreatorPage;
