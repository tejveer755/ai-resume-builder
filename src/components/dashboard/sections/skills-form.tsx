'use client';

import { useState } from 'react';
import { Skill } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Plus, X } from 'lucide-react';

interface SkillsFormProps {
  skills: Skill[];
  onUpdate: (skills: Skill[]) => void;
}

export function SkillsForm({ skills, onUpdate }: SkillsFormProps) {
  const [newSkill, setNewSkill] = useState('');
  const [category, setCategory] = useState<Skill['category']>('technical');
  const [proficiency, setProficiency] = useState<Skill['proficiency']>('intermediate');

  const addSkill = () => {
    if (!newSkill.trim()) return;
    const skill: Skill = {
      id: Date.now().toString(),
      name: newSkill.trim(),
      category,
      proficiency,
    };
    onUpdate([...skills, skill]);
    setNewSkill('');
  };

  const deleteSkill = (id: string) => {
    onUpdate(skills.filter(skill => skill.id !== id));
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categoryLabels = {
    technical: 'Technical Skills',
    soft: 'Soft Skills',
    language: 'Languages',
    tool: 'Tools & Technologies',
  };

  const proficiencyColors = {
    beginner: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    intermediate: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    expert: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Lightbulb className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-semibold">Skills</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add New Skill</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="skill-name">Skill Name</Label>
              <Input
                id="skill-name"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="e.g., React, Leadership, Spanish"
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={(val) => setCategory(val as Skill['category'])}>
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="soft">Soft Skills</SelectItem>
                  <SelectItem value="language">Language</SelectItem>
                  <SelectItem value="tool">Tool</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="proficiency">Proficiency</Label>
              <Select value={proficiency} onValueChange={(val) => setProficiency(val as Skill['proficiency'])}>
                <SelectTrigger id="proficiency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={addSkill} className="mt-4" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Skill
          </Button>
        </CardContent>
      </Card>

      {skills.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No skills added yet. Add your first skill above.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.entries(categoryLabels).map(([cat, label]) => {
            const categorySkills = groupedSkills[cat as Skill['category']] || [];
            if (categorySkills.length === 0) return null;

            return (
              <Card key={cat}>
                <CardHeader>
                  <CardTitle className="text-lg">{label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map(skill => (
                      <Badge
                        key={skill.id}
                        variant="secondary"
                        className={`${proficiencyColors[skill.proficiency]} px-3 py-1.5 text-sm flex items-center gap-2`}
                      >
                        {skill.name}
                        <span className="text-xs opacity-70">({skill.proficiency})</span>
                        <button
                          onClick={() => deleteSkill(skill.id)}
                          className="ml-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
