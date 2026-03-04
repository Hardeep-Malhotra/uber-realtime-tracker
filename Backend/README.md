# 🚀 User Authentication API Documentation

Documentation for the User Management system, focusing on secure registration and data integrity.

---

## 📍 1. User Registration (/users/register)

# 📍 Endpoint: User Registration

This endpoint allows new users to create an account.  
It handles:

- ✅ Data validation
- 🔐 Secure password hashing using bcrypt
- 🎟 JWT generation for immediate session access

---

## 📋 Route Details

| Property           | Value              |
| ------------------ | ------------------ |
| **URL**            | `/users/register`  |
| **Method**         | `POST`             |
| **Authentication** | None (Public)      |
| **Content-Type**   | `application/json` |

---

# 📥 Request Body

The request must be a JSON object.

### Required Structure

| Field              | Type   | Required | Description                |
| ------------------ | ------ | -------- | -------------------------- |
| fullname           | Object | ✅ Yes   | Container for user's names |
| fullname.firstname | String | ✅ Yes   | Minimum 2 characters       |
| fullname.lastname  | String | ❌ No    | Minimum 2 characters       |
| email              | String | ✅ Yes   | Must be unique & valid     |
| password           | String | ✅ Yes   | Minimum 8 characters       |

---

## 🧾 Example Request Payload

```json
{
  "fullname": {
    "firstname": "Aman",
    "lastname": "Sharma"
  },
  "email": "aman@example.com",
  "password": "supersecure123"
}
```

## 🛡️ Validation & Constraints

_We ensure data quality using express-validator and Mongoose schema validation:_

_🔹 First Name → Minimum 2 characters_

_🔹 Email → Valid format (regex validated), automatically lowercase & trimmed_

_🔹 Password → Minimum 8 characters_

_🔹 Uniqueness → Email field indexed as unique_

_🔹 Password Hashing → Automatically hashed before saving_

## 📤 Response Structure

**✅ Success Response**

Status Code: 201 Created
Description: User account created successfully and JWT generated.

```js
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "67b1a2c3d4e5f6g7h8i9j0",
    "fullname": {
      "firstname": "Aman",
      "lastname": "Sharma"
    },
    "email": "aman@example.com"
  }
}
```

⚠ Password is never returned in the response.

## ❌ Error Responses

400 Bad Request

Returned when validation fails (e.g., invalid email or weak password).

```js
{
  "error": [
    {
      "msg": "Invalid email / Plz enter email",
      "path": "email"
    }
  ]
}
```

500 Internal Server Error

Occurs due to database connection issues or unexpected server errors.

## 🔒 Security Mechanisms

**🔐 Password Hashing**

**_Uses bcrypt with 10 salt rounds_**

_Implemented via Mongoose pre("save") hook_

_Raw passwords never stored in the database_

_🎟 JWT (JSON Web Token)_

_Signed using JWT_SECRET from environment variables_

_Expiry time: 7 days_

_🛡 Data Protection_

_password field marked as select: false_

_Controller sets user.password = undefined before sending response_

## ⚙️ File Architecture

Layer Responsibility

##### Controller (user.controller.js) Handles request-response cycle & validation

##### Service (user.service.js) Business logic for creating user

##### Model (user.model.js) Defines schema, instance & static methods

##### Routes (user.routes.js) Defines endpoint & attaches validation middleware

## 🏁 Summary

The /users/register endpoint ensures:

Secure user registration

Proper input validation

Hashed password storage

JWT-based authentication

## Clean and protected API responses

# 📍 2. User Login (/users/login)

# 📍 Endpoint: User Login

Authenticates the user using email and password.  
If credentials are valid, a JWT token is generated and returned.

---

## 📋 Route Details

| Property           | Value              |
| ------------------ | ------------------ |
| **URL**            | `/users/login`     |
| **Method**         | `POST`             |
| **Authentication** | None (Public)      |
| **Content-Type**   | `application/json` |

---

# 📥 Request Body

The request must be a JSON object.

| Field    | Type   | Required | Description                      |
| -------- | ------ | -------- | -------------------------------- |
| email    | String | ✅ Yes   | Must be a valid registered email |
| password | String | ✅ Yes   | Minimum 8 characters             |

---

## 🧾 Example Request Payload

```json
{
  "email": "aman@example.com",
  "password": "supersecure123"
}
```

## 🛡️ Validation Rules

Email must be in valid format.

Password must be at least 8 characters long.

Both fields are required.

Validation is handled using express-validator middleware.

## 📤 Response Structure

✅ Success Response

Status Code: 200 OK
Description: Login successful. JWT token generated.

```js
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "67b1a2c3d4e5f6g7h8i9j0",
    "fullname": {
      "firstname": "Aman",
      "lastname": "Sharma"
    },
    "email": "aman@example.com"
  }
}
```

