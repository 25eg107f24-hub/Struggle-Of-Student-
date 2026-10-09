# Struggle of Students (SS) — Official Web Platform

<p align="center">
  <img src="public/ss-logo.jpg" alt="Struggle of Students (SS) Official Logo" width="160" style="border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.2);" />
</p>

<p align="center">
  <strong>"YOUR TALENT • YOUR SKILLS • YOUR OPPORTUNITY"</strong><br>
  <em>A modern, full-stack platform built by students, for students.</em>
</p>

<p align="center">
  <a href="#-key-features">Key Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-test-accounts">Test Accounts</a> •
  <a href="#-git--github-instructions">GitHub Instructions</a>
</p>

---

## 🌟 Overview

**Struggle of Students (SS)** is an active student collective bridging the gap between campus struggles and real-world breakthroughs. The platform unites over 5,000+ student members across 45+ colleges in technology, live music, college fest production, verified campus placements, and 24/7 peer guidance.

This repository contains the complete full-stack web application built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Prisma ORM**.

---

## 🚀 Key Features

### 1. Distinctive Gen-Z Light Theme & Homepage (`/`)
* **Hero Section:** Official SS crest showcase, live stats counter (5,000+ Students, 120+ Fests, 320+ Offers, ₹57 LPA Highest Package), and call-to-actions.
* **4 Pillars Showcase:**
  * 🎵 **SS Band & Culture:** Live college fest rock/fusion band.
  * 💻 **Tech & Builders:** Open source student development via SS IT Solutions.
  * 💼 **Verified Careers:** Direct referrals and off-campus DSA bootcamps.
  * 🤝 **Peer Support:** Confidential guidance and anti-ragging support.
* **Announcements Bar:** Live community alerts broadcasting flagship fests and placement cohorts.

### 2. Student Sign-In & Profile Dashboard (`/login` & `/profile`)
* **Dual Login:** Sign in via registered email or unique SS Membership ID (e.g. `SS-2026-0001`).
* **Digital SS Student ID Card:** Personalized verified membership card with student details, batch, and unique membership barcode.
* **My Applications Tracker:** Real-time status tracking (`SS-APP-XXXX`) for internship and project applications.
* **Volunteer Slots:** View confirmed event volunteer duties and stage passes.
* **Registered Meetings:** Direct access to private Zoom webinar links and entry passcodes.

### 3. Join Community Membership (`/join`)
* **Registration Form:** Validates full name, email, phone, college, degree, graduation year, multi-select tracks, and portfolio links.
* **Database Persistence:** Real-time SQLite persistence with duplicate prevention.
* **Digital Member ID:** Instant generation of interactive student membership card upon submission.

### 4. Events & Volunteering (`/events`)
* **Event Listings:** Filterable by categories (`TECH`, `CULTURAL`, `WORKSHOP`, `SOCIAL`).
* **Volunteer Quota Control:** Administrators set volunteer capacities per event.
* **Overbooking Protection:** Uses interactive database transactions to lock slots. When filled, automatically displays **"Volunteer Slots Full"** and prevents overbooking.

### 5. Opportunities Hub & Status Tracker (`/opportunities`)
* **Searchable Hub:** Covers internships, campus ambassadors, developer projects, band auditions, workshops, and leadership roles.
* **Application Modal:** Direct submissions with resume link, portfolio, and cover note.
* **Live Status Tracker:** Applicants can track review decisions (`PENDING`, `REVIEWING`, `SELECTED`, `REJECTED`) using their Reference ID (e.g. `SS-APP-XXXX`).

### 6. SS Team & Leadership (`/team`)
* **Executive Leadership Spotlight:** Founder, Co-founders, and Directors with photos, biographies, college affiliations, and responsibilities.
* **Department Filter:** Tech & Dev, Creative & Band, Event Operations, PR & Outreach, Guidance.
* **Dynamic Active Count:** The total number of active core team members is calculated dynamically in real-time from the database.

### 7. Verified Placements Hall of Fame (`/placements`)
* **Placement Statistics Dashboard:** Highest package (₹57 LPA), average package (₹18.4 LPA), total offers (320+), and off-campus conversion metrics.
* **Verified Student Cards:** Real company tags (Google, Microsoft, Amazon, Atlassian, Morgan Stanley, Zomato), roles, colleges, batch years, and interview testimonials.

