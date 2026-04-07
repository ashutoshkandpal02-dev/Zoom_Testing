import React, { useState } from 'react';
import UpcomingEvents from '@/components/Events/UpcomingEvents';
import AllEvents from '@/components/Events/AllEvents';
import Recordings from '@/components/Events/Recordings';
import { Search, Filter, X, Calendar, Video, LayoutGrid } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FilterModal from '@/components/Events/FilterModal';

const TABS = [
  { id: 'upcoming', label: 'Upcoming', icon: Calendar },
  { id: 'all', label: 'All Events', icon: LayoutGrid },
  { id: 'recordings', label: 'Recordings', icon: Video },
];

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    course: 'all',
    month: 'all',
  });

  const handleApplyFilter = (filters) => {
    setActiveFilters(filters);
  };

  const clearFilters = () => {
    setActiveFilters({ course: 'all', month: 'all' });
    setSearchTerm('');
  };

  const hasActiveFilters =
    activeFilters.course !== 'all' || activeFilters.month !== 'all' || searchTerm !== '';

  return (
    <div className="min-h-screen bg-[#f4f6fb] p-6 md:p-10 font-sans">

      {/* ── Header ── */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-700 tracking-tight leading-tight">
          My Events
        </h1>
        <p className="mt-1.5 text-gray-400 text-sm">
          Browse, join, and revisit your learning sessions.
        </p>
      </div>

      {/* ── Tabs + Search/Filter Row ── */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5 mb-8">

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-200 p-1 rounded-2xl w-fit shadow-sm">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-4 h-4" strokeWidth={activeTab === id ? 2.5 : 2} />
              {label}
            </button>
          ))}
        </div>

        {/* Search + Filter */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 min-w-[260px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            <Input
              placeholder="Search events..."
              className="pl-10 h-11 bg-white border-gray-200 rounded-xl shadow-sm focus-visible:ring-indigo-500 focus-visible:border-indigo-400 text-sm text-gray-700 placeholder:text-gray-400 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Button
            variant="outline"
            className={`h-11 px-5 gap-2 rounded-xl text-sm font-semibold border shadow-sm transition-all duration-200 ${
              hasActiveFilters
                ? 'bg-indigo-50 border-indigo-300 text-indigo-600 hover:bg-indigo-100'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setIsFilterOpen(true)}
          >
            <Filter className={`w-4 h-4 ${hasActiveFilters ? 'fill-indigo-600' : ''}`} />
            Filter
            {hasActiveFilters && (
              <span className="ml-1 flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
            )}
          </Button>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              title="Clear filters"
              className="h-11 w-11 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 shadow-sm transition-all duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* ── Active Filter Pills ── */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mb-6">
          {searchTerm && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium">
              Search: <span className="font-semibold">"{searchTerm}"</span>
              <button onClick={() => setSearchTerm('')} className="ml-1 hover:text-indigo-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {activeFilters.course !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium">
              Course: <span className="font-semibold">{activeFilters.course}</span>
              <button
                onClick={() => setActiveFilters((f) => ({ ...f, course: 'all' }))}
                className="ml-1 hover:text-indigo-900"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {activeFilters.month !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium">
              Month: <span className="font-semibold">{activeFilters.month}</span>
              <button
                onClick={() => setActiveFilters((f) => ({ ...f, month: 'all' }))}
                className="ml-1 hover:text-indigo-900"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* ── Content Card ── */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden min-h-[520px]">
        {/* Card top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

        <div className="p-8">
          {activeTab === 'upcoming' && (
            <UpcomingEvents searchTerm={searchTerm} filters={activeFilters} />
          )}
          {activeTab === 'all' && (
            <AllEvents searchTerm={searchTerm} filters={activeFilters} />
          )}
          {activeTab === 'recordings' && (
            <Recordings searchTerm={searchTerm} filters={activeFilters} />
          )}
        </div>
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApplyFilter}
        currentFilters={activeFilters}
      />
    </div>
  );
};

export default EventsPage;