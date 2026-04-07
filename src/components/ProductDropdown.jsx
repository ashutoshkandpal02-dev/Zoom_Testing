import React, { useState, useRef, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export const productItems = [
    {
        title: "AI Powered Course Creation",
        slug: "course-creator",
        description: "Design complete, interaction-rich learning experiences in 15 minutes.",
        color: "#3b82f6"
    },
    {
        title: "Designova AI",
        slug: "designova",
        description: "Design stunning learning visuals and assets instantly.",
        color: "#10b981"
    },
    {
        title: "Athenora Live",
        slug: "athenora-live",
        description: "Live training guided by personalized AI avatars.",
        color: "#8b5cf6"
    },
    {
        title: "E-Book Athena",
        slug: "audible-book",
        description: "Transform static PDFs into interactive digital books.",
        color: "#f59e0b"
    },
    {
        title: "Operon AI: ChatBot Agent",
        slug: "operon",
        description: "Enterprise-grade AI for Sales, Support, and Operations.",
        color: "#10b981"
    },
    {
        title: "Athena LMS",
        slug: "athena-lms",
        description: "AI-powered learning management and experience platform.",
        color: "#06b6d4"
    },
    {
        title: "Buildora",
        slug: "buildora",
        description: "Launch branded academies and portals without code.",
        color: "#f43f5e"
    },
    {
        title: "Athena Payment Gateway",
        slug: "athena-payment",
        description: "Secure, private, and integrated payment processing.",
        color: "#f59e0b"
    }
];

const ProductDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = event => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div
            className="relative"
            ref={dropdownRef}
            style={{ position: 'relative' }}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="product-button flex items-center gap-1 text-white font-semibold text-lg transition-all duration-200 relative"
                style={{
                    color: '#fff',
                    fontWeight: '600',
                    fontSize: '1.1rem',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    padding: '6px 0',
                    position: 'relative',
                }}
            >
                Product
                {isOpen ? (
                    <ChevronUp className="w-4 h-4" />
                ) : (
                    <ChevronDown className="w-4 h-4" />
                )}
            </button>

            {isOpen && (
                <div className="fixed top-[64px] left-0 w-screen bg-white shadow-2xl border-t border-gray-100 overflow-hidden z-50 product-dropdown">
                    <div className="flex flex-col lg:flex-row">
                        {/* Left Column - Core Intelligence */}
                        <div className="flex-1 p-6 lg:p-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">
                                Core Intelligence
                            </h3>
                            <div className="flex flex-col gap-6">
                                {productItems.slice(0, 4).map((item, idx) => (
                                    <Link
                                        key={idx}
                                        to={`/product/${item.slug}`}
                                        onClick={() => setIsOpen(false)}
                                        className="block group cursor-pointer p-3 rounded-lg transition-all duration-200 hover:bg-blue-50"
                                    >
                                        <h4 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                            {item.title}
                                        </h4>
                                        <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                                            {item.description}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Middle Column - Experience & Design */}
                        <div className="flex-1 p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">
                                Experience & Design
                            </h3>
                            <div className="flex flex-col gap-6">
                                {productItems.slice(4, 8).map((item, idx) => (
                                    <Link
                                        key={idx}
                                        to={`/product/${item.slug}`}
                                        onClick={() => setIsOpen(false)}
                                        className="block group cursor-pointer p-3 rounded-lg transition-all duration-200 hover:bg-blue-50"
                                    >
                                        <h4 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                            {item.title}
                                        </h4>
                                        <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                                            {item.description}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Right Column - Featured Section (matching Solutions/Platform) */}
                        <div className="w-full lg:w-80 bg-gradient-to-br from-blue-50 to-indigo-100 p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-gray-200">
                            <div className="mb-6">
                                <img
                                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop"
                                    alt="Athena Product Ecosystem"
                                    className="w-full h-32 object-cover rounded-lg shadow-sm"
                                />
                            </div>
                            <div className="mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-lg font-bold text-gray-900">ATHENA</span>
                                    <span className="px-3 py-1 bg-blue-600 text-white text-sm font-bold rounded-full">
                                        Intelligence
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                                    Discover how our specialized AI modules work together to transform your enterprise learning strategy.
                                </p>
                                {/* <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        window.location.href = '/product/athena-ecosystem';
                                    }}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors group"
                                >
                                    Explore Ecosystem
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </button> */}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDropdown;

if (typeof window !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
    .product-dropdown {
      animation: fadeIn 0.2s ease-out;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .product-button:hover {
      color: #e0f0ff !important;
    }
    
    .product-button::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: #e0f0ff;
      transition: width 0.3s ease;
    }
    
    .product-button:hover::after {
      width: 100%;
    }

    .product-dropdown {
      position: fixed !important;
      left: 0 !important;
      right: 0 !important;
      width: 100vw !important;
      max-width: 100vw !important;
      border-radius: 0 !important;
      top: 64px !important;
    }
  `;
    document.head.appendChild(style);
}
