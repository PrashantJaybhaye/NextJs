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
                        <div className={`w-2 h-2 rounded-full ${
                            userInfo?.verificationStatus === 'REJECTED' ? 'bg-red-500' : 'bg-green-500'
                        }`}></div>
                        <p className="text-sm text-gray-300 font-medium">
                            {userInfo?.verificationStatus === 'REJECTED' ? 'Rejected' : 'Active'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Student ID Card */}
            <div className="mb-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border border-slate-700 overflow-hidden">
                <div className="p-3 border-b border-slate-700 flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-100">Student ID Card</h3>
                    <span className="text-xs text-slate-400">ID: {userInfo?.studentId}</span>
                </div>

                <div className="p-4 flex flex-col md:flex-row gap-4">
                    {/* University Card Image */}
                    <div className="flex-shrink-0 flex flex-col items-center gap-2">
                        <div className={`w-20 h-20 rounded-md flex items-center justify-center border overflow-hidden ${
                            userInfo?.verificationStatus === 'REJECTED' 
                                ? 'bg-rose-900/20 border-rose-700' 
                                : 'bg-slate-700 border-slate-600'
                        }`}>
                            {userInfo?.universityCard ? (
                                <img
                                    src={userInfo.universityCard}
                                    alt="University card"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <svg
                                    className={`w-10 h-10 ${
                                        userInfo?.verificationStatus === 'REJECTED' 
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
                            )}
                        </div>
                        <div className={`text-xs ${
                            userInfo?.verificationStatus === 'REJECTED' 
                                ? 'text-rose-400' 
                                : 'text-slate-400'
                        }`}>
                            {userInfo?.verificationStatus === 'APPROVED' 
                                ? 'Verified ID' 
                                : userInfo?.verificationStatus === 'REJECTED'
                                    ? 'Rejected ID'
                                    : 'Verification Pending'}
                        </div>
                    </div>

                    {/* User Details */}
                    <div className="flex-grow">
                        <div className="mb-3">
                            <h4 className="text-lg font-semibold text-white">{userInfo?.fullName}</h4>
                            <p className={`text-xs ${
                                userInfo?.verificationStatus === 'REJECTED' 
                                    ? 'text-rose-300' 
                                    : 'text-slate-300'
                            }`}>
                                {userInfo?.role || 'Student'}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-slate-400">Email</p>
                                <p className="text-white font-medium truncate">{userInfo?.email}</p>
                            </div>
                            <div>
                                <p className="text-slate-400">Status</p>
                                <div className="flex items-center gap-1">
                                    <span className={`w-2 h-2 rounded-full ${
                                        userInfo?.verificationStatus === 'APPROVED' 
                                            ? 'bg-green-500'
                                            : userInfo?.verificationStatus === 'REJECTED'
                                                ? 'bg-red-500'
                                                : 'bg-amber-500'
                                    }`}></span>
                                    <span className="text-white font-medium capitalize">
                                        {userInfo?.verificationStatus?.toLowerCase()}
                                    </span>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <p className="text-slate-400">Last Active</p>
                                <p className="text-white font-medium">
                                    {new Date(userInfo?.Created).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileId