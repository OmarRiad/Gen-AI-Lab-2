document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('ideaButton');
  const out = document.getElementById('generatedPrompt');
  if(!btn || !out) return;

  const promptTemplate = `You are an AI assistant helping investigate a service slowdown. 
Context Provided:
- Service: checkout-service
- Observed: p95 latency +240% between 12:29–12:35 UTC.
- Metrics: mongodb_cpu 80% -> 96% sustained; upstream payment API normal.
- Traces: span db.query.aggregate median 38ms -> 140ms; 92% of end-to-end latency now in aggregation stage.
- Logs: surge of 'COLLSCAN' warnings; deployment hash changed at 12:25.
Task:
1. Form 2-4 plausible root cause hypotheses.
2. Rank them with confidence (0-1).
3. For top hypothesis provide 3 concrete next validation steps.
Answer JSON:
{
  "hypotheses": [ {"cause": string, "confidence": number, "evidence": [string]} ],
  "next_steps": [string]
}`;

  btn.addEventListener('click', () => {
    out.classList.remove('hidden');
    out.textContent = promptTemplate;
    btn.textContent = 'Prompt Generated';
    btn.disabled = true;
  });
});