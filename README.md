# Hiring Platform Case Study

## Candidate Information
**Full Name:** M. Cita Prasetya Agam  
**Email Address:** agam.prasetya03@gmail.com
**Deployed URL:** [https://hiring-fe-agam.vercel.app/](https://hiring-fe-agam.vercel.app/)  

**Authentication & Authorization Details:**  
- Registrasi dan login menggunakan email & password dengan verifikasi email saat user baru mendaftar.  
- Login menggunakan Google OAuth.  
- Magic link login untuk email masih belum tersedia.  

## 1. Project Overview
Proyek ini merupakan platform untuk mencari dan melamar pekerjaan secara online. User dapat melihat daftar pekerjaan, mencari pekerjaan secara realtime, melamar pekerjaan, dan mengakses halaman admin jika sudah login.

---

## 2. Tech Stack Used
- **Next.js** - Framework React untuk frontend dan routing.  
- **Tailwind CSS** - Styling dan layout.  
- **Firebase** - Authentication (email/password + Google OAuth), Firestore.  
- **Framer Motion** - Animasi dan interaksi UI.  
- **Zod** - Validation schema untuk form input.  

---

## 3. How to Run Locally

1. **Clone repository**  
```bash
git clone [repo-url]
````

2. **Install dependencies**

```bash
npm install
```

3. **Setup environment variables**

* Buat file `.env.local` di root project.
* Tambahkan konfigurasi Firebase seperti API key, Auth domain, Project ID, dll.

4. **Jalankan development server**

```bash
npm run dev
```

5. Buka browser dan akses:

```
http://localhost:3000
```

