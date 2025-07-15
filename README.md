# 🍱 FoodDraft

**Live Demo**: [https://food-draft.vercel.app](https://food-draft.vercel.app)

FoodDraft is a modern AI-powered web app that lets users upload food images or describe a dish to receive instant nutritional analysis. It's a smart assistant for anyone trying to eat healthier, monitor their diet, or learn about what’s on their plate.

---

## ✨ Features

- 📷 **Image Upload & Camera Support** – Upload food photos or take a picture directly.
- 🧠 **AI-Powered Analysis** – Get nutritional information using advanced image recognition and language models.
- 📄 **Text Input Option** – Describe a meal and receive a breakdown of estimated calories, macros, and ingredients.
- ⚡ **Fast & Responsive UI** – Built with modern React + Next.js for smooth performance.
- 📱 **Mobile-Friendly** – Fully responsive design that works across all devices.

---

## 🛠️ Tech Stack

- **Frontend**: React, Next.js, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes
- **AI Integration**: OpenRouter API (using vision-enabled LLMs)
- **Image Compression**: `browser-image-compression`
- **Deployment**: Vercel

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Biprodeep12/FoodDraft.git
cd FoodDraft
````

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file with the following:

```env
OPENROUTER_API_KEY=
OPENROUTER_IMAGE_API_KEY=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

* Setup your firebase Key from Firebase Console
* Get your free API key from [OpenRouter](https://openrouter.ai/settings/integrations)

### 4. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📸 Usage

1. Upload a food image or take a photo.
2. Optionally type a food description.
3. Submit to get an AI-generated nutrition summary.

---

## 📂 Project Structure (Highlights)

```
FoodDraft/
├── pages/
│   └── api/ImageAi/route.ts       # API route for AI image analysis
│   └── index.tsx                  # Main page UI
├── components/                    # Reusable components
├── public/                        # Static assets
├── styles/                        # Global styles
├── utils/                         # Utility functions
└── ...
```

---

## 🧠 How It Works

* The user uploads an image.
* It gets compressed client-side.
* Base64 of the image is sent to the OpenRouter AI API (vision model).
* The response is parsed and displayed in an elegant UI.

---

## 📌 TODO (Future Enhancements)

* [ ] History of past food analyses
* [ ] User accounts and diet tracking
* [ ] Better error handling
* [ ] Barcode scanner integration

---

## 📃 License

MIT © [Biprodeep Bose](https://github.com/Biprodeep12)

---

## 🙌 Support

If you like this project, feel free to ⭐️ the repo and share it!
Got suggestions or issues? Open an [issue](https://github.com/Biprodeep12/FoodDraft/issues) or submit a PR.

```
