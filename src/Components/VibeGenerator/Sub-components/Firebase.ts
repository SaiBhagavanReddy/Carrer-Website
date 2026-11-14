import { initializeApp } from "firebase/app";
import {
  getAI,
  getGenerativeModel,
  GoogleAIBackend,
} from "firebase/ai";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjfCw_n94cFeRva818mVT5C1knEGY2_eI",
  authDomain: "vibegenerator-df8f6.firebaseapp.com",
  projectId: "vibegenerator-df8f6",
  storageBucket: "vibegenerator-df8f6.firebasestorage.app",
  messagingSenderId: "435889736846",
  appId: "1:435889736846:web:b4d63906cd3fd509c9cddf",
  measurementId: "G-VQNY19F1R7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const ai = getAI(app, {
  backend: new GoogleAIBackend(),
});

export const geminiModel = getGenerativeModel(ai, {
  model: "gemini-3.1-flash-lite",
   generationConfig: {
    maxOutputTokens: 50,
  },
  
});