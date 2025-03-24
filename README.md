# Movie Vault 🎬

**Movie Vault** is a web application for browsing movies, designed to help users discover new films based on their genres and search for them by title. The app utilizes The Movie Database (TMDb) API to fetch movie details and display them on dedicated subpages.

## Project Goal

The goal of this project was to create an interactive web application that allows users to easily explore movies across different genres, search for them by title, and view detailed movie information.

## Application Features

- **Movie Search**: Users can search for movies by title, and the app will display the results as cards.
- **Movie Genres**: Movies are categorized into different genres such as action, comedy, drama, horror, etc., allowing users to browse films within these categories
- **Movie Details**: By clicking on a movie, users can access a detailed page with information such as title, description, rating, release date, and genre.
- **Custom UI Design**: The application uses **React**, **TailwindCSS**, **React Slick** and **Material UI** to implement interactive carousels, UI components, and styling.

## Technologies

- **React**: Library for building user interfaces.
- **Vite**: Tool for fast application bundling.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **Material UI**: UI component library for building responsive and modern interfaces.
- **React Router**: For managing navigation within the application.
- **Slick Carousel**: For implementing movie carousels.
- **The Movie Database (TMDb) API**: For fetching movie data.

## Future Plans / Enhancements

- Adding a feature for users to rate movies.
- Integration with a user authentication system.
- Ability to add movies to a favorites list.
- Expanding the application with more interactive features such as comments and reviews.

## Testing

The application does not yet include a full set of unit or end-to-end tests. In the future, I plan to add tests using Jest and React Testing Library to ensure code quality and application stability.

## Installation

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

## `.env.local` File

To enable the application to communicate with The Movie Database (TMDb) API, you need an API key. This key should be placed in the `.env.local` file in the root directory of the project.

### Step 1: Get an API Key

1. Register or log in to [The Movie Database](https://www.themoviedb.org/).
2. Go to your profile and open the API section [API](https://www.themoviedb.org/settings/api).
3. Generate a new API key.

### Step 2: Configure the .env.local File

In the project's root directory, create a file named '.env.local' and add the following variable:
VITE_TMDB_API_KEY=your_api_key_here

Replace `your_api_key_here` with the API key you obtained from TMDb.

### Step 3: Run the Application

After saving the `.env.local` file, you can run the application locally, and it will be able to communicate with the API and fetch movie data.

## Live Demo

Check out the live version of the app here: [Live Demo](https://movie-vault-gilt.vercel.app/)
