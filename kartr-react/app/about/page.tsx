'use client';

import { motion } from 'framer-motion';
import { Github, Code2, Lightbulb, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const principles = [
  {
    icon: Code2,
    title: 'Clean Architecture',
    description: 'Modular, maintainable code with clear separation of concerns and atomic components.',
  },
  {
    icon: Lightbulb,
    title: 'Developer Experience',
    description: 'Modern tooling, TypeScript, and best practices for an excellent development workflow.',
  },
  {
    icon: Target,
    title: 'Performance First',
    description: 'Optimized for Core Web Vitals with lazy loading, code splitting, and efficient rendering.',
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        <div className="text-center space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold"
          >
            About This Project
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-3xl mx-auto space-y-4 text-muted-foreground"
          >
            <p className="text-lg">
              This application showcases modern web development practices using Next.js 14, 
              TypeScript, and a carefully curated set of technologies for building 
              production-ready applications.
            </p>
            <p>
              Built with performance, accessibility, and developer experience in mind, 
              this project demonstrates atomic state management with Zustand, 
              type-safe data fetching with SWR, and beautiful animations with Framer Motion.
            </p>
          </motion.div>
        </div>

        {/* Architecture Principles */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-2xl font-bold mb-8 text-center"
          >
            Design Principles
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.2 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{principle.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {principle.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="bg-muted/50 rounded-lg p-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Technology Stack</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Frontend</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Next.js 14 with App Router</li>
                <li>• React 18 with Server Components</li>
                <li>• TypeScript for type safety</li>
                <li>• Tailwind CSS for styling</li>
                <li>• Framer Motion for animations</li>
                <li>• Radix UI for accessible components</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Development</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Zustand for state management</li>
                <li>• SWR for data fetching</li>
                <li>• React Hook Form + Zod validation</li>
                <li>• Jest + React Testing Library</li>
                <li>• ESLint + Prettier + Husky</li>
                <li>• GitHub Actions for CI/CD</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="text-center space-y-6"
        >
          <h2 className="text-2xl font-bold">Ready to Build?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            This project serves as a foundation for modern web applications. 
            Feel free to explore the code, adapt it to your needs, and build something amazing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group">
              <Github className="mr-2 h-4 w-4" />
              View on GitHub
            </Button>
            <Button variant="outline" size="lg">
              Documentation
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}