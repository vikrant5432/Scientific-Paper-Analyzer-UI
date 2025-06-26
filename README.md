# Scientific Paper Analyzer UI

A modern, responsive frontend for the Scientific Paper Analyzer project. This UI allows users to upload, analyze, and interact with scientific papers using an AI-powered research assistant.

---

## Preview

**Login Page Example:**  
![Login Page](https://github-production-user-asset-6210df.s3.amazonaws.com/42002633/459368563-1214d6cc-5020-444c-96a8-050381f80dc2.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250626%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250626T103817Z&X-Amz-Expires=300&X-Amz-Signature=b16e371047eaf78554d24bd63eeea82c75a46a5cdd8aa14025c320837110f155&X-Amz-SignedHeaders=host)

**Library Page Example:**  
![Library Page](https://github-production-user-asset-6210df.s3.amazonaws.com/42002633/459369126-a858dfe5-4ac5-49cb-a8b9-9d55b55adf3a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250626%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250626T103800Z&X-Amz-Expires=300&X-Amz-Signature=4766eecbed46f4d3adc83d81f07f9c8a3b1c3cbbb1e5444d6217c1055d0cd092&X-Amz-SignedHeaders=host)

**Dashboard Page Example:**
![Dashboard Page](https://github-production-user-asset-6210df.s3.amazonaws.com/42002633/459369735-7074197c-c825-4740-955f-99994cd73331.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250626%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250626T103927Z&X-Amz-Expires=300&X-Amz-Signature=856d1b0a98307c849374b390d47079f53a2281e8800e858f3222993d135d303e&X-Amz-SignedHeaders=host)

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
