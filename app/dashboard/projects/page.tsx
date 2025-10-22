'use client';

import React from 'react';
import Link from 'next/link';
import { DataService } from '@/lib/data';
import { AuthService } from '@/lib/auth';
import { FolderOpen, Plus, Calendar, DollarSign, Users } from 'lucide-react';

export default function ProjectsPage() {
  const projects = DataService.getProjects();
  const user = AuthService.getCurrentUser();

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    planning: 'bg-blue-100 text-blue-800',
    completed: 'bg-gray-100 text-gray-800',
    on_hold: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gestorial-dark">Projects</h1>
          <p className="text-gray-600 mt-2">Manage and track all your client projects</p>
        </div>
        {AuthService.hasPermission('gestorial_staff') && (
          <Link href="/dashboard/projects/new" className="gestorial-button flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>New Project</span>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => {
          const company = DataService.getCompanyById(project.companyId);
          const progress = Math.round((project.currentSpent / project.budget) * 100);
          const canEdit = AuthService.canEditProject(project.companyId);

          return (
            <div key={project.id} className="gestorial-card hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gestorial-primary/10 rounded-lg">
                    <FolderOpen className="h-5 w-5 text-gestorial-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gestorial-dark">{project.name}</h3>
                    <p className="text-sm text-gray-600">{company?.name}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
                  {project.status.replace('_', ' ')}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gestorial-primary h-2 rounded-full transition-all"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Budget</p>
                      <p className="font-medium">${(project.budget / 1000).toFixed(0)}k</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Due Date</p>
                      <p className="font-medium">
                        {project.endDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <Link 
                    href={`/dashboard/projects/${project.id}`}
                    className="text-gestorial-primary hover:text-gestorial-secondary font-medium text-sm"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <FolderOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-600 mb-6">Get started by creating your first project.</p>
          {AuthService.hasPermission('gestorial_staff') && (
            <Link href="/dashboard/projects/new" className="gestorial-button">
              Create Project
            </Link>
          )}
        </div>
      )}
    </div>
  );
}