"use client";
import { updateFacility } from "@/lib/action";
import { authClient } from "@/lib/auth-client";
import { Button, FieldError, Input, Label, ListBox, Modal, Surface, TextArea, TextField, Select, Form, Chip, AlertDialog } from "@heroui/react";
import { useState, useTransition } from "react";
import { FiEdit } from "react-icons/fi";

const EditModal = ({ facility }) => {

    console.log(facility);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        _id, capacity, description, facilityName, imageUrl, location, price, slots, type

    } = facility;

    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);

        const { data: tokenData } = await authClient.token()

        startTransition(async () => {
            await updateFacility(_id, formData, tokenData);
        });
        setIsSubmitting(false);
    };

    return (
        <Modal>
            <AlertDialog.Trigger>
                <button className="text-slate-400 hover:text-white text-xs font-semibold border border-slate-800 px-3 py-1.5 rounded-lg hover:bg-slate-850 transition-all cursor-pointer">
                    <FiEdit className="h-4 w-4" />
                </button>
            </AlertDialog.Trigger>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-lg bg-[#0b0f19] border border-slate-800 text-white rounded-2xl">
                        <Modal.CloseTrigger className="text-slate-400 hover:text-white" />
                        <Modal.Header className="border-b border-slate-800 pb-4">

                            <Modal.Heading className="text-xl font-bold uppercase tracking-wider text-white">Update Facility Details</Modal.Heading>
                            <p className="mt-1.5 text-xs text-slate-450">
                                Make changes to the facility specifications below
                            </p>
                        </Modal.Header>
                        <Modal.Body className="p-6 bg-[#0b0f19]">
                            <Surface className="bg-transparent">

                                <Form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                        {/* Facility Name */}
                                        <div className="md:col-span-2">
                                            <TextField name="facilityName" isRequired defaultValue={facilityName}>
                                                <Label className="text-xs font-bold text-slate-350 uppercase tracking-wider mb-1.5 block">Facility Name</Label>
                                                <Input placeholder="Enter your facility name" className="rounded-2xl p-3 bg-slate-950 border border-slate-850 text-white placeholder-slate-500" />
                                                <FieldError className="text-red-500 text-xs mt-1" />
                                            </TextField>
                                        </div>

                                        {/* Type */}
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs font-bold text-slate-350 uppercase tracking-wider mb-0.5">
                                                Facility type <span className="text-red-500">*</span>
                                            </label>
                                            <div className="w-full">
                                                <Select name="type" isRequired
                                                    defaultSelectedKey={type} className="w-full border border-slate-850 bg-slate-950 shadow-sm rounded-2xl focus-within:ring-2 focus-within:ring-[#ccff00] [&_button]:outline-none [&_button]:ring-0 [&_button]:shadow-none [&_button]:border-none" placeholder="Select type">
                                                    <Select.Trigger className="w-full border-none outline-none ring-0 shadow-none bg-transparent px-4 h-11 text-sm text-slate-300">
                                                        <Select.Value placeholder="Select type" />
                                                    </Select.Trigger>
                                                    <Select.Popover className="rounded-xl border border-slate-800 shadow-md bg-slate-900">
                                                        <ListBox>
                                                            {['Football', 'Basketball', 'Tennis', 'Swimming', 'Cricket', 'Gym', 'Badminton', 'Volleyball', 'Other'].map((type) => (
                                                                <ListBox.Item key={type} id={type} textValue={type} className="px-4 py-2.5 text-sm text-slate-305 hover:bg-slate-800 cursor-pointer">
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
                                        <TextField name="location" isRequired defaultValue={location}>
                                            <Label className="text-xs font-bold text-slate-350 uppercase tracking-wider mb-1.5 block">Location</Label>
                                            <Input placeholder="Dhaka" className="rounded-2xl p-3 bg-slate-950 border border-slate-850 text-white placeholder-slate-500" />
                                            <FieldError className="text-red-500 text-xs mt-1" />
                                        </TextField>

                                        {/* Image URL */}
                                        <div className="md:col-span-2">
                                            <TextField name="imageUrl"
                                                defaultValue={imageUrl} isRequired>
                                                <Label className="text-xs font-bold text-slate-350 uppercase tracking-wider mb-1.5 block">Image URL</Label>
                                                <Input type="url" placeholder="https://i.ibb.co/..." className="rounded-2xl p-3 bg-slate-950 border border-slate-850 text-white placeholder-slate-500" />
                                                <FieldError className="text-red-500 text-xs mt-1" />
                                            </TextField>
                                        </div>

                                        {/* Price */}
                                        <TextField name="price" isRequired defaultValue={price}>
                                            <Label className="text-xs font-bold text-slate-350 uppercase tracking-wider mb-1.5 block">Price per hour ($)</Label>
                                            <Input type="number" placeholder="0" className="rounded-2xl p-3 bg-slate-950 border border-slate-850 text-white placeholder-slate-500" />
                                            <FieldError className="text-red-500 text-xs mt-1" />
                                        </TextField>

                                        {/* Capacity */}
                                        <TextField name="capacity" isRequired defaultValue={capacity}>
                                            <Label className="text-xs font-bold text-slate-350 uppercase tracking-wider mb-1.5 block">Capacity</Label>
                                            <Input type="number" placeholder="1" className="rounded-2xl p-3 bg-slate-950 border border-slate-850 text-white placeholder-slate-500" />
                                            <FieldError className="text-red-500 text-xs mt-1" />
                                        </TextField>

                                        {/* Time Slots */}
                                        <div className="md:col-span-2 flex flex-col gap-2 w-full">
                                            <TextField name="slots" isRequired defaultValue={slots}>
                                                <Label className="text-xs font-bold text-slate-350 uppercase tracking-wider mb-1.5 block">Available time slots</Label>
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
                                                            base: 'bg-slate-955 border border-slate-850',
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
                                            <TextField name="description" defaultValue={description} isRequired>
                                                <Label className="text-xs font-bold text-slate-350 uppercase tracking-wider mb-1.5 block">Description</Label>
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
                                        {isSubmitting ? 'Updating...' : 'Update Facility'}
                                    </Button>
                                </Form>

                            </Surface>
                        </Modal.Body>

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default EditModal;