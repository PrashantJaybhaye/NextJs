"use client"

import config from '@/lib/config'
import { getInitials } from '@/lib/utils'
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'
import { IKImage } from 'imagekitio-next'
import { CheckCircle, Clock, XCircle } from 'lucide-react'
import React from 'react'

const ProfileId = ({ userInfo, session }: any) => {
    return (
        <div className='relative z-10 flex flex-col'>
            {/* User header with avatar and name */}
            <div className="flex items-center gap-4 mb-6">
                <div className="relative z-10 flex flex-col">
                    <Avatar className="w-20 h-20 rounded-full ring-4 ring-slate-700/80 ring-offset-2 ring-offset-slate-900">
                        <AvatarFallback className="bg-gradient-to-br from-amber-500/80 to-amber-700 text-white text-2xl w-full h-full flex items-center justify-center rounded-full">
                            {getInitials(session?.user?.name || '?')}
                        </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 bg-slate-800 rounded-full p-1 border-2 border-slate-900">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gradient-to-br from-green-500 to-emerald-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-bold text-gray-100">{userInfo?.fullName}</h2>
                    <p className="text-xs text-gray-400 mt-1">Member</p>
                </div>
            </div>

            {/* Verification badge with improved styling */}
            <div className="mb-6">
                <div className="flex items-center gap-1 mb-1">
                    {userInfo?.verificationStatus === 'APPROVED' && (
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-900/30 border border-emerald-800 w-full">
                            <div className="p-1 rounded-full bg-emerald-600/20">
                                <CheckCircle size={16} className="text-emerald-400" />
                            </div>
                            <span className="text-sm font-medium text-emerald-300">
                                Verified Student
                            </span>
                        </div>
                    )}
                    {userInfo?.verificationStatus === 'PENDING' && (
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-900/30 border border-amber-800 w-full">
                            <div className="p-1 rounded-full bg-amber-600/20">
                                <Clock size={16} className="text-amber-400" />
                            </div>
                            <span className="text-sm font-medium text-amber-300">
                                Verification Pending
                            </span>
                        </div>
                    )}
                    {userInfo?.verificationStatus === 'REJECTED' && (
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-rose-900/30 border border-rose-800 w-full">
                            <div className="p-1 rounded-full bg-rose-600/20">
                                <XCircle size={16} className="text-rose-400" />
                            </div>
                            <span className="text-sm font-medium text-rose-300">
                                Verification Rejected
                            </span>
                        </div>
                    )}
                </div>
                <p className="text-xs text-gray-500 mt-2 px-1">
                    {userInfo?.verificationStatus === 'APPROVED'
                        ? "Your student status is verified and you can borrow books"
                        : userInfo?.verificationStatus === 'PENDING'
                            ? "Your documents are under review. Verification usually takes 1-2 business days"
                            : "Your verification was rejected. Please contact support for more information"}
                </p>
            </div>

            {/* User information in a clean layout */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                <div>
                    <p className="text-xs text-gray-500 mb-1">Student ID</p>
                    <p className="text-sm text-gray-300 font-medium">{userInfo?.studentId}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <p className="text-sm text-gray-300 font-medium truncate">{userInfo?.email}</p>
                </div>
                <div className="col-span-2">
                    <p className="text-xs text-gray-500 mb-1">Account Status</p>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <p className="text-sm text-gray-300 font-medium">Active</p>
                    </div>
                </div>
            </div>

            {userInfo?.avatarUrl && (
                <div className='mb-3 border border-slate-700 rounded-md overflow-hidden'>
                    <IKImage
                        path={userInfo?.avatarUrl}
                        urlEndpoint={config.env.imagekit.urlEndpoint}
                        alt='Book Cover'
                        width={500}
                        height={300}
                        transformation={[{
                            quality: 80, // Fixed: changed from string to number
                        }]}
                        className='w-full h-auto max-h-44 object-contain'
                        loading='lazy'
                        lqip={{ active: true }}
                    />
                </div>
            )}
        </div>
    )
}

export default ProfileId