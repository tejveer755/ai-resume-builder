'use client';

import { useState } from 'react';
import { Hackathon } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code2, Plus, Trash2, ChevronDown, ChevronUp, X } from 'lucide-react';

interface HackathonFormProps {
  hackathons: Hackathon[];
  onUpdate: (hackathons: Hackathon[]) => void;
}

export function HackathonForm({ hackathons, onUpdate }: HackathonFormProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [techInput, setTechInput] = useState<Record<string, string>>({});

  const addHackathon = () => {
    const newHackathon: Hackathon = {
      id: Date.now().toString(),
      projectName: '',
      eventName: '',
      date: '',
      role: '',
      description: '',
      technologies: [],
      award: '',
      projectLink: '',
    };
    onUpdate([...hackathons, newHackathon]);
    setExpandedIds(new Set([...expandedIds, newHackathon.id]));
  };

  const updateHackathon = (id: string, field: keyof Hackathon, value: any) => {
    const updated = hackathons.map(hack =>
      hack.id === id ? { ...hack, [field]: value } : hack
    );
    onUpdate(updated);
  };

  const deleteHackathon = (id: string) => {
    onUpdate(hackathons.filter(hack => hack.id !== id));
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

  const addTechnology = (id: string) => {
    const tech = techInput[id]?.trim();
    if (!tech) return;

    const hackathon = hackathons.find(h => h.id === id);
    if (hackathon) {
      updateHackathon(id, 'technologies', [...hackathon.technologies, tech]);
      setTechInput({ ...techInput, [id]: '' });
    }
  };

  const removeTechnology = (id: string, techToRemove: string) => {
    const hackathon = hackathons.find(h => h.id === id);
    if (hackathon) {
      updateHackathon(id, 'technologies', hackathon.technologies.filter(t => t !== techToRemove));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code2 className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">Hackathons & Projects</h2>
        </div>
        <Button onClick={addHackathon} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Hackathon
        </Button>
      </div>

      <div className="space-y-4">
        {hackathons.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No hackathons added yet. Click "Add Hackathon" to get started.
            </CardContent>
          </Card>
        ) : (
          hackathons.map(hack => {
            const isExpanded = expandedIds.has(hack.id);
            return (
              <Card key={hack.id}>
                <CardHeader
                  className="cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() => toggleExpand(hack.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">
                        {hack.projectName || 'New Hackathon Project'}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {hack.eventName || 'Event not specified'} {hack.award && `• ${hack.award}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteHackathon(hack.id);
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
                        <Label htmlFor={`projectName-${hack.id}`}>Project Name *</Label>
                        <Input
                          id={`projectName-${hack.id}`}
                          value={hack.projectName}
                          onChange={(e) => updateHackathon(hack.id, 'projectName', e.target.value)}
                          placeholder="Smart Parking System"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`eventName-${hack.id}`}>Event Name *</Label>
                        <Input
                          id={`eventName-${hack.id}`}
                          value={hack.eventName}
                          onChange={(e) => updateHackathon(hack.id, 'eventName', e.target.value)}
                          placeholder="HackMIT 2024"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`date-${hack.id}`}>Date</Label>
                        <Input
                          id={`date-${hack.id}`}
                          type="month"
                          value={hack.date}
                          onChange={(e) => updateHackathon(hack.id, 'date', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`role-${hack.id}`}>Your Role</Label>
                        <Input
                          id={`role-${hack.id}`}
                          value={hack.role}
                          onChange={(e) => updateHackathon(hack.id, 'role', e.target.value)}
                          placeholder="Full-stack Developer, Team Lead"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`description-${hack.id}`}>Project Description *</Label>
                      <Textarea
                        id={`description-${hack.id}`}
                        value={hack.description}
                        onChange={(e) => updateHackathon(hack.id, 'description', e.target.value)}
                        placeholder="Describe what you built, the problem it solves, and your key contributions..."
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`tech-${hack.id}`}>Technologies Used</Label>
                      <div className="flex gap-2">
                        <Input
                          id={`tech-${hack.id}`}
                          value={techInput[hack.id] || ''}
                          onChange={(e) => setTechInput({ ...techInput, [hack.id]: e.target.value })}
                          placeholder="React, Python, Firebase"
                          onKeyPress={(e) => e.key === 'Enter' && addTechnology(hack.id)}
                        />
                        <Button onClick={() => addTechnology(hack.id)} size="sm" type="button">
                          Add
                        </Button>
                      </div>
                      {hack.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {hack.technologies.map((tech, idx) => (
                            <Badge key={idx} variant="secondary" className="px-3 py-1">
                              {tech}
                              <button
                                onClick={() => removeTechnology(hack.id, tech)}
                                className="ml-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-full"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`award-${hack.id}`}>Award / Recognition</Label>
                        <Input
                          id={`award-${hack.id}`}
                          value={hack.award}
                          onChange={(e) => updateHackathon(hack.id, 'award', e.target.value)}
                          placeholder="1st Place, Best Use of AI"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`projectLink-${hack.id}`}>Project Link</Label>
                        <Input
                          id={`projectLink-${hack.id}`}
                          value={hack.projectLink}
                          onChange={(e) => updateHackathon(hack.id, 'projectLink', e.target.value)}
                          placeholder="https://github.com/username/project"
                        />
                      </div>
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
