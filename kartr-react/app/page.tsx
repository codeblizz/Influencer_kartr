'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/app-store';
import { ArrowRight, LucideInfo } from 'lucide-react';
import { WHY_IT_WORKS, HOW_IT_WORKS } from '@/constant';
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
} from '@/components/ui/card';

export default function HomePage() {
  const { addNotification, setSidebarOpen } = useAppStore();

  useEffect(() => {
    setSidebarOpen(false);
    addNotification({
      title: 'Welcome!',
      message: 'Welcome to the modern Next.js application.',
      type: 'info',
    });
  }, [addNotification, setSidebarOpen]);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-8 z-50 bg-gradient-to-br from-[#1a1e21] to-[#2c3136] text-white py-16 mb-16 rounded-[15px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
      >
        <div
          className="space-y-4 flex flex-col items-center w-full h-full opacity-30 z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='rgba(255,255,255,0.05)' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        >
          <motion.h1 className="text-4xl md:text-6xl md:w-[50%] inline-block font-extrabold my-4 leading-[1.2] bg-rainbow shadow-[0_5px_15px_rgba(0,0,0,0.1)] animate-rainbow bg-clip-text text-transparent">
            Connect Influencers with Sponsors
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Kartr helps YouTube influencers analyze their performance and
            connect with the right sponsors to grow their channel.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button asChild size="lg" className="group">
            <Link href="/login" className="text-title font-bold">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 stroke-title transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button variant="secondary" size="lg" asChild>
            <Link href="/" className="flex justify-between gap-x-2">
              <LucideInfo className="w-5 h-5 fill-foreground stroke-background" />{' '}
              Learn More
            </Link>
          </Button>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-24"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Kartr?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_IT_WORKS.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                whileHover={{ y: -20 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="md:h-72 w-auto"
              >
                <Card className="h-full w-full rounded-2xl bg-card hover:shadow-lg hover:bg-card-hover transition-shadow">
                  <CardHeader className="w-full h-full flex flex-col items-center justify-center gap-y-2">
                    <div className="h-12 w-12 rounded-lg bg-transparent flex items-center justify-center">
                      <Icon className="size-full text-primary stroke-typography" />
                    </div>
                    <CardTitle className="text-2xl">{feature.title}</CardTitle>
                    <CardDescription className="w-full h-full text-center text-lg">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-24"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How Kartr Works?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-24">
          {HOW_IT_WORKS.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                whileHover={{ y: -20 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="md:h-96 w-auto"
              >
                <Card className="h-full w-full bg-card rounded-2xl hover:shadow-lg hover:bg-card-hover transition-shadow">
                  <CardHeader className="w-full h-full flex flex-col items-center justify-center gap-y-4">
                    <div className="h-12 w-12 bg-typography p-2 shadow-lg shadow-blue-400 rounded-lg flex items-center justify-center">
                      <Icon className="size-full text-primary stroke-secondary-foreground" />
                    </div>
                    <CardTitle className="text-2xl">{feature.title}</CardTitle>
                    <CardDescription className="w-full h-full text-center text-lg">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="my-24 text-center"
      >
        <div className="rounded-lg bg-title p-8">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Grow Your Channel??
          </h3>
          <p className="text-secondary-foreground mb-6">
            Join our community of 1 users and start using Kartr today to analyze
            your channel and connect with potential sponsors.
          </p>
          <div className="flex justify-center items-center gap-x-10 w-full">
            <Button asChild variant="default" size="lg">
              <Link href="/register">Sign Up</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </motion.div>
      <div className="w-full flex flex-col justify-center items-center p-4">
        <h3 className="text-4xl font-bold">
          Platform <span className="text-typography">Statistics</span>
        </h3>
        <div className="grid grid-cols-3 w-[80%] my-5">
          {[
            { type: 'inflencers', frequency: 1 },
            { type: 'sponsors', frequency: 0 },
            { type: 'total users', frequency: 1 },
          ].map((d) => (
            <div
              key={d.type}
              className="col-span-1 inline-flex flex-col w-full gap-y-6"
            >
              <p className="text-center text-4xl text-typography font-extrabold">
                {d.frequency}
              </p>
              <p className="text-center capitalize">{d.type}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
