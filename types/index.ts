export type UserRole = 'gestorial_admin' | 'gestorial_staff' | 'client_admin' | 'client_user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  companyId?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Company {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  companyId: string;
  status: 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled';
  startDate: Date;
  endDate?: Date;
  budget: number;
  currentSpent: number;
  targetRevenue?: number;
  realizationMatrix: RealizationMatrix;
  createdAt: Date;
  updatedAt: Date;
}

export interface RealizationMatrix {
  realizacao: RealizacaoElement;
  visao: VisaoElement;
  direcao: DirecaoElement;
  acao: AcaoElement;
  provisao: ProvisaoElement;
  reacao: ReacaoElement;
}

export interface RealizacaoElement {
  nome: string;
  produtor: string;
  motivos: string[];
  valores: string[];
}

export interface VisaoElement {
  definicao: string;
  alvo: string;
  finalidade: string;
  produtosServicos: string[];
}

export interface DirecaoElement {
  aspiracao: string;
  conjuntura: {
    oportunidades: string[];
    ameacas: string[];
    fortalezas: string[];
    fraquezas: string[];
  };
  roteiro: string[];
  posicao: {
    condutor: string;
    operadores: string[];
    facilitador: string;
    apontador: string;
    mentor: string;
  };
}

export interface AcaoElement {
  prioridades: string[];
  responsaveis: string[];
  periodos: string;
  marcos: string[];
}

export interface ProvisaoElement {
  gente: string[];
  materiais: string[];
  servicos: string[];
  capital: number;
}

export interface ReacaoElement {
  externoFinanceiro: string;
  internoFinanceiro: string;
  internoNaoFinanceiro: string;
  externoNaoFinanceiro: string;
}

export interface Milestone {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  dueDate: Date;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  assignedTo: string[];
  progress: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface FinancialMetric {
  id: string;
  projectId: string;
  type: 'budget' | 'target' | 'objective';
  name: string;
  currentValue: number;
  targetValue: number;
  unit: 'currency' | 'percentage' | 'number';
  period: 'monthly' | 'quarterly' | 'yearly';
  createdAt: Date;
  updatedAt: Date;
}

export interface Activity {
  id: string;
  projectId: string;
  userId: string;
  type: 'comment' | 'milestone_update' | 'financial_update' | 'status_change';
  content: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}