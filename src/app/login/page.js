'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import logo from '../../../public/cypartal logo 1.svg';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { trimValidation } from '../utility/Utilitis';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { useRefreshTokenStore, useTokenStore } from '../store/useStore';



export default function LoginPage() {
  const [passwordEye, setPasswordEye] = useState(false);
  const { refreshToken, setRefreshToken } = useRefreshTokenStore();
  const { token, setToken } = useTokenStore();
  const toast = useRef(null);
  const router = useRouter();
  useEffect(() => {
    if (token) {
      router.push('/profile');
    }
  }, [token, router]);
  const {
    control,
    handleSubmit,
    setError,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const handlePasswordClick = () => {
    setPasswordEye(!passwordEye);
  };

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post('https://cyparta-backend-gf7qm.ondigitalocean.app/api/login/', formData);
      const data = response.data;
      if (response.status === 200) {
        setToken(data.access);
        setRefreshToken(data.refresh);
        router.push('/profile');
      }
    } catch (error) {
      // Check for 401 error specifically
      if (error.response?.status === 401) {
        // Handle unauthorized access, such as showing a message or refreshing the token
        toast.current.show({
          severity: 'error',
          summary: 'Unauthorized',
          detail: error.response.data.detail ,
          life: 5000,
        });
      } else if (error.response?.data?.detail) {
        // Handle other errors
        setError('apiError', { message: error.response.data.detail });
        setTimeout(() => {
          setError('apiError', null);
        }, 5000);
      } else {
        // General error handling
        toast.current.show({
          severity: 'error',
          summary: 'Error',
          detail: error.message || 'Something went wrong. Please try again later',
          life: 2000,
        });
      }
    }
  };
  

  return (
    <>
      <Toast ref={toast} />
      <div className="flex flex-col items-center  min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <div className="flex justify-center mb-6">
            <Image src={logo} alt="Logo" width={150} height={50} />
          </div>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address <span className="ml-1 text-red-500">*</span>
              </label>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid Email Address',
                  },
                }}
                render={({ field }) => (
                  <InputText
                    id="email"
                    type="email"
                    {...field}
                    placeholder="hagar@cyparta.com"
                    className="w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
                  />
                )}
              />
              {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password<span className="ml-1 text-red-500">*</span>
              </label>
              <div className={`flex items-center mt-1 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'} focus-within:ring-black focus-within:border-black`}>
                <span className="p-2 cursor-pointer" onClick={handlePasswordClick}>
                  <i className={`pi ${passwordEye ? 'pi-eye' : 'pi-eye-slash'}`} />
                </span>
                <InputText
                  placeholder="Password (8 or more characters)"
                  className="w-full px-3 py-2 focus:outline-none sm:text-sm"
                  name="password"
                  type={passwordEye ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required',
                    validate: (value) => trimValidation(value, 'Password'),
                  })}
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            {errors.apiError && <div className="text-sm text-red-500">{errors.apiError.message}</div>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
