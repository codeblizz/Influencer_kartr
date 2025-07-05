'use client';

import { z } from 'zod';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/app-store';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReusableSelect } from '@/components/ui/select';
import {
  Eye,
  Mail,
  Lock,
  User,
  Globe,
  EyeOff,
  Loader2,
  LucideInfo,
  XCircleIcon,
} from 'lucide-react';
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from '@/components/ui/card';

const registerSchema = z
  .object({
    username: z.string().min(2, 'Username must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      ),
    confirmPassword: z.string(),
    accountType: z.string(),
    acceptTerms: z
      .boolean()
      .refine(
        (val) => val === true,
        'You must accept the terms and conditions'
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const [selected, setSelected] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, addNotification } = useAppStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const acceptTerms = watch('acceptTerms');

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Mock successful registration
      setUser({
        id: '3',
        email: data.email,
        name: `${data.username}`,
        avatar:
          'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      });
      addNotification({
        type: 'success',
        title: 'Account created!',
        message:
          'Welcome to Kartr! Your account has been successfully created.',
      });
      router.push('/dashboard');
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Registration failed',
        message: 'Unable to create account. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsGoogleLoading(true);

    try {
      // Simulate Google OAuth
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setUser({
        id: '4',
        name: 'Google User',
        email: 'newuser@gmail.com',
        avatar:
          'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      });

      addNotification({
        title: 'Welcome to Kartr!',
        message: 'Successfully signed up with Google.',
        type: 'success',
      });

      router.push('/dashboard');
    } catch (error) {
      addNotification({
        title: 'Google signup failed',
        message: 'Unable to sign up with Google. Please try again.',
        type: 'error',
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const togglePasswordRequirements = () => setToggle((prev) => !prev);

  const tenants = [
    { value: 'influencer', label: 'Influencer' },
    { value: 'sponsor', label: 'Sponsor' },
  ];

  const setSelectedValue = (value: string) => setSelected(value);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur">
          <CardHeader className="space-y-6 pb-8 bg-tertiary rounded-t-2xl">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="flex flex-col items-center space-y-4"
            >
              <div className="rounded-2xl flex items-center justify-center shadow-lg">
                <Image
                  src="/assets/kartr_logo.png"
                  alt="logo"
                  width={100}
                  height={100}
                  className="text-primary-foreground font-bold text-2xl"
                />
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Shine and Connect
                </p>
              </div>
            </motion.div>
            <div className="text-center space-y-2">
              <CardTitle className="text-2xl">Create Account</CardTitle>
              <CardDescription>
                Join Kartr for YouTube influencer analytics
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 my-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    placeholder="John"
                    className={`pl-10 bg-inherit border-secondary-foreground/20`}
                    {...register('username')}
                  />
                </div>
                {errors.username && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-destructive border-destructive"
                  >
                    {errors.username.message}
                  </motion.p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className={`pl-10 bg-inherit border-secondary-foreground/20`}
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-destructive border-destructive"
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="inline-flex gap-x-1" htmlFor="password">
                  Password{' '}
                  <LucideInfo
                    role="button"
                    onClick={togglePasswordRequirements}
                    aria-label="Toggle password requirements"
                    className="w-4 h-4 text-background fill-secondary-foreground"
                  />
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    placeholder="Create a strong password"
                    type={showPassword ? 'text' : 'password'}
                    className={`px-10 bg-inherit border-secondary-foreground/20`}
                    {...register('password')}
                  />
                  <Button
                    size="sm"
                    type="button"
                    variant="ghost"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.password ? (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-destructive border-destructive"
                  >
                    {errors.password.message}
                  </motion.p>
                ) : toggle ? (
                  <div className="password-requirements mt-2">
                    <p className="mb-1 text-sm text-typography">
                      Password Requirements:
                    </p>
                    <ul className="mb-0">
                      {[
                        'Be at least 8 characters long',
                        'Include at least 3 of the following',
                      ].map((val, idx) => (
                        <li
                          key={idx}
                          className="inline-flex items-center text-sm gap-x-1"
                        >
                          <XCircleIcon className="mr-1 text-[10px] w-[1rem] h-[1rem] stroke-card fill-destructive" />{' '}
                          {val}
                        </li>
                      ))}
                      <ul className="pl-3">
                        {[
                          'Lowercase letters (a-z)',
                          'Uppercase letters (A-Z)',
                          'Numbers (0-9)',
                          'Special characters (!@#$%^&*)',
                        ].map((val, idx) => (
                          <li
                            key={idx}
                            className="inline-flex items-center text-xs gap-x-1 w-full"
                          >
                            <XCircleIcon className="mr-1 w-[1rem] h-[1rem] stroke-card fill-destructive" />{' '}
                            {val}
                          </li>
                        ))}
                      </ul>
                    </ul>
                  </div>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    className={`pl-10 pr-10 bg-inherit border-secondary-foreground/20`}
                    {...register('confirmPassword')}
                  />
                  <Button
                    size="sm"
                    type="button"
                    variant="ghost"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-destructive border-destructive"
                  >
                    {errors.confirmPassword.message}
                  </motion.p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountType">Account Type</Label>
                <ReusableSelect<RegisterForm>
                  value={selected}
                  options={tenants}
                  name="accountType"
                  register={register}
                  onChange={setSelectedValue}
                  className={`pl-10 pr-10 bg-card border-secondary-foreground/20`}
                />
                {errors.accountType && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-destructive border-destructive"
                  >
                    {errors.accountType.message}
                  </motion.p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acceptTerms"
                  checked={acceptTerms}
                  className="border-secondary-foreground/20 my-2"
                  onCheckedChange={(checked) =>
                    setValue('acceptTerms', checked as boolean)
                  }
                />
                <Label
                  htmlFor="acceptTerms"
                  className="text-sm my-2 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I accept the{' '}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link
                    href="/privacy"
                    className="text-primary hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>
              {errors.acceptTerms && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-destructive"
                >
                  {errors.acceptTerms.message}
                </motion.p>
              )}
              <Button variant="tertiary" type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Sign Up'
                )}
              </Button>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-secondary-foreground/20" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <Button
              variant="secondary"
              className="w-full"
              onClick={handleGoogleSignup}
              disabled={isGoogleLoading}
            >
              {isGoogleLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Globe className="mr-2 h-4 w-4" />
                  Sign up with Google
                </>
              )}
            </Button>
            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                Already have an account?{' '}
              </span>
              <Link
                href="/login"
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
