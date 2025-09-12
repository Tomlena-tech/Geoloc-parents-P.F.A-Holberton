from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get("/")
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/api/location")
async def save_location(latitude: float, longitude: float):
    print(f"Position reçue: {latitude}, {longitude}")
    return {"status": "ok", "lat": latitude, "lng": longitude}
