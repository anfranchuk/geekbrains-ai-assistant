from fastapi import FastAPI, Request
from ai.sound_to_text import sound_to_text

app = FastAPI()

app = FastAPI(
    title="gik",
    description='Ai service',
    version='0.0.1',
)

@app.get("/")
def read_audio(request: Request):
    #return {"audio":  sound_to_text(request)}
    return {"audio":  request}
