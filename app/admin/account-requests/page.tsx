// app/admin/account-requests/page.tsx
import ActionButton from '@/components/admin/ActionButton';
import { db } from '@/database/drizzle';
import { users } from '@/database/schema';
import config from '@/lib/config';
import { Eye } from 'lucide-react';
import React from 'react';
import { updateUserStatus } from '@/lib/actions/update-user-status';


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
                                        <a
                                            href={`${config.env.imagekit.urlEndpoint}${user.university_card}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 hover:text-blue-300 transition flex items-center gap-1 w-max"
                                        >
                                            <Eye className="w-4 h-4" />
                                            View ID
                                        </a>
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