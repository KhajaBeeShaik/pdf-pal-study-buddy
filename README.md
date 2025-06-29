# AI Accelerated Spark Challenge
Team Null & Void
### Project info

An AI tutor using the Socratic method to guide learning through questions, with interactive coding, data uploads for insights, and a rich knowledge base for personalized, hands-on education.

**Get Started**

If you want to work on this project locally using your own IDE, you can follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**To run the chatbot backend**
```sh
#Open a New Terminal and run
cd chatbot_backend
uvicorn app:app --reload --port 9000
```

**To run the Code Analyzer backend**

In the code_analyzer_backend directory, create a .env file with the following variables.
```sh
MY_AI_BUILDER_API_KEY = <YOUR_API_KEY>
MY_AI_BUILDER_API = "https://api-main-beta.aiml.asu.edu/"
```
Open a new terminal and run the following commands to start the code analyzer backend.
```sh
cd code_analyzer_backend
uvicorn code_analyzer:app --reload --port 8010
```

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- FastAPI
- ASU's MyAI Builder API
