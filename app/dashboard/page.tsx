'use client';

import React from 'react';
import { DataService } from '@/lib/data';
import { AuthService } from '@/lib/auth';
import {
  FolderOpen,
  TrendingUp,
  DollarSign,
  Target,
  Users,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const user = AuthService.getCurrentUser();
  const stats = DataService.getProjectStats();
  const projects = DataService.getProjects();
  const recentProjects = projects.slice(0, 3);

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    planning: 'bg-blue-100 text-blue-800',
    completed: 'bg-gray-100 text-gray-800',
    on_hold: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  const StatCard = ({ title, value, subtitle, icon: Icon, trend, color = 'gestorial-primary' }: any) => (
    <div className="gestorial-card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold text-${color}`}>{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 flex items-center mt-1">
              {trend && (
                <span className={`mr-1 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {trend > 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                </span>
              )}
              {subtitle}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${
          color === 'gestorial-primary' ? 'bg-blue-100' :
          color === 'green-600' ? 'bg-green-100' :
          color === 'purple-600' ? 'bg-purple-100' :
          color === 'blue-600' ? 'bg-blue-100' : 'bg-gray-100'
        }`}>
          <Icon className={`h-6 w-6 ${
            color === 'gestorial-primary' ? 'text-blue-600' :
            color === 'green-600' ? 'text-green-600' :
            color === 'purple-600' ? 'text-purple-600' :
            color === 'blue-600' ? 'text-blue-600' : 'text-gray-600'
          }`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gestorial-dark">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's an overview of your project management activities
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Projects"
          value={stats.total}
          subtitle={`${stats.active} active`}
          icon={FolderOpen}
          trend={2}
        />
        <StatCard
          title="Budget Utilization"
          value={`${Math.round((stats.totalSpent / stats.totalBudget) * 100)}%`}
          subtitle={`$${(stats.totalSpent / 1000).toFixed(0)}k of $${(stats.totalBudget / 1000).toFixed(0)}k`}
          icon={DollarSign}
          color="green-600"
        />
        <StatCard
          title="Completion Rate"
          value="78%"
          subtitle="Average across all projects"
          icon={Target}
          trend={5}
          color="purple-600"
        />
        <StatCard
          title="Active Clients"
          value="12"
          subtitle="2 new this month"
          icon={Users}
          trend={2}
          color="blue-600"
        />
      </div>

      {/* Recent Projects */}
      <div className="gestorial-card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gestorial-dark">Recent Projects</h2>
          <Link 
            href="/dashboard/projects"
            className="text-gestorial-primary hover:text-gestorial-secondary font-medium text-sm"
          >
            View all projects →
          </Link>
        </div>
        <div className="space-y-4">
          {recentProjects.map((project) => {
            const company = DataService.getCompanyById(project.companyId);
            const progress = Math.round((project.currentSpent / project.budget) * 100);
            
            return (
              <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gestorial-dark">{project.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
                        {project.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{company?.name}</p>
                    <p className="text-gray-500 text-sm">{project.description}</p>
                    
                    {/* Progress bar */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Budget Progress</span>
                        <span className="font-medium">{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gestorial-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-sm text-gray-500">Budget</p>
                    <p className="font-semibold">${(project.budget / 1000).toFixed(0)}k</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Spent: ${(project.currentSpent / 1000).toFixed(0)}k
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/dashboard/projects/new" className="gestorial-card hover:shadow-lg transition-shadow cursor-pointer">
          <div className="text-center py-4">
            <div className="mx-auto w-12 h-12 bg-gestorial-primary/10 rounded-lg flex items-center justify-center mb-4">
              <FolderOpen className="h-6 w-6 text-gestorial-primary" />
            </div>
            <h3 className="font-semibold text-gestorial-dark mb-2">New Project</h3>
            <p className="text-gray-600 text-sm">Start a new project with realization matrix</p>
          </div>
        </Link>

        <Link href="/dashboard/realization-matrix" className="gestorial-card hover:shadow-lg transition-shadow cursor-pointer">
          <div className="text-center py-4">
            <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gestorial-dark mb-2">Realization Matrix</h3>
            <p className="text-gray-600 text-sm">Access the 5-element methodology</p>
          </div>
        </Link>

        <Link href="/dashboard/financial" className="gestorial-card hover:shadow-lg transition-shadow cursor-pointer">
          <div className="text-center py-4">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gestorial-dark mb-2">Financial Tracking</h3>
            <p className="text-gray-600 text-sm">Monitor budgets and financial metrics</p>
          </div>
        </Link>
      </div>

      {/* Upcoming Milestones */}
      <div className="gestorial-card">
        <h2 className="text-xl font-bold text-gestorial-dark mb-6">Upcoming Milestones</h2>
        <div className="space-y-3">
          {DataService.getMilestonesByProjectId('project-1').slice(0, 3).map((milestone) => (
            <div key={milestone.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className={`w-3 h-3 rounded-full ${
                milestone.status === 'completed' ? 'bg-green-500' :
                milestone.status === 'in_progress' ? 'bg-blue-500' : 'bg-gray-300'
              }`}></div>
              <div className="flex-1">
                <p className="font-medium text-gestorial-dark">{milestone.title}</p>
                <p className="text-sm text-gray-600">Due: {milestone.dueDate.toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  milestone.status === 'completed' ? 'bg-green-100 text-green-800' :
                  milestone.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {milestone.progress}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}