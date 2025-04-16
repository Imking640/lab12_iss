from pydantic import BaseModel

class Item(BaseModel): # For Data validation according to the data
    name: str   #dhange the data type to str
    description: str

class User(BaseModel):
    username: str
    bio: str
    
    # You can raise your hands and give the answer to the chocolate question
