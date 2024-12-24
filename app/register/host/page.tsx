"use client"
import { useState, useEffect, useRef } from "react";
import secureLocalStorage from "react-secure-storage";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

import { useHostRegister } from "@/api/hooks";
import { Auth } from "@/api/types";
import Icon from "@/app/_components/icon-wrapper";
import { Input } from "@/app/_components/input-wrapper";

export default function SignUp() {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState<Auth.HostRegisterRequest>({
        username: (secureLocalStorage.getItem('username') as string),
        firstName: "",
        lastName: "",
        phoneNumber: "",
        dob: null,
        companyName: "",
        backupMail: "",
        registered: false,
        companyMail: "",
        hostedStatus: "UnderFive",
    });
    const [tempDate, setTempDate] = useState<{ year: number | null, month: number | null, day: number | null }>({
        year: null,
        month: null,
        day: null,
    });
    const [errMsg, setErrMsg] = useState<string | null>(null); 

    const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
    const [fullName, setFullName] = useState<string>("");
    const router = useRouter();
    const nameRef = useRef<HTMLInputElement>(null);
    const datePickerRef = useRef<HTMLDivElement>(null);

    const { mutate: hostRegister, isPending } = useHostRegister();

    useEffect(() => {
        if (nameRef.current) {
            nameRef.current.focus();
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
                setIsDatePickerOpen(false);
            }
        };
        if (isDatePickerOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDatePickerOpen]);

    const handleDateChange = (field: 'year' | 'month' | 'day', value: number) => {
        const updatedTempDate = { ...tempDate, [field]: value };
        setTempDate(updatedTempDate);
    
        if (updatedTempDate.year !== null && updatedTempDate.month !== null && field === 'day') {
            const newDate = new Date(updatedTempDate.year, updatedTempDate.month, value);
            setFormData(prevData => ({ ...prevData, dob: newDate }));
            setIsDatePickerOpen(false);
            setTempDate({ year: null, month: null, day: null });
        }
    };

    const renderDatePicker = () => {
        const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)
        const months = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ]
        const days = Array.from({ length: 31 }, (_, i) => i + 1)
    
        return (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
            <div className="bg-zinc-800 rounded-md shadow-lg p-4" ref={datePickerRef}>
                <div className="grid grid-cols-3 gap-2">
                    <select
                    className="bg-zinc-700 text-white rounded-md p-1"
                    onChange={(e) => handleDateChange('year', parseInt(e.target.value))}
                    value={tempDate.year || ""}
                    >
                    <option value="">Year</option>
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                    </select>
                    <select
                    className="bg-zinc-700 text-white rounded-md p-1"
                    onChange={(e) => handleDateChange('month', parseInt(e.target.value))}
                    value={tempDate.month !== null ? tempDate.month : ""}
                    >
                    <option value="">Month</option>
                    {months.map((month, index) => (
                        <option key={month} value={index}>{month}</option>
                    ))}
                    </select>
                    <select
                    className="bg-zinc-700 text-white rounded-md p-1"
                    onChange={(e) => handleDateChange('day', parseInt(e.target.value))}
                    value={tempDate.day || ""}
                    >
                    <option value="">Day</option>
                    {days.map(day => (
                        <option key={day} value={day}>{day}</option>
                    ))}
                    </select>
                </div>
            </div>
          </div>
        )
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrMsg(null);
            
        //Conditions to check if inputs are correct
        const conditions = [
            { condition: !fullName || !formData.phoneNumber || !formData.companyName, message: "Fill all the fields."},
            { condition: !/^[6-9]\d{9}$/.test(formData.phoneNumber), message: "Check your phone number." },
            { condition: fullName.trim().split(/\s+/).length > 3, message: "First, Middle and Last Name only" },
            { condition: !/^[a-zA-Z\s]+$/.test(fullName), message: "Full name should have alphabets and spaces only."},
            { condition: formData.dob === null, message: "Select your Date of Birth." },
            { condition: formData.companyMail && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.companyMail), message: "Company email is in the wrong format." },
            { condition: formData.companyName.length > 60 , message: "Company name should be under 60 characters." },
            { condition: /;/.test(fullName) || /;/.test(formData.phoneNumber) || /;/.test(formData.companyName) || /;/.test(formData.companyMail), message: "Inputs should not contain special charaters." }

        ];
        for (const { condition, message } of conditions) {
            if (condition) {
              setErrMsg(message);
              return;
            }
        }

        const nameParts = fullName.trim().split(/\s+/);
        let updatedFormData = { ...formData };

        if (nameParts.length === 3) {
            updatedFormData.firstName = nameParts[0];
            updatedFormData.middleName = nameParts[1];
            updatedFormData.lastName = nameParts.slice(2).join(" ");
        } else if (nameParts.length === 2) {
            updatedFormData.firstName = nameParts[0];
            updatedFormData.lastName = nameParts[1];
        }

        setIsSigningUp(true);
        hostRegister(updatedFormData,
            {
                onSuccess: () => {
                    router.push("/host/otp");
            },
                onError: (error) => {
                    setErrMsg(error.message);
            }
        })};


    return(
    <div className="relative flex h-full my-16 items-center justify-center rounded-lg">

        <form onSubmit={handleSubmit} className="border-2 border-eventr-gray-800 bg-eventr-gray-900 rounded-lg w-96 h-max px-6 py-8 flex flex-col gap-4 justify-center relative">

            <div className="w-full relative text-3xl">
                <p>Complete Your Host Profile</p>
            </div>

            <div className="relative h-2 mb-0.5">
                {errMsg ? <p className="text-sm text-red-600 flex gap-1"><Icon size="15px" icon="warning"/> {errMsg}</p> : null}
            </div>
            
            <Input name="fullname" placeholder="Full Name" type="text" width="w-full" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <Input type='number' name='phoneNumber' width='w-full' placeholder='Phone Number' value={formData.phoneNumber} 
                onChange={(e) => setFormData(prevData => ({ ...prevData, phoneNumber: e.target.value }))} />


            <div className="relative">
                <div className="relative">
                    <div
                    className="w-full p-1 rounded-lg flex items-center bg-zinc-900 border border-gray-500 border-opacity-10 outline-none hover:ring-1 focus:ring-1 ring-gray-900"
                    onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                    >
                    <Icon icon='calendar_month' size="18px" className="mr-2 text-zinc-400" />
                    {formData.dob ? <p>{format(formData.dob, "dd/MM/yyyy")}</p> : <p className="text-zinc-400">Date of Birth</p>}
                    </div>
                    {isDatePickerOpen && renderDatePicker()}
                </div>
            </div>

            <Input name="companyName" placeholder="Company Name" type="text" width="w-full" value={formData.companyName} 
                onChange={(e) => setFormData(prevData => ({ ...prevData, companyName: e.target.value }))} />
            
            
            <div className="relative flex gap-1 -mt-2 text-xs text-zinc-400">
                <input
                    className="opacity-75"
                    id="isCompanyRegistered"
                    name="isCompanyRegistered"
                    type="checkbox"
                    onChange={(e) => setFormData(prevData => ({ ...prevData, registered: e.target.checked }))}
                />
                <label htmlFor="isCompanyRegistered" className="text-xs text-zinc-400">
                    Is company registered?
                </label>
            </div>
            <Input name="companyEmail" className="-mt-1" placeholder="Company Email" type="email" width="w-full" value={formData.companyMail} 
                onChange={(e) => setFormData(prevData => ({ ...prevData, companyMail: e.target.value }))}/>

            <div className="-mt-2">
                <label htmlFor="eventsHosted" className="text-sm text-zinc-400">Events hosted to date</label>
                <select
                    id="eventsHosted"
                    name="eventsHosted"
                    value={formData.hostedStatus || "UnderFive"}
                    onChange={(e) => setFormData(prevData => ({ ...prevData, hostedStatus: e.target.value }))}
                    className="w-full p-1 rounded-lg bg-zinc-900 border border-gray-500 border-opacity-10 outline-none hover:ring-1 focus:ring-1 ring-gray-900"
                >
                    <option value="UnderFive">&lt; 5</option>
                    <option value="UnderTen">5 - 10</option>
                    <option value="UnderTwenty">10 - 20</option>
                    <option value="UnderFifty">20 - 50</option>
                    <option value="AroundHundred">50+</option>
                </select>
            </div>
            <div className="flex flex-col items-center mt-4">

                <button type="submit"
                    className="w-full p-2 rounded-lg active:scale-90 duration-200 bg-eventr-main hover:bg-eventr-main-light border-opacity-10 hover:ring-1 focus:ring-1 ring-gray-900"
                    disabled={isPending}>
                {isPending ? <p><Icon icon="progress_activity" spin /></p> : <p>Become a Host!</p>}</button>
            </div>
        </form>
    </div>
    )
}