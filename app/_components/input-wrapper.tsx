//consider completed

import React from "react";
import Icon from "./icon-wrapper";

interface InputWrapperProps {
  label?: string;
  subtext?: string;
  type: string;
  name: string;
  value?: string | number | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  width: string;
  grow?: boolean;
  className?: string;
}

interface TextareaWrapperProps {
    label?: string;
    name: string;
    value?: string | number | undefined;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    width: string;
    height: string;
    className?: string;
}

interface PasswordWrapperProps {
    label?: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    width: string;
    className?: string;
}

interface SelectWrapperProps {
    label?: string;
    name: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: string[];
    width: string;
    className?: string;
}

const Input: React.FC<InputWrapperProps> = ({
  label,
  subtext,
  type,
  name,
  value,
  onChange,
  placeholder,
  width,
  grow,
  className = "",
}) => {
  return (
    <div className={`relative flex flex-col ${grow? 'flex-grow' : ''}`}>
      {label && <label htmlFor={name} className="text-lg text-eventr-gray-100">{label}</label>}
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`px-2.5 ${(type==='date' || type==='time') ? 'py-[5px]' : 'py-1.5'} ${width} bg-eventr-gray-800 rounded-md border border-eventr-gray-700 outline-none ${className}`}
      />
    {subtext && <p className="text-sm text-zinc-400">{subtext}</p>}
    </div>
  );
};

const Textarea: React.FC<TextareaWrapperProps> = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    width,
    height,
    className = "",
}) => {
    return (
        <div className="relative flex flex-col">
            {label && <label htmlFor={name} className="text-lg text-eventr-gray-100">{label}</label>}
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`px-2.5 py-1.5 ${width} ${height} resize-none bg-eventr-gray-800 rounded-md border border-eventr-gray-700 outline-none ${className}`}
            />
        </div>
    );
};



const Select: React.FC<SelectWrapperProps> = ({
    label,
    name,
    value,
    onChange,
    options,
    width,
    className = "",
}) => {
    return (
        <div className="relative flex flex-col">
            {label && <label htmlFor={name} className="text-lg text-eventr-gray-100">{label}</label>}
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className={`px-2.5 py-2 ${width}  bg-eventr-gray-800 rounded-md border border-eventr-gray-700 outline-none ${className}`}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};


const Password: React.FC<PasswordWrapperProps> = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    width,
    className = "",
}) => {
    const [isPassVisible, setPassVisible] = React.useState(false);

    return (
        <div className="relative flex flex-col">
            {label && <label htmlFor={name} className="text-lg text-eventr-gray-100">{label}</label>}
            <input
                type={isPassVisible ? "text" : "password"}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`px-2.5 py-1.5 ${width} bg-eventr-gray-800 rounded-md border border-eventr-gray-700 outline-none ${className}`}
            />
            <button
                type="button"
                onClick={() => setPassVisible(!isPassVisible)}
                className={`absolute right-2 ${label ? 'top-[36px]' : 'top-2'} flex items-center text-eventr-gray-200`}
            >
                {isPassVisible ? <Icon icon='visibility' size="20px"/> : <Icon icon='visibility_off' size="20px"/>}
            </button>
        </div>
    );
};


export { Input, Textarea, Select, Password };