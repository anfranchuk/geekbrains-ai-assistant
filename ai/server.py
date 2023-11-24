from fastapi import FastAPI

app = FastAPI()

app = FastAPI(
    title="gik",
    description='Ai service',
    version='0.0.1',
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}
