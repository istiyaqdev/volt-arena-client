import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';
import { MdSportsSoccer } from 'react-icons/md';
import { BsCalendarX } from 'react-icons/bs';
import Image from 'next/image';
import BookingCancel from '@/Components/Facilities/BookingCancel';

export const metadata = {
    title: "VoltArena | My Bookings",
};

const MyBookings = async () => {
    const session = await auth.api.getSession({ headers: await headers() });
    const user = session?.user;
    const tokenData = await auth.api.getToken({
        headers: await headers()
    });
    const token = tokenData?.token;

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${user?.id}`, {
        headers: {
            authorization: `Bearer ${token}`
        },
        cache: 'no-store',
    });
    const bookings = await res.json();

    return (
        <div className="w-11/12 max-w-5xl mx-auto my-10 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white">My Bookings</h1>
                <p className="text-sm text-slate-400 mt-1">All your reservations in one place.</p>
            </div>

            {/* Empty State */}
            {bookings.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 gap-5 text-center">
                    <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-850 flex items-center justify-center">
                        <BsCalendarX className="w-9 h-9 text-slate-500" />
                    </div>
                    <div className="space-y-1.5">
                        <h2 className="text-xl font-extrabold text-white uppercase tracking-wide">No bookings yet</h2>
                        <p className="text-sm text-slate-400 max-w-xs">
                            You haven't booked any facility yet. Explore facilities and plan your next{' '}
                            <MdSportsSoccer className="inline w-4 h-4 text-slate-400 mb-0.5" />!
                        </p>
                    </div>
                    <Link
                        href="/facilities"
                        className="mt-2 bg-[#ccff00] hover:bg-[#ccff00]/90 text-black text-sm font-bold px-6 py-2.5 rounded-xl transition-all shadow-[0_0_12px_rgba(204,255,0,0.3)]"
                    >
                        Explore Facilities
                    </Link>
                </div>
            ) : (
                <>
                    {/* Desktop Table */}
                    <div className="hidden md:block rounded-2xl border border-slate-800 overflow-hidden bg-[#0b0f19]">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-900 border-b border-slate-800">
                                <tr>
                                    {['Facility', 'Date', 'Slot', 'Hours', 'Price', 'Status', 'Action'].map((h) => (
                                        <th key={h} className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider px-5 py-3.5">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60 bg-[#0b0f19]">
                                {bookings.map((booking) => (
                                    <tr key={booking._id} className="hover:bg-slate-800/20 transition-colors">
                                        {/* Facility */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                {booking.imageUrl && (
                                                    <Image
                                                        height={400}
                                                        width={400}
                                                        src={booking.imageUrl}
                                                        alt={booking.facilityName}
                                                        className="w-10 h-10 rounded-lg object-cover shrink-0"
                                                    />
                                                )}
                                                <span className="font-semibold text-white">{booking.facilityName}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-slate-300 font-medium">{booking.date}</td>
                                        <td className="px-5 py-4 text-slate-300 font-medium">{booking.slot}</td>
                                        <td className="px-5 py-4 text-slate-300 font-medium">{booking.hours}</td>
                                        <td className="px-5 py-4 font-bold text-[#ccff00]">${booking.totalPrice?.toFixed(2)}</td>
                                        <td className="px-5 py-4">
                                            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-950/40 text-green-400 border border-green-900/40">
                                                Confirmed
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <BookingCancel bookingId={booking._id} facilityName={booking.facilityName} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="flex flex-col gap-4 md:hidden">
                        {bookings.map((booking) => (
                            <div key={booking._id} className="rounded-2xl border border-slate-800 bg-[#0b0f19] p-4 space-y-4">
                                <div className="flex items-center gap-3">
                                    {booking.imageUrl && (
                                        <Image
                                            height={400}
                                            width={400}
                                            src={booking.imageUrl}
                                            alt={booking.facilityName}
                                            className="w-12 h-12 rounded-xl object-cover shrink-0"
                                        />
                                    )}
                                    <div>
                                        <p className="font-bold text-white uppercase tracking-wide">{booking.facilityName}</p>
                                        <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-950/40 text-green-400 border border-green-900/40">
                                            Confirmed
                                        </span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm text-slate-300">
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wide">Date</p>
                                        <p className="font-semibold text-slate-200">{booking.date}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wide">Slot</p>
                                        <p className="font-semibold text-slate-200">{booking.slot}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wide">Hours</p>
                                        <p className="font-semibold text-slate-200">{booking.hours}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wide">Price</p>
                                        <p className="font-bold text-[#ccff00]">${booking.totalPrice?.toFixed(2)}</p>
                                    </div>
                                </div>
                                <BookingCancel bookingId={booking._id} facilityName={booking.facilityName} />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default MyBookings;