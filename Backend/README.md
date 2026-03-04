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

### 🛡️ Validation Rules

Email must be in valid format.

Password must be at least 8 characters long.

Both fields are required.

Validation is handled using express-validator middleware.

### 📤 Response Structure

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

### ❌ Error Responses

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
