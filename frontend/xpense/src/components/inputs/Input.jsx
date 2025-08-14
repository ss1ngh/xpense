import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'

const Input = ({ value, onChange, placeholder, type, label }) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  const isPassword = type === 'password'
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

  return (
    <div>
      <label className='text-[13px] text-slate-800'>{label}</label>

      <div className="relative mt-3 mb-4">
        <input
          type={inputType} 
          placeholder={placeholder}
          className='w-full bg-slate-100 rounded text-sm px-4 py-3 pr-10 border border-slate-200 outline-none'
          value={value}
          onChange={onChange}
        />

        {isPassword && (
          <span
            onClick={togglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            {showPassword ? (
              <FaRegEye size={18} className="text-slate-500" />
            ) : (
              <FaRegEyeSlash size={20} className="text-slate-400" />
            )}
          </span>
        )}
      </div>
    </div>
  )
}

export default Input
