import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAttendanceReport } from './services/calendarEventApiService';
import { FaArrowLeft, FaUsers, FaUserCheck, FaUserTimes, FaPercentage } from 'react-icons/fa';
import { format } from 'date-fns';

const AttendanceReportPage = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (eventId) fetchReport();
    }, [eventId]);

    const fetchReport = async () => {
        try {
            setLoading(true);
            const data = await getAttendanceReport(eventId);
            setReport(data);
        } catch (error) {
            console.error('Failed to fetch attendance report:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#f4f6fb] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-full border-[3px] border-indigo-100 border-t-indigo-600 animate-spin" />
                <p className="text-sm text-gray-400 font-medium">Loading report…</p>
            </div>
        </div>
    );

    if (!report) return (
        <div className="min-h-screen bg-[#f4f6fb] flex items-center justify-center">
            <p className="text-gray-400 text-sm">Report details not found.</p>
        </div>
    );

    const stats = [
        {
            label: 'Total Scheduled',
            value: report.stats.totalScheduled,
            icon: FaUsers,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50',
            border: 'border-indigo-100',
            bar: 'bg-indigo-400',
        },
        {
            label: 'Total Present',
            value: report.stats.totalPresent,
            icon: FaUserCheck,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
            border: 'border-emerald-100',
            bar: 'bg-emerald-400',
        },
        {
            label: 'Total Absent',
            value: report.stats.totalAbsent,
            icon: FaUserTimes,
            color: 'text-rose-600',
            bg: 'bg-rose-50',
            border: 'border-rose-100',
            bar: 'bg-rose-400',
        },
        {
            label: 'Attendance Rate',
            value: `${report.stats.attendancePercentage}%`,
            icon: FaPercentage,
            color: 'text-violet-600',
            bg: 'bg-violet-50',
            border: 'border-violet-100',
            bar: 'bg-violet-400',
        },
    ];

    return (
        <div className="min-h-screen bg-[#f4f6fb] p-6 md:p-10">

            {/* ── Hero Header Card ── */}
            <div className="relative bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden mb-8">
                <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
                <div
                    className="absolute inset-0 opacity-[0.025] pointer-events-none"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, #6366f1 1px, transparent 0)`,
                        backgroundSize: '28px 28px',
                    }}
                />
                <div className="relative px-8 pt-6 pb-8">
                    <button
                        onClick={() => navigate('/instructor/user-event-management')}
                        className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 mb-6 transition-colors group w-fit"
                    >
                        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-indigo-50 group-hover:bg-indigo-100 transition-colors">
                            <FaArrowLeft size={11} />
                        </span>
                        Back to Events
                    </button>

                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4 mt-2">
                        {report.eventTitle}
                    </h2>

                    <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-sm text-gray-600 font-medium">
                            📅 {format(new Date(report.startTime), 'MMMM do, yyyy')}
                        </span>
                        <span className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-sm text-gray-600 font-medium">
                            🕐 {format(new Date(report.startTime), 'hh:mm a')} – {format(new Date(report.endTime), 'hh:mm a')}
                        </span>
                    </div>
                </div>
            </div>

            {/* ── Stats Grid ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className={`bg-white rounded-2xl border ${stat.border} shadow-sm p-5 flex flex-col gap-4 hover:shadow-md transition-shadow`}
                    >
                        <div className="flex items-center justify-between">
                            <div className={`w-11 h-11 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                                <stat.icon size={20} />
                            </div>
                            <p className={`text-3xl font-extrabold ${stat.color}`}>{stat.value}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                            <div className={`mt-2 h-1 rounded-full ${stat.bg}`}>
                                <div className={`h-1 rounded-full ${stat.bar} w-2/3`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Participants Table ── */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                {/* accent bar */}
                <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

                {/* table header */}
                <div className="px-6 py-5 flex items-center justify-between border-b border-gray-100">
                    <div>
                        <h3 className="font-bold text-gray-900 text-base">Participant Details</h3>
                        <p className="text-xs text-gray-400 mt-0.5">All registered attendees for this session</p>
                    </div>
                    <span className="px-3 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full border border-indigo-100 uppercase tracking-wider">
                        {report.participants.length} Records
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-6 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Name</th>
                                <th className="px-6 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Email</th>
                                <th className="px-6 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Join Time</th>
                                <th className="px-6 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {report.participants.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50/80 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {/* avatar initial */}
                                            <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0">
                                                <span className="text-xs font-bold text-indigo-600">
                                                    {user.name?.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <span className="text-sm font-semibold text-gray-900">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                                    <td className="px-6 py-4 text-sm text-gray-400 font-medium">
                                        {user.joinTime ? format(new Date(user.joinTime), 'hh:mm a') : '—'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                                            user.status === 'Present'
                                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                                : 'bg-rose-50 text-rose-700 border border-rose-100'
                                        }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${
                                                user.status === 'Present' ? 'bg-emerald-500' : 'bg-rose-500'
                                            }`} />
                                            {user.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* table footer */}
                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                    <p className="text-xs text-gray-400">
                        Showing <span className="font-semibold text-gray-600">{report.participants.length}</span> participants
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AttendanceReportPage;