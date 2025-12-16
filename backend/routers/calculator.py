from fastapi import APIRouter, HTTPException
from zeep import Client
import schemas

router = APIRouter(
    prefix="/calculator",
    tags=["calculator"],
)

WSDL_URL = 'http://www.dneonline.com/calculator.asmx?wsdl'
_client = None

def get_client():
    global _client
    if _client is None:
        try:
            _client = Client(wsdl=WSDL_URL)
        except Exception as e:
            # Propagate the specific error to the caller/log
            raise Exception(f"Failed to connect to SOAP service: {e}")
    return _client

@router.post("/add", response_model=schemas.CalculationResponse)
def add(request: schemas.CalculationRequest):
    try:
        client = get_client()
        result = client.service.Add(intA=request.intA, intB=request.intB)
        return {"result": result}
    except Exception as e:
        # This will now show the actual connection error if get_client fails
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/subtract", response_model=schemas.CalculationResponse)
def subtract(request: schemas.CalculationRequest):
    try:
        client = get_client()
        result = client.service.Subtract(intA=request.intA, intB=request.intB)
        return {"result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/multiply", response_model=schemas.CalculationResponse)
def multiply(request: schemas.CalculationRequest):
    try:
        client = get_client()
        result = client.service.Multiply(intA=request.intA, intB=request.intB)
        return {"result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/divide", response_model=schemas.CalculationResponse)
def divide(request: schemas.CalculationRequest):
    if request.intB == 0:
        raise HTTPException(status_code=400, detail="Cannot divide by zero")
    try:
        client = get_client()
        result = client.service.Divide(intA=request.intA, intB=request.intB)
        return {"result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
