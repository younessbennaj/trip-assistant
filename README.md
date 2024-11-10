# Trip Assistant

Trip Assistant is a travel companion app designed to help travelers access essential information about their destinations. Whether it's the latest exchange rates, current weather conditions, or other important travel data, Trip Assistant has you covered.

## Features

- **Currency Exchange Rates**: Get real-time currency exchange rates for various countries.
- **Weather Information**: Check the current weather and forecast for your destination.
- **Destination Information**: Add future functionalities to provide travel tips, local points of interest, or safety guidelines.

## Tech Stack

- **Frontend**: React
- **Backend**: Supabase (for authentication, database, etc.)

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn installed
- Supabase account and API keys for the backend

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/trip-assistant.git
   ```

2. Navigate to the project directory:

   ```bash
   cd trip-assistant
   ```

3. Install dependencies:

   ```bash
   yarn
   ```

4. Set up environment variables for Supabase and Google Maps API (create a .env.local file at the root):

   ```env.local
   VITE_SUPABASE_PROJECT_ID=your-supabase-project-id
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
   ```

5. **Configure Google Maps API Key**: If using Google Maps, make sure to configure the API key and add the custom domain in your `/etc/hosts` file.

   - Open the `/etc/hosts` file and add the following line to map `localhost` to the custom domain `develop.amazy.travel`:
     ```
     127.0.0.1 develop.amazy.travel
     ```
   - This will allow you to use the Google Maps API key securely with your custom domain.

6. Start the development server:

   ```bash
   yarn start
   ```

7. Open the app in your browser at http://develop.amazy.travel:8080.

## Usage

1. Register or log in using the authentication system (powered by Supabase).
2. Enter a destination to get the latest travel information, including:
   - Currency exchange rates.
   - Weather forecasts.
3. Explore more functionalities as you expand the project.