⚠ Password is never returned in the response.

## ❌ Error Responses

400 Bad Request

Validation failed.

```js
{
  "error": [
    {
      "msg": "Invalid email / Plz enter email",
      "path": "email"
    }
  ]
}
```

401 Unauthorized

Invalid email or password.

```js

{
  "message": "Invalid email or password"
}
```

## 🔒 Security Features

**Password comparison handled using bcrypt.**

_Password field is explicitly selected using .select("+password") for verification._

_Password is removed before sending the response._

_JWT token is generated using a secure JWT_SECRET._

_Token expiry: 7 days._

## ⚙️ Internal Flow

**Validate request input.**

_1. Find user by email._

_2. Compare hashed password using bcrypt._

_3. Generate JWT token._

_4. Remove password from response._

_5. Return authenticated user data._

## 🏁 Summary

**The /users/login endpoint ensures:**

_Secure credential verification_

_Hashed password comparison_

_JWT-based authentication_

_Protected user data handling_

_Clean and structured API response_

# 📄 Protected Routes Documentation

## 🔐 Authentication System

This API uses JWT (JSON Web Token) based authentication.
After a successful login, the server issues a JWT token which can be used to access protected routes.

_The token can be sent using:_

_Authorization Header (Bearer Token)_

_HTTP Cookies_

Additionally, the system supports token blacklisting to invalidate tokens after logout.

## 👤 Get User Profile

Retrieve the authenticated user's profile information.

## 📍 Endpoint

**GET /users/profile**
🔒 Authentication Required

**Yes**

_The request must include a valid JWT token._

## 📥 Request Headers

_Authorization (Bearer Token)_
_Authorization: Bearer <JWT_TOKEN>_

**Example:**

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

**OR**

**Cookie**
Cookie: token=<JWT_TOKEN>\*

## ⚙️ Middleware Flow

*T*he auth middleware performs the following checks:\*

_Extracts the token from cookies or authorization header_

_Checks whether the token exists in the blacklist database_

_Verifies the JWT token_

_Fetches the user from the database_

_Attaches the user to the request object_

**Example middleware logic:**

const token =
req.cookies.token ||
(req.headers.authorization && req.headers.authorization.split(" ")[1]);

## 📤 Success Response

**Status Code**

**200 OK**

**Example Response:**

```js
{
"\_id": "69a794fae6f71189d4be9366",
"fullname": {
"firstname": "Rahul",
"lastname": "Verma"
},
"email": "rahul.verma01@gmail.com"
}
```

## ❌ Error Responses

**Unauthorized Access**

Status Code

401 Unauthorized

Example Response

```js
{
"message": "Unauthorized access"
}
```

## Possible reasons:

**Missing token**

**Invalid token**

**Expired token**

**Token present in blacklist**

# 🚪 Logout User

**Logs out the authenticated user and invalidates the current token.**

## 📍 Endpoint

**GET /users/logout**

## 🔒 Authentication Required

**Yes**

**A valid JWT token must be included in the request.**

## ⚙️ Logout Process

**_The logout route performs the following actions:_**

**_Extracts the token from cookies or authorization header_**

**_Stores the token inside the blacklisttokens collection_**

**_Clears the authentication cookie_**

**_Prevents further usage of the token_**

## 📥 Request Headers

_Authorization: Bearer <JWT_TOKEN>_

**OR**

_Cookie: token=<JWT_TOKEN>_

## 📤 Success Response

_Status Code_

_200 OK_

**Example Response:**

```js
{
"message": "User logged out successfully"
}
```

## 🚫 Token Blacklisting

**When a user logs out, the token is stored inside a blacklist collection to prevent further usage.**

_Example MongoDB Document:_

```js
{
"\_id": "69a7e2a05301c33f3a50082b",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
"createdAt": "2026-03-04T07:43:28.133Z"
}
```

## ⏳ Automatic Token Expiration

**The blacklist schema uses a TTL index.**

**Example schema:**

```js
createdAt: {
type: Date,
default: Date.now,
expires: 86400
}
```

**This means:**

\***\*24 hours after creation → token automatically deleted\*\***

\***\*MongoDB automatically removes expired blacklist tokens.\*\***

## 🔄 Authentication Flow

**User Login**\
**↓**\
**JWT Token Generated**\
**↓**\
**Token stored in cookie / header**\
**↓**\
**User accesses protected routes**\
**↓**\
**Middleware verifies token**\
**↓**\
**User logs out**\
**↓**\
**Token stored in blacklist**\
**↓**\
**Token becomes invalid**\

## 📁 Related Files

**controllers/user.controller.js**
**middlewares/auth.middleware.js**
**routes/user.routes.js**
**models/blacklistToken.model.js**

These files work together to implement the authentication system.

