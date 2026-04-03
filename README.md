# ElfastsasaWEB3 Dashboard

A production-ready Web3 dashboard built with **Next.js 14**, **Ethers.js v6**, **TypeScript**, and **Tailwind CSS**.

---

## ✨ Features

- 🔌 **MetaMask wallet connect** — auto-reconnect + account/chain change listeners
- 💰 **ETH balance & network display** — with explorer links
- 📋 **Copy wallet address** — one-click with toast feedback
- 🔄 **Recent transactions** — mock data (ready to swap with Etherscan/Alchemy API)
- 🪙 **Token checker** — input ERC-20 contract → get name, symbol, decimals, supply
- 🌙 **Dark/light mode toggle** — persisted in localStorage
- 🔔 **Toast notifications** — success, error, warning, info
- 📱 **Fully responsive** — mobile-first design

---

## 📁 Folder Structure

```
elfastsasa-web3/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with all providers
│   │   ├── page.tsx            # Main dashboard page
│   │   └── globals.css         # Tailwind + custom styles
│   │
│   ├── components/
│   │   ├── providers/
│   │   │   ├── ThemeProvider.tsx    # Dark/light mode context
│   │   │   ├── ToastProvider.tsx    # Toast notification system
│   │   │   └── Web3Provider.tsx     # Wallet state & ethers.js
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.tsx           # Top bar with connect button
│   │   │   └── Footer.tsx           # Bottom footer
│   │   │
│   │   ├── dashboard/
│   │   │   ├── WalletCard.tsx       # Address, balance, network
│   │   │   ├── StatsGrid.tsx        # 4-card stats overview
│   │   │   ├── TransactionList.tsx  # Recent tx with filter tabs
│   │   │   ├── TokenChecker.tsx     # ERC-20 contract inspector
│   │   │   └── NetworkBadge.tsx     # Chain indicator badge
│   │   │
│   │   └── ui/
│   │       ├── ConnectPrompt.tsx    # Shown when wallet not connected
│   │       ├── LoadingSpinner.tsx   # Reusable spinner
│   │       └── Badge.tsx            # Status badge component
│   │
│   ├── hooks/
│   │   ├── useClipboard.ts          # Copy-to-clipboard hook
│   │   ├── useLocalStorage.ts       # localStorage sync hook
│   │   └── useTokenChecker.ts       # Token fetch logic hook
│   │
│   ├── lib/
│   │   ├── ethers.ts               # Provider, formatters, ERC-20 ABI
│   │   ├── networks.ts             # Chain ID → network info map
│   │   ├── mockData.ts             # Mock transactions
│   │   └── utils.ts                # cn() class utility
│   │
│   └── types/
│       └── web3.ts                 # TypeScript type definitions
│
├── .env.local.example
├── .gitignore
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 Setup Instructions

### Prerequisites

- Node.js 18+ installed
- MetaMask browser extension installed
- Git installed

---

### Step 1 — Clone / Copy project

```bash
# If pushing to your own repo:
git init elfastsasa-web3
cd elfastsasa-web3
```

Or just `cd` into the project folder you already have.

---

### Step 2 — Install dependencies

```bash
npm install
```

> **Termux users** — jalankan ini dulu biar tidak error:
> ```bash
> npm install --legacy-peer-deps
> ```

---

### Step 3 — Setup environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` — for basic usage you don't need any API keys. MetaMask will work out of the box.

---

### Step 4 — Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Build for Production

```bash
npm run build
npm start
```

---

## ☁️ Deploy to Vercel

### Option A — Via Vercel CLI (recommended from Termux)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Or deploy to production directly
vercel --prod
```

### Option B — Via GitHub + Vercel Dashboard

1. Push your project to GitHub:
```bash
git init
git add .
git commit -m "feat: initial elfastsasa web3 dashboard"
git remote add origin https://github.com/YOUR_USERNAME/elfastsasa-web3.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repo
4. Vercel auto-detects Next.js — click **Deploy**
5. (Optional) Add env variables from `.env.local.example` in Vercel dashboard under **Settings → Environment Variables**

---

## 🔧 Swap Mock Data for Real API

To use real transaction data, replace `getMockTransactions()` in `TransactionList.tsx` with an Etherscan or Alchemy API call:

```typescript
// Example with Etherscan API
const res = await fetch(
  `https://api.etherscan.io/api?module=account&action=txlist` +
  `&address=${address}&sort=desc&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_KEY}`
);
const data = await res.json();
```

---

## 🛠️ Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Next.js | 14.x | React framework (App Router) |
| Ethers.js | 6.x | Ethereum interaction |
| Tailwind CSS | 3.x | Utility-first styling |
| TypeScript | 5.x | Type safety |
| Lucide React | latest | Icon library |

---

## 👨‍💻 Built by

**Sugeng Trianto (elfastsasa)**  
Fullstack Developer & Web3 Enthusiast — Malang, Indonesia 🇮🇩
