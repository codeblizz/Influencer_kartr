'use client';

import { z } from 'zod';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppStore, Notification } from '@/store/app-store';
import { Mail, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const { addNotification } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const session = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/forgot', {
        method: 'POST',
        headers: { authorization: `Bearer ${session.data?.accessToken}` },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      setIsSubmitted(true);
      addNotification({
        title: res.title,
        message: res.message,
        type: res.status,
      } satisfies Notification);
    } catch (error) {
      const err = error as unknown as {
        message: string;
        type: Notification['type'];
      };
      addNotification({
        title: 'Error',
        type: err.type,
        message: err.message,
      } satisfies Notification);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur">
          <CardHeader className="space-y-6 pb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="flex flex-col items-center space-y-4"
            >
              <div className="h-16 w-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-primary-foreground font-bold text-2xl">
                  K
                </span>
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-bold">Kartr</h1>
                <p className="text-sm text-muted-foreground">
                  Shine and Connect
                </p>
              </div>
            </motion.div>

            <div className="text-center space-y-2">
              <CardTitle className="text-2xl">
                {isSubmitted ? 'Check Your Email' : 'Forgot Password?'}
              </CardTitle>
              <CardDescription>
                {isSubmitted
                  ? `We've sent a password reset link to ${getValues('email')}`
                  : "Enter your email address and we'll send you a link to reset your password"}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
              >
                <div className="flex justify-center">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {`If an account with that email exists, you'll receive a
                    password reset link shortly.`}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {`Didn't receive the email? Check your spam folder or try
                    again.`}
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsSubmitted(false)}
                >
                  Try Different Email
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
                      {...register('email')}
                    />
                  </div>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-destructive"
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending reset link...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </Button>
              </form>
            )}

            <div className="text-center">
              <Link
                href="/login"
                className="inline-flex items-center text-sm text-primary hover:underline"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
