'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Experience } from '@/lib/types';
import { useEffect, useState, useTransition } from 'react';
import { Plus, Trash2, Edit, Save, Loader2 } from 'lucide-react';
import { rewriteExperienceDescription } from '@/ai/flows/resume-rewrite-experience';
import { useToast } from '@/hooks/use-toast';

const experienceSchema = z.object({
  role: z.string().min(1, 'Role is required'),
  company: z.string().min(1, 'Company is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string(),
  description: z.string().min(1, 'Description is required'),
});

const formSchema = z.object({
  experience: z.array(experienceSchema),
});

type FormData = z.infer<typeof formSchema>;

interface ExperienceFormProps {
  experience: Experience[];
  onUpdate: (data: Experience[]) => void;
}

export function ExperienceForm({ experience, onUpdate }: ExperienceFormProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const { toast } = useToast();
  const [isAIPending, startAITransition] = useTransition();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      experience: experience.map(exp => ({...exp, endDate: exp.endDate || ''})) || [],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: 'experience',
  });

  useEffect(() => {
    form.reset({ experience: experience.map(exp => ({...exp, endDate: exp.endDate || ''})) });
  }, [experience, form]);

  const handleAddNew = () => {
    const newExperience = {
      id: new Date().toISOString(),
      role: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    append(newExperience);
    setEditingIndex(fields.length);
  };
  
  const handleEdit = (index: number) => {
    setEditingIndex(index);
  }

  const onSubmit = (data: FormData) => {
    const updatedExperience = data.experience.map((exp, index) => ({
      ...experience[index],
      ...exp,
    }));
    onUpdate(updatedExperience);
    setEditingIndex(null);
  };

  const handleRewrite = (index: number) => {
    const description = form.getValues(`experience.${index}.description`);
    if (!description) {
        toast({ title: "Cannot rewrite", description: "Description is empty.", variant: "destructive" });
        return;
    }
    
    startAITransition(async () => {
        try {
            const result = await rewriteExperienceDescription({ description });
            form.setValue(`experience.${index}.description`, result.rewrittenDescription);
            toast({ title: "Description Rewritten!", description: "AI has enhanced your job description."});
        } catch(error) {
            console.error("AI rewrite failed:", error);
            toast({ title: "AI Rewrite Failed", description: "Could not rewrite the description. Please try again.", variant: "destructive"});
        }
    });
  }

  return (
    <Card id="experience">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="font-headline text-2xl">Work Experience</CardTitle>
            <CardDescription>Detail your professional history.</CardDescription>
          </div>
          <Button variant="outline" onClick={handleAddNew}>
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {fields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-lg space-y-4 relative">
                {editingIndex === index ? (
                  <div className="space-y-4">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name={`experience.${index}.role`} render={({ field }) => (
                            <FormItem><FormLabel>Role</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <FormField control={form.control} name={`experience.${index}.company`} render={({ field }) => (
                            <FormItem><FormLabel>Company</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name={`experience.${index}.startDate`} render={({ field }) => (
                            <FormItem><FormLabel>Start Date</FormLabel><FormControl><Input placeholder="e.g., Jan 2022" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <FormField control={form.control} name={`experience.${index}.endDate`} render={({ field }) => (
                            <FormItem><FormLabel>End Date</FormLabel><FormControl><Input placeholder="e.g., Present" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                    </div>
                    <FormField control={form.control} name={`experience.${index}.description`} render={({ field }) => (
                        <FormItem>
                            <div className="flex justify-between items-center">
                                <FormLabel>Description</FormLabel>
                                <Button type="button" size="sm" variant="outline" onClick={() => handleRewrite(index)} disabled={isAIPending}>
                                    {isAIPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>}
                                    Rewrite with AI
                                </Button>
                            </div>
                            <FormControl><Textarea rows={5} {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="ghost" onClick={() => { remove(index); setEditingIndex(null); }}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button type="submit"><Save className="mr-2 h-4 w-4" /> Save</Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="absolute top-2 right-2 flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(index)}><Edit className="h-4 w-4"/></Button>
                        <Button variant="ghost" size="icon" onClick={() => remove(index)}><Trash2 className="h-4 w-4 text-destructive"/></Button>
                    </div>
                    <h3 className="font-semibold text-lg">{form.getValues(`experience.${index}.role`)}</h3>
                    <p className="text-muted-foreground">{form.getValues(`experience.${index}.company`)}</p>
                    <p className="text-sm text-muted-foreground">{form.getValues(`experience.${index}.startDate`)} - {form.getValues(`experience.${index}.endDate`)}</p>
                    <p className="mt-2 whitespace-pre-wrap">{form.getValues(`experience.${index}.description`)}</p>
                  </div>
                )}
              </div>
            ))}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
