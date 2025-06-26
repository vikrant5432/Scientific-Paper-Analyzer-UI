# Scientific Paper Analyzer UI

A modern, responsive frontend for the Scientific Paper Analyzer project. This UI allows users to upload, analyze, and interact with scientific papers using an AI-powered research assistant.

---

## Preview

**Login Page Example:**  
![Login Page](https://github.com/user-attachments/assets/03fc2adb-47a7-4edb-8a20-6b7fc2a59bea)


**Library Page Example:**  
![Library Page](https://github.com/user-attachments/assets/dfd51c47-d625-4c4b-a93e-916538fcd86d)


**Dashboard Page Example:**
![Dashboard Page](https://github.com/user-attachments/assets/560237ed-52d8-4b08-98d7-03d6bac710f0)


---

## 📦 Setup Instructions

1. **Clone the Repository**

   ```

   git clone
   cd

   ```

2. **Install Dependencies**

   ```

   npm install

   # or

   yarn install

   ```

## 🏗️ Architecture Overview

- **React** with functional components and hooks
- **Tailwind CSS** for styling and responsive design
- **React Router v6** for routing
- **Axios** for API requests (except streaming chat, which uses Fetch)
- **react-markdown** for rendering markdown in AI responses

**Main Components:**

- `Auth.tsx`: Login/Register modal with animated pastel background
- `DashboardLayout.tsx`: Main layout with header and hover-expandable sidebar
- `UploadSection.tsx`: Drag-and-drop PDF upload with animated progress
- `LibraryPage.tsx`: Lists all user papers as cards, with search/filter
- `PaperPage.tsx`: Split view for PDF reader and chat-based Q&A
- `ChatInterface.tsx`: Chat interface with streaming AI responses

---

## 📝 API Documentation

The UI expects the following backend endpoints:

| Endpoint                            | Method | Description                                |
| ----------------------------------- | ------ | ------------------------------------------ |
| `/auth/login`                       | POST   | Login with user credentials                |
| `/auth/register`                    | POST   | Register a new user                        |
| `/papers/upload-paper`              | POST   | Upload a PDF file, returns `paper_id`      |
| `/papers`                           | GET    | List all papers for the authenticated user |
| `/papers/{paper_id}`                | GET    | Get paper metadata and status              |
| `/papers/{paper_id}/view`           | GET    | Stream PDF file for viewing                |
| `/question_answers/{paper_id}`      | GET    | Get list of Q&A for a paper                |
| `/paper/question_answer/{paper_id}` | POST   | Ask a question (with streaming response)   |

> **Note:** For streaming chat, the UI uses `fetch()` and processes the response stream for real-time updates.

**Backend Repo:**
👉 [Scientific-Paper-Analyzer-Backend](https://github.com/vikrant5432/Scientific-Paper-Analyzer-Backend)

---

## ▶️ Running Instructions

1. **Start the Backend First**
   See [backend instructions](https://github.com/vikrant5432/Scientific-Paper-Analyzer-Backend).

2. **Start the UI**

```

npm start

# or

yarn start

```

3. **Access the App**

- Open [http://localhost:5173](http://localhost:5173) (or your configured port) in your browser.

---

## ✨ Features

- Beautiful pastel UI with animated backgrounds
- Secure login and registration
- Drag-and-drop PDF upload with progress bar
- Library view: search, filter, and status badges for all papers
- Split paper view: PDF reader and streaming AI Q&A chat
- Markdown support for rich AI answers
- Responsive design for desktop and mobile

---

## 🛠️ Customization

- Tailor color schemes and layouts in the `/components` directory.
- Extend API integration in `/services/api.ts`.

---

**This is the UI repository. For backend setup and workflow details, see:**
👉 [https://github.com/vikrant5432/Scientific-Paper-Analyzer-Backend](https://github.com/vikrant5432/Scientific-Paper-Analyzer-Backend)
