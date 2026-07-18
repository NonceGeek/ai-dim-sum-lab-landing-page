'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Header from './Header';
import { type Locale, defaultLocale } from '../i18n/config';
import { type Dictionary } from '../i18n/types';

const API_URL = "https://ai-dimsum-lab-homepage.deno.dev/api/kanban";

interface KanbanItem {
  title: string;
  url: string;
  number: number;
  repository?: {
    name: string;
  };
  assignees?: {
    nodes: Array<{
      login: string;
      avatarUrl: string;
    }>;
  };
}

interface KanbanColumn {
  name: string;
  items: KanbanItem[];
}

export default function KanbanClient({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [columns, setColumns] = useState<KanbanColumn[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        
        if (data.errors) {
          console.error('GitHub API errors:', data.errors);
          throw new Error('GitHub API returned errors');
        }
        
        const project = data?.data?.organization?.projectV2;
        if (!project) {
          throw new Error('Project data not found');
        }
        
        // Find the status field (usually the only single-select field)
        const statusField = project.fields.nodes.find((f: { name: string }) => f.name === 'Status');
        const statusOptions = statusField ? statusField.options : [];
        
        // Group by optionId
        const columnsMap: { [key: string]: KanbanColumn } = {};
        statusOptions.forEach((opt: { id: string; name: string }) => {
          columnsMap[opt.id] = { name: opt.name, items: [] };
        });
        
        // Fallback: No Status
        columnsMap['NO_STATUS'] = { name: 'No Status', items: [] };
        
        // Iterate through items
        project.items.nodes.forEach((node: { content: KanbanItem; fieldValues: { nodes: Array<{ field?: { name: string }; optionId?: string }> } }) => {
          const content = node.content;
          if (!content) return;
          
          // Find the status optionId for this item
          let optionId = null;
          const fv = node.fieldValues.nodes.find((v) => v.field && v.field.name === 'Status');
          if (fv && fv.optionId) optionId = fv.optionId;
          
          if (optionId && columnsMap[optionId]) {
            columnsMap[optionId].items.push(content);
          }
        });
        
        // Convert to array, ordered by statusOptions + No Status
        const columnsArr = statusOptions.map((opt: { id: string }) => columnsMap[opt.id]);
        setColumns(columnsArr);
      } catch (e) {
        console.error('Error fetching kanban data:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const getStatusIcon = (columnName: string) => {
    switch (columnName) {
      case 'Todo':
        return <span className="w-4 h-4 rounded-full border-2 border-success flex items-center justify-center">
          <span className="w-2 h-2 bg-success rounded-full"></span>
        </span>;
      case 'In Progress':
        return <span className="w-4 h-4 rounded-full border-2 border-warning flex items-center justify-center">
          <span className="w-2 h-2 bg-warning rounded-full"></span>
        </span>;
      case 'Done':
        return <span className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
          <span className="w-2 h-2 bg-primary rounded-full"></span>
        </span>;
      default:
        return <span className="w-4 h-4 rounded-full border-2 border-neutral flex items-center justify-center">
          <span className="w-2 h-2 bg-neutral rounded-full"></span>
        </span>;
    }
  };

  const getColumnDescription = (columnName: string) => {
    switch (columnName) {
      case 'Todo':
        return "This item hasn't been started";
      case 'In Progress':
        return 'This is actively being worked on';
      case 'Done':
        return 'This has been completed';
      default:
        return 'Items in this status';
    }
  };

  return (
    <div className="min-h-screen bg-base-100">
      <Header locale={locale} dict={dict} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back to Home */}
        <div className="mb-6">
          <Link href={locale === defaultLocale ? '/' : `/${locale}`} className="btn btn-ghost btn-sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Project Kanban
          </h1>
          <p className="text-lg text-base-content">
            Visualize project issues as a kanban.
          </p>
        </header>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          /* Kanban Board */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-2xl mx-auto">
            {columns.map((col) => (
              <div key={col.name} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  {/* Column Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(col.name)}
                      <h3 className="card-title text-lg">{col.name}</h3>
                      <div className="badge badge-neutral">{col.items.length}</div>
                    </div>
                  </div>

                  {/* Column Description */}
                  <p className="text-sm text-base-content/70 mb-4">
                    {getColumnDescription(col.name)}
                  </p>

                  {/* Column Items */}
                  <div className="space-y-3">
                    {col.items.length === 0 && (
                      <div className="text-base-content/50 text-center py-4">
                        No items
                      </div>
                    )}
                    {col.items.map((item, i) => (
                      <div key={i} className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="card-body p-4">
                          <div className="flex items-start gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="text-xs text-base-content/60 mb-1">
                                {item.repository?.name}#{item.number}
                              </div>
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-primary hover:text-primary/80 transition-colors line-clamp-3"
                              >
                                {item.title}
                              </a>
                            </div>
                          </div>
                          
                          {/* Assignees */}
                          {item.assignees?.nodes && item.assignees.nodes.length > 0 && (
                            <div className="flex items-center gap-1 mt-3">
                              {item.assignees.nodes.map((assignee, j) => (
                                <img
                                  key={j}
                                  src={assignee.avatarUrl}
                                  alt={assignee.login}
                                  className="w-6 h-6 rounded-full border-2 border-base-100"
                                  title={assignee.login}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
