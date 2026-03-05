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
localStorage.setItem("token", data.token)
```

3. Protected routes check the token before allowing access.

If token is not found:

```js
navigate("/UserLogin")
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

### Complete Authentication Flow

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
