'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DataService } from '@/lib/data';
import { AuthService } from '@/lib/auth';
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Users,
  Target,
  TrendingUp,
  Edit3,
  Save,
  X,
  Plus,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { ProjectComments } from '@/components/ProjectComments';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  const project = DataService.getProjectById(projectId);
  const company = project ? DataService.getCompanyById(project.companyId) : null;
  const milestones = DataService.getMilestonesByProjectId(projectId);
  const financialMetrics = DataService.getFinancialMetricsByProjectId(projectId);
  
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  const user = AuthService.getCurrentUser();
  const canEdit = project ? AuthService.canEditProject(project.companyId) : false;

  if (!project) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
        <p className="text-gray-600 mb-6">The project you're looking for doesn't exist.</p>
        <Link href="/dashboard/projects" className="gestorial-button">
          Back to Projects
        </Link>
      </div>
    );
  }

  const statusColors = {
    active: 'bg-green-100 text-green-800 border-green-200',
    planning: 'bg-blue-100 text-blue-800 border-blue-200',
    completed: 'bg-gray-100 text-gray-800 border-gray-200',
    on_hold: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200',
  };

  const milestoneStatusColors = {
    completed: 'bg-green-100 text-green-800',
    in_progress: 'bg-blue-100 text-blue-800',
    pending: 'bg-gray-100 text-gray-800',
    overdue: 'bg-red-100 text-red-800',
  };

  const progress = Math.round((project.currentSpent / project.budget) * 100);
  const roi = project.targetRevenue ? 
    (((project.targetRevenue - project.budget) / project.budget) * 100).toFixed(1) : '0';

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'milestones', label: 'Milestones', icon: CheckCircle },
    { id: 'financial', label: 'Financial', icon: DollarSign },
    { id: 'comments', label: 'Updates & Comments', icon: Users },
    { id: 'realization-matrix', label: 'Realization Matrix', icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-3xl font-bold text-gestorial-dark">{project.name}</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusColors[project.status]}`}>
                {project.status.replace('_', ' ')}
              </span>
            </div>
            <p className="text-gray-600">{company?.name}</p>
            <p className="text-gray-500 mt-1">{project.description}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {canEdit && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="gestorial-button flex items-center space-x-2"
            >
              <Edit3 className="h-4 w-4" />
              <span>{isEditing ? 'Cancel' : 'Edit Project'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="gestorial-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Budget Progress</p>
              <p className="text-2xl font-bold text-gestorial-primary">{progress}%</p>
              <p className="text-sm text-gray-500">
                ${(project.currentSpent / 1000).toFixed(0)}k of ${(project.budget / 1000).toFixed(0)}k
              </p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gestorial-primary h-2 rounded-full transition-all"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="gestorial-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Expected ROI</p>
              <p className="text-2xl font-bold text-green-600">{roi}%</p>
              <p className="text-sm text-gray-500">Return on investment</p>
            </div>
            <div className="p-3 rounded-lg bg-green-100">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="gestorial-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Duration</p>
              <p className="text-2xl font-bold text-purple-600">
                {project.endDate ? 
                  Math.ceil((project.endDate.getTime() - project.startDate.getTime()) / (1000 * 60 * 60 * 24 * 30)) 
                  : 'TBD'} {project.endDate ? 'mo' : ''}
              </p>
              <p className="text-sm text-gray-500">
                {project.startDate.toLocaleDateString()} - {project.endDate?.toLocaleDateString() || 'Ongoing'}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-purple-100">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="gestorial-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Milestones</p>
              <p className="text-2xl font-bold text-orange-600">
                {milestones.filter(m => m.status === 'completed').length}/{milestones.length}
              </p>
              <p className="text-sm text-gray-500">Completed</p>
            </div>
            <div className="p-3 rounded-lg bg-orange-100">
              <CheckCircle className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-gestorial-primary text-gestorial-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="gestorial-card">
              <h3 className="text-lg font-semibold text-gestorial-dark mb-4">Project Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-600">{project.description}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Timeline</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">Started: {project.startDate.toLocaleDateString()}</span>
                    </div>
                    {project.endDate && (
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Due: {project.endDate.toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="gestorial-card">
              <h3 className="text-lg font-semibold text-gestorial-dark mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">Project milestone updated</p>
                    <p className="text-sm text-gray-600">System Architecture Design progress updated to 65%</p>
                    <p className="text-xs text-gray-400">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">Budget allocation reviewed</p>
                    <p className="text-sm text-gray-600">Financial metrics updated for Q3 review</p>
                    <p className="text-xs text-gray-400">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'milestones' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gestorial-dark">Project Milestones</h3>
              {canEdit && (
                <button className="gestorial-button flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Milestone</span>
                </button>
              )}
            </div>

            <div className="space-y-4">
              {milestones.map((milestone) => {
                const isOverdue = milestone.status !== 'completed' && new Date() > milestone.dueDate;
                const statusColor = isOverdue ? milestoneStatusColors.overdue : milestoneStatusColors[milestone.status];
                
                return (
                  <div key={milestone.id} className="gestorial-card">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className={`w-4 h-4 rounded-full mt-1 ${
                          milestone.status === 'completed' ? 'bg-green-500' :
                          milestone.status === 'in_progress' ? 'bg-blue-500' : 
                          isOverdue ? 'bg-red-500' : 'bg-gray-300'
                        }`}></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gestorial-dark">{milestone.title}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                              {isOverdue ? 'Overdue' : milestone.status.replace('_', ' ')}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{milestone.description}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>Due: {milestone.dueDate.toLocaleDateString()}</span>
                              </div>
                              {milestone.assignedTo.length > 0 && (
                                <div className="flex items-center space-x-1">
                                  <Users className="h-4 w-4" />
                                  <span>{milestone.assignedTo.length} assigned</span>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium">{milestone.progress}%</span>
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-gestorial-primary h-2 rounded-full"
                                  style={{ width: `${milestone.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'financial' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="gestorial-card bg-blue-50 border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-3">Budget Status</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Allocated:</span>
                    <span className="font-medium">${(project.budget / 1000).toFixed(0)}k</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Spent:</span>
                    <span className="font-medium">${(project.currentSpent / 1000).toFixed(0)}k</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Remaining:</span>
                    <span className="font-medium">${((project.budget - project.currentSpent) / 1000).toFixed(0)}k</span>
                  </div>
                </div>
              </div>

              <div className="gestorial-card bg-green-50 border-green-200">
                <h4 className="font-semibold text-green-900 mb-3">Revenue Projection</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-green-700">Target:</span>
                    <span className="font-medium">${(project.targetRevenue! / 1000).toFixed(0)}k</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">ROI:</span>
                    <span className="font-medium">{roi}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Profit:</span>
                    <span className="font-medium">${((project.targetRevenue! - project.budget) / 1000).toFixed(0)}k</span>
                  </div>
                </div>
              </div>

              <div className="gestorial-card bg-purple-50 border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-3">Efficiency</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-purple-700">Burn Rate:</span>
                    <span className="font-medium">${(project.currentSpent / 6 / 1000).toFixed(0)}k/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-700">Utilization:</span>
                    <span className="font-medium">{progress}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-700">Status:</span>
                    <span className="font-medium">{progress < 100 ? 'On Budget' : 'Over Budget'}</span>
                  </div>
                </div>
              </div>
            </div>

            {financialMetrics.length > 0 && (
              <div className="gestorial-card">
                <h3 className="text-lg font-semibold text-gestorial-dark mb-4">Financial Metrics</h3>
                <div className="space-y-4">
                  {financialMetrics.map((metric) => (
                    <div key={metric.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gestorial-dark">{metric.name}</h4>
                        <span className="text-sm text-gray-500 capitalize">{metric.type}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-gestorial-primary">
                          {metric.unit === 'currency' ? `$${(metric.currentValue / 1000).toFixed(0)}k` :
                           metric.unit === 'percentage' ? `${metric.currentValue}%` :
                           metric.currentValue.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-600">
                          Target: {metric.unit === 'currency' ? `$${(metric.targetValue / 1000).toFixed(0)}k` :
                                  metric.unit === 'percentage' ? `${metric.targetValue}%` :
                                  metric.targetValue.toLocaleString()}
                        </span>
                      </div>
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gestorial-primary h-2 rounded-full"
                          style={{ width: `${Math.min((metric.currentValue / metric.targetValue) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'comments' && (
          <ProjectComments projectId={projectId} />
        )}

        {activeTab === 'realization-matrix' && (
          <div className="gestorial-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gestorial-dark">Realization Matrix</h3>
              <Link 
                href={`/dashboard/realization-matrix?project=${projectId}`}
                className="gestorial-button"
              >
                View Full Matrix
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Realização</h4>
                <p className="text-sm text-blue-700">{project.realizationMatrix.realizacao.nome}</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-2">Visão</h4>
                <p className="text-sm text-purple-700">{project.realizationMatrix.visao.definicao}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">Direção</h4>
                <p className="text-sm text-green-700">{project.realizationMatrix.direcao.aspiracao}</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-900 mb-2">Ação</h4>
                <p className="text-sm text-orange-700">{project.realizationMatrix.acao.prioridades[0]}</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-900 mb-2">Provisão</h4>
                <p className="text-sm text-red-700">Capital: R$ {project.realizationMatrix.provisao.capital.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <h4 className="font-semibold text-indigo-900 mb-2">Reação</h4>
                <p className="text-sm text-indigo-700">{project.realizationMatrix.reacao.externoFinanceiro}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}