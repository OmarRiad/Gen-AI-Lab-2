# Root Cause Analysis Assistant (Concept Website)

A minimal static explainer site demonstrating an idea for an AI-powered **Root Cause Analysis Assistant** that correlates metrics, traces, and logs to answer natural language operational questions like:

> Why is the checkout service slow?

The site ( `index.html` ) outlines the problem, architecture, reasoning flow, an example structured output, and includes a generated prompt starter for an LLM reasoning pipeline.

## 🔍 Problem
Observability platforms (metrics dashboards, traces, log explorers) give raw signals, but engineers still manually correlate:
- Which metric spiked first?
- Is that tied to a slow span in a specific service?
- Do logs show an error pattern or an index regression?

This costs time during incidents.

## 🤖 Conceptual Solution
1. Ingest recent windowed telemetry: metrics (Prometheus), traces (Tempo/Jaeger), logs (Loki).
2. Detect anomalies (delta %, z-score, seasonality deviation).
3. Extract slow spans, resource saturation, and clustered log anomalies.
4. Build compact structured context (JSON + summarizations).
5. Run an LLM reasoning loop (LangChain orchestration) to produce hypothesized causes + next steps.
6. Return structured answer with confidence and ranked evidence.

## 🧭 Architecture (High-Level)
Mermaid diagram included in the page (lazy-rendered when expanded). If the diagram does not render, ensure network access to the Mermaid CDN or follow the “Offline Mermaid” section below.

```
User Question/Alert → Data Ingestion → Correlation Engine → Context Builder → LLM Reasoning → Hypothesis Ranking → Answer
```

Underlying sources: Prometheus, Tempo/Jaeger, Loki.

## 🧪 Example Output (JSON)
```json
{
  "question": "Why is the checkout service slow?",
  "probable_cause": "MongoDB pod CPU saturation causing increased query latency for order aggregation pipeline.",
  "evidence": [
    "p95 latency for checkout_service +240% starting 12:29",
    "MongoDB pod cpu_usage 80% → 96% sustained",
    "Trace span db.query.aggregate median 38ms → 140ms",
    "Logs: increase in 'COLLSCAN' warnings (no index)"
  ],
  "next_steps": [
    "EXPLAIN aggregation pipeline; verify index on (user_id, status)",
    "Check recent deployment at 12:25 for query change",
    "Add index or rewrite stage causing full collection scan"
  ],
  "confidence": 0.82
}
```

## 🧰 Tech Stack (Conceptual)
| Layer | Options |
|-------|---------|
| Metrics | Prometheus |
| Traces | Grafana Tempo / Jaeger |
| Logs | Loki |
| Orchestration | LangChain |
| LLM Providers | OpenAI / Anthropic (pluggable) |
| API (Prototype) | FastAPI or Express |
| Cache / Embeddings | Redis / SQLite |

## 📁 File Structure
```
.
├── index.html        # Static page with sections & Mermaid diagram
├── css/
│   └── styles.css    # Styling (dark theme, responsive grid)
├── js/
│   └── app.js        # Prompt generator interactivity
└── README.md         # This file
```

## ▶️ Running Locally
No build step needed—just open the HTML file.

Windows (PowerShell):
```powershell
start .\index.html
```

Mac/Linux:
```bash
open ./index.html   # macOS
xdg-open ./index.html  # Linux
```

## 🌐 Offline Mermaid Option
If the Mermaid diagram fails (e.g., offline environment):
1. Download the Mermaid script:
   - https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js
2. Save it as: `js/mermaid.min.js`
3. Replace in `index.html`:
```html
<script src="js/mermaid.min.js"></script>
```

## 🧠 Prompt Generator
The button near the bottom generates a structured LLM prompt template for a root cause reasoning workflow:
- Hypothesis formation
- Evidence ranking
- Confidence scoring
- Next step suggestions

You can copy & reuse that template for experimentation in an LLM playground.

## 🛠️ Possible Extensions
| Idea | Description | Effort |
|------|-------------|--------|
| Mock API | Add a simple `/api/root-cause` returning canned JSON | Low |
| Feedback UX | Let users thumbs-up/down hypotheses | Medium |
| Multiple Diagrams | Add ingestion + retrieval pipeline detail | Low |
| Token Budgeting | Show estimated prompt token size | Medium |
| Dark/Light Toggle | Switch themes + re-render Mermaid | Low |
| Deploy | GitHub Pages / Netlify / Vercel | Very Low |
| Runbook Hooks | Suggest clickable scripts (with safeguards) | Higher |

## 🔒 Security & Privacy (Future Considerations)
- Redact PII from logs before summarization.
- Limit tokenized data to minimal context windows.
- Add audit logging for queries & produced answers.
- Allow on-prem LLM or local inference.

## ⚠️ Limitations (Current Static Version)
- No real data ingestion or anomaly detection logic implemented.
- Diagram is purely illustrative.
- No build tooling, bundling, or test harness.
- Not optimized for accessibility (baseline semantics only).

## 🧪 Minimal Mock API Sketch (Future)
Example FastAPI snippet (not included yet):
```python
from fastapi import FastAPI
from datetime import datetime
app = FastAPI()

@app.post('/api/root-cause')
async def root_cause(query: dict):
    return {
        "question": query.get("question"),
        "probable_cause": "Example placeholder",
        "evidence": ["demo metric spike", "demo slow span"],
        "next_steps": ["collect real telemetry"],
        "confidence": 0.1,
        "generated_at": datetime.utcnow().isoformat()+"Z"
    }
```

## 🤝 Contributing (Future)
1. Fork
2. Branch (`feature/add-api`)
3. Commit conventional style (`feat: add mock api`)
4. PR with context & screenshots

## 🪪 License
Choose one (e.g. MIT). Example MIT header can be added later:
```
MIT License © 2025 Your Name
```

## 📬 Contact / Next Steps
Want this turned into a functional prototype (API + minimal telemetry adapters)?
Open an issue or request the scaffold and we can expand it.

---
**Status:** Static concept page. Ready for incremental enhancement.
