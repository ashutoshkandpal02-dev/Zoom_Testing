import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import {
  Book,
  ChevronLeft,
  ChevronRight,
  Home,
  Users,
  MessageSquare,
  HelpCircle,
  FileQuestion,
  Contact,
  ChevronDown,
  Gamepad2,
  GraduationCap,
  Library,
  Bot,
  CreditCard,
  CalendarDays,
  Handshake,
  Snowflake,
  Megaphone,
  UserCheck,
} from 'lucide-react';
import { currentUserId } from '@/data/currentUser';
import { getUserRole } from '@/services/userService';
import { useAuth } from '@/contexts/AuthContext';
import { SeasonalThemeContext } from '@/contexts/SeasonalThemeContext';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { motion } from 'framer-motion';
import caTextLogo from '@/assets/CA_text_logo.png';
import caManLogo from '@/assets/CA_man_logo.png';

const SidebarItem = ({
  icon: Icon,
  label,
  href,
  active,
  collapsed,
  dropdownContent,
  onNavigate,
  external,
  isSeasonalActive = false,
}) => {
  const handleClick = () => {
    if (external) {
      window.open(href, '_blank', 'noopener,noreferrer');
      return;
    }
    if (onNavigate) {
      onNavigate(href);
    }
  };

  if (dropdownContent) {
    return (
      <button
        onClick={handleClick}
        className={cn(
          'sidebar-menu-item flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 w-full text-left',
          active
            ? isSeasonalActive
              ? 'bg-blue-100/90 text-blue-900 border-blue-400/50 backdrop-blur-sm'
              : 'bg-blue-50 text-blue-600 border-blue-500'
            : isSeasonalActive
              ? 'text-blue-100 hover:text-white hover:bg-blue-700/50'
              : 'text-gray-600 hover:text-gray-900'
        )}
      >
        <Icon size={collapsed ? 24 : 20} />
        {!collapsed && (
          <span className="font-medium sidebar-menu-label">{label}</span>
        )}
      </button>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div whileTap={{ scale: 0.98 }}>
            {external ? (
              <button
                onClick={handleClick}
                className={cn(
                  'sidebar-menu-item flex items-center gap-4 px-4 py-3 mx-2 rounded-xl transition-all duration-200 relative group w-full text-left',
                  collapsed ? 'justify-center px-2' : '',
                  active
                    ? isSeasonalActive
                      ? 'bg-gradient-to-r from-blue-100/90 to-blue-200/80 text-blue-900 border-blue-400/50 shadow-md font-semibold backdrop-blur-sm'
                      : 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-blue-600 shadow-md font-semibold'
                    : isSeasonalActive
                      ? 'text-blue-100 hover:text-white hover:bg-gradient-to-r hover:from-blue-700/50 hover:to-blue-600/50 hover:shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:shadow-sm'
                )}
              >
                <Icon
                  size={collapsed ? 24 : 20}
                  className={cn(
                    'transition-all duration-200',
                    active
                      ? isSeasonalActive
                        ? 'text-blue-900'
                        : 'text-blue-700'
                      : isSeasonalActive
                        ? 'text-blue-200 group-hover:text-white'
                        : 'text-gray-500 group-hover:text-gray-700'
                  )}
                />
                {!collapsed && (
                  <span
                    className={cn(
                      'sidebar-menu-label transition-colors duration-200',
                      active
                        ? isSeasonalActive
                          ? 'font-semibold text-blue-900'
                          : 'font-semibold text-blue-700'
                        : isSeasonalActive
                          ? 'text-blue-100 group-hover:text-white'
                          : 'text-gray-700 group-hover:text-gray-900'
                    )}
                  >
                    {label}
                  </span>
                )}
              </button>
            ) : (
              <Link
                to={href}
                onClick={handleClick}
                className={cn(
                  'sidebar-menu-item flex items-center gap-4 px-4 py-3 mx-2 rounded-xl transition-all duration-200 relative group w-full text-left',
                  collapsed ? 'justify-center px-2' : '',
                  active
                    ? isSeasonalActive
                      ? 'bg-gradient-to-r from-blue-100/90 to-blue-200/80 text-blue-900 border-blue-400/50 shadow-md font-semibold backdrop-blur-sm'
                      : 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-blue-600 shadow-md font-semibold'
                    : isSeasonalActive
                      ? 'text-blue-100 hover:text-white hover:bg-gradient-to-r hover:from-blue-700/50 hover:to-blue-600/50 hover:shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:shadow-sm'
                )}
              >
                <Icon
                  size={collapsed ? 24 : 20}
                  className={cn(
                    'transition-all duration-200',
                    active
                      ? isSeasonalActive
                        ? 'text-blue-900'
                        : 'text-blue-700'
                      : isSeasonalActive
                        ? 'text-blue-200 group-hover:text-white'
                        : 'text-gray-500 group-hover:text-gray-700'
                  )}
                />
                {!collapsed && (
                  <span
                    className={cn(
                      'sidebar-menu-label transition-colors duration-200',
                      active
                        ? isSeasonalActive
                          ? 'font-semibold text-blue-900'
                          : 'font-semibold text-blue-700'
                        : isSeasonalActive
                          ? 'text-blue-100 group-hover:text-white'
                          : 'text-gray-700 group-hover:text-gray-900'
                    )}
                  >
                    {label}
                  </span>
                )}
              </Link>
            )}
          </motion.div>
        </TooltipTrigger>
        {collapsed && (
          <TooltipContent
            side="right"
            className={cn(
              'shadow-xl',
              isSeasonalActive
                ? 'bg-blue-900/95 border-blue-600/50 text-white backdrop-blur-sm'
                : 'bg-gray-900 border-gray-700 text-white'
            )}
          >
            {label}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export function Sidebar({ collapsed, setCollapsed, onCreditorCardClick }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { userRole, isInstructorOrAdmin } = useAuth();
  const { activeTheme } = useContext(SeasonalThemeContext);
  const [moreOpen, setMoreOpen] = useState(false);
  const [snowflakes, setSnowflakes] = useState([]);
  const [floatingSnowflakes, setFloatingSnowflakes] = useState([]);

  const isSeasonalActive = activeTheme === 'active';

  // Initialize snowflakes when winter theme is active
  useEffect(() => {
    if (isSeasonalActive) {
      // Falling snowflakes - fewer for sidebar
      const flakes = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 8 + 6,
        delay: -(Math.random() * 8),
        opacity: Math.random() * 0.5 + 0.3,
        drift: Math.random() * 20 - 10,
        fallDistance: 100,
      }));
      setSnowflakes(flakes);

      // Floating snowflakes around the sidebar
      const floatingFlakes = Array.from({ length: 4 }, (_, i) => ({
        id: i + 100,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 12 + 10,
        delay: Math.random() * 8,
      }));
      setFloatingSnowflakes(floatingFlakes);
    } else {
      setSnowflakes([]);
      setFloatingSnowflakes([]);
    }
  }, [isSeasonalActive]);

  const isActive = path => {
    if (path === '/dashboard') {
      // Only active on the dashboard root, not on subpages
      return location.pathname === '/dashboard';
    }
    return location.pathname === path;
  };

  const handleNavigate = path => {
    if (collapsed && path !== '/instructor') {
      setCollapsed(false);
    }

    if (path === '/instructor') {
      setCollapsed(true);
    }

    navigate(path); // ✅ THIS WAS MISSING
  };

  const handleLogoClick = () => {
    if (window.location.pathname === '/dashboard') {
      window.location.reload();
    } else {
      navigate('/dashboard');
    }
    if (collapsed) {
      setCollapsed(false);
    }
  };

  const handleCreditorCardClick = () => {
    if (onCreditorCardClick) {
      onCreditorCardClick();
    }
  };

  // Replace localStorage logic with a constant for testing
  // const isScormAllowed = allowedScormUserIds.includes(currentUserId);

  // Help section navigation items
  const helpItems = [
    // { icon: FileQuestion, label: "FAQs", path: "/dashboard/faqs" },
    // { icon: MessageSquare, label: "Contact Support", path: "/dashboard/support" },
    // { icon: BookOpen, label: "User Guides", path: "/dashboard/guides" },
    {
      icon: Contact,
      label: 'Create Ticket',
      path: '/dashboard/support/ticket',
    },
    {
      icon: FileQuestion,
      label: 'My Tickets',
      path: '/dashboard/support/tickets',
    },
  ];

  // Animation variants with smooth transition
  const sidebarVariants = {
    expanded: {
      width: '17rem',
      transition: { type: 'spring', stiffness: 400, damping: 40 },
    },
    collapsed: {
      width: '4.5rem',
      transition: { type: 'spring', stiffness: 400, damping: 40 },
    },
  };

  const listVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -10, opacity: 0 },
    show: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 300 } },
  };

  return (
    <motion.div
      className={cn(
        'sidebar-panel h-screen flex flex-col shadow-lg z-20 relative overflow-hidden',
        isSeasonalActive
          ? 'bg-gradient-to-br from-blue-700/95 via-blue-800/95 to-blue-900/95 backdrop-blur-sm border-r border-blue-600/50'
          : 'bg-white border-r border-gray-200'
      )}
      variants={sidebarVariants}
      animate={collapsed ? 'collapsed' : 'expanded'}
      initial={false}
    >
      {/* Winter Theme Snowfall Effects */}
      {isSeasonalActive && (
        <>
          {/* Animated Snowfall within Sidebar */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {snowflakes.map(flake => (
              <div
                key={flake.id}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${flake.left}%`,
                  top: `-${flake.fallDistance}px`,
                  width: `${flake.size}px`,
                  height: `${flake.size}px`,
                  opacity: flake.opacity,
                  animation: `sidebar-snowfall ${flake.duration}s linear ${flake.delay}s infinite`,
                  '--drift': `${flake.drift}px`,
                  '--start-top': `-${flake.fallDistance}px`,
                  '--end-top': `100vh`,
                  boxShadow: '0 0 3px rgba(255, 255, 255, 0.6)',
                }}
              />
            ))}
          </div>

          {/* Floating Snowflakes within Sidebar */}
          <div className="absolute inset-0 pointer-events-none z-1">
            {floatingSnowflakes.map(flake => (
              <div
                key={flake.id}
                className="absolute"
                style={{
                  top: `${flake.top}%`,
                  left: `${flake.left}%`,
                  width: `${flake.size}px`,
                  height: `${flake.size}px`,
                  animation: `sidebar-float ${flake.duration}s ease-in-out ${flake.delay}s infinite`,
                }}
              >
                <Snowflake className="w-full h-full text-blue-200/60" />
              </div>
            ))}
          </div>
        </>
      )}

      {/* Header */}
      <div
        className={cn(
          'sidebar-header relative flex items-center p-4 pr-0 shadow-md z-10',
          isSeasonalActive
            ? 'bg-gradient-to-br from-blue-600/95 via-blue-700/95 to-blue-800/95 backdrop-blur-sm border-b border-blue-500/50'
            : 'bg-gradient-to-r from-blue-600 to-blue-700 border-b border-blue-800',
          collapsed ? 'justify-center' : 'justify-between'
        )}
      >
        <div className="sidebar-lights" aria-hidden="true" />

        {!collapsed && (
          <motion.button
            onClick={handleLogoClick}
            className={cn(
              'font-bold text-xl flex items-center gap-3 transition-opacity duration-200 cursor-pointer',
              isSeasonalActive
                ? 'text-white hover:opacity-90'
                : 'text-white hover:opacity-90'
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative sidebar-logo-mark">
              <div className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center shadow-lg overflow-hidden',
                isSeasonalActive
                  ? 'bg-white/90 backdrop-blur-sm'
                  : 'bg-white'
              )}>
                <img
                  src={caManLogo}
                  alt="Creditor Academy Logo"
                  className="w-full h-full object-contain p-1"
                />
              </div>
            </div>
            <img
              src={caTextLogo}
              alt="Creditor Academy"
              className="h-8 w-auto object-contain"
            />
            {isSeasonalActive && (
              <Snowflake className="w-5 h-5 text-blue-200/80 animate-pulse" />
            )}
          </motion.button>
        )}

        {collapsed && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  onClick={handleLogoClick}
                  className="cursor-pointer"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative sidebar-logo-mark">
                    <div className={cn(
                      'w-10 h-10 rounded-xl flex items-center justify-center shadow-lg overflow-hidden',
                      isSeasonalActive
                        ? 'bg-white/90 backdrop-blur-sm'
                        : 'bg-white'
                    )}>
                      <img
                        src={caManLogo}
                        alt="Creditor Academy Logo"
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                    {isSeasonalActive && (
                      <Snowflake className="absolute -top-1 -right-1 w-3 h-3 text-blue-200/80 animate-pulse" />
                    )}
                  </div>
                </motion.button>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className={cn(
                  'shadow-xl',
                  isSeasonalActive
                    ? 'bg-blue-900/95 text-white border-blue-600/50 backdrop-blur-sm'
                    : 'bg-gray-900 text-white'
                )}
              >
                Creditor Academy
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {!collapsed && (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className={cn(
                'rounded-lg',
                isSeasonalActive
                  ? 'text-white hover:bg-white/20'
                  : 'text-white hover:bg-white/20'
              )}
            >
              <ChevronLeft size={18} />
            </Button>
          </motion.div>
        )}

        {collapsed && (
          <div className="absolute -right-3 top-1/2 transform -translate-y-1/2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCollapsed(false)}
                className={cn(
                  'h-8 w-8 rounded-full shadow-lg',
                  isSeasonalActive
                    ? 'bg-white/90 hover:bg-white border border-blue-400/50 text-blue-700 backdrop-blur-sm'
                    : 'bg-white hover:bg-gray-50 border border-gray-200 text-blue-600'
                )}
              >
                <ChevronRight size={16} />
              </Button>
            </motion.div>
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <div
        className={cn(
          'flex-1 overflow-y-auto py-6 flex flex-col custom-scrollbar relative z-10',
          isSeasonalActive
            ? 'bg-gradient-to-b from-blue-800/40 via-blue-900/30 to-blue-800/25'
            : 'bg-gradient-to-b from-gray-50 to-white'
        )}
      >
        <motion.div
          className="space-y-2 px-2"
          variants={listVariants}
          initial="hidden"
          animate="show"
        >
          {!moreOpen && (
            <>
              <motion.div variants={itemVariants}>
                <SidebarItem
                  icon={Home}
                  label="Dashboard"
                  href="/dashboard"
                  active={isActive('/dashboard')}
                  collapsed={collapsed}
                  onNavigate={handleNavigate}
                  isSeasonalActive={isSeasonalActive}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <SidebarItem
                  icon={Book}
                  label="My Courses"
                  href="/dashboard/courses"
                  active={isActive('/dashboard/courses')}
                  collapsed={collapsed}
                  onNavigate={handleNavigate}
                  isSeasonalActive={isSeasonalActive}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <SidebarItem
                  icon={Users}
                  label="Study Groups"
                  href="/dashboard/groups"
                  active={isActive('/dashboard/groups')}
                  collapsed={collapsed}
                  onNavigate={handleNavigate}
                  isSeasonalActive={isSeasonalActive}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <SidebarItem
                  icon={Library}
                  label="Course Catalog"
                  href="/dashboard/catalog"
                  active={isActive('/dashboard/catalog')}
                  collapsed={collapsed}
                  onNavigate={handleNavigate}
                  isSeasonalActive={isSeasonalActive}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <SidebarItem
                  icon={Megaphone}
                  label="Events"
                  href="/dashboard/events"
                  active={isActive('/dashboard/events')}
                  collapsed={collapsed}
                  onNavigate={handleNavigate}
                  isSeasonalActive={isSeasonalActive}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <SidebarItem
                  icon={CalendarDays}
                  label="Calendar"
                  href="/dashboard/calendar"
                  active={isActive('/dashboard/calendar')}
                  collapsed={collapsed}
                  onNavigate={handleNavigate}
                  isSeasonalActive={isSeasonalActive}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <SidebarItem
                  icon={UserCheck}
                  label="Attendance"
                  href="/dashboard/attendance"
                  active={isActive('/dashboard/attendance')}
                  collapsed={collapsed}
                  onNavigate={handleNavigate}
                  isSeasonalActive={isSeasonalActive}
                />
              </motion.div>

              {/* Messages moved above More toggle */}
              <motion.div variants={itemVariants}>
                <SidebarItem
                  icon={MessageSquare}
                  label="Messages"
                  href="/dashboard/messages"
                  active={isActive('/dashboard/messages')}
                  collapsed={collapsed}
                  onNavigate={handleNavigate}
                  isSeasonalActive={isSeasonalActive}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <SidebarItem
                  icon={Handshake}
                  label="Sponsor Center"
                  href="/dashboard/sponsor-center/submit"
                  active={location.pathname.startsWith(
                    '/dashboard/sponsor-center'
                  )}
                  collapsed={collapsed}
                  onNavigate={handleNavigate}
                  isSeasonalActive={isSeasonalActive}
                />
              </motion.div>

              {/* Creditor Card */}
              <motion.div variants={itemVariants}>
                <SidebarItem
                  icon={CreditCard}
                  label="Creditor Card"
                  collapsed={collapsed}
                  onNavigate={handleCreditorCardClick}
                  isSeasonalActive={isSeasonalActive}
                />
              </motion.div>
            </>
          )}

          {/* More section toggle */}
          {!collapsed && (
            <motion.div variants={itemVariants}>
              <div className="px-3 pt-2">
                <motion.button
                  onClick={() => setMoreOpen(v => !v)}
                  aria-label={
                    moreOpen ? 'Show less options' : 'Show more options'
                  }
                  className={cn(
                    'w-full flex items-center justify-between rounded-full px-3 py-2 text-xs font-medium transition-colors',
                    moreOpen
                      ? isSeasonalActive
                        ? 'bg-blue-100/90 text-blue-900 backdrop-blur-sm'
                        : 'bg-blue-50 text-blue-700'
                      : isSeasonalActive
                        ? 'bg-white/10 text-blue-100 hover:bg-white/20 backdrop-blur-sm'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                  )}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>{moreOpen ? 'Less' : 'More'}</span>
                  <ChevronDown
                    size={14}
                    className={cn(
                      'transition-transform',
                      moreOpen ? '-rotate-180' : 'rotate-0'
                    )}
                  />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Collapsible More items – when open, hide others */}
          {moreOpen && (
            <motion.div
              key="more-open"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mt-1"
            >
              <div className="space-y-2">
                <SidebarItem
                  icon={Bot}
                  label="Credit chatbot"
                  href="/dashboard/chatbot"
                  active={isActive('/dashboard/chatbot')}
                  collapsed={collapsed}
                  onNavigate={handleNavigate}
                  isSeasonalActive={isSeasonalActive}
                />
                {/* Less control now unified with the More link above; hide duplicate */}
              </div>
            </motion.div>
          )}

          {/* Instructor Portal - only for admin or instructor */}
          {!moreOpen && isInstructorOrAdmin() && (
            <motion.div variants={itemVariants}>
              <SidebarItem
                icon={GraduationCap}
                label="Instructor Portal"
                href="/instructor"
                active={isActive('/instructor')}
                collapsed={collapsed}
                onNavigate={handleNavigate}
                isSeasonalActive={isSeasonalActive}
              />
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Help & Support Footer  */}
      <motion.div
        className={cn(
          'border-t p-4 relative z-10',
          isSeasonalActive
            ? 'border-blue-500/50 bg-gradient-to-br from-blue-700/50 via-blue-800/45 to-blue-900/40 backdrop-blur-sm'
            : 'border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100'
        )}
        variants={itemVariants}
      >
        {collapsed ? (
          <DropdownMenu>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        'w-full flex justify-center p-3 rounded-xl transition-all duration-200 group shadow-sm',
                        isSeasonalActive
                          ? 'hover:bg-white/20 text-blue-100 hover:text-white'
                          : 'hover:bg-gray-200 text-gray-600'
                      )}
                    >
                      <HelpCircle size={24} />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="bg-gray-900 text-white shadow-xl"
                >
                  Help & Support
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenuContent
              side="right"
              align="start"
              className="w-56 bg-white border-gray-200 shadow-xl rounded-xl"
            >
              {helpItems.map((item, index) => (
                <DropdownMenuItem key={index} asChild>
                  <Link
                    to={item.path}
                    className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 text-gray-700 rounded-lg p-2"
                  >
                    <item.icon size={16} />
                    <span>{item.label}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  'w-full justify-start px-4 py-3 text-sm font-semibold rounded-xl flex items-center gap-3 group transition-all duration-200 shadow-sm',
                  isSeasonalActive
                    ? 'bg-white/10 hover:bg-white/20 text-blue-100 hover:text-white border border-blue-600/50 backdrop-blur-sm'
                    : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
                )}
              >
                <HelpCircle size={18} />
                <span>Help & Support</span>
                <ChevronDown
                  size={14}
                  className="ml-auto transition-transform duration-200 group-hover:rotate-180"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-white border-gray-200 shadow-xl rounded-xl"
            >
              {helpItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <DropdownMenuItem asChild>
                    <Link
                      to={item.path}
                      className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 text-gray-700 rounded-lg p-2"
                    >
                      <item.icon size={16} className="text-gray-500" />
                      <span>{item.label}</span>
                    </Link>
                  </DropdownMenuItem>
                </motion.div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </motion.div>

      {/* Winter Theme CSS Animations */}
      {isSeasonalActive && (
        <style jsx>{`
          @keyframes sidebar-snowfall {
            0% {
              transform: translateY(var(--start-top)) translateX(0);
            }
            100% {
              transform: translateY(var(--end-top)) translateX(var(--drift));
            }
          }

          @keyframes sidebar-float {
            0%, 100% {
              transform: translateY(0) rotate(0deg);
            }
            50% {
              transform: translateY(-10px) rotate(180deg);
            }
          }
        `}</style>
      )}
    </motion.div>
  );
}

export default Sidebar;
