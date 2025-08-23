Perfect 👍 Let’s extend your `README.md` with **GitHub Pages deployment instructions** so you can publish your portfolio live.

Here’s the **final README.md** you can drop in:

---

# 🚀 Dhaniyah Fadlisha – Personal Portfolio

This is my personal **portfolio website**, built with **React (Create React App)**.
It showcases my **skills, projects, and experience** as a Software Engineering student at **UTM Kuala Lumpur**.

---

## 🌟 Features

* 🎨 Modern, animated design with custom theme & VT323 monospace font
* ✨ Smooth scrolling navigation (Home · About · Projects · Contact)
* 💻 Featured projects:

  * Bank Management System (Java OOP)
  * Property Landing Page (HTML/CSS, responsive design)
  * Interactive JavaScript Apps (Big Bang Game, Data Tables)
* 📱 Responsive & mobile-friendly layout
* 🔗 Direct links to **Email, LinkedIn, GitHub, and Phone**
* 🖱️ Fun extras: animated gradient background, cursor follower, floating effects

---

## 🛠️ Tech Stack

* **React** (via Create React App)
* **CSS3** with custom animations (grid drift, gradient background, scroll reveal)
* **JavaScript (ES6+)**

---

## 📂 Project Structure

```
src/
 ├── App.js
 ├── Portfolio.jsx      # Main portfolio component
 ├── Portfolio.css      # Styling and animations
 ├── index.js           # CRA entry point
 └── index.css
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/DFadlisha/your-portfolio.git
cd your-portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run locally

```bash
npm start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Build for Production

```bash
npm run build
```

This bundles the app into a production-ready build in the `build/` folder.

---

## 🌐 Deployment

### Option 1 — Deploy to **GitHub Pages**

1. Install GitHub Pages package:

   ```bash
   npm install gh-pages --save-dev
   ```

2. Add these lines to your `package.json`:

   ```json
   {
     "homepage": "https://DFadlisha.github.io/your-portfolio",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

   > Replace **`your-portfolio`** with the actual repository name.

3. Deploy with:

   ```bash
   npm run deploy
   ```

4. Visit:

   ```
   https://DFadlisha.github.io/your-portfolio
   ```

---

### Option 2 — Deploy to **Netlify / Vercel / Firebase**

* **Netlify**: Drag & drop the `build/` folder to the Netlify dashboard.
* **Vercel**: Import your repo and it will auto-detect CRA.
* **Firebase Hosting**: Run `firebase init hosting` and deploy the `build/` folder.

---

## 👩‍💻 Author

**Dhaniyah Fadlisha**

* 📧 Email: [fadlishadhaniyah@gmail.com](mailto:fadlishadhaniyah@gmail.com)
* 💼 LinkedIn: [linkedin.com/in/dhaniyahfadlisha](https://www.linkedin.com/in/dhaniyahfadlisha)
* 🐙 GitHub: [github.com/DFadlisha](https://github.com/DFadlisha)

