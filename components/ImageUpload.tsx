"use client"

import config from '@/lib/config'
import { IKImage, ImageKitProvider, IKUpload } from 'imagekitio-next'
import Image from 'next/image';
import React, { useRef, useState } from 'react'
import { toast } from "sonner"


const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(`Request failed with status ${response.status}: ${errorText}`)
    }

    const data = await response.json();
    const { signature, expire, token } = data;

    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`)
  }
}

const ImageUpload = ({ onFileChange }: { onFileChange: (filePath: string) => void }) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onError = (error: any) => {
    console.log(error)
    toast.error("Image upload failed", {
      style: {
        background: "#4a1e1e", // deep, rich red
        color: "#ffffff", // white text
        borderRadius: "0.75rem",
        border: "2px solid #f44336", // accent red border
        boxShadow: "0 4px 24px rgba(244,67,54,0.15)",
        fontWeight: 600,
        letterSpacing: "0.02em",
        fontSize: "0.9rem",
        padding: "0.8rem 2rem",
        minWidth: "320px",
      },
      position: "top-right",
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="12" fill="#e57373" />
          <path d="M8 8l8 8M16 8l-8 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    })

  }
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath)

    toast.success("Image Uploaded Successfully!", {
      style: {
        background: "#1e4a20", // deep, rich green
        color: "#ffffff", // white text
        borderRadius: "0.75rem",
        border: "2px solid #4caf50", // accent green border
        boxShadow: "0 4px 24px rgba(76,175,80,0.15)",
        fontWeight: 600,
        letterSpacing: "0.02em",
        fontSize: "1rem",
        padding: "1rem 1.5rem",
      },
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="12" fill="#66bb6a" />
          <path d="M8 12.5l2.5 2.5 5-5" stroke="#e0ee0e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    })

  }


  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className='hidden'
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName='.png'
      />

      <button className='upload-btn' onClick={(e) => {
        e.preventDefault();

        if (ikUploadRef.current) {
          // @ts-ignore
          ikUploadRef.current?.click()
        }
      }}>
        <Image src='/icons/upload.svg' alt='upload-icon' width={20} height={20} className='object-contain' />
        <p className='text-base text-[#D6E0FF]'>Upload a file</p>

        {file && <p className='upload-filename'>{file.filePath}</p>}
      </button>

      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={300}
        />
      )}
    </ImageKitProvider>
  )
}

export default ImageUpload;