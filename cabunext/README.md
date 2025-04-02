# CABU - Login Page

A modern, responsive login page built with Next.js, React, Tailwind CSS, and Shadcn UI components.

## Features

- Fully responsive login and signup pages that work on mobile, tablet, and desktop
- Modern UI with Tailwind CSS for consistent styling across devices
- Mobile-optimized touch targets and interactions
- Accessible components with Shadcn UI
- TypeScript support
- Interactive hover effects and transitions

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - JavaScript library for UI
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Shadcn UI](https://ui.shadcn.com/) - Re-usable components
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Responsive Design

The application is optimized for all screen sizes:

- **Mobile**: Clean single-column layout with stacked components
- **Tablet**: Enhanced spacing and proportions
- **Desktop**: Full two-column layout with proper positioning

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/cabunext.git
cd cabunext
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

- `/pages` - Pages and routes
  - `index.tsx` - The signup page
  - `login.tsx` - The login page
  - `_app.tsx` - Global app configuration
- `/components` - Reusable components
  - `/ui` - Shadcn UI components
- `/styles` - Global styles
  - `globals.css` - Global CSS with responsive rules
- `/public` - Static assets

## Customization

The login page has been built to be responsive and follows the specified design requirements. You can modify the design by editing the following files:

- `pages/index.tsx` - The signup page
- `pages/login.tsx` - The login page
- `styles/globals.css` - Global CSS styles with responsive utilities

## License

MIT
