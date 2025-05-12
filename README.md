# Movie Vault 🎬

**Movie Vault** is a web application for browsing and rating movies. It helps users discover new films based on genres or search by title. With user accounts, people can now rate movies and view their personal rated list in a dedicated dashboard. The app uses The Movie Database (TMDb) API to fetch detailed movie data.

## 🚀 What's New in v1.1
-**User registration and login via Firebase Authentication.**
-**Rating system**: user can now rate movies directly from the interface
-**Dashboard**: authenticated users get a dashboard showing all the movies they've rated.

## 🎯Project Goal

The goal of this project is to create an interactive movie discovery and rating platform with personalized features, combining modern UI and third-party data integration.

## ✨Application Features

-**User Authentication**: Register and log in with Firebase Auth.
-**Personal Dashboard**: View your recently rated movies in one place.
-**Movie Rating**: Rate movies and sort your rated list.
-**Movie Search**: Find movies by title and explore search results.
-**Genre Browsing**: Browse movies by genres like action, comedy, horror, etc.
-**Movie Details**: See detailed info like overview, release date, rating, and genres..
-**Custom UI Design**: Built with **React**, **TailwindCSS**, **React Slick** and **Material UI** for a responsive and modern interface.

## 🛠️Technologies

- **React**: UI library.
- **Vite**: Fast bundler for development and production.
- **Firebase**: Auth and Firestore for user menagment and data storage.
- **TailwindCSS**: Utility-first CSS styling.
- **Material UI**: Prebuilt responsive UI components.
- **React Router**: Routing and navigation.
- **Slick Carousel**: For movie carousels.
- **The Movie Database (TMDb) API**: For retrieving movie data.

## 🔭Future Plans / Enhancements

- Add the ability to favorite and bookmark movies.
- Implement a comment or review system.
- Improve dashboard filtering and sorting
- Add full testing

## 🧪Testing

Testing is not fully implemented yet. Future versions will include Jest and React Testing Library to improve stability and catch regressions early.

## 📦Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/K4mD4m/movie-vault.git
   ```

2. Install dependencies:

   ```bash
   cd movie-vault
   npm install
   ```

3. Run the application locally:

   ```bash
   npm run dev
   ```

4. The application should be available at: http://localhost:5173/

## 🔐Environment Variables (`.env.local`)

To enable communication with TMDb and Firebase services, you need to configure your `.env.local` file with the necessary API keys.

### Step 1: Get TMDb API Key

1. Register or log in to [The Movie Database](https://www.themoviedb.org/).
2. Go to your profile and open the API section [API](https://www.themoviedb.org/settings/api).
3. Generate a new API key.

### Step 2: 

1. Go to Firebase Console and create a project. [Firebase](https://firebase.google.com/)
2. Enable Authentication (Email/Password and Google provider).
3. Create a Firestore database

### Step 3: Configure the .env.local File

   ```bash
VITE_TMDB_API_KEY=your_tmdb_api_key

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
   ```
`🔁 Replace the placeholder values with the actual Firebase configuration from your project settings.`



### Step 4: Run the Application

After setting up `.env.local`, the app can connect to both the TMDb API and Firebase services.

## Live Demo

Check out the live version of the app here: [Live Demo](https://movie-vault-gilt.vercel.app/)
