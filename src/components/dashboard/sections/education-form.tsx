'use client';

import { useState } from 'react';
import { Education } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface EducationFormProps {
  education: Education[];
  onUpdate: (education: Education[]) => void;
}

export function EducationForm({ education, onUpdate }: EducationFormProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      grade: '',
      description: '',
    };
    onUpdate([...education, newEdu]);
    setExpandedIds(new Set([...expandedIds, newEdu.id]));
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    const updated = education.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    onUpdate(updated);
  };

  const deleteEducation = (id: string) => {
    onUpdate(education.filter(edu => edu.id !== id));
    const newExpanded = new Set(expandedIds);
    newExpanded.delete(id);
    setExpandedIds(newExpanded);
  };

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">Education</h2>
        </div>
        <Button onClick={addEducation} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Education
        </Button>
      </div>

      <div className="space-y-4">
        {education.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No education added yet. Click "Add Education" to get started.
            </CardContent>
          </Card>
        ) : (
          education.map(edu => {
            const isExpanded = expandedIds.has(edu.id);
            return (
              <Card key={edu.id}>
                <CardHeader
                  className="cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() => toggleExpand(edu.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">
                        {edu.degree || 'New Education'} {edu.field && `in ${edu.field}`}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {edu.institution || 'Institution not specified'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteEducation(edu.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </div>
                  </div>
                </CardHeader>

                {isExpanded && (
                  <CardContent className="space-y-4 pt-0">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`institution-${edu.id}`}>Institution *</Label>
                        <Input
                          id={`institution-${edu.id}`}
                          value={edu.institution}
                          onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                          placeholder="University of Example"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`degree-${edu.id}`}>Degree *</Label>
                        <Input
                          id={`degree-${edu.id}`}
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                          placeholder="Bachelor of Science"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`field-${edu.id}`}>Field of Study *</Label>
                        <Input
                          id={`field-${edu.id}`}
                          value={edu.field}
                          onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                          placeholder="Computer Science"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`location-${edu.id}`}>Location</Label>
                        <Input
                          id={`location-${edu.id}`}
                          value={edu.location}
                          onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                          placeholder="City, Country"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`startDate-${edu.id}`}>Start Date</Label>
                        <Input
                          id={`startDate-${edu.id}`}
                          type="date"
                          value={edu.startDate}
                          onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`endDate-${edu.id}`}>End Date</Label>
                        <Input
                          id={`endDate-${edu.id}`}
                          type="date"
                          value={edu.endDate}
                          onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                          disabled={edu.current}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`grade-${edu.id}`}>Grade/GPA</Label>
                        <Input
                          id={`grade-${edu.id}`}
                          value={edu.grade}
                          onChange={(e) => updateEducation(edu.id, 'grade', e.target.value)}
                          placeholder="3.8/4.0"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`current-${edu.id}`}
                        checked={edu.current}
                        onCheckedChange={(checked) => updateEducation(edu.id, 'current', checked)}
                      />
                      <Label htmlFor={`current-${edu.id}`} className="cursor-pointer">
                        Currently studying here
                      </Label>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`description-${edu.id}`}>Description</Label>
                      <Textarea
                        id={`description-${edu.id}`}
                        value={edu.description}
                        onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                        placeholder="Relevant coursework, achievements, activities..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