### 8. Our Services (`/services`)
* **Dedicated Deep-Dive Sections:**
  * **SS Band:** 6-piece live band for campus fests and pro-nights.
  * **SS Event Management:** Turnkey college fest production, sound/lighting, artist booking.
  * **SS IT Solutions:** Web development, club portals, ticketing systems.
  * **Student Problems & Guidance:** 1-on-1 confidential peer support.
  * **Career & Internship Support:** ATS resume reviews, mock interviews, referrals.
* **Direct Booking Modal:** Service enquiry submissions stored directly to database with admin triage.

### 9. Online Meetings & Private Link Security (`/meetings`)
* **Interactive Masterclasses & AMAs:** Keynote speaker profiles, agendas, and participant quotas.
* **Capacity Enforcement:** Strict participant limits per session.
* **Link Privacy:** Private Zoom/Meet URLs are protected from public scraping and shared only with registered attendees.
* **Zoom API Integration:** Ready for Zoom Server-to-Server OAuth API with manual fallback.

### 10. Role-Based Admin Dashboard (`/admin`)
* **Secure Login (`/admin/login`):** HTTP-only session cookies with bcrypt authentication.
* **Real-Time Control Modules:**
  * Overview KPIs & statistics.
  * Events & Volunteer Capacity: Adjust quotas in real time; approve/reject applicants.
  * Opportunities Manager: Review applicants and change hiring status.
  * Community Members: Searchable directory of registered students.
  * Placements Manager: Add verified student offers.
  * Team Management: Toggle active status (instantly updates site-wide active counters).
  * Service Inquiries: Triage incoming bookings.
  * Online Meetings Scheduler: Zoom or manual meeting link creation.
  * Announcements Manager: Broadcast top banner alerts.

---

## 🛠️ Tech Stack

* **Framework:** [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components)
* **Language:** [TypeScript 5.6](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS 3.4](https://tailwindcss.com/)
* **Database & ORM:** [Prisma ORM 5.22](https://www.prisma.io/) with SQLite
* **Authentication:** Role-based JWT session in HTTP-only cookies + bcryptjs
* **Icons:** [Lucide React](https://lucide.dev/)

---

## ⚡ Quick Start

### 1. Prerequisites
* [Node.js](https://nodejs.org/) (v18.17+ or LTS v20+)
* npm, yarn, or pnpm

### 2. Install Dependencies
```bash
npm install
```

### 3. Initialize Database
```bash
# Push schema to SQLite database
npx prisma db push

# Seed initial verified records (events, opportunities, team, placements, meetings)
node prisma/seed.js
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 🔑 Environment Variables (`.env`)

Create a `.env` file in the project root:

```env
DATABASE_URL="file:./dev.db"
ADMIN_EMAIL="admin@struggleofstudents.org"
ADMIN_PASSWORD="admin_ss_secret_2026"
JWT_SECRET="ss_super_secure_jwt_secret_token_genz_2026_xyz"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 👤 Test Accounts

### Student Community Sign-In (`/login`)
* **Student 1**: `vikram.roy@dtu.ac.in` (SS ID: `SS-2026-0001`) — Vikramaditya Roy
* **Student 2**: `meera.nambiar@vit.ac.in` (SS ID: `SS-2026-0002`) — Meera Nambiar

### Admin Portal (`/admin/login`)
* **Email**: `admin@struggleofstudents.org`
* **Password**: `admin_ss_secret_2026`

---

## 📦 Git & GitHub Instructions

To push this repository to GitHub:

### Option A: Using Command Line (Git)
```bash
# 1. Initialize git (if not already done)
git init
git branch -M main

# 2. Stage and commit all files
git add .
git commit -m "feat: complete Struggle of Students platform with light theme, student auth & official branding"

# 3. Connect to your GitHub repository (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git

# 4. Push code
git push -u origin main
```

### Option B: Using GitHub Desktop
1. Open **GitHub Desktop**.
2. Click **File** > **Add Local Repository...** (or press `Ctrl + O`).
3. Browse and select: `C:\Users\Janu\.gemini\antigravity\scratch\struggle-of-students`
4. If prompted to create a repository, click **Create Repository**.
5. Click **Publish repository** to push it to your GitHub account!

---

<p align="center">
  Built with ❤️ for <strong>Struggle of Students (SS)</strong>
</p>
