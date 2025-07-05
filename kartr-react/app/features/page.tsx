'use client';

import { motion } from 'framer-motion';
import {
  Zap,
  Shield,
  Rocket,
  Sparkles,
  Code,
  Palette,
  Database,
  TestTube,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const technicalFeatures = [
  {
    icon: Code,
    title: 'Next.js 14 App Router',
    description:
      'Latest Next.js with App Router for optimal performance and developer experience.',
    tags: ['SSR', 'SSG', 'React Server Components'],
  },
  {
    icon: Database,
    title: 'Zustand State Management',
    description:
      'Lightweight, atomic state management with persistence and hydration support.',
    tags: ['TypeScript', 'Persist', 'Atomic'],
  },
  {
    icon: Palette,
    title: 'Modern UI Components',
    description:
      'Beautiful, accessible components built with Radix UI and Tailwind CSS.',
    tags: ['Radix UI', 'Tailwind', 'Responsive'],
  },
  {
    icon: Sparkles,
    title: 'Framer Motion',
    description:
      'Smooth animations and micro-interactions throughout the application.',
    tags: ['Animations', 'Gestures', 'Performance'],
  },
  {
    icon: Shield,
    title: 'Type Safety',
    description:
      'Full TypeScript support with strict type checking and validation.',
    tags: ['TypeScript', 'Zod', 'Type Guards'],
  },
  {
    icon: TestTube,
    title: 'Testing Pipeline',
    description:
      'Comprehensive testing setup with Jest and React Testing Library.',
    tags: ['Jest', 'RTL', 'E2E Ready'],
  },
];

const developmentFeatures = [
  {
    icon: Rocket,
    title: 'Production Ready',
    description:
      'Complete CI/CD pipeline with GitHub Actions and deployment configurations.',
  },
  {
    icon: Zap,
    title: 'Performance Optimized',
    description:
      'Built-in optimizations for Core Web Vitals, lazy loading, and code splitting.',
  },
];

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        <div className="text-center space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold"
          >
            Features & Technologies
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Explore the modern technologies and best practices that power this
            application.
          </motion.p>
        </div>

        {/* Technical Features */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-2xl font-bold mb-6"
          >
            Core Technologies
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CardDescription>{feature.description}</CardDescription>
                      <div className="flex flex-wrap gap-2">
                        {feature.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Development Features */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="text-2xl font-bold mb-6"
          >
            Development & Production
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {developmentFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 + index * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
