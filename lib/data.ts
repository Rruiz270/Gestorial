import { Project, Company, Milestone, FinancialMetric, RealizationMatrix } from '@/types';

// Mock data for demonstration
export const mockCompanies: Company[] = [
  {
    id: 'company-1',
    name: 'Tech Innovations Ltd',
    description: 'Leading technology solutions provider',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'company-2',
    name: 'GreenEnergy Corp',
    description: 'Sustainable energy solutions',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10'),
  },
];

export const mockRealizationMatrix: RealizationMatrix = {
  realizacao: {
    nome: 'Gestorial',
    produtor: 'Gustavo',
    motivos: [
      'Democratização da gestão para a felicidade da realização e autorrealização',
      'Legado, referência e fama',
      'Fonte de renda com receita recorrente'
    ],
    valores: [
      'Ética, correição, honestidade',
      'Realização, auto-realização',
      'Tecnologia, proatividade, inovação'
    ]
  },
  visao: {
    definicao: 'Empresa de treinamento e consultoria em desenvolvimento de negócios',
    alvo: 'Pessoas e instituições que querem realizar',
    finalidade: 'Municiar pessoas e instituições com conhecimento e método para realizarem',
    produtosServicos: [
      'Modelo/método',
      'Conteúdos/Aplicações/Ferramentas',
      'Desenvolvimento de Gestores',
      'Desenvolimento de Organizações',
      'Desenvolvimento de Projetos (serviços, produtos, instituições etc.)'
    ]
  },
  direcao: {
    aspiracao: 'Modelo/método conhecido, valorizado e aplicado pelo mercado',
    conjuntura: {
      oportunidades: ['Pessoas/instituições com realizações complexas e sem saber como se organizarem'],
      ameacas: ['Elevada concorrência e tecnologias disruptivas'],
      fortalezas: ['Rede e referência, mesmo que ainda vinculado à pessoa do Produtor'],
      fraquezas: ['Eupreza, autônomo, falta de estrutura e recursos, divulgação e transformação digital']
    },
    roteiro: [
      'Consolidação do modelo/método',
      'Desenvolvimento e lançamento de referenciais (livros e aplicações)',
      'Marketing e comunicação (foco digital)',
      'Aplicações práticas do modelo e método'
    ],
    posicao: {
      condutor: 'Gustavo',
      operadores: ['Gustavo', 'Juliana e outros profissionais a contratar'],
      facilitador: 'Gustavo',
      apontador: 'Gustavo e outro profissional a contratar',
      mentor: 'Gustavo'
    }
  },
  acao: {
    prioridades: [
      'Elaboração e lançamento dos livros',
      'Atualização da identidade visual',
      'Marketing e comunicação digital',
      'Vendas e desenvolvimento de projetos'
    ],
    responsaveis: ['Gustavo e contratados'],
    periodos: '2025',
    marcos: [
      'Organização/divisão do tempo para desenvolvimento e aplicação',
      'Interesse de editora de renome',
      'Contratação de agência adequada',
      'Gestão do fluxo de caixa e reservas'
    ]
  },
  provisao: {
    gente: ['Vide Controle Financeiro'],
    materiais: ['Vide Controle Financeiro'],
    servicos: ['Vide Controle Financeiro'],
    capital: 1680000
  },
  reacao: {
    externoFinanceiro: '1,68 mihão de receita bruta alcançada até dezembro de 2025',
    internoFinanceiro: '25% de lucro líquido alcançado em 2025',
    internoNaoFinanceiro: '1 livro publicado até dezembro de 2025',
    externoNaoFinanceiro: '3 redes sociais ativas e geridas até dezembro de 2025'
  }
};

export const mockProjects: Project[] = [
  {
    id: 'project-1',
    name: 'Digital Transformation Initiative',
    description: 'Complete digital transformation of business processes and customer engagement',
    companyId: 'company-1',
    status: 'active',
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-12-31'),
    budget: 500000,
    currentSpent: 125000,
    targetRevenue: 750000,
    realizationMatrix: mockRealizationMatrix,
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-06-20'),
  },
  {
    id: 'project-2',
    name: 'Sustainable Energy Expansion',
    description: 'Expansion into renewable energy markets with new product lines',
    companyId: 'company-2',
    status: 'planning',
    startDate: new Date('2024-07-01'),
    endDate: new Date('2025-06-30'),
    budget: 1200000,
    currentSpent: 50000,
    targetRevenue: 1800000,
    realizationMatrix: {
      ...mockRealizationMatrix,
      realizacao: {
        ...mockRealizationMatrix.realizacao,
        nome: 'GreenEnergy Expansion',
        produtor: 'Maria Silva'
      }
    },
    createdAt: new Date('2024-05-10'),
    updatedAt: new Date('2024-06-15'),
  },
];

export const mockMilestones: Milestone[] = [
  {
    id: 'milestone-1',
    projectId: 'project-1',
    title: 'Requirements Analysis Complete',
    description: 'Complete analysis of current systems and requirements for digital transformation',
    dueDate: new Date('2024-04-15'),
    status: 'completed',
    assignedTo: ['user-1', 'user-2'],
    progress: 100,
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-04-15'),
  },
  {
    id: 'milestone-2',
    projectId: 'project-1',
    title: 'System Architecture Design',
    description: 'Design and document the new system architecture',
    dueDate: new Date('2024-07-30'),
    status: 'in_progress',
    assignedTo: ['user-1'],
    progress: 65,
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-07-15'),
  },
  {
    id: 'milestone-3',
    projectId: 'project-1',
    title: 'MVP Development',
    description: 'Develop minimum viable product for core features',
    dueDate: new Date('2024-10-15'),
    status: 'pending',
    assignedTo: ['user-3'],
    progress: 0,
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
  },
];

export const mockFinancialMetrics: FinancialMetric[] = [
  {
    id: 'metric-1',
    projectId: 'project-1',
    type: 'budget',
    name: 'Total Project Budget',
    currentValue: 125000,
    targetValue: 500000,
    unit: 'currency',
    period: 'yearly',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-07-15'),
  },
  {
    id: 'metric-2',
    projectId: 'project-1',
    type: 'target',
    name: 'Revenue Target',
    currentValue: 200000,
    targetValue: 750000,
    unit: 'currency',
    period: 'yearly',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-07-15'),
  },
  {
    id: 'metric-3',
    projectId: 'project-1',
    type: 'objective',
    name: 'Customer Satisfaction',
    currentValue: 85,
    targetValue: 95,
    unit: 'percentage',
    period: 'quarterly',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-07-15'),
  },
];

// Data access functions
export class DataService {
  static getProjects(): Project[] {
    return mockProjects;
  }

  static getProjectById(id: string): Project | undefined {
    return mockProjects.find(p => p.id === id);
  }

  static getCompanies(): Company[] {
    return mockCompanies;
  }

  static getCompanyById(id: string): Company | undefined {
    return mockCompanies.find(c => c.id === id);
  }

  static getMilestonesByProjectId(projectId: string): Milestone[] {
    return mockMilestones.filter(m => m.projectId === projectId);
  }

  static getFinancialMetricsByProjectId(projectId: string): FinancialMetric[] {
    return mockFinancialMetrics.filter(f => f.projectId === projectId);
  }

  static getProjectStats() {
    const projects = this.getProjects();
    return {
      total: projects.length,
      active: projects.filter(p => p.status === 'active').length,
      completed: projects.filter(p => p.status === 'completed').length,
      planning: projects.filter(p => p.status === 'planning').length,
      totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
      totalSpent: projects.reduce((sum, p) => sum + p.currentSpent, 0),
    };
  }
}