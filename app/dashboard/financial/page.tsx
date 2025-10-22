'use client';

import React, { useState } from 'react';
import { DataService } from '@/lib/data';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Target,
  PieChart,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export default function FinancialPage() {
  const [selectedProjectId, setSelectedProjectId] = useState('project-1');
  const projects = DataService.getProjects();
  const selectedProject = DataService.getProjectById(selectedProjectId);
  const financialMetrics = DataService.getFinancialMetricsByProjectId(selectedProjectId);
  const stats = DataService.getProjectStats();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const MetricCard = ({ metric }: any) => {
    const progressPercentage = (metric.currentValue / metric.targetValue) * 100;
    const isOnTarget = progressPercentage >= 80;

    return (
      <div className="gestorial-card">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gestorial-dark">{metric.name}</h3>
            <p className="text-sm text-gray-600 capitalize">{metric.type}</p>
          </div>
          <div className={`p-2 rounded-lg ${isOnTarget ? 'bg-green-100' : 'bg-orange-100'}`}>
            {isOnTarget ? (
              <TrendingUp className={`h-5 w-5 text-green-600`} />
            ) : (
              <TrendingDown className={`h-5 w-5 text-orange-600`} />
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-gestorial-dark">
              {metric.unit === 'currency' ? formatCurrency(metric.currentValue) : 
               metric.unit === 'percentage' ? `${metric.currentValue}%` : 
               metric.currentValue.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500">
              of {metric.unit === 'currency' ? formatCurrency(metric.targetValue) : 
                  metric.unit === 'percentage' ? `${metric.targetValue}%` : 
                  metric.targetValue.toLocaleString()}
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all ${isOnTarget ? 'bg-green-500' : 'bg-orange-500'}`}
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className={`font-medium flex items-center ${isOnTarget ? 'text-green-600' : 'text-orange-600'}`}>
              {progressPercentage > 100 ? (
                <ArrowUpRight className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 mr-1" />
              )}
              {progressPercentage.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gestorial-dark">Financial Tracking</h1>
          <p className="text-gray-600 mt-2">Monitor budgets, targets, and financial objectives</p>
        </div>
        <select
          value={selectedProjectId}
          onChange={(e) => setSelectedProjectId(e.target.value)}
          className="gestorial-input w-64"
        >
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="gestorial-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Budget</p>
              <p className="text-2xl font-bold text-gestorial-primary">
                {formatCurrency(stats.totalBudget)}
              </p>
              <p className="text-sm text-gray-500">Across all projects</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="gestorial-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(stats.totalSpent)}
              </p>
              <p className="text-sm text-gray-500">
                {((stats.totalSpent / stats.totalBudget) * 100).toFixed(1)}% utilized
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-100">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="gestorial-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Remaining</p>
              <p className="text-2xl font-bold text-orange-600">
                {formatCurrency(stats.totalBudget - stats.totalSpent)}
              </p>
              <p className="text-sm text-gray-500">Available budget</p>
            </div>
            <div className="p-3 rounded-lg bg-orange-100">
              <Target className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="gestorial-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Utilization</p>
              <p className="text-2xl font-bold text-purple-600">
                {((stats.totalSpent / stats.totalBudget) * 100).toFixed(0)}%
              </p>
              <p className="text-sm text-gray-500">Budget efficiency</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-100">
              <PieChart className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Project Specific Financial Metrics */}
      {selectedProject && (
        <div className="space-y-6">
          <div className="gestorial-card">
            <h2 className="text-xl font-bold text-gestorial-dark mb-4">
              {selectedProject.name} - Financial Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Budget Status</h3>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(selectedProject.currentSpent)}
                </p>
                <p className="text-sm text-blue-700">
                  of {formatCurrency(selectedProject.budget)} budgeted
                </p>
                <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${Math.min((selectedProject.currentSpent / selectedProject.budget) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Revenue Target</h3>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(selectedProject.targetRevenue || 0)}
                </p>
                <p className="text-sm text-green-700">Expected revenue</p>
                <div className="mt-2 flex items-center text-sm text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  ROI: {selectedProject.targetRevenue ? 
                    (((selectedProject.targetRevenue - selectedProject.budget) / selectedProject.budget) * 100).toFixed(1) : 0}%
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">Efficiency</h3>
                <p className="text-2xl font-bold text-purple-600">
                  {((selectedProject.currentSpent / selectedProject.budget) * 100).toFixed(1)}%
                </p>
                <p className="text-sm text-purple-700">Budget utilized</p>
                <div className="mt-2 flex items-center text-sm text-purple-600">
                  <BarChart3 className="h-4 w-4 mr-1" />
                  {selectedProject.currentSpent < selectedProject.budget ? 'Under budget' : 'Over budget'}
                </div>
              </div>
            </div>
          </div>

          {/* Financial Metrics Grid */}
          <div>
            <h2 className="text-xl font-bold text-gestorial-dark mb-6">Financial Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {financialMetrics.map((metric) => (
                <MetricCard key={metric.id} metric={metric} />
              ))}
            </div>
          </div>

          {financialMetrics.length === 0 && (
            <div className="text-center py-12 gestorial-card">
              <BarChart3 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No financial metrics found</h3>
              <p className="text-gray-600">Financial tracking metrics will appear here once configured.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}