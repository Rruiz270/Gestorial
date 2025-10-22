'use client';

import React, { useState } from 'react';
import { DataService } from '@/lib/data';
import { RealizationMatrix } from '@/types';
import {
  User,
  Eye,
  Navigation,
  Zap,
  Package,
  Target,
  ChevronDown,
  ChevronRight,
  Edit3,
  Save,
  X
} from 'lucide-react';

export default function RealizationMatrixPage() {
  const [selectedProjectId, setSelectedProjectId] = useState('project-1');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['realizacao']));
  const [isEditing, setIsEditing] = useState(false);
  const [editingMatrix, setEditingMatrix] = useState<RealizationMatrix | null>(null);

  const projects = DataService.getProjects();
  const selectedProject = DataService.getProjectById(selectedProjectId);
  const matrix = selectedProject?.realizationMatrix;

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const startEditing = () => {
    if (matrix) {
      setEditingMatrix(JSON.parse(JSON.stringify(matrix)));
      setIsEditing(true);
    }
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditingMatrix(null);
  };

  const saveChanges = () => {
    // In a real app, this would save to the backend
    console.log('Saving changes:', editingMatrix);
    setIsEditing(false);
    setEditingMatrix(null);
  };

  const updateMatrix = (section: keyof RealizationMatrix, field: string, value: any) => {
    if (!editingMatrix) return;
    setEditingMatrix({
      ...editingMatrix,
      [section]: {
        ...editingMatrix[section],
        [field]: value
      }
    });
  };

  const matrixSections = [
    {
      key: 'realizacao',
      title: 'Realização (Realizador)',
      icon: User,
      color: 'blue',
      description: 'Define o propósito fundamental e os valores do projeto'
    },
    {
      key: 'visao',
      title: 'Visão (Conceito)',
      icon: Eye,
      color: 'purple',
      description: 'Estabelece a visão clara do que será alcançado'
    },
    {
      key: 'direcao',
      title: 'Direção (Caminho)',
      icon: Navigation,
      color: 'green',
      description: 'Mapeia a estratégia e o caminho a ser seguido'
    },
    {
      key: 'acao',
      title: 'Ação (Iniciativa)',
      icon: Zap,
      color: 'orange',
      description: 'Define as ações concretas e responsabilidades'
    },
    {
      key: 'provisao',
      title: 'Provisão (Recurso)',
      icon: Package,
      color: 'red',
      description: 'Especifica os recursos necessários para execução'
    },
    {
      key: 'reacao',
      title: 'Reação (Resultado)',
      icon: Target,
      color: 'indigo',
      description: 'Define os resultados esperados e métricas de sucesso'
    }
  ];

  if (!matrix) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No realization matrix found for the selected project.</p>
      </div>
    );
  }

  const currentMatrix = isEditing ? editingMatrix! : matrix;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gestorial-dark">Realization Matrix</h1>
          <p className="text-gray-600 mt-2">
            The 5-element methodology for project success measurement
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="gestorial-input w-64"
            disabled={isEditing}
          >
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
          {!isEditing ? (
            <button onClick={startEditing} className="gestorial-button flex items-center space-x-2">
              <Edit3 className="h-4 w-4" />
              <span>Edit</span>
            </button>
          ) : (
            <div className="flex space-x-2">
              <button onClick={saveChanges} className="gestorial-button flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>Save</span>
              </button>
              <button 
                onClick={cancelEditing} 
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center space-x-2"
              >
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Matrix Sections */}
      <div className="space-y-6">
        {matrixSections.map((section) => {
          const Icon = section.icon;
          const isExpanded = expandedSections.has(section.key);
          const colorClasses = {
            blue: 'border-blue-200 bg-blue-50',
            purple: 'border-purple-200 bg-purple-50',
            green: 'border-green-200 bg-green-50',
            orange: 'border-orange-200 bg-orange-50',
            red: 'border-red-200 bg-red-50',
            indigo: 'border-indigo-200 bg-indigo-50',
          };

          return (
            <div key={section.key} className={`border rounded-lg ${colorClasses[section.color as keyof typeof colorClasses]}`}>
              <div
                className="p-6 cursor-pointer"
                onClick={() => toggleSection(section.key)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-${section.color}-100`}>
                      <Icon className={`h-5 w-5 text-${section.color}-600`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gestorial-dark">
                        {section.title}
                      </h3>
                      <p className="text-sm text-gray-600">{section.description}</p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>

              {isExpanded && (
                <div className="px-6 pb-6 border-t border-gray-200 bg-white">
                  {section.key === 'realizacao' && (
                    <RealizacaoSection 
                      data={currentMatrix.realizacao} 
                      isEditing={isEditing}
                      onChange={(field, value) => updateMatrix('realizacao', field, value)}
                    />
                  )}
                  {section.key === 'visao' && (
                    <VisaoSection 
                      data={currentMatrix.visao} 
                      isEditing={isEditing}
                      onChange={(field, value) => updateMatrix('visao', field, value)}
                    />
                  )}
                  {section.key === 'direcao' && (
                    <DirecaoSection 
                      data={currentMatrix.direcao} 
                      isEditing={isEditing}
                      onChange={(field, value) => updateMatrix('direcao', field, value)}
                    />
                  )}
                  {section.key === 'acao' && (
                    <AcaoSection 
                      data={currentMatrix.acao} 
                      isEditing={isEditing}
                      onChange={(field, value) => updateMatrix('acao', field, value)}
                    />
                  )}
                  {section.key === 'provisao' && (
                    <ProvisaoSection 
                      data={currentMatrix.provisao} 
                      isEditing={isEditing}
                      onChange={(field, value) => updateMatrix('provisao', field, value)}
                    />
                  )}
                  {section.key === 'reacao' && (
                    <ReacaoSection 
                      data={currentMatrix.reacao} 
                      isEditing={isEditing}
                      onChange={(field, value) => updateMatrix('reacao', field, value)}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Component sections for each matrix element
const RealizacaoSection = ({ data, isEditing, onChange }: any) => (
  <div className="pt-4 space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nome (O quê)</label>
        {isEditing ? (
          <input
            value={data.nome}
            onChange={(e) => onChange('nome', e.target.value)}
            className="gestorial-input"
          />
        ) : (
          <p className="text-gray-900">{data.nome}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Produtor (Quem)</label>
        {isEditing ? (
          <input
            value={data.produtor}
            onChange={(e) => onChange('produtor', e.target.value)}
            className="gestorial-input"
          />
        ) : (
          <p className="text-gray-900">{data.produtor}</p>
        )}
      </div>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Motivos (Por quê)</label>
      {isEditing ? (
        <textarea
          value={data.motivos.join('\n')}
          onChange={(e) => onChange('motivos', e.target.value.split('\n'))}
          className="gestorial-input min-h-20"
          placeholder="One reason per line"
        />
      ) : (
        <ul className="list-disc list-inside space-y-1">
          {data.motivos.map((motivo: string, idx: number) => (
            <li key={idx} className="text-gray-900">{motivo}</li>
          ))}
        </ul>
      )}
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Valores (Crenças)</label>
      {isEditing ? (
        <textarea
          value={data.valores.join('\n')}
          onChange={(e) => onChange('valores', e.target.value.split('\n'))}
          className="gestorial-input min-h-20"
          placeholder="One value per line"
        />
      ) : (
        <ul className="list-disc list-inside space-y-1">
          {data.valores.map((valor: string, idx: number) => (
            <li key={idx} className="text-gray-900">{valor}</li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

const VisaoSection = ({ data, isEditing, onChange }: any) => (
  <div className="pt-4 space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Definição (O que é)</label>
      {isEditing ? (
        <textarea
          value={data.definicao}
          onChange={(e) => onChange('definicao', e.target.value)}
          className="gestorial-input"
        />
      ) : (
        <p className="text-gray-900">{data.definicao}</p>
      )}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Alvo (Para Quem)</label>
        {isEditing ? (
          <textarea
            value={data.alvo}
            onChange={(e) => onChange('alvo', e.target.value)}
            className="gestorial-input"
          />
        ) : (
          <p className="text-gray-900">{data.alvo}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Finalidade (Para quê)</label>
        {isEditing ? (
          <textarea
            value={data.finalidade}
            onChange={(e) => onChange('finalidade', e.target.value)}
            className="gestorial-input"
          />
        ) : (
          <p className="text-gray-900">{data.finalidade}</p>
        )}
      </div>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Produtos/Serviços (O que provê)</label>
      {isEditing ? (
        <textarea
          value={data.produtosServicos.join('\n')}
          onChange={(e) => onChange('produtosServicos', e.target.value.split('\n'))}
          className="gestorial-input min-h-20"
          placeholder="One product/service per line"
        />
      ) : (
        <ul className="list-disc list-inside space-y-1">
          {data.produtosServicos.map((item: string, idx: number) => (
            <li key={idx} className="text-gray-900">{item}</li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

// Additional section components would follow similar patterns...
const DirecaoSection = ({ data, isEditing, onChange }: any) => (
  <div className="pt-4 space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Aspiração (Onde quer chegar)</label>
      {isEditing ? (
        <textarea
          value={data.aspiracao}
          onChange={(e) => onChange('aspiracao', e.target.value)}
          className="gestorial-input"
        />
      ) : (
        <p className="text-gray-900">{data.aspiracao}</p>
      )}
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Oportunidades</label>
        {isEditing ? (
          <textarea
            value={data.conjuntura.oportunidades.join('\n')}
            onChange={(e) => onChange('conjuntura', { ...data.conjuntura, oportunidades: e.target.value.split('\n') })}
            className="gestorial-input min-h-20"
          />
        ) : (
          <ul className="list-disc list-inside space-y-1">
            {data.conjuntura.oportunidades.map((item: string, idx: number) => (
              <li key={idx} className="text-gray-900">{item}</li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Ameaças</label>
        {isEditing ? (
          <textarea
            value={data.conjuntura.ameacas.join('\n')}
            onChange={(e) => onChange('conjuntura', { ...data.conjuntura, ameacas: e.target.value.split('\n') })}
            className="gestorial-input min-h-20"
          />
        ) : (
          <ul className="list-disc list-inside space-y-1">
            {data.conjuntura.ameacas.map((item: string, idx: number) => (
              <li key={idx} className="text-gray-900">{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </div>
);

const AcaoSection = ({ data, isEditing, onChange }: any) => (
  <div className="pt-4 space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Prioridades (O que fará)</label>
      {isEditing ? (
        <textarea
          value={data.prioridades.join('\n')}
          onChange={(e) => onChange('prioridades', e.target.value.split('\n'))}
          className="gestorial-input min-h-20"
        />
      ) : (
        <ul className="list-disc list-inside space-y-1">
          {data.prioridades.map((item: string, idx: number) => (
            <li key={idx} className="text-gray-900">{item}</li>
          ))}
        </ul>
      )}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Responsáveis (Quem fará)</label>
        {isEditing ? (
          <textarea
            value={data.responsaveis.join('\n')}
            onChange={(e) => onChange('responsaveis', e.target.value.split('\n'))}
            className="gestorial-input"
          />
        ) : (
          <ul className="list-disc list-inside space-y-1">
            {data.responsaveis.map((item: string, idx: number) => (
              <li key={idx} className="text-gray-900">{item}</li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Períodos (Quando fará)</label>
        {isEditing ? (
          <input
            value={data.periodos}
            onChange={(e) => onChange('periodos', e.target.value)}
            className="gestorial-input"
          />
        ) : (
          <p className="text-gray-900">{data.periodos}</p>
        )}
      </div>
    </div>
  </div>
);

const ProvisaoSection = ({ data, isEditing, onChange }: any) => (
  <div className="pt-4 space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Gente (Com quem fará)</label>
        {isEditing ? (
          <textarea
            value={data.gente.join('\n')}
            onChange={(e) => onChange('gente', e.target.value.split('\n'))}
            className="gestorial-input"
          />
        ) : (
          <ul className="list-disc list-inside space-y-1">
            {data.gente.map((item: string, idx: number) => (
              <li key={idx} className="text-gray-900">{item}</li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Materiais</label>
        {isEditing ? (
          <textarea
            value={data.materiais.join('\n')}
            onChange={(e) => onChange('materiais', e.target.value.split('\n'))}
            className="gestorial-input"
          />
        ) : (
          <ul className="list-disc list-inside space-y-1">
            {data.materiais.map((item: string, idx: number) => (
              <li key={idx} className="text-gray-900">{item}</li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Serviços</label>
        {isEditing ? (
          <textarea
            value={data.servicos.join('\n')}
            onChange={(e) => onChange('servicos', e.target.value.split('\n'))}
            className="gestorial-input"
          />
        ) : (
          <ul className="list-disc list-inside space-y-1">
            {data.servicos.map((item: string, idx: number) => (
              <li key={idx} className="text-gray-900">{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Capital (Com quanto fará)</label>
      {isEditing ? (
        <input
          type="number"
          value={data.capital}
          onChange={(e) => onChange('capital', Number(e.target.value))}
          className="gestorial-input"
        />
      ) : (
        <p className="text-gray-900">R$ {data.capital.toLocaleString()}</p>
      )}
    </div>
  </div>
);

const ReacaoSection = ({ data, isEditing, onChange }: any) => (
  <div className="pt-4 space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Externo-Financeiro</label>
        {isEditing ? (
          <textarea
            value={data.externoFinanceiro}
            onChange={(e) => onChange('externoFinanceiro', e.target.value)}
            className="gestorial-input"
          />
        ) : (
          <p className="text-gray-900">{data.externoFinanceiro}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Interno-Financeiro</label>
        {isEditing ? (
          <textarea
            value={data.internoFinanceiro}
            onChange={(e) => onChange('internoFinanceiro', e.target.value)}
            className="gestorial-input"
          />
        ) : (
          <p className="text-gray-900">{data.internoFinanceiro}</p>
        )}
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Interno-Não Financeiro</label>
        {isEditing ? (
          <textarea
            value={data.internoNaoFinanceiro}
            onChange={(e) => onChange('internoNaoFinanceiro', e.target.value)}
            className="gestorial-input"
          />
        ) : (
          <p className="text-gray-900">{data.internoNaoFinanceiro}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Externo-Não Financeiro</label>
        {isEditing ? (
          <textarea
            value={data.externoNaoFinanceiro}
            onChange={(e) => onChange('externoNaoFinanceiro', e.target.value)}
            className="gestorial-input"
          />
        ) : (
          <p className="text-gray-900">{data.externoNaoFinanceiro}</p>
        )}
      </div>
    </div>
  </div>
);