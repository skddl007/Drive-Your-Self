# DSA Practice Platform

A comprehensive platform for practicing Data Structures and Algorithms (DSA) problems, tracking progress, and preparing for technical interviews.

![Dashboard Screenshot](https://via.placeholder.com/800x400?text=Dashboard+Screenshot)

## 🚀 Features

- **Curated Problem Sets**: Access to carefully selected DSA problems organized by topics and difficulty levels
- **Two Problem Sheets**:
  - SDE Sheet: Standard DSA problems for software engineering interviews
  - Advanced Sheet: More challenging problems for competitive programming
- **Progress Tracking**:
  - Track completed problems and view statistics
  - Monitor daily activity and maintain streaks
  - Visualize progress by topic and difficulty
- **Personal Notes**: Add and save notes for each problem
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Dark Mode Support**: Comfortable viewing experience in any lighting condition

## 📋 Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **State Management**: React Context API
- **Routing**: React Router
- **Styling**: TailwindCSS with custom theme
- **Icons**: Lucide React

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account

### Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/dsa-practice-platform.git
   cd dsa-practice-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Set up the database by running the SQL commands in `database.sql` in your Supabase SQL editor.

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## 📊 Database Schema

The application uses the following tables:

- **user_profiles**: Stores user information and statistics
- **completed_problems**: Tracks which problems users have completed
- **daily_activity**: Records daily user activity for streak tracking
- **problem_notes**: Stores user notes for specific problems

## 🧩 Project Structure

```
src/
├── components/         # UI components
│   ├── auth/           # Authentication-related components
│   ├── dashboard/      # Dashboard components
│   └── layout/         # Layout components (navbar, footer)
├── contexts/           # React context providers
├── data/               # Static data (problem sheets)
├── lib/                # Library code (Supabase client)
├── pages/              # Page components
├── services/           # API services
├── styles/             # Global styles
└── types/              # TypeScript type definitions
```

## 🔍 Usage Guide

### Registration and Login

1. Navigate to the registration page and create an account with your email and password.
2. Verify your email if required.
3. Log in with your credentials.

### Dashboard

The dashboard provides an overview of your progress:
- Current streak and longest streak
- Total problems solved
- Today's progress toward daily goal
- Distribution of problems by difficulty
- Progress by topic
- Recent activity

### Problem Sheets

1. Navigate to either the SDE Sheet or Advanced Sheet.
2. Browse problems by topic.
3. Mark problems as completed by clicking the checkbox.
4. Add notes to problems for future reference.
5. Click on "Practice" to solve the problem on the original platform.

### Completed Problems

View all your completed problems on the dedicated page:
- Filter by difficulty or topic
- Search for specific problems
- View completion dates and times

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- Problem data sourced from various competitive programming platforms
- Icons from [Lucide](https://lucide.dev/)
- UI inspiration from various coding platforms

---

Made with ❤️ for DSA enthusiasts
