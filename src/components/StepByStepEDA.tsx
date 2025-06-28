import { useState, useEffect } from "react";
import { executeCode } from "@/lib/edaApi";
import { Button } from "@/components/ui/button";

interface StepByStepProps {
  sessionId: string;
  stepPlan: any[];
  onBack: () => void;
}

export default function StepByStepEDA({ sessionId, stepPlan, onBack }: StepByStepProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [execResult, setExecResult] = useState<{ image_b64?: string; stdout?: string; error?: string } | null>(null);

  useEffect(() => {
    if (stepPlan?.length) {
      runCurrent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIdx, stepPlan]);

  async function runCurrent() {
    if (!stepPlan?.length) return;
    const code = stepPlan[currentIdx].code;
    const res = await executeCode(sessionId, code);
    setExecResult(res);
  }

  const goNext = () => {
    if (currentIdx < stepPlan.length - 1) setCurrentIdx(currentIdx + 1);
  };
  const goPrev = () => {
    if (currentIdx > 0) setCurrentIdx(currentIdx - 1);
  };

  if (!stepPlan?.length) return null;

  return (
    <div className="space-y-4">
      {/* Back button */}
      <div>
        <Button
          variant="secondary"
          onClick={onBack}
          className="bg-blue-50 text-blue-700 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          ← Back to Quick Summary
        </Button>
      </div>
      <h3 className="text-lg font-semibold">
        Univariate Analysis – Step {currentIdx + 1} of {stepPlan.length}
      </h3>
      <p className="text-sm text-gray-700 mb-2">{stepPlan[currentIdx].description}</p>

      {execResult?.image_b64 && (
        <img
          src={`data:image/png;base64,${execResult.image_b64}`}
          alt="Plot"
          className="max-w-full rounded border"
        />
      )}
      {execResult?.stdout && (
        <pre className="bg-gray-100 p-2 text-xs overflow-auto max-h-32">
          {execResult.stdout}
        </pre>
      )}
      {execResult?.error && <p className="text-red-500 text-sm">{execResult.error}</p>}

      <div className="flex justify-between pt-4">
        <Button variant="secondary" onClick={goPrev} disabled={currentIdx === 0}>
          Previous
        </Button>
        <Button onClick={goNext} disabled={currentIdx === stepPlan.length - 1}>
          Next
        </Button>
      </div>
    </div>
  );
} 