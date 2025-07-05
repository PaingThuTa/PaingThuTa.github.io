# VAT Calculator

A modern React-based VAT calculator that calculates Value Added Tax (VAT) after applying discounts.

## Features

- **Price Input**: Enter the original price of items
- **Discount Input**: Enter discount amount to be deducted
- **VAT Calculation**: Automatically calculates VAT as `(price - discount) * 0.07` (7% VAT)
- **Real-time Updates**: Calculations update automatically as you type
- **Modern UI**: Beautiful gradient design with smooth animations
- **Responsive Design**: Works perfectly on desktop and mobile devices

## Calculation Formula

```
Subtotal = Price - Discount
VAT = Subtotal * 0.07 (7%)
Total = Subtotal + VAT
```

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm or pnpm

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Deployment

This project is configured for GitHub Pages deployment with the base path `/react-vat-calculator/`.

### Steps to Deploy:

1. Build the project:
   ```bash
   npm run build
   ```

2. The build artifacts will be in the `dist/` folder

3. Copy the contents of `dist/` to your GitHub Pages repository under the `react-vat-calculator/` directory

4. Commit and push to GitHub Pages

## Technologies Used

- **React** - Frontend framework
- **Vite** - Build tool and development server
- **CSS3** - Modern styling with gradients and animations
- **JavaScript ES6+** - Modern JavaScript features

## Project Structure

```
react-vat-calculator/
├── src/
│   ├── App.jsx          # Main calculator component
│   ├── App.css          # Calculator styles
│   ├── index.css        # Global styles
│   └── main.jsx         # App entry point
├── dist/                # Production build output
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies and scripts
```
