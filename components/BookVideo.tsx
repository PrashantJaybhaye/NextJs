'use client'
import config from '@/lib/config'
import { IKVideo, ImageKitProvider } from 'imagekitio-next'
import React from 'react'

const BookVideo = ({ videoUrl }: { videoUrl: string }) => {
    console.log(videoUrl)

    return <div className="w-full rounded-xl">
        <ImageKitProvider
            publicKey={config.env.imagekit.publicKey}
            urlEndpoint={config.env.imagekit.urlEndpoint}
        >
            {!videoUrl ? (
                <IKVideo
                    path={videoUrl}
                    controls
                    className="w-full rounded-xl"
                />
            ) : (
                <div className="border border-dashed border-gray-400 rounded-xl p-6 text-center text-gray-600">
                    <span className="text-4xl mb-2">🚧</span>
                    <p className="text-lg font-semibold">Video Preview Coming Soon</p>
                    <p className="text-sm text-gray-400">This feature is currently under development.</p>
                </div>
            )}

        </ImageKitProvider>
    </div>

}

export default BookVideo