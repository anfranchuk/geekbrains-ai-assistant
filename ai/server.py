import os

from fastapi import FastAPI, Request, UploadFile, File

from ai.sound_to_text import sound_to_text

app = FastAPI()

app = FastAPI(
    title="gik",
    description='Ai service',
    version='0.0.1',
)

@app.get("/")
async def read_audio():
    return {"message": "Hello World"}
@app.post("/analytics")
async def run_analytics(file: UploadFile = File(...)):
    if file is None:
        return {"error": "File is missing"}

    # Rest of your code
    # Save the uploaded audio file
    file_path = f"uploads/{file.filename}"
    with open(file_path, "wb") as f:
        contents = await file.read()
        f.write(contents)

    # Perform your analytics logic here
    result = sound_to_text(file_path)

    # Delete the uploaded file
    os.remove(file_path)

    return {"result": result}
