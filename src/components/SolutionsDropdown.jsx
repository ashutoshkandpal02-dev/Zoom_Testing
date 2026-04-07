import React, { useState, useRef, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const SolutionsDropdown = () => {
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
        className="solutions-button flex items-center gap-1 text-white font-semibold text-lg transition-all duration-200 relative"
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
        Solutions
        {isOpen ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 mt-2 w-72 bg-white shadow-xl border border-gray-100 rounded-2xl overflow-hidden z-50 solutions-dropdown"
          style={{ position: 'absolute' }}
        >
          <div className="p-4 flex flex-col gap-2">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-1">Athena LMS for</div>
            <a href="/academic_athena" className="block p-3 rounded-xl hover:bg-blue-50 transition-colors group">
              <div className="text-sm font-bold text-gray-900 group-hover:text-blue-600">Academies</div>
            </a>
            <a href="/company_athena" className="block p-3 rounded-xl hover:bg-blue-50 transition-colors group">
              <div className="text-sm font-bold text-gray-900 group-hover:text-blue-600">Companies</div>
            </a>
            <a href="/expert_athena" className="block p-3 rounded-xl hover:bg-blue-50 transition-colors group">
              <div className="text-sm font-bold text-gray-900 group-hover:text-blue-600">Experts</div>
            </a>

            <div className="h-px bg-gray-100 my-2" />

            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-1">Solutions for</div>
            <a href="/revenue_generation" className="block p-3 rounded-xl hover:bg-blue-50 transition-colors group">
              <div className="text-sm font-bold text-gray-900 group-hover:text-blue-600">Revenue generation</div>
            </a>
            <a href="/customer_training" className="block p-3 rounded-xl hover:bg-blue-50 transition-colors group">
              <div className="text-sm font-bold text-gray-900 group-hover:text-blue-600">Customer training</div>
            </a>
            <a href="/lead_generation" className="block p-3 rounded-xl hover:bg-blue-50 transition-colors group">
              <div className="text-sm font-bold text-gray-900 group-hover:text-blue-600">Lead generation</div>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default SolutionsDropdown;

if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.id = 'solutions-dropdown-styles';
  if (!document.getElementById(style.id)) {
    style.textContent = `
        .solutions-dropdown {
          animation: dropdownFade 0.2s ease-out;
          transform-origin: top left;
        }
        
        @keyframes dropdownFade {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        .solutions-button:hover { color: #e0f0ff !important; }
        .solutions-button::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: #e0f0ff;
          transition: width 0.3s ease;
        }
        .solutions-button:hover::after { width: 100%; }
      `;
    document.head.appendChild(style);
  }
}
