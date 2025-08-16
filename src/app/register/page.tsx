'use client';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Input, Button, Form, addToast } from '@heroui/react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function RegisterForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, logInWithGoogle } = useAuth();
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await logInWithGoogle();
      router.push('/dashboard');
    } catch (error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      else message = String(error);
      addToast({
        title: 'Error logging in',
        description: `${message}`,
        color: 'danger',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget as HTMLFormElement));
    const email = formData.email as string;
    const password = formData.password as string;
    setIsLoading(true);
    try {
      await signUp(email, password);
      router.push('/login');
    } catch (error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      else message = String(error);
      addToast({
        title: 'Error signing up',
        description: `${message}`,
        color: 'danger',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 justify-center items-center p-4">
      <h1 className="text-2xl font-bold text-center">Sign Up</h1>
      <div className="w-full max-w-sm space-y-6">
        <Form onSubmit={onSubmit} className="space-y-6">
          <Input
            type="email"
            name="email"
            placeholder="Enter email"
            isRequired
            variant="bordered"
            color="primary"
            size="lg"
            errorMessage={({ validationDetails, validationErrors }) => {
              if (validationDetails.typeMismatch || validationDetails.valueMissing) {
                return 'Please enter a valid email address';
              }
              return validationErrors;
            }}
          />
          <Input
            placeholder="Enter password"
            name="password"
            isRequired
            variant="bordered"
            color="primary"
            size="lg"
            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <EyeSlashIcon className="h-5 w-5 text-default-400 pointer-events-none" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? 'text' : 'password'}
            errorMessage={({ validationDetails, validationErrors }) => {
              if (validationDetails.typeMismatch || validationDetails.valueMissing) {
                return 'Please enter a password.';
              }
              return validationErrors;
            }}
          />

          <Button
            type="submit"
            color="primary"
            size="lg"
            radius="full"
            className="w-full"
            disabled={isLoading}
            isLoading={isLoading}>
            Sign Up
          </Button>
        </Form>

        <div className="flex items-center w-full my-4">
          <div className="flex-grow border-t border-default-300"></div>
          <span className="mx-4 text-default-500">or</span>
          <div className="flex-grow border-t border-default-300"></div>
        </div>
        <Button
          type="submit"
          size="lg"
          radius="full"
          className="w-full bg-foreground text-default-100"
          disabled={isLoading}
          isLoading={isLoading}
          onPress={handleGoogleLogin}>
          <Image src="/google-icon.svg" alt="google icon" width={32} height={32} />
          {isLoading ? 'Signing In...' : 'Sign In With Google'}
        </Button>
      </div>
    </div>
  );
}
