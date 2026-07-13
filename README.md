# Heart Disease Predictor Matrix
End to end fullstack ML classification model, using the UCL dataset: https://archive.ics.uci.edu/dataset/45/heart+disease

## Architecture and tech stack
* **Frontend (`/frontend`)**: A React application, managing form states and providing instant diagnostic visual feedback.
* **Backend (`/backend`)**: A lightweight Python FastAPI application serving predictions via a trained Machine Learning pipeline, optimized for low latency.

## 📊 Model Performance & Evaluation

The underlying classification model was trained and validated using standard clinical metrics to ensure robust predictive capabilities.

| Metric | Score | Description |
| :--- | :--- | :--- |
| **Accuracy** | [84.46]% | Overall correctly identified cases |
| **Precision** | [82.07]% | Ability to avoid false positives (minimizing false alarms) |
| **Recall (Sensitivity)** | [92.12]% | Ability to catch positive cases (critical for medical screening) |
| **F1-Score** | [86.73]% | Harmonic mean balancing precision and recall |

### 🔍 Key Insights
* **Feature Importance:** The top 3 predictive features driving the model's classifications are **Biological Sex (`sex`)**, **Thalassemia Type (`thal`)**, and **Chest Pain Type (`cp`)**.

## 🚀 Local Development Setup

To run this entire ecosystem locally on your machine, clone the repository and follow these steps:

### 1. Backend Setup
Navigate to the backend directory, spin up a Python virtual environment, install the dependencies, and start the development server:
```bash
cd backend
python -m venv env
source env/Scripts/activate  # On Windows Git Bash
pip install -r requirements.txt
uvicorn app:app --reload
```
The local API will be live at http://127.0.0.1:8000
### 2. Frontend Setup
Open a second terminal window, navigate to the frontend directory, install the node modules, and boot up the Vite development server:
```bash
cd frontend
npm install
npm run dev
```
The UI will be accessible at http://localhost:5173

You can also just visit this website for quick checkout: (api fetching takes around 1 minute for loading first time)
https://heart-disease-predictor-blond.vercel.app
