from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import math

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Data Models ---
class VectorRequest(BaseModel):
    fx: float
    fy: float

class ConvertRequest(BaseModel):
    value: float
    from_unit: str
    to_unit: str

class Motion1DRequest(BaseModel):
    type: str  # 'velocity', 'acceleration', 'displacement', 'freefall'
    val1: float
    val2: float
    val3: float = 0 # Optional

class ProjectileRequest(BaseModel):
    velocity: float
    angle: float

class NewtonRequest(BaseModel):
    type: str # 'second_law', 'weight', 'friction'
    mass: float
    val2: float = 0 # acceleration or friction_coeff
# --- Endpoints ---

@app.get("/")
def home():
    return {"status": "System Online"}

# Module 1: Vectors & Units
@app.post("/convert")
def solve_conversion(data: ConvertRequest):
    factors = {"m": 1.0, "km": 1000.0, "ft": 0.3048, "mi": 1609.34}
    if data.from_unit not in factors or data.to_unit not in factors:
        return {"error": "Unit not supported"}
    meters = data.value * factors[data.from_unit]
    result = meters / factors[data.to_unit]
    return {"result": round(result, 4), "unit": data.to_unit}

@app.post("/vectors")
def solve_vector(data: VectorRequest):
    mag = math.sqrt(data.fx**2 + data.fy**2)
    angle = math.degrees(math.atan2(data.fy, data.fx))
    return {"magnitude": round(mag, 2), "angle": round(angle, 2)}

# Module 2: 1D Motion & Free Fall
@app.post("/motion1d")
def solve_motion(data: Motion1DRequest):
    g = 9.81
    
    if data.type == "constant_accel":
        # Find Final Velocity: vf = vi + at
        # val1=vi, val2=a, val3=t
        vf = data.val1 + (data.val2 * data.val3)
        return {"result": round(vf, 2), "label": "Final Velocity", "unit": "m/s"}

    elif data.type == "displacement_accel":
        # Find Displacement: x = vi*t + 0.5*a*t^2
        # val1=vi, val2=t, val3=a
        x = (data.val1 * data.val2) + (0.5 * data.val3 * (data.val2**2))
        return {"result": round(x, 2), "label": "Displacement", "unit": "m"}

    elif data.type == "freefall_time":
        # Dropped from rest (vi=0). Find height after t seconds.
        # y = 0.5 * g * t^2
        # val1 = t
        height = 0.5 * g * (data.val1**2)
        return {"result": round(height, 2), "label": "Distance Fallen", "unit": "m"}

    elif data.type == "freefall_velocity":
        # Dropped from rest. Find speed after t seconds.
        # v = g * t
        # val1 = t
        speed = g * data.val1
        return {"result": round(speed, 2), "label": "Velocity Impact", "unit": "m/s"}

    return {"error": "Invalid Type"}

# Module 3: 2D Projectile Motion
@app.post("/projectile")
def solve_projectile(data: ProjectileRequest):
    g = 9.81
    rads = math.radians(data.angle)
    
    # Range
    range_m = (data.velocity**2 * math.sin(2*rads)) / g
    # Max Height
    height_m = (data.velocity**2 * math.sin(rads)**2) / (2*g)
    # Flight Time
    time_s = (2 * data.velocity * math.sin(rads)) / g
    
    return {
        "range": round(range_m, 2), 
        "height": round(height_m, 2),
        "time": round(time_s, 2)
    }

@app.post("/newton")
def solve_newton(data: NewtonRequest):
    g = 9.81
    
    if data.type == "second_law":
        # F = ma
        # val2 = acceleration
        force = data.mass * data.val2
        return {"result": round(force, 2), "label": "Net Force", "unit": "N"}
    
    elif data.type == "weight":
        # W = mg
        weight = data.mass * g
        return {"result": round(weight, 2), "label": "Gravitational Force (Weight)", "unit": "N"}
        
    elif data.type == "friction":
        # f = uN = u(mg) (assuming horizontal surface)
        # val2 = coeff friction (u)
        normal = data.mass * g
        friction = data.val2 * normal
        return {"result": round(friction, 2), "label": "Kinetic Friction", "unit": "N"}

    return {"error": "Invalid Calculation"}