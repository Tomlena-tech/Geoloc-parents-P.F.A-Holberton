from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get("/")
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})



class LocationData(BaseModel):
    latitude: float
    longitude: float

@app.post("/api/location")
async def save_location(location: LocationData):
    print(f"Position reçue: {location.latitude}, {location.longitude}")
    return {"status": "ok", "lat": location.latitude, "lng": location.longitude}
