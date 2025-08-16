'use client';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Input, Button, Form, addToast } from '@heroui/react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

interface AuthFormProps {
  mode: 'login' | 'register';
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp, logInWithGoogle } = useAuth();
  const router = useRouter();

  const isLogin = mode === 'login';
  const title = isLogin ? 'Welcome Back!' : 'Sign Up';
  const subtitle = isLogin ? 'Sign in to your account' : '';
  const submitText = isLogin ? 'Sign In' : 'Sign Up';
  const linkText = isLogin ? "Don't have an account?" : 'Already have an account?';
  const linkHref = isLogin ? '/register' : '/login';
  const linkLabel = isLogin ? 'Sign Up' : 'Sign In';

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
        title: `Error ${isLogin ? 'logging in' : 'signing up'}`,
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
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
      router.push("/dashboard");
    } catch (error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      else message = String(error);
      addToast({
        title: `Error ${isLogin ? 'logging in' : 'signing up'}`,
        description: `${message}`,
        color: 'danger',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 justify-center items-center p-4">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-center">{title}</h1>
        {subtitle && <p className="text-small text-default-500 text-center">{subtitle}</p>}
      </div>

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
            {isLoading ? `${submitText.slice(0, -2)}ing ${submitText.slice(-2)}...` : submitText}
          </Button>
        </Form>

        <div className="flex items-center w-full my-4">
          <div className="flex-grow border-t border-default-300"></div>
          <span className="mx-4 text-default-500">or</span>
          <div className="flex-grow border-t border-default-300"></div>
        </div>

        <Button
          size="lg"
          radius="full"
          className="w-full bg-foreground text-default-100"
          disabled={isLoading}
          isLoading={isLoading}
          onPress={handleGoogleLogin}>
          <Image src="/google-icon.svg" alt="google icon" width={32} height={32} />
          {isLoading ? 'Signing In...' : 'Sign In With Google'}
        </Button>

        <div className="text-center text-small">
          <span className="text-default-500">{linkText} </span>
          <Link href={linkHref} className="text-primary-600 hover:text-primary-500 font-medium">
            {linkLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
