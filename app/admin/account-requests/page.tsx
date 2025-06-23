// app/admin/account-requests/page.tsx
import ActionButton from '@/components/admin/ActionButton';
import { db } from '@/database/drizzle';
import { users } from '@/database/schema';
import { CheckCircle, Clock, Eye } from 'lucide-react';
import React from 'react';
import { updateUserStatus } from '@/lib/actions/update-user-status';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';



const Page = async () => {
    const userInfo = await db
        .select({
            id: users.id,
            fullName: users.fullName,
            email: users.email,
            university_id: users.universityId,
            status: users.status,
            created_at: users.createdAt,
            university_card: users.universityCard,
            role: users.role,
        })
        .from(users)
        .orderBy(users.createdAt);

    return (
        <div className="w-full rounded-2xl bg-gray-900 md:p-7 p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-white">Account Requests</h2>
                <div className="text-sm text-gray-400">
                    {userInfo.length} request{userInfo.length !== 1 ? 's' : ''}
                </div>
            </div>

            <div className="overflow-x-auto border border-gray-700 rounded-xl bg-gray-800 shadow-lg">
                <table className="w-full text-sm text-left text-gray-300">
                    <thead className="bg-gray-750 text-gray-400 uppercase text-xs tracking-wide">
                        <tr>
                            <th className="px-6 py-4">User</th>
                            <th className="px-6 py-4">Date Joined</th>
                            <th className="px-6 py-4">University ID</th>
                            <th className="px-6 py-4">ID Card</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-750">
                        {userInfo.map((user) => (
                            <tr
                                key={user.id}
                                className="hover:bg-gray-750/50 transition duration-150"
                            >
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold flex items-center justify-center uppercase">
                                        {user.fullName
                                            .split(' ')
                                            .map((w) => w[0])
                                            .join('')
                                            .slice(0, 2)}
                                    </div>
                                    <div>
                                        <div className="font-medium text-white">{user.fullName}</div>
                                        <div className="text-xs text-gray-400 mt-1">{user.email}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {user.created_at ? (
                                        <span className="text-gray-300">
                                            {new Date(user.created_at).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                        </span>
                                    ) : (
                                        <span className="text-gray-500 italic">N/A</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 font-mono text-gray-300">
                                    {user.university_id || 'N/A'}
                                </td>
                                <td className="px-6 py-4">
                                    {user.university_card ? (
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <button className="text-blue-400 hover:text-blue-300 transition flex items-center gap-1 w-max">
                                                    <Eye className="w-4 h-4" />
                                                    View ID
                                                </button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[625px] bg-gray-800 border-gray-700">
                                                {/* Student ID Card */}
                                                <div className="mb-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border border-slate-700 overflow-hidden">
                                                    <div className="p-3 border-b border-slate-700 flex justify-between items-center">
                                                        <h3 className="text-lg font-medium text-gray-100">Student ID Card</h3>
                                                        <span className="text-xs text-slate-400">ID: {user.university_id}</span>
                                                    </div>

                                                    <div className="p-4 flex flex-col md:flex-row gap-4">
                                                        {/* University Card Image */}
                                                        <div className="flex-shrink-0 flex flex-col items-center gap-2">
                                                            <div className={`w-20 h-20 rounded-md flex items-center justify-center border overflow-hidden ${user?.status === 'REJECTED'
                                                                ? 'bg-rose-900/20 border-rose-700'
                                                                : 'bg-slate-700 border-slate-600'
                                                                }`}>
                                                                {user.university_card ? (
                                                                    <svg
                                                                        className={`w-10 h-10 ${user?.status === 'REJECTED'
                                                                            ? 'text-rose-400'
                                                                            : 'text-slate-400'
                                                                            }`}
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        viewBox="0 0 24 24"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={1.5}
                                                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                                                        />
                                                                    </svg>

                                                                ) : (
                                                                    <img
                                                                        src={user.university_card}
                                                                        alt="University card"
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                )}
                                                            </div>
                                                            <div className={`text-xs ${user?.status === 'REJECTED'
                                                                ? 'text-rose-400'
                                                                : 'text-slate-400'
                                                                }`}>
                                                                {user?.status === 'APPROVED'
                                                                    ? 'Verified ID'
                                                                    : user?.status === 'REJECTED'
                                                                        ? 'Rejected ID'
                                                                        : 'Verification Pending'}
                                                            </div>
                                                        </div>

                                                        {/* User Details */}
                                                        <div className="flex-grow">
                                                            <div className="mb-3">
                                                                <h4 className="text-lg font-semibold text-white">{user?.fullName}</h4>
                                                                <p className={`text-xs ${user?.status === 'REJECTED'
                                                                    ? 'text-rose-300'
                                                                    : 'text-slate-300'
                                                                    }`}>
                                                                    {user?.role || 'Student'}
                                                                </p>
                                                            </div>

                                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                                <div>
                                                                    <p className="text-slate-400">Email</p>
                                                                    <p className="text-white font-medium truncate">{user?.email}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-slate-400">Status</p>
                                                                    <div className="flex items-center gap-1">
                                                                        <span className={`w-2 h-2 rounded-full ${user?.status === 'APPROVED'
                                                                            ? 'bg-green-500'
                                                                            : user?.status === 'REJECTED'
                                                                                ? 'bg-red-500'
                                                                                : 'bg-amber-500'
                                                                            }`}></span>
                                                                        <span className="text-white font-medium capitalize">
                                                                            {user?.status?.toLowerCase()}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-span-2">
                                                                    <p className="text-slate-400">Last Active</p>
                                                                    <p className="text-white font-medium">
                                                                        {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    ) : (
                                        <span className="text-gray-500 italic">Not provided</span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full ${user.status === 'APPROVED'
                                            ? 'bg-green-900/50 text-green-300'
                                            : user.status === 'REJECTED'
                                                ? 'bg-red-900/50 text-red-300'
                                                : 'bg-yellow-900/50 text-yellow-300' // This will handle both PENDING and null cases
                                            }`}
                                    >
                                        {user.status || 'PENDING'} {/* Show PENDING if status is null */}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-end">
                                        <ActionButton
                                            userId={user.id}
                                            currentStatus={user.status}
                                            updateUserStatus={updateUserStatus}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {userInfo.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    No account requests found
                </div>
            )}
        </div>
    );
};

export default Page;