import React from 'react';

const AthenoraLiveProblem = () => {
    return (
        <section className="py-20 bg-white relative overflow-hidden" style={{ fontFamily: 'Georgia, serif' }}>
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block underline underline-offset-8 decoration-blue-200">The Challenge</span>
                    <h2 className="text-4xl md:text-6xl font-medium text-slate-900 tracking-tighter mb-8">
                        Scaling <span className="italic text-slate-400">Education.</span>
                    </h2>
                    <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto">
                        Traditional education doesn't scale. Quality instruction is limited by human capacity and time.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AthenoraLiveProblem;