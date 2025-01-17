import React, { useState } from 'react'
import {motion} from 'framer-motion'
import { useAuthStore } from '../store/authStore';
import { useNavigate, useParams } from 'react-router-dom';
import { Lock } from 'lucide-react';
import Input from '../components/Input';
import toast from 'react-hot-toast';
import "./ResetPassword.css"

const ResetPasswordPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const {resetPassword, error, isLoading, message} = useAuthStore();

    const {token} = useParams();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            alert("Passwords do not match");
            return;
        }
        try {
            await resetPassword(token, password);
            toast.success("Password reset successfully, redirecting to login page...");
            setTimeout(()=>{
                navigate("/login");
            }, 2000);
        } catch (e) {
            toast.error(error.message || "error resetting password");
        }   
    }

    return (
        <div className='reset-container'>
            <div className='p-8'>

				<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-red-400 to-red-500 text-transparent bg-clip-text'>
					Reset Password
				</h2>

				{error && <p className='text-black-500 text-sm mb-4'>{error}</p>}

				{message && <p className='text-red-500 text-sm mb-4'>{message}</p>}

				<form onSubmit={handleSubmit}>
					<Input
						icon={Lock}
						type='password'
						placeholder='New Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>

					<Input
						icon={Lock}
						type='password'
						placeholder='Confirm New Password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>

					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className='w-full py-3 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg shadow-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
						type='submit'
						disabled={isLoading}
					>
						{isLoading ? "Resetting..." : "Set New Password"}
					</motion.button>
				</form>

			</div>

        </div>
    )
}

export default ResetPasswordPage
