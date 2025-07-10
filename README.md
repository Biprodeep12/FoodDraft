# 🥗 FoodDraft

AI-Powered Food Product Analyzer

[Live Site 🚀](https://food-draft.vercel.app/)  
[GitHub Repository 📦](https://github.com/Biprodeep12/FoodDraft)

FoodDraft is an AI-enhanced web application that allows users to scan and analyze food product barcodes to receive instant, detailed nutritional insights. Built using **Next.js**, **Firebase**, and **OpenRouter AI**, the app helps users make healthier food choices with ease.

---

## 🔍 Features

- 📷 **Barcode Scanning** – Easily scan food products to fetch nutritional data.
- 🧠 **AI Summary** – AI-generated summaries based on product composition.
- 🔐 **User Authentication** – Sign in and save your scans with Firebase Auth.
- 📊 **Track History** – View all previously scanned products in your personal dashboard.
- 💬 **Nutrition-focused AI Chat** – Ask questions about food, diets, or health.

---

## 🛠 Tech Stack

- **Frontend**: Next.js, Tailwind CSS, TypeScript
- **Backend**: Firebase (Auth, Firestore, Storage)
- **AI**: OpenRouter (LLaMA 3.1 Nemotron Nano 8B v1 model)
- **Hosting**: Vercel

---

## 🚦 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Biprodeep12/FoodDraft.git
cd FoodDraft
```
### 2. Install Dependencies
```
npm install
```
### 3. Set Up Environment Variables

Create a .env.local file in the root directory and add:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

OPENROUTER_API_KEY=your_openrouter_api_key
```
### 4. Run the App
```
npm run dev
```

---

📁 Folder Structure

/pages           # Next.js pages
/components      # Reusable UI components
/lib             # Firebase & utility functions
/api             # Backend API routes
/Context         # Global state and message handling
/public          # Static assets


---

🧠 AI Prompt Structure

The AI is prompted with:

You are a certified nutritionist.
You strictly answer only questions related to food, nutrients, diets, health, or weight management.
You do not answer any other type of question.
If a question is irrelevant to nutrition, reply: "I'm only able to assist with nutrition-related questions."
Add detailed productInfo in your responses.


---

📸 Screenshots

Scan Page	Dashboard	AI Summary

		



---

🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests to enhance the project.


---

📜 License

MIT


---

✨ Author

Biprodeep Bose
Computer Science & Engineering Student at CIEM


---
