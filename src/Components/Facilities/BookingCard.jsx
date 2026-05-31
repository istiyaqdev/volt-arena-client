'use client';

import { useState } from 'react';
import { Select, ListBox, Label } from '@heroui/react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { FiArrowRight } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const BookingCard = ({ facility }) => {
    const { _id, facilityName, price, slots, imageUrl } = facility;
    const slotsArray = Array.isArray(slots)
        ? slots
        : typeof slots === 'string'
            ? slots.split(',')
            : [];
    const [hours, setHours] = useState(1);
    const [selectedSlot, setSelectedSlot] = useState('');
    const [date, setDate] = useState('');
    const [booked, setBooked] = useState(false);

    const { data: session } = authClient.useSession();
    const user = session?.user;
    const router = useRouter();

    const total = (price * hours).toFixed(2);

    const handleBooking = async () => {
        if (!user) {
            toast.error("Please log in to book a facility.");
            router.push('/login');
            return;
        }

        if (!date) {
            toast.error("Please select a booking date.");
            return;
        }
        if (!selectedSlot || selectedSlot.size === 0) {
            toast.error("Please choose a time slot.");
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user?.id,
                    userImage: user?.image,
                    userName: user?.name,
                    userEmail: user?.email,
                    facilityId: _id,
                    facilityName,
                    imageUrl,
                    date,
                    slot: selectedSlot,
                    hours,
                    totalPrice: Number(total),
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Booking failed');

            setBooked(true);
            toast.success('Booked Successfully!');
        } catch (err) {
            console.error(err);
            toast.error(err.message || 'Something went wrong.');
        }
    };

    return (
        <div className="rounded-2xl border border-slate-800/80 shadow-xl bg-slate-900 p-6 flex flex-col gap-5 sticky top-6">
            <h2 className="text-xl font-bold text-white uppercase tracking-wide">Book this facility</h2>

            {/* Facility name (read-only) */}
            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-400">Facility</label>
                <div className="rounded-xl border border-slate-850 bg-slate-950 px-4 py-2.5 text-sm text-slate-400">
                    {facilityName}
                </div>
            </div>

            {/* Date */}
            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-400">Booking date</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toLocaleDateString('en-CA')}
                    disabled={booked}
                    required
                    className="w-full rounded-xl border border-slate-850 bg-slate-950 px-4 py-2.5 text-sm text-slate-350 focus:outline-none focus:border-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                />
            </div>

            {/* Time Slot */}
            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-400">Time slot</label>
                <Select
                    placeholder="Choose a slot"
                    selectedKeys={selectedSlot}
                    onSelectionChange={(key) => setSelectedSlot(key)}
                    className="w-full rounded-xl border border-slate-850 bg-slate-950"
                >
                    <Select.Trigger className="w-full border-none outline-none ring-0 shadow-none bg-transparent px-4 h-11 text-sm text-slate-350">
                        <Select.Value placeholder="Choose a slot" />
                    </Select.Trigger>
                    <Select.Popover className="max-w-80 rounded-xl border border-slate-800 shadow-md bg-slate-900">
                        <ListBox>
                            {slotsArray.map((slot) => (
                                <ListBox.Item key={slot} id={slot} textValue={slot} className="px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 cursor-pointer">
                                    {slot}
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                            ))}
                        </ListBox>
                    </Select.Popover>
                </Select>
            </div>

            {/* Hours */}
            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-400">Hours</label>
                <input
                    type="number"
                    min={1}
                    max={12}
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    disabled={booked}
                    className="rounded-xl border border-slate-850 bg-slate-950 px-4 py-2.5 text-sm text-slate-350 focus:outline-none focus:border-[#ccff00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                />
            </div>

            {/* Total */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-800">
                <span className="text-sm text-slate-400">Total</span>
                <span className="text-2xl font-black text-[#ccff00]">${total}</span>
            </div>

            {/* Button */}
            <button
                onClick={handleBooking}
                disabled={booked}
                className={`w-full transition-all text-sm font-extrabold py-2.5 rounded-lg flex items-center justify-center gap-2
                        ${booked
                        ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                        : "bg-[#ccff00] hover:bg-[#ccff00]/90 text-black shadow-[0_0_12px_rgba(204,255,0,0.3)] cursor-pointer"
                    }`}
            >
                {booked ? "Booked" : user ? "Book Now" : "Login to Book"}
                {!booked && <FiArrowRight className="w-4 h-4" />}
            </button>
        </div>
    );
};

export default BookingCard;