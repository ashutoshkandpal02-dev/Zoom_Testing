import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { FaCoins } from 'react-icons/fa';
import { useCredits } from '@/contexts/CreditsContext';
import { api } from '@/services/apiClient';

const AdminPayments = () => {
  const {
    transactions,
    balance,
    addCredits,
    refreshBalance,
    refreshMembership,
  } = useCredits();

  // DEFENSIVE: Debounced refresh to prevent triggering infinite loops in other components
  const refreshBalanceRef = useRef(null);
  const debouncedRefreshBalance = useCallback(() => {
    if (refreshBalanceRef.current) {
      clearTimeout(refreshBalanceRef.current);
    }
    refreshBalanceRef.current = setTimeout(() => {
      if (refreshBalance) {
        refreshBalance();
      }
    }, 1000); // 1 second debounce to prevent cascade effects
  }, [refreshBalance]);

  // DEFENSIVE: Cleanup debounced refresh on unmount
  useEffect(() => {
    return () => {
      if (refreshBalanceRef.current) {
        clearTimeout(refreshBalanceRef.current);
      }
    };
  }, []);
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  // Mix dummy data with real transaction data
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [usersPage, setUsersPage] = useState(1);
  const [usersSearch, setUsersSearch] = useState('');
  const [isGranting, setIsGranting] = useState(false);
  const [grantMessage, setGrantMessage] = useState('');


  const membershipColorClasses = status => {
    const s = (status || 'active').toString().toLowerCase();
    if (s === 'active') return 'bg-green-100 text-green-700 border-green-200';
    if (s === 'expired')
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    if (s === 'cancelled' || s === 'canceled') return 'bg-red-100 text-red-700 border-red-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use the consolidated credits API which now includes membership status
        const response = await api.get('/payment-order/admin/credits', { withCredentials: true });

        if (cancelled) return;

        const data = response?.data?.data || response?.data || [];
        const creditsArray = Array.isArray(data) ? data : [];

        // Map the consolidated data to the format used in the UI
        const mappedUsers = creditsArray.map(u => ({
          id: u.id,
          name: `${u.first_name || ''} ${u.last_name || ''}`.trim() || u.email || 'Unknown',
          email: u.email || '',
          membership: u.membership?.status?.toLowerCase() || 'canceled',
          credits: Number(u.total_credits) || 0,
        }));

        setUsers(mappedUsers);
      } catch (e) {
        if (!cancelled) {
          console.error('[AdminPayments] Failed to load users data:', e);
          setError('Failed to load users');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

  const itemsPerPage = 5;
  // Search + paging for users list (credits view)
  const filteredUsers = useMemo(() => {
    const term = usersSearch.trim().toLowerCase();
    if (!term) return users;
    return users.filter(
      u =>
        (u.name || '').toLowerCase().includes(term) ||
        (u.email || '').toLowerCase().includes(term) ||
        (u.id || '').toString().toLowerCase().includes(term)
    );
  }, [users, usersSearch]);


  const totalUserPages = Math.max(
    Math.ceil(filteredUsers.length / itemsPerPage),
    1
  );
  const pagedUsers = useMemo(() => {
    const start = (usersPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, usersPage, itemsPerPage]);

  const [grantCreditsAmount, setGrantCreditsAmount] = useState('');
  const [userDetailModal, setUserDetailModal] = useState({
    open: false,
    user: null,
  });
  const [grantModal, setGrantModal] = useState({ open: false });
  const [deductModal, setDeductModal] = useState({ open: false });
  const [deductCreditsAmount, setDeductCreditsAmount] = useState(10);
  const [isDeducting, setIsDeducting] = useState(false);
  const [deductMessage, setDeductMessage] = useState('');




  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Payments Management</h2>
        <p className="text-gray-500 mt-1">Manage user balances and memberships.</p>
      </div>

      <div className="space-y-6">
        <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
              <div className="flex-1 min-w-[220px]">
                <input
                  value={usersSearch}
                  onChange={e => setUsersSearch(e.target.value)}
                  placeholder="Search users by name, email, or ID"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div className="flex gap-2">
                <button
                  disabled={selectedUserIds.length === 0}
                  onClick={() => {
                    if (selectedUserIds.length === 0) {
                      return;
                    }
                    setGrantCreditsAmount('');
                    setGrantModal({ open: true });
                  }}
                  className={`px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-colors ${selectedUserIds.length === 0
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                >
                  <FaCoins /> Grant credits
                  {selectedUserIds.length > 0
                    ? ` (${selectedUserIds.length})`
                    : ''}
                </button>
                <button
                  disabled={selectedUserIds.length !== 1}
                  onClick={() => {
                    if (selectedUserIds.length === 0) {
                      alert('Please select one user to deduct credits from.');
                      return;
                    }
                    if (selectedUserIds.length > 1) {
                      alert(
                        'Please select only one user to deduct credits from.'
                      );
                      return;
                    }
                    setDeductModal({ open: true });
                  }}
                  className={`px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-colors ${selectedUserIds.length !== 1
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                    }`}
                >
                  <FaCoins /> Deduct credits
                  {selectedUserIds.length === 1 ? ' (1)' : ''}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800">Users</h3>
              <span className="text-sm text-gray-600">
                {loading ? 'Loading…' : `${filteredUsers.length} users`}
              </span>
            </div>
            {error && (
              <div className="mb-2 text-sm text-red-600">{error}</div>
            )}

            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="text-left px-3 py-2 w-10">
                      <input
                        type="checkbox"
                        aria-label="Select page"
                        onChange={e => {
                          const pageIds = pagedUsers.map(u => u.id);
                          setSelectedUserIds(prev =>
                            e.target.checked
                              ? [...new Set([...prev, ...pageIds])]
                              : prev.filter(id => !pageIds.includes(id))
                          );
                        }}
                        checked={
                          pagedUsers.length > 0 &&
                          pagedUsers.every(u => selectedUserIds.includes(u.id))
                        }
                      />
                    </th>
                    <th className="text-left px-3 py-2">Name</th>
                    <th className="text-left px-3 py-2">Email</th>
                    <th className="text-left px-3 py-2">Membership</th>
                    <th className="text-left px-3 py-2">Credits</th>
                    <th className="text-left px-3 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-3 py-8 text-center text-gray-500"
                      >
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-2"></div>
                          Loading users...
                        </div>
                      </td>
                    </tr>
                  ) : pagedUsers.length === 0 ? (

                    <tr>
                      <td
                        colSpan="6"
                        className="px-3 py-8 text-center text-gray-500"
                      >
                        No users found
                      </td>
                    </tr>
                  ) : (
                    pagedUsers.map(u => {
                      const checked = selectedUserIds.includes(u.id);
                      return (
                        <tr key={u.id} className="border-t hover:bg-gray-50">
                          <td className="px-3 py-2">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={e => {
                                setSelectedUserIds(prev =>
                                  e.target.checked
                                    ? [...new Set([...prev, u.id])]
                                    : prev.filter(id => id !== u.id)
                                );
                              }}
                            />
                          </td>
                          <td
                            className="px-3 py-2 font-medium text-gray-900 cursor-pointer"
                            onClick={() =>
                              setUserDetailModal({ open: true, user: u })
                            }
                          >
                            {u.name}
                          </td>
                          <td
                            className="px-3 py-2 text-gray-700 cursor-pointer"
                            onClick={() =>
                              setUserDetailModal({ open: true, user: u })
                            }
                          >
                            {u.email}
                          </td>
                          <td className="px-3 py-2">
                            {(() => {
                              const value = (u.membership || 'active').toString().toLowerCase();
                              return (
                                <select
                                  value={value}
                                  onChange={async e => {
                                    const v = e.target.value;
                                    const userId = u.id;

                                    // Update local state immediately
                                    setUsers(prev =>
                                      prev.map(r =>
                                        r.id === userId
                                          ? { ...r, membership: v }
                                          : r
                                      )
                                    );

                                    // Call backend API when setting to "not active" (canceled)
                                    if (v === 'canceled') {
                                      try {
                                        await api.patch(
                                          `/payment-order/membership/${userId}/cancel`,
                                          {},
                                          { withCredentials: true }
                                        );
                                        // Removed redundant refreshMembership call
                                      } catch (err) {
                                        console.error('Failed to cancel membership:', err);
                                        // Revert on error
                                        setUsers(prev =>
                                          prev.map(r =>
                                            r.id === userId ? { ...r, membership: 'active' } : r
                                          )
                                        );
                                      }
                                    } else if (v === 'active') {
                                      try {
                                        await api.post(
                                          `/payment-order/membership/subscribe/${userId}`,
                                          { plan_type: 'MONTHLY', total_amount: 69, type: 'MEMBERSHIP' },
                                          { withCredentials: true }
                                        );
                                        // Removed redundant refreshMembership call
                                      } catch (err) {
                                        console.error('Failed to activate membership:', err);
                                      }
                                    }
                                  }}
                                  className={`rounded-md border px-2 py-1 text-xs capitalize focus:outline-none focus:ring-2 focus:ring-blue-200 ${membershipColorClasses(value)}`}
                                >
                                  <option value="active">active</option>
                                  <option value="canceled">not active</option>
                                </select>
                              );
                            })()}
                          </td>

                          <td className="px-3 py-2 text-gray-700">
                            {u.credits}
                          </td>
                          <td className="px-3 py-2 text-gray-400">—</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-gray-600">
                Page {usersPage} of {totalUserPages}
              </span>
              <div className="flex gap-2">
                <button
                  disabled={usersPage === 1}
                  onClick={() => setUsersPage(p => Math.max(p - 1, 1))}
                  className={`px-3 py-1.5 rounded-md border ${usersPage === 1 ? 'text-gray-400 bg-gray-50' : 'hover:bg-gray-50'}`}
                >
                  Prev
                </button>
                <button
                  disabled={usersPage >= totalUserPages}
                  onClick={() =>
                    setUsersPage(p => Math.min(p + 1, totalUserPages))
                  }
                  className={`px-3 py-1.5 rounded-md border ${usersPage >= totalUserPages ? 'text-gray-400 bg-gray-50' : 'hover:bg-gray-50'}`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {grantModal.open && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div
                className="absolute inset-0 bg-black/30"
                onClick={() => setGrantModal({ open: false })}
              />
              <div className="relative bg-white rounded-lg shadow-lg border border-gray-200 w-full max-w-md p-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Grant Credits
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  Selected users: {selectedUserIds.length}
                </p>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Credits
                </label>
                <input
                  value={grantCreditsAmount}
                  onChange={e => setGrantCreditsAmount(e.target.value)}
                  type="number"
                  min="1"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 mb-4"
                />
                {grantMessage && (
                  <div className="mb-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2">
                    {grantMessage}
                  </div>
                )}
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      if (!isGranting) setGrantModal({ open: false });
                    }}
                    className="px-4 py-2 rounded-md border hover:bg-gray-50"
                    disabled={isGranting}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      if (isGranting) return;
                      try {
                        setGrantMessage('');
                        const creditsValue = Number(grantCreditsAmount);
                        if (
                          !Number.isFinite(creditsValue) ||
                          creditsValue < 1
                        ) {
                          setGrantMessage('Enter at least 1 credit.');
                          setIsGranting(false);
                          return;
                        }
                        setIsGranting(true);
                        // Call backend to grant credits
                        await api.post(
                          '/payment-order/admin/credits/grant',
                          {
                            userIds: selectedUserIds,
                            credits: creditsValue,
                          },
                          { withCredentials: true }
                        );
                        // Reflect change locally
                        setUsers(prev =>
                          prev.map(u =>
                            selectedUserIds.includes(u.id)
                              ? {
                                ...u,
                                credits:
                                  (Number(u.credits) || 0) +
                                  (Number(creditsValue) || 0),
                              }
                              : u
                          )
                        );
                        try {
                          debouncedRefreshBalance();
                        } catch { }
                        setGrantMessage(
                          `Granted ${creditsValue} credits to ${selectedUserIds.length} user(s).`
                        );
                        // Optionally clear selection
                        setSelectedUserIds([]);
                        // Close after brief delay
                        setTimeout(() => {
                          setGrantModal({ open: false });
                          setGrantCreditsAmount('');
                          setGrantMessage('');
                        }, 800);
                      } catch (e) {
                        alert('Failed to grant credits.');
                      } finally {
                        setIsGranting(false);
                      }
                    }}
                    className={`px-4 py-2 rounded-md text-white ${isGranting ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                  >
                    {isGranting ? 'Granting…' : 'Grant'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {deductModal.open && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div
                className="absolute inset-0 bg-black/30"
                onClick={() => setDeductModal({ open: false })}
              />
              <div className="relative bg-white rounded-lg shadow-lg border border-gray-200 w-full max-w-md p-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Deduct Credits
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  Selected user:{' '}
                  {selectedUserIds.length === 1
                    ? users.find(u => u.id === selectedUserIds[0])?.name ||
                    'Unknown'
                    : 'None'}
                </p>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Credits to Deduct
                </label>
                <input
                  value={deductCreditsAmount}
                  onChange={e =>
                    setDeductCreditsAmount(parseInt(e.target.value || '0', 10))
                  }
                  type="number"
                  min="1"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-200 mb-4"
                />
                {deductMessage && (
                  <div className="mb-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2">
                    {deductMessage}
                  </div>
                )}
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      if (!isDeducting) setDeductModal({ open: false });
                    }}
                    className="px-4 py-2 rounded-md border hover:bg-gray-50"
                    disabled={isDeducting}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      if (isDeducting) return;
                      try {
                        setDeductMessage('');
                        setIsDeducting(true);
                        // Call backend to deduct credits
                        await api.post(
                          '/payment-order/admin/credits/deduct',
                          {
                            userId: selectedUserIds[0],
                            credits: deductCreditsAmount,
                          },
                          { withCredentials: true }
                        );
                        // Reflect change locally
                        setUsers(prev =>
                          prev.map(u =>
                            selectedUserIds.includes(u.id)
                              ? {
                                ...u,
                                credits: Math.max(
                                  0,
                                  (Number(u.credits) || 0) -
                                  (Number(deductCreditsAmount) || 0)
                                ),
                              }
                              : u
                          )
                        );
                        try {
                          debouncedRefreshBalance();
                        } catch { }
                        setDeductMessage(
                          `Deducted ${deductCreditsAmount} credits from user.`
                        );
                        // Optionally clear selection
                        setSelectedUserIds([]);
                        // Close after brief delay
                        setTimeout(() => {
                          setDeductModal({ open: false });
                          setDeductMessage('');
                        }, 800);
                      } catch (e) {
                        alert('Failed to deduct credits.');
                      } finally {
                        setIsDeducting(false);
                      }
                    }}
                    className={`px-4 py-2 rounded-md text-white ${isDeducting ? 'bg-red-300 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
                  >
                    {isDeducting ? 'Deducting…' : 'Deduct'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* User credit modal disabled for now */}
          {false && userDetailModal.open && userDetailModal.user && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div
                className="absolute inset-0 bg-black/30"
                onClick={() => setUserDetailModal({ open: false, user: null })}
              />
              <div className="relative bg-white rounded-lg shadow-lg border border-gray-200 w-full max-w-5xl p-4">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  User Credit Details
                </h4>
                {(() => {
                  const u = userDetailModal.user;
                  const userOrders = [
                    {
                      id: 'ord_1001',
                      amount: 49,
                      currency: 'USD',
                      date: '2025-06-02',
                      status: 'paid',
                    },
                    {
                      id: 'ord_1010',
                      amount: 98,
                      currency: 'USD',
                      date: '2025-08-15',
                      status: 'paid',
                    },
                  ];
                  const purchasedLessons = [
                    {
                      course: 'Operate Private Merchant',
                      lesson: 'Getting Started',
                    },
                    {
                      course: 'Remedy Masterclass',
                      lesson: 'Dispute Strategy',
                    },
                  ];
                  const membershipEnd =
                    u.membership === 'active' ? '2025-12-01' : '—';
                  const creditSummary = {
                    current: u.credits,
                    grantedTotal: 120,
                    usedTotal: 85,
                    lastGrantDate: '2025-09-01',
                  };
                  const creditHistory = [
                    {
                      date: '2025-09-01',
                      type: 'grant',
                      amount: 20,
                      note: 'Promo bonus',
                    },
                    {
                      date: '2025-08-20',
                      type: 'use',
                      amount: 10,
                      note: 'Lesson: Getting Started',
                    },
                    {
                      date: '2025-08-05',
                      type: 'grant',
                      amount: 50,
                      note: 'Manual grant',
                    },
                    {
                      date: '2025-07-28',
                      type: 'use',
                      amount: 15,
                      note: 'Quiz attempts',
                    },
                  ];
                  const meta = {
                    role: 'member',
                    lastLogin: '2025-09-07 14:22',
                    plan: 'Pro Monthly',
                    nextBilling: '2025-10-01',
                    totalOrders: userOrders.length,
                    totalSpend: userOrders.reduce((s, o) => s + o.amount, 0),
                  };
                  return (
                    <div className="space-y-4 text-sm max-h-[60vh] overflow-y-auto pr-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
                          <div className="flex justify-between py-1">
                            <span className="text-gray-600">Name</span>
                            <span className="font-medium">{u.name}</span>
                          </div>
                          <div className="flex justify-between py-1">
                            <span className="text-gray-600">Email</span>
                            <span className="font-medium">{u.email}</span>
                          </div>
                          <div className="flex justify-between items-center py-1 gap-2">
                            <span className="text-gray-600">Membership</span>
                            {(() => {
                              const value = (u.membership || 'active').toString().toLowerCase();
                              return (
                                <select
                                  value={value}
                                  onChange={async e => {
                                    const v = e.target.value;
                                    const userId = u.id;

                                    // Update local state immediately
                                    setUsers(prev =>
                                      prev.map(r =>
                                        r.id === userId
                                          ? { ...r, membership: v }
                                          : r
                                      )
                                    );

                                    // Call backend API when setting to "not active" (canceled)
                                    if (v === 'canceled') {
                                      try {
                                        await api.patch(
                                          `/payment-order/membership/${userId}/cancel`,
                                          {},
                                          { withCredentials: true }
                                        );
                                        // Removed redundant refresh
                                      } catch (err) {
                                        console.error('Failed to cancel membership:', err);
                                        // Revert
                                        setUsers(prev =>
                                          prev.map(r =>
                                            r.id === userId ? { ...r, membership: 'active' } : r
                                          )
                                        );
                                      }
                                    } else if (v === 'active') {
                                      try {
                                        await api.post(
                                          `/payment-order/membership/subscribe/${userId}`,
                                          { plan_type: 'MONTHLY', total_amount: 69, type: 'MEMBERSHIP' },
                                          { withCredentials: true }
                                        );
                                        // Removed redundant refresh
                                      } catch (err) {
                                        console.error('Failed to activate membership:', err);
                                      }
                                    }
                                  }}
                                  className={`ml-auto rounded-md border px-2 py-1 text-xs capitalize focus:outline-none focus:ring-2 focus:ring-blue-200 ${membershipColorClasses(value)}`}
                                >
                                  <option value="active">active</option>
                                  <option value="canceled">not active</option>
                                </select>
                              );
                            })()}

                          </div>
                          <div className="flex justify-between py-1">
                            <span className="text-gray-600">
                              Membership Ends
                            </span>
                            <span className="font-medium">{membershipEnd}</span>
                          </div>
                          <div className="flex justify-between py-1">
                            <span className="text-gray-600">Credits</span>
                            <span className="font-medium">{u.credits}</span>
                          </div>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
                          <div className="font-medium text-gray-800 mb-2">
                            Recent Orders
                          </div>
                          <div className="space-y-1">
                            {userOrders.map(o => (
                              <div key={o.id} className="flex justify-between">
                                <span className="text-gray-600">{o.id}</span>
                                <span className="text-gray-800">
                                  ${o.amount} {o.currency} • {o.status} •{' '}
                                  {o.date}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-2 text-xs text-gray-600">
                            Total Orders:{' '}
                            <span className="font-medium text-gray-800">
                              {meta.totalOrders}
                            </span>{' '}
                            • Total Spend:{' '}
                            <span className="font-medium text-gray-800">
                              ${meta.totalSpend}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
                          <div className="font-medium text-gray-800 mb-2">
                            Credit Summary
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between py-1">
                              <span className="text-gray-600">Current</span>
                              <span className="font-semibold">
                                {creditSummary.current}
                              </span>
                            </div>
                            <div className="flex justify-between py-1">
                              <span className="text-gray-600">
                                Total Granted
                              </span>
                              <span className="font-medium">
                                {creditSummary.grantedTotal}
                              </span>
                            </div>
                            <div className="flex justify-between py-1">
                              <span className="text-gray-600">Total Used</span>
                              <span className="font-medium">
                                {creditSummary.usedTotal}
                              </span>
                            </div>
                            <div className="flex justify-between py-1">
                              <span className="text-gray-600">Last Grant</span>
                              <span className="font-medium">
                                {creditSummary.lastGrantDate}
                              </span>
                            </div>
                            <div className="flex justify-between py-1">
                              <span className="text-gray-600">Plan</span>
                              <span className="font-medium">{meta.plan}</span>
                            </div>
                            <div className="flex justify-between py-1">
                              <span className="text-gray-600">
                                Next Billing
                              </span>
                              <span className="font-medium">
                                {meta.nextBilling}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
                          <div className="font-medium text-gray-800 mb-2">
                            Credit History
                          </div>
                          <div className="overflow-x-auto">
                            <table className="min-w-full text-xs">
                              <thead className="text-gray-700">
                                <tr>
                                  <th className="text-left py-1">Date</th>
                                  <th className="text-left py-1">Type</th>
                                  <th className="text-left py-1">Amount</th>
                                  <th className="text-left py-1">Note</th>
                                </tr>
                              </thead>
                              <tbody>
                                {creditHistory.map((h, i) => (
                                  <tr key={i} className="border-t">
                                    <td className="py-1">{h.date}</td>
                                    <td className="py-1 capitalize">
                                      <span
                                        className={`px-2 py-0.5 rounded text-[10px] ${h.type === 'grant' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}
                                      >
                                        {h.type}
                                      </span>
                                    </td>
                                    <td className="py-1">{h.amount}</td>
                                    <td className="py-1">{h.note}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
                        <div className="font-medium text-gray-800 mb-2">
                          Purchased Lessons
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {purchasedLessons.map((pl, idx) => (
                            <div key={idx} className="flex justify-between">
                              <span className="text-gray-600">{pl.course}</span>
                              <span className="text-gray-800">{pl.lesson}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()}
                <div className="mt-5 flex justify-end">
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setUserDetailModal({ open: false, user: null })
                      }
                      className="px-4 py-2 rounded-md border hover:bg-gray-50"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default AdminPayments;
