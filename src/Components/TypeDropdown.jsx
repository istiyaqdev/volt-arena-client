"use client";
import { useState, useRef, useEffect } from "react";

const types = ['Football', 'Basketball', 'Tennis', 'Swimming', 'Cricket', 'Gym', 'Badminton', 'Volleyball', 'Other'];

export const TypeDropdown = ({ type, setType }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    return (
        <div ref={ref} className="relative sm:w-48">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between rounded-xl border border-slate-850 px-4 py-2.5 text-sm text-slate-300 bg-slate-950 hover:border-slate-700 transition-colors"
            >
                <span>{type || 'All types'}</span>
                <svg className={`w-4 h-4 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {open && (
                <div className="absolute z-50 mt-1 w-full rounded-xl border border-slate-800 bg-slate-900 shadow-xl overflow-hidden">
                    <div
                        onClick={() => { setType(''); setOpen(false); }}
                        className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${type === '' ? 'bg-[#ccff00] text-black font-semibold' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                            }`}
                    >
                        All types
                    </div>
                    {types.map(t => (
                        <div
                            key={t}
                            onClick={() => { setType(t); setOpen(false); }}
                            className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${type === t ? 'bg-[#ccff00] text-black font-semibold' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            {t}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};