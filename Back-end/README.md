# Bagian Back-End dari Aplikasi Pustaka Cahaya

## API Spec yang akan digunakan pada aplikasi adalah sebagai berikut :

### Register User API

Endpoint : POST [link]/register

Request Body : 

'''json 
{
    "email": "fauzan17@example.com",
    "password": "SecretClass" // min 8 char
}
'''

Response Body Success :

'''json 
{
    "status": "success",
    "message": "Registration Successful",
    "data": {
        "id": 12345,
        "email": "fauzan17@example.com",
        "role": 1
    }
}
'''

Response Body Error :

'''json 
{
    "status": "error",
    "message": "Registration Failed",
    "error_detail": "Email is already in use"
}
'''

### Login User API

Endpoint : POST [link]/login

Request Body : 

'''json 
{
    "email/username": "fauzan17@example.com",
    "password": "SecretClass"
}
'''

Response Body Success :

'''json 
{
    "status": "success",
    "message": "Login Successful",
    "data": {
        "id": 12345,
        "email": "fauzan17@example.com",
        "role": 1,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiAiMTIzNDUiLCAiaWF0IjogMTYyMzEyMzUwMH0.H6MQUMR1Jvh7zxP3kW6VXWd7OlvGp7sFcpj2ZDqkNKk"
    }
}
'''

Response Body Error :

'''json 
{
    "status": "error",
    "message": "Login Failed",
    "error_detail": "Invalid Email/Username or Invalid Password"
}
'''