## 🔐 Security Features

**The authentication system includes:**

**JWT based authentication**

**Password hashing using bcrypt**

**HTTP-only cookies**

**Token blacklisting**

**Automatic token expiration using MongoDB TTL index**

## 📌 Summary

_The API provides a secure authentication system with:_

_Protected routes_

_Token verification middleware_

_Logout functionality_

_Token blacklist mechanism_

_Automatic cleanup of expired tokens_



# 🚍 Captain Registration API

This endpoint allows a new **Captain (Bus Driver)** to register in the system.
It validates input data, securely hashes the password using **bcrypt**, and generates a **JWT authentication token** for the captain.

---

# 📍 Endpoint

```
POST /captains/register
```

### Authentication

❌ Public Route (No authentication required)

### Content-Type

```
application/json
```

---

# 📥 Request Body

The request must be sent as a JSON object.

| Field               | Type   | Required   | Description                                  |
| ------------------- | ------ | ---------- | -------------------------------------------- |
| fullname.firstname  | String | ✅ Yes      | First name of the captain (min 2 characters) |
| fullname.lastname   | String | ❌ Optional | Last name of the captain                     |
| email               | String | ✅ Yes      | Unique email address                         |
| password            | String | ✅ Yes      | Minimum 8 characters                         |
| vehicle.color       | String | ✅ Yes      | Vehicle color                                |
| vehicle.plate       | String | ✅ Yes      | Vehicle plate number                         |
| vehicle.capacity    | Number | ✅ Yes      | Passenger capacity                           |
| vehicle.vehicleType | String | ✅ Yes      | Type of vehicle (bus, auto, car, van)        |

---

# 📦 Example Request Payload

```json
{
  "fullname": {
    "firstname": "Ravi",
    "lastname": "Kumar"
  },
  "email": "driver.ravi@gmail.com",
  "password": "securepass123",
  "vehicle": {
    "color": "Blue",
    "plate": "HR02AB1234",
    "capacity": 50,
    "vehicleType": "bus"
  }
}
```

---

# 🛡 Validation Rules

The API validates incoming data using **express-validator** and Mongoose schema rules.

### First Name

* Minimum length: **2 characters**

### Email

* Must be a valid email format
* Stored in lowercase
* Must be **unique**

### Password

* Minimum length: **8 characters**
* Automatically **hashed before saving**

### Vehicle Information

* Color must be at least **3 characters**
* Plate number must be at least **3 characters**
* Capacity must be **1 or greater**
* Vehicle type must match allowed values

Allowed vehicle types:

```
bus
auto
car
van
```

---

# 🔐 Security Implementation

### Password Hashing

Passwords are automatically hashed using **bcrypt** before being saved to the database.

```
bcrypt salt rounds: 10
```

This is implemented using a **Mongoose pre("save") middleware**.

---

### JWT Authentication Token

After successful registration, the server generates a **JWT token**.

Token configuration:

```
Algorithm: HS256
Expiry: 24 hours
Payload: { _id: captainId }
```

The token is returned to the client for authentication in protected routes.

---

# 📤 Success Response

### Status Code

```
201 Created
```

### Example Response

```json
{
  "token": "JWT_TOKEN",
  "captain": {
    "_id": "65a8f2a5e21f3c92f13a41d7",
    "fullname": {
      "firstname": "Ravi",
      "lastname": "Kumar"
    },
    "email": "driver.ravi@gmail.com",
    "vehicle": {
      "color": "Blue",
      "plate": "HR02AB1234",
      "capacity": 50,
      "vehicleType": "bus"
    }
  }
}
```

⚠️ The password field is **never returned in the response**.

---

# ❌ Error Responses

### Validation Error

Status Code

```
400 Bad Request
```

Example

```json
{
  "errors": [
    {
      "msg": "First name must be at least 2 characters long."
    }
  ]
}
```

---

### Duplicate Email Error

Status Code

```
409 Conflict
```

Example

```json
{
  "message": "Captain with this email already exists"
}
```

---

# 📂 Backend Architecture

The captain registration flow follows a **layered backend architecture**.

```
Route
 ↓
Validator
 ↓
Controller
 ↓
Service
 ↓
Model
 ↓
Database
```

### File Structure

```
controllers/
 └ captain.controller.js

services/
 └ captain.service.js

models/
 └ captain.model.js

routes/
 └ captain.routes.js
```

---

# 🧪 Testing

You can test this endpoint using:

* Postman
* Thunder Client
* Curl
* Frontend application

Example URL:

```
http://localhost:4000/captains/register
```

---

# 📌 Summary

This endpoint handles:

✔ Captain account creation\
✔ Input validation\
✔ Password hashing\
✔ JWT token generation\
✔ Secure response handling\
✔ Vehicle information storage
