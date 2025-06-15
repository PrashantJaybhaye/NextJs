"use client"

import config from '@/lib/config'
import { cn } from '@/lib/utils';
import { IKImage, ImageKitProvider, IKUpload, IKVideo } from 'imagekitio-next'
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

interface Props {
  type: 'image' | 'video';
  accept: string;
  placeholder: string;
  folder: string;
  varient: 'dark' | 'light';
  onFileChange: (filePath: string) => void;
}

const FileUpload = ({
  type,
  accept,
  placeholder,
  folder,
  varient,
  onFileChange,

}
  : Props) => {

  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);
  const [progress, setProgress] = useState(0);

  const styles = {
    button: varient === 'dark' ? 'bg-[#232839]' : 'bg-[#D6E0FF] border-[#CBD5E1] border',
    placeholder: varient === 'dark' ? 'text-[#D6E0FF]' : 'text-slate-500',
    text: varient === 'dark' ? 'text-[#D6E0FF]' : 'text-[#1E293B]',
  }

  const onError = (error: any) => {
    console.log(error)
    toast.error(`${type} upload failed`, {
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

    toast.success(`${type} Uploaded Successfully!`, {
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

  const onValidate = (file: File) => {
    if (type === 'image') {
      if (file.size > 20 * 1024 * 1024) {

        toast.error('Image size should be less than 20MB', {
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
        })

        return false;
      }

    } else if (type === 'video') {
      if (file.size > 50 * 1024 * 1024) {

        toast.error('Video size should be less than 50MB', {
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
        })

        return false;
      }
    }

    return true;
  }

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        validateFile={onValidate}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          const percentage = Math.round((loaded / total) * 100);

          setProgress(percentage);
        }}
        folder={folder}
        accept={accept}
        className='hidden'
      />

      <button className={cn('upload-btn', styles.button)} onClick={(e) => {
        e.preventDefault();

        if (ikUploadRef.current) {
          // @ts-ignore
          ikUploadRef.current?.click()
        }
      }}>
        <Image src='/icons/upload.svg' alt='upload-icon' width={20} height={20} className='object-contain' />

        <p className={cn('text-base', styles.placeholder)} >{placeholder}</p>

        {file && (
          <p className={cn('upload-filename', styles.text)}>{file.filePath}</p>
        )}

      </button>

      {progress > 0 && progress != 100 && (
        <div className="w-full mt-1 bg-green-100 rounded-full h-3 overflow-hidden shadow-inner">
          <div
            className="bg-green-500 h-full text-white text-xs font-medium flex items-center justify-center transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      )}


      {file && (
        (type === 'image') ? (

          <IKImage
            alt={file.filePath}
            path={file.filePath}
            width={500}
            height={300}
            className='mt-3'
          />
        ) : type === 'video' ? (
          <IKVideo
            path={file.filePath}
            controls={true}
            width={500}
            height={300}
            className=" w-full rounded-xl object-contain mt-3"

          />
        ) : null)
      }
    </ImageKitProvider>
  )
}

export default FileUpload;