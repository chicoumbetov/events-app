# Timeleft Events Back-Office MVP

A high-performance events management dashboard built with Next.js 15, TypeScript, and Shadcn UI.

## 🚀 Getting Started

1. **Install dependencies:**
  ```bash
  npm install
  ```

2. **Run the development server:**
  ```bash
  npm run dev
  ```

3. Open the app: Navigate to http://localhost:3000. The landing page will guide you to the /events dashboard

Live demo: https://tl-events-app.vercel.app/

4. **Run Tests:**
  ```bash
  npm test
  ```

## 🛠 Technical Decisions & Architecture

1. Hybrid Server/Client Architecture
I implemented a Server-First approach for data fetching.

- Server Component (page.tsx): Fetches data directly from the API. This improves performance by reducing client-side waterfalls and eliminating initial "loading flickers."

- Client Component (EventsClientView): Handles all interactive state (filtering, sorting, searching) once the initial data is provided.

2. Deep URL Synchronization (SSOT)
Following the "URL sync" requirement, the URL acts as the Single Source of Truth.

- Filters, sorting, search queries, and pagination state are all reflected in the URL search parameters.

- Users can refresh the page or share a specific filtered view without losing context.

- Used a Custom Hook (useEventsUrl) to encapsulate this logic, ensuring high code reusability and a cleaner UI layer.

3. Search & Performance
- Debounced Search: Implemented a 300ms debounce on the search input to prevent excessive URL updates and re-renders while typing.

- Fuzzy Search: The search filters across multiple fields simultaneously (Event Type, City, and Zone) to improve operational efficiency.

4. Robust UX Patterns
- Loading & Error States: Utilized Next.js loading.tsx (with Skeleton pulse animation) and error.tsx (with a recovery reset) to handle the data fetching lifecycle gracefully.

- Pagination Reset: Changing a filter automatically resets the user to Page 1 to prevent "empty view" bugs.

## 📁 Project Structure

- src/app/events/: Contains the primary route, including server-side logic and error boundaries.

- src/components/: Reusable UI components (StatCard, Pagination, EventsTable).

- src/hooks/: Custom logic for URL state management.

- src/lib/: API service layer and utility functions (formatting).

- src/types/: Centralized TypeScript interfaces.

## 📝 Trade-offs & Future Improvements

- Client-side Processing: For this MVP, sorting/filtering is done client-side since the dataset is manageable. For datasets >1000 items, I would transition this logic to Server Actions or API query parameters.

- Testing: Given the 2-hour constraint, the focus was on architecture and UX. Future iterations would include Vitest/Playground tests for the filtering logic.
