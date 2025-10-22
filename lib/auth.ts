import { User, UserRole } from '@/types';

// Mock authentication - replace with real auth system
export class AuthService {
  private static currentUser: User | null = null;

  static async login(email: string, password: string): Promise<User | null> {
    // Mock login logic
    const mockUsers: Record<string, User> = {
      'admin@gestorial.com': {
        id: '1',
        name: 'Gestorial Admin',
        email: 'admin@gestorial.com',
        role: 'gestorial_admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      'client@example.com': {
        id: '2',
        name: 'Client User',
        email: 'client@example.com',
        role: 'client_admin',
        companyId: 'company-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };

    const user = mockUsers[email];
    if (user && password === 'demo123') {
      this.currentUser = user;
      localStorage.setItem('gestorial_user', JSON.stringify(user));
      return user;
    }
    return null;
  }

  static async logout(): Promise<void> {
    this.currentUser = null;
    localStorage.removeItem('gestorial_user');
  }

  static getCurrentUser(): User | null {
    if (this.currentUser) return this.currentUser;
    
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('gestorial_user');
      if (stored) {
        this.currentUser = JSON.parse(stored);
        return this.currentUser;
      }
    }
    return null;
  }

  static hasPermission(requiredRole: UserRole): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;

    const roleHierarchy: Record<UserRole, number> = {
      gestorial_admin: 4,
      gestorial_staff: 3,
      client_admin: 2,
      client_user: 1,
    };

    return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
  }

  static canEditProject(projectCompanyId: string): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;

    // Gestorial staff can edit all projects
    if (user.role === 'gestorial_admin' || user.role === 'gestorial_staff') {
      return true;
    }

    // Clients can only edit their own company's projects
    return user.companyId === projectCompanyId;
  }
}