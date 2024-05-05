# Bagian Back-End dari Aplikasi Pustaka Cahaya

## API Spec yang akan digunakan pada aplikasi adalah sebagai berikut :

### Home Page API

Endpoint : GET [Link]/index

Response Body : 

```json 
{
    "status": "success",
    "data": {
            "lis1": [
            {
                "bookID": 1,
                "judul": "Judul 1",
                "penulis": "nama penulis 1",
                "harga": 40000,
                "diskon": 0, // persen
                "cover": "~/cover/cover_buku_1.jpg" // link to cover
            },
            {
                "bookID": 2,
                "judul": "Judul 2",
                "penulis": "nama penulis 2",
                "harga": 40000,
                "diskon": 10, // persen
                "cover": "~/cover/cover_buku_2.jpg"
            },
            ...
        ],
        "list2": [
            {
                "bookID": 3,
                "judul": "Judul 3",
                "penulis": "nama penulis 3",
                "harga": 40000,
                "diskon": 25, // persen
                "cover": "~/cover/cover_buku_3.jpg"
            },
            {
                "bookID": 4,
                "judul": "Judul 4",
                "penulis": "nama penulis 4",
                "harga": 40000,
                "diskon": 20, // persen
                "cover": "~/cover/cover_buku_4.jpg"
            },
            ...
        ],
        "list3": [
            {
                "bookID": 5,
                "judul": "Judul 5",
                "penulis": "nama penulis 5",
                "harga": 40000,
                "diskon": 10, // persen
                "cover": "~/cover/cover_buku_5.jpg"
            },
            {
                "bookID": 6,
                "judul": "Judul 6",
                "penulis": "nama penulis 6",
                "harga": 80000,
                "diskon": 5, // persen
                "cover": "~/cover/cover_buku_6.jpg"
            },
            ...
        ]
    }
}
```


### Register User API

Endpoint : POST [link]/register

Request Body : 

```json 
{
    "nama":"Fauzan Azhiima",
    "email": "fauzan17@example.com",
    "password": "SecretClass" // min 8 char
}
```

Response Body Success :

```json 
{
    "status": "success",
    "message": "Registration Successful",
    "data": {
        "id": 12345,
        "email": "fauzan17@example.com",
        "role": 1
    }
}
```

Response Body Error :

```json 
{
    "status": "error",
    "message": "Registration Failed",
    "error_detail": "Email is already in use"
}
```

### Login User API

Endpoint : POST [link]/login

Request Body : 

```json 
{
    "email/username": "fauzan17@example.com",
    "password": "SecretClass"
}
```

Response Body Success :

```json 
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
```

Response Body Error :

```json 
{
    "status": "error",
    "message": "Login Failed",
    "error_detail": "Invalid Email/Username or Invalid Password"
}
```
