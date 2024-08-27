from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class PredictionRequest(BaseModel):
    features: list

@app.post('/predict')
async def predict(data: PredictionRequest):
    # Load your trained model and make predictions
    model = load_model('model.h5')
    prediction = model.predict([data.features])
    return {'prediction': prediction.tolist()}
