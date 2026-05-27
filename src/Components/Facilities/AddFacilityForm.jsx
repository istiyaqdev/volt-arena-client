'use client';

import { useState } from 'react';
import { Button, FieldError, Input, Label, TextField, Select, ListBox, TextArea, Chip, Form } from '@heroui/react';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';

const AddFacilityForm = ({ userId }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const facility = Object.fromEntries(formData.entries());

        const { data: tokenData } = await authClient.token();
        const payload = {
            ...facility,
            userId,
            price: Number(facility.price),
            capacity: Number(facility.capacity),
            slots: facility.slots.split(',').map(s => s.trim()).filter(Boolean),
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facility`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${tokenData?.token}`
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            // console.log(data)

            if (!res.ok) throw new Error(data.message || 'Failed to add facility');

            if (data) {
                toast.success('Facility added successfully!');
                e.target.reset();

            }

        } catch (err) {
            console.error(err);
            toast.error(err.message || 'Something went wrong.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form onSubmit={onSubmit} className="p-7 md:p-10 space-y-8 bg-[#0b0f19] rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Facility Name */}
                <div className="md:col-span-2">
                    <TextField name="facilityName" isRequired>
                        <Label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 block">Facility Name</Label>
                        <Input placeholder="Enter your facility name" className="rounded-2xl p-3 bg-slate-950 border border-slate-850 text-white placeholder-slate-500 focus:border-[#ccff00]" />
                        <FieldError className="text-red-500 text-xs mt-1" />
                    </TextField>
                </div>

                {/* Type */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-0.5">
                        Facility type <span className="text-red-500">*</span>
                    </label>
                    <div className="w-full">
                        <Select name="type" isRequired className="w-full border border-slate-850 bg-slate-950 shadow-sm rounded-2xl focus-within:ring-2 focus-within:ring-[#ccff00] [&_button]:outline-none [&_button]:ring-0 [&_button]:shadow-none [&_button]:border-none" placeholder="Select type">
                            <Select.Trigger className="w-full border-none outline-none ring-0 shadow-none bg-transparent px-4 h-11 text-sm text-slate-300">
                                <Select.Value placeholder="Select type" />
                            </Select.Trigger>
                            <Select.Popover className="rounded-xl border border-slate-800 shadow-md bg-slate-900">
                                <ListBox>
                                    {['Football', 'Basketball', 'Tennis', 'Swimming', 'Cricket', 'Gym', 'Badminton', 'Volleyball', 'Other'].map((type) => (
                                        <ListBox.Item key={type} id={type} textValue={type} className="px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 cursor-pointer">
                                            {type}
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                    ))}
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>
                </div>

                {/* Location */}
                <TextField name="location" isRequired>
                    <Label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 block">Location</Label>
                    <Input placeholder="Dhaka" className="rounded-2xl p-3 bg-slate-950 border border-slate-850 text-white placeholder-slate-500" />
                    <FieldError className="text-red-500 text-xs mt-1" />
                </TextField>

                {/* Image URL */}
                <div className="md:col-span-2">
                    <TextField name="imageUrl" isRequired>
                        <Label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 block">Image URL</Label>
                        <Input type="url" placeholder="https://i.ibb.co/..." className="rounded-2xl p-3 bg-slate-950 border border-slate-850 text-white placeholder-slate-500" />
                        <FieldError className="text-red-500 text-xs mt-1" />
                    </TextField>
                </div>

                {/* Price */}
                <TextField name="price" isRequired>
                    <Label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 block">Price per hour ($)</Label>
                    <Input type="number" placeholder="0" className="rounded-2xl p-3 bg-slate-950 border border-slate-850 text-white placeholder-slate-500" />
                    <FieldError className="text-red-500 text-xs mt-1" />
                </TextField>

                {/* Capacity */}
                <TextField name="capacity" isRequired>
                    <Label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 block">Capacity</Label>
                    <Input type="number" placeholder="1" className="rounded-2xl p-3 bg-slate-950 border border-slate-850 text-white placeholder-slate-500" />
                    <FieldError className="text-red-500 text-xs mt-1" />
                </TextField>

                {/* Time Slots */}
                <div className="md:col-span-2 flex flex-col gap-2 w-full">
                    <TextField name="slots" isRequired>
                        <Label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 block">Available time slots</Label>
                        <Input placeholder="08:00-09:00, 09:00-10:00, 18:00-19:00" className="p-3 bg-slate-950 border border-slate-850 text-white placeholder-slate-500" />
                        <FieldError className="text-red-500 text-xs mt-1" />
                    </TextField>
                    <span className="text-slate-500 text-xs mt-0.5">
                        Comma-separated time ranges
                    </span>
                    <div className="flex flex-wrap gap-2 pt-1">
                        {['08:00-09:00', '09:00-10:00', '18:00-19:00'].map((slot, i) => (
                            <Chip
                                key={i}
                                size="sm"
                                variant="flat"
                                className={{
                                    base: 'bg-slate-950 border border-slate-850',
                                    content: 'text-[#ccff00] text-xs font-semibold px-1',
                                }}
                            >
                                {slot}
                            </Chip>
                        ))}
                    </div>
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                    <TextField name="description" isRequired>
                        <Label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 block">Description</Label>
                        <TextArea placeholder="Describe the facility..." rows={4} className="rounded-2xl p-3 bg-slate-950 border border-slate-850 text-white placeholder-slate-500" />
                        <FieldError className="text-red-500 text-xs mt-1" />
                    </TextField>
                </div>
            </div>

            <Button
                type="submit"
                isDisabled={isSubmitting}
                className="w-full bg-[#ccff00] hover:bg-[#ccff00]/90 text-black font-extrabold uppercase tracking-widest py-3.5 rounded-xl transition-all shadow-[0_0_12px_rgba(204,255,0,0.3)] cursor-pointer"
            >
                {isSubmitting ? 'Submitting...' : 'Add Facility'}
            </Button>
        </Form>
    );
};

export default AddFacilityForm;