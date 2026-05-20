from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.requests import Request

app = FastAPI()

# archivos estáticos
app.mount("/static", StaticFiles(directory="static"), name="static")

# templates HTML
templates = Jinja2Templates(directory="templates")


@app.get("/")
async def home(request: Request):
    return templates.TemplateResponse(
        "index.html",
        {"request": request}
    )


@app.get("/api/message")
async def message():
    return {"message": "Hola desde FastAPI"}
