import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function LoginScreen() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ email, password }) => {
    //delay for 5 seconds
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        setLoading(false);
        toast.error(result.error);
      }
    } catch (err) {
      setLoading(false);

      toast.error(getError(err));
    }
  };
  return (
    <Layout title="Login">
      {
        //making full page animated faded preloader for login page with tailwind css

        loading && (
          <div className="flex items-center justify-center h-screen">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-blue-400 h-12 w-12"></div>
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-blue-400 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-blue-400 rounded"></div>
                  <div className="h-4 bg-blue-400 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        )
      }
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Email is invalid',
              },
            })}
            className="w-full"
            id="email"
            autoFocus
          ></input>
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register('password', {
              required: 'Please enter password',
              minLength: { value: 6, message: 'password is more than 5 chars' },
            })}
            className="w-full"
            id="password"
            autoFocus
          ></input>
          {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4 ">
          <button
            className={
              ////yellow tailwind button
              'bg-black  hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
            }
          >
            Login
          </button>
        </div>
        <div className="mb-4 ">
          Don&apos;t have an account? &nbsp;
          <Link
            href={`/register`}
            className={
              ////yellow tailwind button
              'bg-black  hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
            }
          >
            Register
          </Link>
        </div>
      </form>
    </Layout>
  );
}
