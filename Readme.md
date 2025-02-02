## Features

### 1. Authentication
- Secure login system with email/password
- Protected routes with authentication state management
- Automatic redirection for unauthenticated users

### 2. Dashboard Overview
- Key metrics display (Purchases, Revenue, Refunds)
- Year-over-year comparison charts
- Performance score gauge
- Top products table with sorting and filtering
- Customer device usage analytics
- Community feedback visualization

### 3. Interactive Components
- Responsive charts using Recharts
- Custom SVG gauge chart
- Interactive tooltips and hover states
- Smooth transitions and animations
- Real-time data updates

## Technical Implementation

### Frontend Architecture
- React with TypeScript for type safety
- Context API for state management
- React Router for navigation
- Tailwind CSS for styling
- Recharts for data visualization
- Lucide React for icons

### Backend Integration
- Supabase for database and authentication
- RESTful API integration with axios
- Real-time data fetching
- Error handling and loading states

### Code Structure
```
src/
  ├── context/        # Context providers
  ├── lib/           # Utility functions and API
  ├── pages/         # Page components
  └── components/    # Reusable components
```

## Evaluation Criteria

### a. Execution
- **Speed**: 
  - Optimized bundle size
  - Lazy loading for routes
  - Efficient data fetching with caching
  - Fast initial load time

- **Quality**: 
  - Type-safe with TypeScript
  - Comprehensive error handling
  - Loading states for better UX
  - Responsive design for all screen sizes

- **Completion**: 100%
  - All required features implemented
  - Fully functional authentication
  - Complete data visualization
  - Polished UI/UX

### b. Code Quality
- **Architecture**:
  - Clean component structure
  - Separation of concerns
  - Reusable components
  - Type safety with TypeScript

- **Best Practices**:
  - ESLint for code quality
  - Proper error handling
  - Loading states
  - TypeScript interfaces
  - Consistent naming conventions
  - Component composition

- **Performance**:
  - Memoization where needed
  - Efficient re-renders
  - Optimized bundle size
  - Lazy loading

### c. Smoothness and Aesthetics
- **Interactions**:
  - Smooth transitions
  - Hover effects on buttons and cards
  - Loading skeletons
  - Error states
  - Tooltips on charts
  - Interactive data points

- **Visual Consistency**:
  - Consistent spacing
  - Proper typography hierarchy
  - Color harmony
  - Responsive layout
  - Clear visual hierarchy

- **User Experience**:
  - Intuitive navigation
  - Clear feedback on actions
  - Responsive interactions
  - Proper loading states
  - Error handling with user feedback

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Login Credentials
- Username: trial
- Password: assignment123