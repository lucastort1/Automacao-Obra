from datetime import datetime

from fastapi import File, Form, UploadFile, FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="OrçaIA API", version="0.1.0")

# CORS para o front em localhost
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---- MOCK DATA (MVP) ----
BUDGETS = [
    {"id": "b1", "name": "Casa térrea 120m²", "total": 235000.00, "created_at": datetime.now().isoformat()},
    {"id": "b2", "name": "Sobrado 180m²", "total": 410500.00, "created_at": datetime.now().isoformat()},
]
ITEMS = [
    {"id": "i1", "name": "Concreto fck 25 MPa", "price": 480.00, "unit": "m³"},
    {"id": "i2", "name": "Aço CA-50", "price": 6.80, "unit": "kg"},
    {"id": "i3", "name": "Tijolo cerâmico 8 furos", "price": 1.05, "unit": "un"},
]

@app.get("/api/v1/health")
def health(): return {"status": "ok"}

@app.get("/api/v1/budgets")
def list_budgets(): return {"items": BUDGETS}

@app.get("/api/v1/items")
def list_items(): return {"items": ITEMS}

@app.put("/api/v1/items/{item_id}")
def update_item(item_id: str, payload: dict):
    for it in ITEMS:
        if it["id"] == item_id:
            it["price"] = float(payload.get("price", it["price"]))
            return {"ok": True, "item": it}
    return {"ok": False}

@app.post("/api/v1/chat")
async def chat(text: str = Form(...), file: UploadFile | None = File(None)):
    reply = f"Recebi: '{text}'" + (f" com arquivo {file.filename}" if file else "")
    return {"reply": reply}