'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/app-store';
import { Progress } from '@/components/ui/progress';
import { BarChart, Users, Activity, TrendingUp } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// Mock data for demonstration
const mockStats = {
  totalUsers: 12345,
  activeUsers: 8432,
  revenue: 54321,
  growthRate: 23.5,
};

const mockProjects = [
  { name: 'Website Redesign', progress: 75, status: 'In Progress' },
  { name: 'Mobile App', progress: 45, status: 'In Progress' },
  { name: 'API Integration', progress: 90, status: 'Almost Done' },
  { name: 'User Analytics', progress: 30, status: 'Planning' },
];

export default function DashboardPage() {
  const { setSidebarOpen, addNotification, setUser, user } = useAppStore();

  // Simulate user login for demo
  useEffect(() => {
    if (!user) {
      setUser({
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        avatar:
          'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      });
    }
    setSidebarOpen(true);
  }, [setUser, setSidebarOpen, user]);

  const stats = [
    {
      title: 'Total Users',
      value: mockStats.totalUsers.toLocaleString(),
      icon: Users,
      change: '+12%',
      changeType: 'positive' as const,
    },
    {
      title: 'Active Users',
      value: mockStats.activeUsers.toLocaleString(),
      icon: Activity,
      change: '+8%',
      changeType: 'positive' as const,
    },
    {
      title: 'Revenue',
      value: `$${mockStats.revenue.toLocaleString()}`,
      icon: TrendingUp,
      change: '+23%',
      changeType: 'positive' as const,
    },
    {
      title: 'Growth Rate',
      value: `${mockStats.growthRate}%`,
      icon: BarChart,
      change: '+5%',
      changeType: 'positive' as const,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s what&apos;s happening with your projects.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                      <span
                        className={
                          stat.changeType === 'positive'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }
                      >
                        {stat.change}
                      </span>{' '}
                      from last month
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Projects Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Active Projects</CardTitle>
                <CardDescription>
                  Track progress of your current projects
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockProjects.map((project, index) => (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{project.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {project.progress}%
                      </span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                    <span className="text-xs text-muted-foreground">
                      {project.status}
                    </span>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() =>
                    addNotification({
                      title: 'New Project Created',
                      message: 'Successfully created a new project.',
                      type: 'success',
                    })
                  }
                >
                  Create New Project
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() =>
                    addNotification({
                      title: 'Report Generated',
                      message: 'Monthly report has been generated.',
                      type: 'info',
                    })
                  }
                >
                  Generate Report
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() =>
                    addNotification({
                      title: 'Team Invited',
                      message: 'Invitation sent to team members.',
                      type: 'success',
                    })
                  }
                >
                  Invite Team Members
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() =>
                    addNotification({
                      title: 'Settings Updated',
                      message: 'Your preferences have been saved.',
                      type: 'info',
                    })
                  }
                >
                  Update Settings
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
