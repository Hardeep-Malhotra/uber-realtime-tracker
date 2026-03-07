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

---

## 📱 Frontend Application Documentation

### Overview

The Uber Realtime Tracker frontend is a React-based web application that provides two distinct user experiences: **User** (riders) and **Captain** (drivers). Users can book rides, select vehicles, and track their journey. Captains can receive ride requests, accept/ignore them, and complete rides.

---

### 🛠 Tech Stack

| Package | Purpose |
|---------|---------|
| **React** | UI framework |
| **Vite** | Build tool & dev server |
| **React Router DOM** | Client-side routing |
| **Tailwind CSS** | Styling |
| **GSAP** | Animations for panel transitions |
| **Axios** | HTTP requests |
| **React Hot Toast** | Toast notifications |
| **Remix Icon** | Icon library |

---

### 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── CaptainDetails.jsx
│   │   ├── ConfirmRide.jsx
│   │   ├── ConfirmRidePopUP.jsx
│   │   ├── FinishRide.jsx
│   │   ├── LocationSearchPanel.jsx
│   │   ├── LookingForDriver.jsx
│   │   ├── RidePopUP.jsx
│   │   ├── VehiclePanel.jsx
│   │   └── WaitingForDriver.jsx
│   ├── context/             # React Context providers
│   │   ├── CaptainContext.jsx
│   │   └── UserContext.jsx
│   ├── pages/               # Route-level pages
│   │   ├── CaptainHome.jsx
│   │   ├── CaptainLogin.jsx
│   │   ├── CaptainLogout.jsx
│   │   ├── CaptainProtectedWrapper.jsx
│   │   ├── CaptainRiding.jsx
│   │   ├── Captainsignup.jsx
│   │   ├── Home.jsx
│   │   ├── Riding.jsx
│   │   ├── Start.jsx
│   │   ├── UserLogin.jsx
│   │   ├── UserLogout.jsx
│   │   ├── UserProtectedWrapper.jsx
│   │   └── UserSignup.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── README.md
```

---

### 🛣 Routes

| Path | Component | Access | Description |
|------|-----------|--------|-------------|
| `/` | Start | Public | Landing page with "Continue" to user login |
| `/user-login` | UserLogin | Public | User login form |
| `/user-signup` | UserSignup | Public | User registration |
| `/home` | Home | Protected (User) | Main booking interface with map |
| `/users/logout` | UserLogout | Protected (User) | User logout |
| `/Riding` | Riding | Public | User ride-in-progress view |
| `/captain-login` | CaptainLogin | Public | Captain login |
| `/captain-signup` | Captainsignup | Public | Captain registration with vehicle info |
| `/captain-home` | CaptainHome | Protected (Captain) | Captain dashboard with ride requests |
| `/captain/logout` | CaptainLogout | Protected (Captain) | Captain logout |
| `/captian-riding` | CaptainRiding | Public | Captain ride-in-progress view |

---

### 📄 Pages

#### User Flow

- **Start** – Landing page with Uber branding and "Continue" button linking to user login.
- **UserLogin** – Email/password login with validation (min 6 chars), toast notifications, redirect to `/home` on success. Links to signup and captain login.
- **UserSignup** – Registration with first name, last name, email, password. Validates password length. Stores token in `localStorage` on success.
- **Home** – Protected. Main booking flow: pickup/destination inputs → LocationSearchPanel → VehiclePanel → ConfirmRide → LookingForDriver → WaitingForDriver. Uses GSAP for panel animations.
- **Riding** – User view during ride: driver info, pickup/destination, payment amount, "Make a payment" button.
- **UserLogout** – Calls logout API, removes token, redirects to login.

#### Captain Flow

- **CaptainLogin** – Email/password login. Stores `captain-token` in localStorage. Links to signup and user login.
- **Captainsignup** – Registration with name, email, password, vehicle (color, plate, capacity, type). Validates capacity by vehicle type (moto: 2, auto: 3, car: 5, bus: 60).
- **CaptainHome** – Protected. Dashboard with CaptainDetails, RidePopUP (new ride), ConfirmRidePopUP (OTP confirmation). Uses GSAP for panel animations.
- **CaptainRiding** – Captain view during ride: map, "Complete Ride" button, FinishRide panel.
- **CaptainLogout** – Calls logout API, removes captain-token, redirects to captain login.

---

### 🧩 Components

| Component | Used In | Purpose |
|-----------|---------|---------|
| **LocationSearchPanel** | Home | Location search results; selecting a location opens VehiclePanel |
| **VehiclePanel** | Home | Vehicle type selection (Uber Go, Moto, UberAuto) with prices |
| **ConfirmRide** | Home | Ride summary with pickup, destination, payment; "Confirm" button |
| **LookingForDriver** | Home | Shown after ride confirmation while searching |
| **WaitingForDriver** | Home | Shown when driver is assigned; driver info |
| **CaptainDetails** | CaptainHome | Captain stats: profile, earnings, hours online, trips |
| **RidePopUP** | CaptainHome | New ride request with pickup/destination; Accept/Ignore |
| **ConfirmRidePopUP** | CaptainHome | OTP input for ride confirmation; "Confirm" → CaptainRiding |
| **FinishRide** | CaptainRiding | Ride completion summary; "Finish Ride" button returns to CaptainHome |

---

### 🔐 Protected Routes

- **UserProtectedWrapper** – Wraps `/home` and `/users/logout`. Fetches `GET /users/profile` with token. Redirects to `/user-login` if no token or 401.
- **CaptainProtectWrapper** – Wraps `/captain-home` and `/captain/logout`. Fetches `GET /captains/profile` with captain-token. Redirects to `/captain-login` if no token or 401.

---

### Context Providers

- **UserDataContext** – Stores user data after login/registration; used for profile display.
- **CaptainDataContext** – Stores captain data after login/registration; used for captain dashboard.

---

### Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_BASE_URL` | Backend API base URL (e.g. `http://localhost:3000`) |

---

### User Booking Flow

```
Start → UserLogin → Home
  → Enter pickup & destination
  → LocationSearchPanel (select location)
  → VehiclePanel (choose vehicle)
  → ConfirmRide (confirm)
  → LookingForDriver (searching)
  → WaitingForDriver (driver assigned)
  → Riding (in progress)
```

---

### Captain Ride Flow

```
CaptainLogin → CaptainHome
  → RidePopUP (new ride request)
  → Accept → ConfirmRidePopUP (enter OTP)
  → CaptainRiding (in progress)
  → Complete Ride → FinishRide panel
  → Finish Ride → CaptainHome
```

---

### Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```
