## 📍 API Endpoints (Used in Frontend)

### User Authentication

---

### 1. Register User

**POST** `/users/register`

Creates a new user account.

Request Body:

```js
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "123456"
}
```

Response:

```js
{
  "user": { ... },
  "token": "JWT_TOKEN"
}
```

---

### 2. Login User

**POST** `/users/login`

Authenticates an existing user and returns a JWT token.

Request Body:

```js
{
  "email": "john@example.com",
  "password": "123456"
}
```

Response:

```js
{
  "user": { ... },
  "token": "JWT_TOKEN"
}
```

---

### 3. Logout User

**GET** `/users/logout`

Logs out the currently authenticated user by invalidating the token.

Headers:

```js
Authorization: Bearer <JWT_TOKEN>
```

Response:

```js
{
  "message": "User logged out successfully"
}
```

---

### Authentication Flow

After successful login or registration:

1. Server returns a **JWT token**
2. Token is stored in **localStorage**

```js
localStorage.setItem("token", data.token);
```

3. Protected routes check the token before allowing access.

If token is not found:

```js
navigate("/UserLogin");
```

### Protected Route Behavior

Certain routes such as `/home` are protected.

Before rendering the page, the application checks if a JWT token exists in **localStorage**.

```js
const token = localStorage.getItem("token");

if (!token) {
  navigate("/UserLogin");
}
```

If the token is not found, the user is automatically redirected to the login page.

---

### Logout Behavior

When a user logs out:

1. A request is sent to the logout endpoint

```
GET /users/logout
```

2. The JWT token is removed from **localStorage**

```js
localStorage.removeItem("token");
```

3. The user is redirected to the login page

```js
navigate("/UserLogin");
```

---

# 📍 Complete Authentication Flow

```
User Signup
      ↓
User Login
      ↓
Server returns JWT Token
      ↓
Token stored in localStorage
      ↓
Protected routes check token
      ↓
User accesses protected pages (/home)
      ↓
User Logout
      ↓
Token removed
      ↓
Redirect to login page
```

---

## 🚖 Captain Authentication API

### 📍 API Endpoints (Used in Frontend)

Captain Authentication\
**1. Register Captain**

POST `/captains/register`

Creates a new captain (driver) account with vehicle information.

**_Request Body_**

```js
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "123456",
  "vehicle": {
    "color": "White",
    "plate": "HR26AB1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

**_Response_**

```js
{
  "captain": { ... },
  "token": "JWT_TOKEN"
}
```

**2. Login Captain**

POST `/captains/login`

Authenticates an existing captain and returns a JWT token.

Request Body

```js
{
  "email": "john@example.com",
  "password": "123456"
}
```

Response

```js
{
  "captain": { ... },
  "token": "JWT_TOKEN"
}
```

**_3. Get Captain Profile_**

GET `/captains/profile`

Returns the authenticated captain's profile information.

Headers
Authorization: Bearer <JWT_TOKEN>
Response

```js
{
  "captain": {
    "_id": "...",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "vehicle": {
      "color": "White",
      "plate": "HR26AB1234",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

**_4. Logout Captain_**

GET `/captains/logout`

Logs out the currently authenticated captain by invalidating the token.

Headers
Authorization: Bearer <JWT_TOKEN>
Response

```js
{
  "message": "Captain logged out successfully"
}
```

---

### 🔐 Captain Authentication Flow

---

After successful login or registration:

Server returns a JWT token

Token is stored in localStorage

localStorage.setItem("captain-token", data.token);

Protected routes check the token before allowing access.

If the token is not found:

## navigate("/captain-login");

### 🛡️ Protected Route Behavior

---

Certain routes such as /captain-home are protected.

Before rendering the page, the application checks if a JWT token exists in localStorage.

const token = localStorage.getItem("captain-token");

```js
if (!token) {
  navigate("/captain-login");
}
```

## If the token is not found, the captain is automatically redirected to the login page.

### 🚪 Logout Behavior

---

When a captain logs out:

A request is sent to the logout endpoint

GET `/captains/logout`

The JWT token is removed from localStorage

localStorage.removeItem("captain-token");

The captain is redirected to the login page

navigate("/captain-login");

---

### 🔄 Complete Captain Authentication Flow

---

```js
Captain Signup
       ↓
Captain Login
       ↓
Server returns JWT Token
       ↓
Token stored in localStorage (captain-token)
       ↓
Protected routes check token
       ↓
Captain accesses protected pages (/captain-home)
       ↓
Captain Logout
       ↓
Token removed
       ↓
Redirect to login page
```

---

### 💡 Important Note

---

The system uses separate authentication tokens for users and captains:

User Token → localStorage("token")\
Captain Token → localStorage("captain-token")

This separation ensures that user and captain sessions remain independent and secure.
