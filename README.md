---
# 🏡 A&P Buyers – Real Estate Platform

A&P Buyers is a modern real estate platform built with **Next.js 15 (App Router)** and **Tailwind CSS 4**, offering dynamic property listings, admin dashboards, and seamless communication via integrated APIs.
---

## 🧠 APIs and Integrations

This project integrates several APIs to handle **authentication**, **database management**, **email automation**, and **real-time notifications** efficiently.

Below is a detailed overview of each API used and how to set them up.

---

### 🗄️ MongoDB

**Purpose:**
Used as the main database to store property listings, user inquiries, admin data, and lead information.

**Integration:**
Connected using **Mongoose** (or MongoDB’s official driver).
CRUD operations are implemented in API routes and server components for properties and leads.

**Setup:**

1. Create a MongoDB account on [MongoDB Atlas](https://www.mongodb.com/atlas/database).
2. Create a new cluster and database.
3. Copy your connection string and set it in `.env.local`:

   ```bash
   MONGODB_URI=your_mongodb_connection_string
   ```

---

### ✉️ Mailchimp

**Purpose:**
Used for collecting and managing **newsletter subscribers** and **marketing email lists**.

**Integration:**
A subscription form triggers a POST request to a Next.js API route, which calls the Mailchimp Marketing API.

**Setup:**

1. Create a free account at [Mailchimp](https://mailchimp.com/).
2. Go to **Account → Extras → API Keys** and generate a new key.
3. Get your **Audience ID** from the Mailchimp dashboard.
4. Add these to your `.env.local`:

   ```bash
   MAILCHIMP_API_KEY=your_mailchimp_api_key
   MAILCHIMP_SERVER_PREFIX=usX   # Example: us21
   MAILCHIMP_AUDIENCE_ID=your_audience_id
   ```

---

### 📧 Resend

**Purpose:**
Used for **transactional and automated emails** (contact form confirmations, admin alerts, etc.).

**Integration:**
Emails are sent from server-side API routes using the Resend SDK.

**Setup:**

1. Create an account at [Resend.com](https://resend.com/).
2. Get your **API Key** from the dashboard.
3. Add it to `.env.local`:

   ```bash
   RESEND_API_KEY=your_resend_api_key
   ```

---

### 🔐 Clerk

**Purpose:**
Handles **authentication and user management**, including sign-in, sign-up, and admin role protection.

**Integration:**
Clerk is configured in the App Router using its Next.js SDK. Admin routes are protected via middleware.

**Setup:**

1. Create an account at [Clerk.com](https://clerk.com/).
2. Create a new application and get your keys:

   - **Clerk Publishable Key**
   - **Clerk Secret Key**

3. Add them to `.env.local`:

   ```bash
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
   CLERK_SECRET_KEY=your_secret_key
   ```

---

### 📞 Twilio

**Purpose:**
Used to send **SMS or WhatsApp notifications** to admins and users when new inquiries are received.

**Integration:**
Triggered from API routes on form submissions or lead generation events.

**Setup:**

1. Create an account at [Twilio.com](https://www.twilio.com/).
2. Get your credentials:

   - **Account SID**
   - **Auth Token**
   - **Twilio Phone Number**

3. Add them to `.env.local`:

   ```bash
   TWILIO_ACCOUNT_SID=your_twilio_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_phone_number
   ```

---

### 🧩 Summary Table

| Service   | Used For                       | Type          | Integration Layer     |
| --------- | ------------------------------ | ------------- | --------------------- |
| MongoDB   | Database for listings & leads  | Database API  | Backend / Server      |
| Mailchimp | Newsletter & marketing emails  | Marketing API | Frontend → API Route  |
| Resend    | Transactional email delivery   | Email API     | Backend / Server      |
| Clerk     | Authentication & user sessions | Auth API      | Middleware / Frontend |
| Twilio    | SMS & WhatsApp notifications   | Messaging API | Backend / Server      |

---
