// components/resume/template-selector.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { RESUME_TEMPLATES, TemplateId } from '@/components/resume/resume-tamplates';
import { cn } from '@/lib/utils';

interface TemplateSelectorProps {
  selectedTemplate: TemplateId;
  onSelectTemplate: (templateId: TemplateId) => void;
}

export function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Choose Template</h3>
        <p className="text-sm text-muted-foreground">
          Select a resume template that best fits your style
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(RESUME_TEMPLATES).map(([id, template]) => {
          const isSelected = selectedTemplate === id;
          return (
            <Card
              key={id}
              className={cn(
                'cursor-pointer transition-all hover:shadow-lg',
                isSelected && 'ring-2 ring-primary'
              )}
              onClick={() => onSelectTemplate(id as TemplateId)}
            >
              <CardContent className="p-4">
                {/* Template Preview Placeholder */}
                <div className="aspect-[210/297] bg-gradient-to-br from-gray-100 to-gray-200 rounded-md mb-3 relative overflow-hidden">
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl font-bold text-gray-300">
                      {template.name.charAt(0)}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-1">{template.name}</h4>
                  <p className="text-xs text-muted-foreground">{template.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
