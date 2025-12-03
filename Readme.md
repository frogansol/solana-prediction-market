# 🧠 DecentraPredict - A Decentralized Prediction Market Platform

<div align="center">

![DecentraPredict](https://img.shields.io/badge/DecentraPredict-v1.0.0-blue.svg)
![Solana](https://img.shields.io/badge/Built%20on-Solana-purple.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

**An open-source decentralized prediction market platform built on Solana, enabling transparent, trustless betting on real-world outcomes.**

[Features](#-features) • [Installation](#-getting-started) • [Documentation](#-documentation) • [Contributing](#-contributing) • [Contact](#-contact)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Project Structure](#-project-structure)
- [How It Works](#-how-it-works)
- [Development](#-development)
- [Deployment](#-deployment)
- [API Documentation](#-api-documentation)
- [Security](#-security)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 Overview

DecentraPredict is a fully decentralized prediction market platform that leverages Solana's high-performance blockchain to enable users to create, participate in, and resolve prediction markets. Built with transparency, fairness, and community governance at its core, the platform allows users to bet on real-world outcomes while maintaining complete decentralization through smart contracts.

### Key Highlights

- **🔐 Fully Decentralized**: All core operations are executed on-chain via Solana smart contracts
- **⚡ High Performance**: Leverages Solana's fast transaction processing and low fees
- **🤖 Oracle Integration**: Automated result resolution using Switchboard oracles
- **💰 Liquid Markets**: Support for adding liquidity to enhance market depth
- **👥 Community-Driven**: Referral system and transparent governance mechanisms
- **📊 Transparent**: All transactions and resolutions are publicly verifiable on-chain

---

## ✨ Features

### Core Functionality

- **📊 Market Creation**: Create custom prediction markets with binary outcomes (Yes/No)
  - Define market questions, outcomes, and deadlines
  - Set custom parameters and market rules
  - Community-driven market proposals

- **💰 Liquidity Provision**: Add funds to any market to increase liquidity
  - Support market depth and trading volume
  - Earn fees from market activity
  - Flexible funding options

- **🎯 Betting & Trading**: Place bets on market outcomes
  - Support for both "Yes" and "No" positions
  - Token-based betting system
  - Real-time odds calculation

- **🔐 Smart Contract Security**: Trustless execution via Solana programs
  - All funds locked in on-chain escrow
  - Automated payout distribution
  - Immutable market rules

- **🧾 Transparent Resolution**: Oracle-powered automatic result fetching
  - Switchboard oracle integration
  - Automated outcome verification
  - Fair and transparent resolution process

- **💸 Reward Distribution**: Proportional payout system
  - Automatic calculation of winnings
  - Instant distribution to winners
  - Transparent fee structure

- **👥 Referral System**: Built-in referral link mechanism
  - Generate unique referral links
  - Track referral earnings
  - Community growth incentives

### Additional Features

- **📱 Modern UI/UX**: Responsive web interface built with Next.js and TailwindCSS
- **🔍 Market Discovery**: Browse active, upcoming, and resolved markets
- **📈 Market Analytics**: View market statistics, volume, and participant data
- **👤 User Profiles**: Track betting history, earnings, and market participation
- **🔔 Real-time Updates**: Live market updates and notifications

---

## 🏗️ Tech Stack

### Blockchain & Smart Contracts

- **Blockchain**: Solana (Mainnet/Devnet)
- **Smart Contract Framework**: [Anchor](https://www.anchor-lang.com/) 0.29.0
- **Programming Language**: Rust
- **Oracle Provider**: [Switchboard](https://switchboard.xyz/)

### Frontend

- **Framework**: [Next.js](https://nextjs.org/) 15.2.1
- **Language**: TypeScript 5.x
- **Styling**: TailwindCSS 4.x
- **UI Libraries**: 
  - React 19.x
  - Framer Motion (animations)
  - React Hot Toast (notifications)
- **Wallet Integration**: 
  - @solana/wallet-adapter-react
  - Phantom wallet support

### Backend

- **Runtime**: Node.js 18+
- **Framework**: Express.js 5.x
- **Language**: TypeScript 5.x
- **Database**: MongoDB (via MongoDB Atlas)
- **Blockchain SDK**: 
  - @coral-xyz/anchor 0.29.0
  - @solana/web3.js 1.98.0
  - @switchboard-xyz/on-demand 2.4.1

### Development Tools

- **Package Manager**: npm/yarn
- **Build Tools**: TypeScript compiler, Anchor build system
- **Process Manager**: PM2 (production)

---

## 🏛️ Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend Layer                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Next.js Application (React + TypeScript + Tailwind) │   │
│  │  - User Interface & Interaction                       │   │
│  │  - Wallet Connection                                  │   │
│  │  - Market Browsing & Creation                         │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────┬─────────────────────────────────────┘
                        │
┌───────────────────────┴─────────────────────────────────────┐
│                    Backend API Layer                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Express.js Server (Node.js + TypeScript)            │   │
│  │  - RESTful API Endpoints                             │   │
│  │  - Market Data Aggregation                           │   │
│  │  - User Profile Management                           │   │
│  │  - Oracle Integration Service                        │   │
│  └───────────────────────┬──────────────────────────────┘   │
└──────────────────────────┼──────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
┌───────▼────────┐ ┌───────▼────────┐ ┌───────▼────────┐
│    MongoDB     │ │    Solana      │ │   Switchboard  │
│   Database     │ │   Blockchain   │ │     Oracle     │
│                │ │                │ │                │
│ - Market Data  │ │ - Smart        │ │ - Price Feeds  │
│ - User Profiles│ │   Contracts    │ │ - Result Data  │
│ - Transactions │ │ - Token Escrow │ │ - Verification │
│ - Referrals    │ │ - State        │ │                │
└────────────────┘ └────────────────┘ └────────────────┘
```

### Smart Contract Architecture

- **Market State**: Stores market metadata, outcomes, and participant data
- **Token Escrow**: Holds all betting funds securely on-chain
- **Resolution Logic**: Determines winners based on oracle data
- **Fee Management**: Handles platform fees and distribution

### Data Flow

1. **Market Creation**: User creates market → Frontend → Backend → Solana Program
2. **Betting**: User places bet → Wallet → Solana Program (escrow)
3. **Resolution**: Deadline reached → Oracle fetches data → Backend processes → Solana Program resolves
4. **Payout**: Resolution confirmed → Solana Program distributes rewards → Users receive tokens

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher ([Download](https://nodejs.org/))
- **npm** or **yarn**: Latest version
- **Anchor Framework**: v0.29.0 ([Installation Guide](https://www.anchor-lang.com/docs/installation))
- **Solana CLI**: Latest version ([Installation Guide](https://docs.solana.com/cli/install-solana-cli-tools))
- **Rust**: Latest stable version ([Installation Guide](https://www.rust-lang.org/tools/install))
- **MongoDB Atlas Account**: For backend database ([Sign Up](https://www.mongodb.com/cloud/atlas))
- **Solana Wallet**: Phantom or other Solana-compatible wallet

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/frogansol/solana-prediction-market.git
cd solana-prediction-market
```

#### 2. Install Dependencies

Install dependencies for all three components:

```bash
# Install frontend dependencies
cd prediction-market-frontend
npm install
# or
yarn install

# Install backend dependencies
cd ../prediction-market-backend
npm install
# or
yarn install

# Install smart contract dependencies
cd ../prediction-market-smartcontract
anchor build
```

#### 3. Build Smart Contracts

```bash
cd prediction-market-smartcontract
anchor build
anchor deploy
```

> **Note**: Make sure your Solana CLI is configured with the correct network (devnet/mainnet) and wallet.

### Configuration

#### Frontend Configuration

Create a `.env.local` file in `prediction-market-frontend/`:

```env
NEXT_PUBLIC_RPC_URL=https://api.mainnet-beta.solana.com
NEXT_PUBLIC_PROGRAM_ID=YOUR_PROGRAM_ID
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

#### Backend Configuration

1. Copy the example environment file:

```bash
cd prediction-market-backend
cp env.example .env
```

2. Configure your `.env` file:

```env
PORT=3001
DB_URL=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
PASSKEY=your-secure-passkey-here
FEE_AUTHORITY=your-fee-authority-wallet-address
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
PROGRAM_ID=your-program-id-here
```

**Environment Variables Explanation:**

- `PORT`: Port number for the Express.js server (default: 3001)
- `DB_URL`: MongoDB Atlas connection string
- `PASSKEY`: Secret key for API authentication and security
- `FEE_AUTHORITY`: Solana wallet address authorized to collect platform fees
- `SOLANA_RPC_URL`: Solana RPC endpoint (mainnet/devnet)
- `PROGRAM_ID`: Deployed Solana program ID

#### Smart Contract Configuration

Update `prediction-market-smartcontract/Anchor.toml` with your network settings:

```toml
[features]
resolution = []

[programs.localnet]
prediction = "YOUR_PROGRAM_ID"

[programs.devnet]
prediction = "YOUR_PROGRAM_ID"

[programs.mainnet]
prediction = "YOUR_PROGRAM_ID"
```

### Running the Application

#### Development Mode

1. **Start the Backend Server**:

```bash
cd prediction-market-backend
npm run dev
# or
yarn dev
```

The backend will run on `http://localhost:3001` (or your configured PORT).

2. **Start the Frontend Development Server**:

```bash
cd prediction-market-frontend
npm run dev
# or
yarn dev
```

The frontend will run on `http://localhost:3000`.

3. **Access the Application**:

Open your browser and navigate to `http://localhost:3000`.

#### Production Mode

1. **Build the Frontend**:

```bash
cd prediction-market-frontend
npm run build
npm start
```

2. **Build and Start the Backend**:

```bash
cd prediction-market-backend
npm run build
npm start
```

---

## 📁 Project Structure

```
solana-prediction-market/
│
├── prediction-market-frontend/          # Next.js frontend application
│   ├── src/
│   │   ├── app/                         # Next.js app router pages
│   │   │   ├── page.tsx                 # Home page
│   │   │   ├── propose/                 # Market creation page
│   │   │   ├── fund/                    # Market funding pages
│   │   │   ├── profile/                 # User profile page
│   │   │   └── referral/                # Referral page
│   │   ├── components/                  # React components
│   │   │   ├── elements/                # UI elements
│   │   │   └── layouts/                 # Layout components
│   │   ├── hooks/                       # Custom React hooks
│   │   ├── providers/                   # Context providers
│   │   ├── types/                       # TypeScript types
│   │   └── utils/                       # Utility functions
│   ├── public/                          # Static assets
│   └── package.json
│
├── prediction-market-backend/           # Express.js backend API
│   ├── src/
│   │   ├── controller/                  # Business logic controllers
│   │   │   ├── market/                  # Market operations
│   │   │   ├── oracle/                  # Oracle integration
│   │   │   ├── profile/                 # User profiles
│   │   │   └── referral/                # Referral system
│   │   ├── middleware/                  # Express middleware
│   │   ├── model/                       # MongoDB models
│   │   ├── router/                      # API route definitions
│   │   ├── oracle_service/              # Oracle service utilities
│   │   ├── prediction_market_sdk/       # Solana program SDK
│   │   └── index.ts                     # Application entry point
│   └── package.json
│
└── prediction-market-smartcontract/     # Solana Anchor program
    ├── programs/
    │   └── prediction/
    │       ├── src/
    │       │   ├── lib.rs               # Program entry point
    │       │   ├── instructions/        # Program instructions
    │       │   ├── states/              # Program state structs
    │       │   ├── errors.rs            # Custom error types
    │       │   └── events.rs            # Program events
    │       └── Cargo.toml
    ├── tests/                           # Anchor integration tests
    └── Anchor.toml                      # Anchor configuration
```

---

## 🧠 How It Works

### Market Lifecycle

1. **Market Creation**
   - A user creates a prediction market with a question, outcomes, and deadline
   - Market is initialized on-chain with a unique identifier
   - Creator sets initial parameters (fees, resolution criteria, etc.)

2. **Liquidity Provision**
   - Users can add funds to any market to increase liquidity
   - Liquidity providers earn fees from market activity
   - Higher liquidity enables larger bets and better odds

3. **Betting Phase**
   - Participants place bets on "Yes" or "No" outcomes
   - Funds are locked in an on-chain escrow account
   - Real-time odds are calculated based on current positions

4. **Locking Period**
   - At the deadline, the market closes to new bets
   - All existing positions are finalized
   - Market enters resolution phase

5. **Resolution**
   - Oracle service fetches real-world outcome data
   - Backend verifies and submits resolution to smart contract
   - Smart contract determines winners based on oracle data

6. **Payout Distribution**
   - Winning positions receive proportional rewards
   - Losers' funds are distributed to winners
   - Platform fees are collected and distributed
   - Users can withdraw their winnings immediately

### Key Mechanisms

- **Odds Calculation**: Dynamic odds based on current market positions
- **Proportional Payouts**: Winners receive funds proportional to their stake
- **Oracle Verification**: Multiple oracle sources ensure accurate resolution
- **Fee Structure**: Platform fees support ongoing development and operations

---

## 💻 Development

### Development Workflow

1. **Smart Contract Development**:
   ```bash
   cd prediction-market-smartcontract
   anchor build
   anchor test
   ```

2. **Backend Development**:
   ```bash
   cd prediction-market-backend
   npm run dev  # Runs with hot-reload
   ```

3. **Frontend Development**:
   ```bash
   cd prediction-market-frontend
   npm run dev  # Runs on http://localhost:3000
   ```

### Code Style

- **TypeScript**: Strict mode enabled
- **Linting**: ESLint configuration included
- **Formatting**: Follow project's existing code style

### Testing

#### Smart Contract Tests

```bash
cd prediction-market-smartcontract
anchor test
```

#### Backend Tests

```bash
cd prediction-market-backend
npm test
```

#### Frontend Tests

```bash
cd prediction-market-frontend
npm test
```

---

## 🚢 Deployment

### Smart Contract Deployment

1. **Build the Program**:
   ```bash
   cd prediction-market-smartcontract
   anchor build
   ```

2. **Deploy to Mainnet**:
   ```bash
   anchor deploy --provider.cluster mainnet
   ```

3. **Update Program ID**: Update program IDs in frontend and backend configuration

### Backend Deployment

1. Set up MongoDB Atlas cluster
2. Configure environment variables
3. Deploy to your hosting provider (AWS, Heroku, DigitalOcean, etc.)
4. Use PM2 for process management:
   ```bash
   pm2 start npm --name "prediction-market-api" -- start
   ```

### Frontend Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy to Vercel, Netlify, or your preferred hosting:
   ```bash
   # Using Vercel
   vercel deploy --prod
   ```

---

## 📚 API Documentation

### Market Endpoints

- `GET /api/markets` - List all markets
- `GET /api/markets/:id` - Get market details
- `POST /api/markets` - Create new market
- `PUT /api/markets/:id` - Update market
- `POST /api/markets/:id/fund` - Add liquidity to market

### Profile Endpoints

- `GET /api/profile/:address` - Get user profile
- `GET /api/profile/:address/history` - Get betting history

### Referral Endpoints

- `GET /api/referral/:code` - Get referral details
- `POST /api/referral` - Create referral link

### Oracle Endpoints

- `POST /api/oracle/resolve/:marketId` - Trigger market resolution

> **Note**: Full API documentation with request/response schemas will be available in the `/docs` endpoint (coming soon).

---

## 🔒 Security

### Smart Contract Security

- **Audited Code**: Smart contracts follow best practices and are designed for security
- **Access Control**: Proper authority checks for all privileged operations
- **Fund Safety**: All funds are locked in program-controlled escrow accounts
- **Reentrancy Protection**: Solana's account model provides natural protection

### Best Practices

- Always verify smart contract addresses before interacting
- Use official frontend applications only
- Never share your wallet private keys
- Review transaction details before signing
- Be cautious of phishing attempts

### Reporting Security Issues

If you discover a security vulnerability, please email `admin@hyperbuildx.com` with details. Please do not open public issues for security vulnerabilities.

---

## 🔧 Troubleshooting

### Common Issues

#### Frontend Won't Start

```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

#### Backend Connection Errors

- Verify MongoDB connection string is correct
- Check network firewall settings
- Ensure MongoDB Atlas IP whitelist includes your IP

#### Smart Contract Deployment Fails

- Verify Solana CLI is installed and configured
- Check your wallet has sufficient SOL for deployment
- Ensure program ID in Anchor.toml matches your keypair

#### Wallet Connection Issues

- Ensure Phantom (or other wallet) extension is installed
- Check browser permissions for wallet extension
- Try disconnecting and reconnecting wallet

### Getting Help

- Check existing [GitHub Issues](https://github.com/frogansol/solana-prediction-market/issues)
- Review project documentation
- Join our [Telegram community](https://t.me/frogansol)

---

## 🤝 Contributing

We welcome contributions to DecentraPredict! Here's how you can help:

### Contribution Guidelines

1. **Fork the Repository**: Create your own fork of the project

2. **Create a Branch**: 
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes**: Implement your feature or fix

4. **Test Thoroughly**: Ensure all tests pass and new code is tested

5. **Commit Changes**: Use clear, descriptive commit messages
   ```bash
   git commit -m "Add: description of your changes"
   ```

6. **Push and Create PR**: Push to your fork and create a pull request

### Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Follow the project's coding standards
- Test your changes before submitting

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🎬 Demo Video

Watch our guide video to see DecentraPredict in action:

https://github.com/user-attachments/assets/8f48a641-7edb-4af3-a17e-c5464bfef660

---

## 💬 Contact

We'd love to hear from you! Whether you have questions, suggestions, or need support:

- **Email**: admin@hyperbuildx.com
- **Telegram**: [@frogansol](https://t.me/frogansol)
- **GitHub**: [frogansol/solana-prediction-market](https://github.com/frogansol/solana-prediction-market)

### Custom Development

Looking for a customized prediction market solution for your specific use case? Contact us for:
- Enterprise solutions
- Custom oracle integrations
- White-label deployments
- Consulting services

---

<div align="center">

**Built with ❤️ by the DecentraPredict Team**

[⭐ Star us on GitHub](https://github.com/frogansol/solana-prediction-market) • [📖 Documentation](#-documentation) • [🐛 Report Bug](https://github.com/frogansol/solana-prediction-market/issues)

</div>
