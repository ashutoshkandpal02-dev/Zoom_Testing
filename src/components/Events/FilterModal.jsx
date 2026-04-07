import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

/* ─── single blue palette ───────────────────────────────────── */
const P = {
  50:  '#eef2ff',
  100: '#e0e7ff',
  200: '#c7d2fe',
  400: '#818cf8',
  600: '#4f46e5',
  800: '#3730a3',
};
const MONTHS = [
  { value: '0',  label: 'January' },
  { value: '1',  label: 'February' },
  { value: '2',  label: 'March' },
  { value: '3',  label: 'April' },
  { value: '4',  label: 'May' },
  { value: '5',  label: 'June' },
  { value: '6',  label: 'July' },
  { value: '7',  label: 'August' },
  { value: '8',  label: 'September' },
  { value: '9',  label: 'October' },
  { value: '10', label: 'November' },
  { value: '11', label: 'December' },
];

const FilterModal = ({ isOpen, onClose, onApply, currentFilters }) => {
  const [selectedMonth, setSelectedMonth] = useState(currentFilters.month || 'all');

  useEffect(() => {
    setSelectedMonth(currentFilters.month || 'all');
  }, [currentFilters, isOpen]);

  const handleApply = () => {
    onApply({ course: 'all', month: selectedMonth });
    onClose();
  };

  const handleClear = () => {
    setSelectedMonth('all');
    onApply({ course: 'all', month: 'all' });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] rounded-2xl p-0 overflow-hidden gap-0">
        {/* header */}
        <DialogHeader className="px-6 pt-6 pb-4" style={{ borderBottom: `1px solid ${P[50]}` }}>
          <DialogTitle className="text-[16px] font-medium text-gray-900">
            Filter by month
          </DialogTitle>
          <p className="text-[13px] text-gray-400 mt-0.5">
            Select a month to narrow down sessions
          </p>
        </DialogHeader>

        {/* month grid */}
        <div className="px-6 py-5">
          {/* All months chip */}
          <button
            onClick={() => setSelectedMonth('all')}
            className="w-full text-left text-[13px] font-medium rounded-xl px-4 py-2.5 mb-3 transition-all"
            style={{
              background: selectedMonth === 'all' ? P[600] : P[50],
              color: selectedMonth === 'all' ? '#fff' : P[600],
              border: `1px solid ${selectedMonth === 'all' ? P[600] : P[100]}`,
            }}
          >
            All months
          </button>

          {/* 3-column month grid */}
          <div className="grid grid-cols-3 gap-2">
            {MONTHS.map((m) => {
              const active = selectedMonth === m.value;
              return (
                <button
                  key={m.value}
                  onClick={() => setSelectedMonth(m.value)}
                  className="text-[13px] font-medium rounded-xl py-2.5 transition-all"
                  style={{
                    background: active ? P[600] : P[50],
                    color: active ? '#fff' : P[800],
                    border: `1px solid ${active ? P[600] : P[100]}`,
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = P[100];
                      e.currentTarget.style.borderColor = P[200];
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = P[50];
                      e.currentTarget.style.borderColor = P[100];
                    }
                  }}
                >
                  {m.label.slice(0, 3)}
                </button>
              );
            })}
          </div>
        </div>

        {/* footer */}
        <DialogFooter
          className="px-6 pb-6 pt-4 flex gap-3 sm:gap-3"
          style={{ borderTop: `1px solid ${P[50]}` }}
        >
          <button
            onClick={handleClear}
            className="flex-1 rounded-xl py-2.5 text-[13px] font-medium transition-all"
            style={{
              background: 'transparent',
              color: P[600],
              border: `1px solid ${P[200]}`,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = P[50]; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            Clear
          </button>
          <button
            onClick={handleApply}
            className="flex-1 rounded-xl py-2.5 text-[13px] font-medium text-white transition-all"
            style={{ background: P[600] }}
            onMouseEnter={(e) => { e.currentTarget.style.background = P[800]; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = P[600]; }}
          >
            Apply
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;