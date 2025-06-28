const API = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8000";

export async function uploadDataset(file: File) {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch(`${API}/api/upload/dataset`, {
    method: "POST",
    body: fd,
  });
  return res.json();
}

export async function getEdaPlan(sessionId: string) {
  const res = await fetch(`${API}/api/eda/plan?session_id=${sessionId}`);
  return res.json();
}

export async function executeCode(sessionId: string, code: string) {
  const res = await fetch(`${API}/api/advisor/execute`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId, code }),
  });
  return res.json();
} 