// app/resume-preview/page.tsx
import { Suspense } from "react";
import ResumePreviewClient from "./ResumePreviewClient";

export default function ResumePreviewPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-muted-foreground">
      Loading resume preview...
    </div>}>
      <ResumePreviewClient />
    </Suspense>
  );
}
