Here is the suggested README content for your **Recipe Book** project:

---

# Recipe Book

[Live Demo](https://recipe-book-1iz9.vercel.app/) | [GitHub Repository](https://github.com/Nishantvidhuri/recipe-book)

## Overview

**Recipe Book** is a dynamic web application designed for food enthusiasts to explore and discover a wide variety of recipes. Users can browse random recipes, view detailed instructions, and get inspired for their next meal.

## Features

- **Random Recipe Generation:** Discover a new set of recipes with every page reload or button click.
- **Detailed Recipe View:** View recipe instructions, ingredients, and preparation time.
- **Responsive Design:** The application works seamlessly across devices.
- **Load More Button:** Fetch additional recipes dynamically without reloading the page.

## Tech Stack

- **Frontend Framework:** React (with Vite for fast builds)
- **Styling:** Tailwind CSS for modern and responsive design
- **API Integration:** Spoonacular API for fetching recipe data
- **Deployment:** Vercel for live hosting

## Installation and Setup

Follow these steps to run the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/Nishantvidhuri/recipe-book.git
   ```

2. Navigate to the project directory:
   ```bash
   cd recipe-book
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Set up the environment variables:
   - Create a `.env` file in the root directory.
   - Add your Spoonacular API key:
     ```env
     VITE_SPOONACULAR_API_KEY=your_api_key_here
     ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open the app in your browser at:
   ```
   http://localhost:5173/
   ```

## Deployment

The project is deployed on Vercel. Follow these steps to deploy:

1. Push your changes to the `main` branch on GitHub.
2. Link the GitHub repository to Vercel.
3. Set up the `VITE_SPOONACULAR_API_KEY` as an environment variable in the Vercel dashboard.
4. Deploy the project.

## Folder Structure

```
recipe-book/
├── public/
│   └── favicon.ico      # Favicon
├── src/
│   ├── components/      # Reusable React components
│   │   ├── FoodCard.jsx # Card component for recipes
│   │   └── Navbar.jsx   # Navigation bar
│   ├── pages/           # Page components
│   │   └── RecipeDetails.jsx # Detailed recipe view
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # React DOM rendering
│   └── index.css        # Global styles
├── .env.example         # Environment variable example file
├── package.json         # Project metadata and scripts
├── README.md            # Project documentation
└── vite.config.js       # Vite configuration
```

## Screenshots

### Home Page
![Home Page](https://via.placeholder.com/800x400?text=Home+Page+Screenshot)

### Recipe Details Page
![Recipe Details](https://via.placeholder.com/800x400?text=Recipe+Details+Page+Screenshot)

## API Integration

This project uses the [Spoonacular API](https://spoonacular.com/food-api) to fetch recipes.

### Key Endpoints:
1. **Random Recipes**
   ```
   GET /recipes/random?number=10&apiKey=YOUR_API_KEY
   ```
2. **Recipe Details**
   ```
   GET /recipes/{id}/information?apiKey=YOUR_API_KEY
   ```

## Future Enhancements

- Add user authentication and recipe saving functionality.
- Allow users to search recipes by ingredients or keywords.
- Introduce a favorites feature for bookmarked recipes.

## License

This project is open-source and available under the [MIT License](LICENSE).

---

Let me know if you need further customization!