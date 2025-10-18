'use client';

import { useState } from 'react';
import { Achievement } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface AchievementsFormProps {
  achievements: Achievement[];
  onUpdate: (achievements: Achievement[]) => void;
}

export function AchievementsForm({ achievements, onUpdate }: AchievementsFormProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const addAchievement = () => {
    const newAchievement: Achievement = {
      id: Date.now().toString(),
      title: '',
      description: '',
      date: '',
      category: 'personal',
    };
    onUpdate([...achievements, newAchievement]);
    setExpandedIds(new Set([...expandedIds, newAchievement.id]));
  };

  const updateAchievement = (id: string, field: keyof Achievement, value: any) => {
    const updated = achievements.map(ach =>
      ach.id === id ? { ...ach, [field]: value } : ach
    );
    onUpdate(updated);
  };

  const deleteAchievement = (id: string) => {
    onUpdate(achievements.filter(ach => ach.id !== id));
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

  const categoryIcons = {
    academic: '🎓',
    professional: '💼',
    personal: '⭐',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">Achievements</h2>
        </div>
        <Button onClick={addAchievement} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Achievement
        </Button>
      </div>

      <div className="space-y-4">
        {achievements.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No achievements added yet. Click "Add Achievement" to get started.
            </CardContent>
          </Card>
        ) : (
          achievements.map(ach => {
            const isExpanded = expandedIds.has(ach.id);
            return (
              <Card key={ach.id}>
                <CardHeader
                  className="cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() => toggleExpand(ach.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <span>{categoryIcons[ach.category]}</span>
                        {ach.title || 'New Achievement'}
                      </CardTitle>
                      {ach.date && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(ach.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteAchievement(ach.id);
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
                        <Label htmlFor={`title-${ach.id}`}>Title *</Label>
                        <Input
                          id={`title-${ach.id}`}
                          value={ach.title}
                          onChange={(e) => updateAchievement(ach.id, 'title', e.target.value)}
                          placeholder="Dean's List, Employee of the Month"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`category-${ach.id}`}>Category</Label>
                        <Select
                          value={ach.category}
                          onValueChange={(val) => updateAchievement(ach.id, 'category', val)}
                        >
                          <SelectTrigger id={`category-${ach.id}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="academic">🎓 Academic</SelectItem>
                            <SelectItem value="professional">💼 Professional</SelectItem>
                            <SelectItem value="personal">⭐ Personal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`date-${ach.id}`}>Date</Label>
                      <Input
                        id={`date-${ach.id}`}
                        type="month"
                        value={ach.date}
                        onChange={(e) => updateAchievement(ach.id, 'date', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`description-${ach.id}`}>Description *</Label>
                      <Textarea
                        id={`description-${ach.id}`}
                        value={ach.description}
                        onChange={(e) => updateAchievement(ach.id, 'description', e.target.value)}
                        placeholder="Describe your achievement and its impact..."
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
