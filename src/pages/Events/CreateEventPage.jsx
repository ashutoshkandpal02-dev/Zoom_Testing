import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Search,
  User,
  BookOpen,
  CheckCircle2,
  RefreshCw,
  Repeat,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { createEvent, getCourses, getUsers } from "./services/calendarEventApiService";

/* ── Skeleton row ── */
const SkeletonRow = () => (
  <div className="p-3 rounded-xl bg-gray-100 animate-pulse flex items-center justify-between">
    <div className="space-y-1.5">
      <div className="h-3 w-32 bg-gray-200 rounded-full" />
      <div className="h-2.5 w-20 bg-gray-200 rounded-full" />
    </div>
    <div className="w-8 h-5 bg-gray-200 rounded-full" />
  </div>
);

const CreateEventPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);

  const [courseSearch, setCourseSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    startTime: "",
    endTime: "",
    isRecurring: false,
    recurrence: { frequency: "weekly", endDate: "" },
    courseIds: [],
    userIds: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setDataLoading(true);
        const [courseData, userData] = await Promise.all([getCourses(), getUsers()]);
        setCourses(courseData);
        setUsers(userData);
      } catch {
        toast.error("Failed to load data");
      } finally {
        setDataLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleSelection = (type, id) => {
    if (type === "course") {
      const updated = formData.courseIds.includes(id)
        ? formData.courseIds.filter((i) => i !== id)
        : [...formData.courseIds, id];
      setFormData({ ...formData, courseIds: updated, userIds: [] });
    }
    if (type === "user") {
      const updated = formData.userIds.includes(id)
        ? formData.userIds.filter((i) => i !== id)
        : [...formData.userIds, id];
      setFormData({ ...formData, userIds: updated, courseIds: [] });
    }
  };

  const handleCreateEvent = async () => {
    if (!formData.title || !formData.startTime || !formData.endTime) {
      toast.error("Please fill required fields");
      return;
    }
    try {
      setLoading(true);
      const payload = {
        title: formData.title,
        startTime: new Date(formData.startTime).toISOString(),
        endTime: new Date(formData.endTime).toISOString(),
        isRecurring: formData.isRecurring,
        courseIds: formData.courseIds,
        userIds: formData.userIds,
        recurrence: formData.isRecurring
          ? {
              frequency: formData.recurrence.frequency,
              interval: 1,
              endDate: formData.recurrence.endDate
                ? new Date(formData.recurrence.endDate).toISOString()
                : null,
            }
          : null,
      };
      await createEvent(payload);
      toast.success("Event scheduled successfully");
      navigate("/instructor/user-event-management");
    } catch (error) {
      toast.error(error.message || "Failed to schedule event");
    } finally {
      setLoading(false);
    }
  };

  const isCourseDisabled = formData.userIds.length > 0;
  const isUserDisabled = formData.courseIds.length > 0;

  return (
    <div className="min-h-screen bg-[#f4f6fb] p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* ── Header ── */}
        <div className="relative bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #6366f1 1px, transparent 0)`,
              backgroundSize: "28px 28px",
            }}
          />
          <div className="relative px-8 pt-6 pb-7 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition-colors"
              >
                <ArrowLeft size={16} />
              </button>
              <div>
                <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                  Schedule an Event
                </h1>
              </div>
            </div>

            <Button
              onClick={handleCreateEvent}
              disabled={loading}
              className="h-11 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md shadow-indigo-200 transition-all gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw size={15} className="animate-spin" />
                  Creating…
                </>
              ) : (
                <>
                  <CheckCircle2 size={15} />
                  Create Event
                </>
              )}
            </Button>
          </div>
        </div>

        {/* ── Event Details Card ── */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
          <div className="p-8 space-y-5">

            <div>
              <Label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">
                Event Title
              </Label>
              <Input
                placeholder="e.g. Introduction to Machine Learning"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="h-12 rounded-xl border-gray-200 bg-gray-50 focus-visible:ring-indigo-500 focus-visible:border-indigo-400 text-sm font-medium"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1.5 block">
                  <Calendar size={11} /> Start Time
                </Label>
                <Input
                  type="datetime-local"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="h-12 rounded-xl border-gray-200 bg-gray-50 focus-visible:ring-indigo-500 focus-visible:border-indigo-400 text-sm"
                />
              </div>
              <div>
                <Label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1.5 block">
                  <Clock size={11} /> End Time
                </Label>
                <Input
                  type="datetime-local"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className="h-12 rounded-xl border-gray-200 bg-gray-50 focus-visible:ring-indigo-500 focus-visible:border-indigo-400 text-sm"
                />
              </div>
            </div>

            {/* Recurring */}
            <div className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              formData.isRecurring
                ? "border-indigo-200 bg-indigo-50/50"
                : "border-gray-200 bg-gray-50"
            }`}>
              <Label
                htmlFor="recurring"
                className="flex items-center gap-3 cursor-pointer select-none p-4"
              >
                <Checkbox
                  id="recurring"
                  checked={formData.isRecurring}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isRecurring: !!checked })
                  }
                  className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                />
                <div className="flex items-center gap-2">
                  <Repeat size={15} className={formData.isRecurring ? "text-indigo-600" : "text-gray-400"} />
                  <span className={`text-sm font-semibold ${formData.isRecurring ? "text-indigo-700" : "text-gray-600"}`}>
                    Recurring Event
                  </span>
                </div>
                {formData.isRecurring && (
                  <span className="ml-auto text-xs font-medium text-indigo-500 bg-indigo-100 px-2 py-0.5 rounded-full">
                    Active
                  </span>
                )}
              </Label>

              {formData.isRecurring && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 pb-4">
                  <div>
                    <Label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">
                      Frequency
                    </Label>
                    <Select
                      value={formData.recurrence.frequency}
                      onValueChange={(val) =>
                        setFormData({
                          ...formData,
                          recurrence: { ...formData.recurrence, frequency: val },
                        })
                      }
                    >
                      <SelectTrigger className="h-11 rounded-xl border-indigo-200 bg-white focus:ring-indigo-500 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">
                      End Date
                    </Label>
                    <Input
                      type="date"
                      value={formData.recurrence.endDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          recurrence: { ...formData.recurrence, endDate: e.target.value },
                        })
                      }
                      className="h-11 rounded-xl border-indigo-200 bg-white focus-visible:ring-indigo-500 text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Audience Section ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Courses */}
          <div className={`bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden transition-opacity duration-200 ${isCourseDisabled ? "opacity-40 pointer-events-none" : ""}`}>
            <div className="h-1 w-full bg-gradient-to-r from-indigo-400 to-indigo-600" />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <BookOpen size={15} className="text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">Courses</p>
                    <p className="text-xs text-gray-400">Select course audience</p>
                  </div>
                </div>
                {formData.courseIds.length > 0 && (
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-1 rounded-full">
                    {formData.courseIds.length} selected
                  </span>
                )}
              </div>

              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                <Input
                  placeholder="Search courses…"
                  value={courseSearch}
                  onChange={(e) => setCourseSearch(e.target.value)}
                  className="pl-9 h-10 rounded-xl border-gray-200 bg-gray-50 text-sm focus-visible:ring-indigo-500"
                />
              </div>

              <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1 scrollbar-thin">
                {dataLoading ? (
                  [...Array(4)].map((_, i) => <SkeletonRow key={i} />)
                ) : courses
                    .filter((c) => c.title.toLowerCase().includes(courseSearch.toLowerCase()))
                    .map((course) => {
                      const selected = formData.courseIds.includes(course.id);
                      return (
                        <div
                          key={course.id}
                          onClick={() => toggleSelection("course", course.id)}
                          className={`p-3 rounded-xl cursor-pointer flex justify-between items-center transition-all duration-150 ${
                            selected
                              ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                              : "bg-gray-50 hover:bg-indigo-50 hover:border-indigo-100 border border-transparent"
                          }`}
                        >
                          <span className="text-sm font-medium">{course.title}</span>
                          {selected && <CheckCircle2 size={15} className="flex-shrink-0" />}
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>

          {/* Users */}
          <div className={`bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden transition-opacity duration-200 ${isUserDisabled ? "opacity-40 pointer-events-none" : ""}`}>
            <div className="h-1 w-full bg-gradient-to-r from-violet-400 to-violet-600" />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
                    <User size={15} className="text-violet-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">Users</p>
                    <p className="text-xs text-gray-400">Select individual users</p>
                  </div>
                </div>
                {formData.userIds.length > 0 && (
                  <span className="text-xs font-bold text-violet-600 bg-violet-50 border border-violet-100 px-2 py-1 rounded-full">
                    {formData.userIds.length} selected
                  </span>
                )}
              </div>

              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                <Input
                  placeholder="Search users…"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="pl-9 h-10 rounded-xl border-gray-200 bg-gray-50 text-sm focus-visible:ring-violet-500"
                />
              </div>

              <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1 scrollbar-thin">
                {dataLoading ? (
                  [...Array(4)].map((_, i) => <SkeletonRow key={i} />)
                ) : users
                    .filter((u) =>
                      `${u.first_name} ${u.last_name} ${u.email}`
                        .toLowerCase()
                        .includes(userSearch.toLowerCase())
                    )
                    .map((user) => {
                      const selected = formData.userIds.includes(user.id);
                      const role = user.user_roles?.[0]?.role || "user";
                      return (
                        <div
                          key={user.id}
                          onClick={() => toggleSelection("user", user.id)}
                          className={`p-3 rounded-xl cursor-pointer flex justify-between items-center transition-all duration-150 ${
                            selected
                              ? "bg-violet-600 text-white shadow-md shadow-violet-200"
                              : "bg-gray-50 hover:bg-violet-50 hover:border-violet-100 border border-transparent"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${
                              selected ? "bg-white/20 text-white" : "bg-violet-100 text-violet-600"
                            }`}>
                              {user.first_name?.charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium truncate">
                                {user.first_name} {user.last_name}
                              </p>
                              <p className={`text-xs truncate ${selected ? "opacity-70" : "text-gray-400"}`}>
                                {user.email}
                              </p>
                            </div>
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ml-2 font-medium ${
                            selected ? "bg-white/20 text-white" : "bg-gray-200 text-gray-600"
                          }`}>
                            {role}
                          </span>
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreateEventPage;