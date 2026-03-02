# CJM Fleet Bot

A fleet management system built with Next.js and integrated with Vercel Speed Insights.

## Features

- ⚡ Built with Next.js 14 (App Router)
- 📊 Integrated with Vercel Speed Insights for performance monitoring
- 🎨 TypeScript support
- 🚀 Optimized for production deployment on Vercel

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/juliusjay9-lang/CJM-Fleet-BOT.git
cd CJM-Fleet-BOT
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Speed Insights Integration

This project is configured with Vercel Speed Insights to monitor real-world performance metrics. The integration is implemented in `app/layout.tsx` using the `@vercel/speed-insights/next` package.

### How it works

The `<SpeedInsights />` component is added to the root layout and automatically tracks:
- Core Web Vitals (LCP, FID, CLS, FCP, TTFB, INP)
- Real user monitoring data
- Performance metrics across different pages

### Enabling Speed Insights on Vercel

1. Deploy your application to Vercel
2. Go to your project dashboard on Vercel
3. Navigate to the **Speed Insights** tab
4. Click **Enable** to activate the feature

Once enabled and deployed, Speed Insights will automatically start collecting performance data from your users.

### Viewing Speed Insights Data

After deployment and user visits:
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click the **Speed Insights** tab
4. View real-time performance metrics and trends

## Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## Deployment

The easiest way to deploy this app is to use the [Vercel Platform](https://vercel.com/new):

```bash
vercel deploy
```

Or connect your Git repository to Vercel for automatic deployments on every push to main.

## Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout with Speed Insights integration
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── next.config.js       # Next.js configuration
├── package.json         # Dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Speed Insights Documentation](https://vercel.com/docs/speed-insights)
- [Speed Insights Package](https://vercel.com/docs/speed-insights/package)

## License

MIT
