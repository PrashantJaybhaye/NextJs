import { useState, useRef, useEffect } from 'react'
import { HexAlphaColorPicker, HexColorInput, HexColorPicker } from 'react-colorful'

interface Props {
    value?: string
    onPickerChange: (color: string) => void
}

const ColorPicker = ({ value = "#3b82f6", onPickerChange }: Props) => {
    const [isOpen, setIsOpen] = useState(false)
    const popoverRef = useRef<HTMLDivElement>(null)
    
    // Close popover when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }
        
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    return (
        <div className='relative w-full'>
            {/* Color preview button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full p-2 rounded-lg border border-[#374151] bg-[#1f2937] hover:bg-[#334155] transition-colors"
            >
                <div className="flex items-center gap-2">
                    <div 
                        className="w-6 h-6 rounded border border-[#374151]" 
                        style={{ backgroundColor: value }} 
                    />
                    <span className="text-sm text-gray-300">Color</span>
                </div>
                <span className="text-sm font-medium text-gray-400">#{value.replace('#', '')}</span>
            </button>
            
            {/* Color picker popover */}
            {isOpen && (
                <div 
                    ref={popoverRef}
                    className="absolute z-20 mt-2 p-4 rounded-xl shadow-xl bg-[#1f2937] border border-[#374151]"
                    style={{
                        left: '50%',
                        transform: 'translateX(-50%)',
                        maxWidth: 'calc(100vw - 2rem)',
                        width: '280px',
                    }}
                >
                    <HexColorPicker 
                        color={value} 
                        onChange={onPickerChange} 
                        className="w-full !h-48 mx-auto"
                    />
                    
                    <div className="mt-4 flex items-center">
                        <span className="text-gray-400 mr-2">#</span>
                        <HexColorInput 
                            color={value} 
                            onChange={onPickerChange} 
                            className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-[#0d1117] text-white border border-[#374151] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    
                    {/* Mobile-friendly close button */}
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="mt-4 w-full py-2 text-sm font-medium rounded-lg bg-[#374151] text-gray-300 hover:bg-[#4b5563] md:hidden"
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    )
}

export default ColorPicker