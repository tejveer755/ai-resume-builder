'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ArrowLeft, Download, Loader2, Check, Palette, Menu } from 'lucide-react';
import { UserProfile } from '@/lib/types';
import { useResumeData } from '@/hooks/use-resume-data';
import { useIsMobile } from '@/hooks/use-mobile';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { RESUME_TEMPLATES, TemplateId } from '@/components/resume/resume-tamplates';
import { cn } from '@/lib/utils';

export default function ResumePreviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useIsMobile();
  const [isExporting, setIsExporting] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('classic');
  const [sheetOpen, setSheetOpen] = useState(false);

  const resumeId = searchParams.get('id');
  const { resumeData, loading, error } = useResumeData({
    resumeId,
    loadLatest: !resumeId,
  });

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const resumeElement = document.getElementById('resume-content');
      if (!resumeElement) return;

      const canvas = await html2canvas(resumeElement, {
        // scale: 2,
        useCORS: true,
        logging: false,
        background: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${resumeData?.profile.basicInfo.name || 'Resume'}_${RESUME_TEMPLATES[selectedTemplate].name}_Resume.pdf`);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card className="p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => router.push('/dashboard')}>Back to Dashboard</Button>
        </Card>
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card className="p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">No Resume Data</h2>
          <p className="text-muted-foreground mb-4">Unable to load resume data.</p>
          <Button onClick={() => router.push('/dashboard')}>Back to Dashboard</Button>
        </Card>
      </div>
    );
  }

  const { profile } = resumeData;
  const SelectedTemplateComponent = RESUME_TEMPLATES[selectedTemplate].component;

  // Template selector component that can be reused
  const TemplateSelector = ({ onTemplateSelect }: { onTemplateSelect?: (templateId: TemplateId) => void }) => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Choose Template</h2>
        <p className="text-sm text-muted-foreground">
          Select a resume template that matches your style
        </p>
      </div>

      {/* Template Options */}
      <div className="space-y-3">
        {Object.entries(RESUME_TEMPLATES).map(([id, template]) => {
          const isSelected = selectedTemplate === id;
          return (
            <Card
              key={id}
              className={cn(
                'cursor-pointer transition-all hover:shadow-md',
                isSelected && 'ring-2 ring-primary bg-primary/5'
              )}
              onClick={() => {
                setSelectedTemplate(id as TemplateId);
                onTemplateSelect?.(id as TemplateId);
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {/* Preview Thumbnail */}
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded border flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-400">
                        {template.name.charAt(0)}
                      </span>
                    </div>
                    {isSelected && (
                      <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-1">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                  </div>

                  {/* Template Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1 flex items-center gap-2">
                      {template.name}
                      {isSelected && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          Active
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {template.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Job Details Card */}
      {resumeData.jobDetails && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-sm">Tailored For</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm font-medium">{resumeData.jobDetails.title}</p>
              <p className="text-xs text-muted-foreground">{resumeData.jobDetails.company}</p>
            </div>
            {resumeData.matchScore !== null && (
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Match Score:</span>
                  <span className="text-sm font-bold text-primary">{resumeData.matchScore}%</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Tips Card */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <h4 className="text-sm font-semibold mb-2">💡 Tips</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Click on any template to preview it</li>
            <li>• Changes are applied instantly</li>
            <li>• Export when you're satisfied</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header Actions */}
      <div className="sticky top-0 z-10 bg-background border-b shadow-sm">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-4">
              <Button variant="ghost" size={isMobile ? "sm" : "default"} onClick={() => router.push('/dashboard')}>
                <ArrowLeft className="mr-1 md:mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Back to Dashboard</span>
                <span className="sm:hidden">Back</span>
              </Button>

              {/* Mobile Template Button */}
              {isMobile && (
                <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      <span className="hidden xs:inline">Templates</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[85vh] sm:h-[75vh]">
                    <SheetHeader>
                      <SheetTitle>Choose Template</SheetTitle>
                      <SheetDescription>
                        Select a resume template that matches your style
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6 overflow-y-auto max-h-[calc(85vh-8rem)] sm:max-h-[calc(75vh-8rem)] pb-6">
                      <TemplateSelector onTemplateSelect={() => setSheetOpen(false)} />
                    </div>
                  </SheetContent>
                </Sheet>
              )}

              {/* Desktop Template Info */}
              {!isMobile && (
                <>
                  <div className="h-6 w-px bg-border" />
                  <div className="text-sm">
                    <span className="text-muted-foreground">Template:</span>
                    <span className="font-semibold ml-2">{RESUME_TEMPLATES[selectedTemplate].name}</span>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Mobile Menu Button */}
              {isMobile && (
                <Button variant="ghost" size="sm" onClick={() => setSheetOpen(true)}>
                  <Menu className="h-4 w-4" />
                </Button>
              )}

              <Button
                onClick={handleExportPDF}
                disabled={isExporting}
                size={isMobile ? "sm" : "lg"}
                className={isMobile ? "px-3" : ""}
              >
                {isExporting ? (
                  <>
                    <Loader2 className={cn("animate-spin", isMobile ? "h-4 w-4" : "mr-2 h-4 w-4")} />
                    {!isMobile && "Exporting..."}
                  </>
                ) : (
                  <>
                    <Download className={cn(isMobile ? "h-4 w-4" : "mr-2 h-4 w-4")} />
                    {!isMobile && "Export as PDF"}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Layout */}
      <div className="flex h-[calc(100vh-73px)] lg:flex-row flex-col">
        {/* Desktop & Tablet - Left Side Template Selector */}
        <div className="hidden lg:flex lg:w-80 border-r bg-muted/30 overflow-y-auto">
          <div className="p-6 w-full">
            <TemplateSelector />
          </div>
        </div>

        {/* Resume Preview - Responsive main content */}
        <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950">
          <div className="mx-auto py-2 sm:py-4 lg:py-8 px-2 sm:px-4 lg:container">
            <div className="mx-auto max-w-full lg:max-w-4xl">
              {/* Mobile & Tablet Template Info */}
              <div className="mb-4 lg:hidden">
                <Card>
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">
                          Template: {RESUME_TEMPLATES[selectedTemplate].name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Tap to browse templates
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSheetOpen(true)}
                        className="flex items-center gap-2"
                      >
                        <Palette className="h-4 w-4" />
                        <span className="hidden sm:inline">Change</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-2xl">
                <div
                  id="resume-content"
                  className={cn(
                    "transition-transform duration-200",
                    "sm:scale-95 lg:scale-100",
                    "origin-top"
                  )}
                  style={{
                    transformOrigin: 'top center',
                  }}
                >
                  <SelectedTemplateComponent profile={profile} />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

