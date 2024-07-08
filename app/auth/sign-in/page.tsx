'use client';
import { userState } from '@/components/atoms/userAtom';
import Link from 'next/link';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRecoilState } from 'recoil';

interface SignInFormInputs {
  email: string;
  password: string;
}

const SignInForm: React.FC = () => {
  const [user, setUser] = useRecoilState(userState);
  console.log({ user });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInputs>();

  const onSubmit: SubmitHandler<SignInFormInputs> = (data) => {
    console.log(data);
    // use recoil to store the user name in local storage after successful login
    setUser({ username: data.email });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Sign In</h2>
      <div className="flex flex-col space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register('email', { required: 'Email is required' })}
          className={`border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 ${
            errors.email ? 'border-red-500' : ''
          }`}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          {...register('password', { required: 'Password is required' })}
          className={`border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 ${
            errors.password ? 'border-red-500' : ''
          }`}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
      >
        Sign In
      </button>
      {/* Sign Up Link */}
      <p className="mt-4 text-sm text-gray-600">
        Don&apos;t have an account?{' '}
        <Link href="/auth/sign-up" className="text-primary">
          Sign Up
        </Link>
      </p>
    </form>
  );
};

export default SignInForm;
