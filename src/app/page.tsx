import { Navbar } from "@/components/layout/Navbar";
import { WalletCard } from "@/components/dashboard/WalletCard";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { TransactionList } from "@/components/dashboard/TransactionList";
import { TokenChecker } from "@/components/dashboard/TokenChecker";
import { NetworkBadge } from "@/components/dashboard/NetworkBadge";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top navigation bar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1 container mx-auto max-w-6xl px-4 py-8 space-y-6 animate-fade-in">
        {/* Hero headline */}
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="font-display text-2xl font-bold text-text-primary">
              Web3 Dashboard
            </h1>
            <NetworkBadge />
          </div>
          <p className="text-sm text-text-secondary font-mono">
            Connect your wallet to start exploring on-chain data
          </p>
        </div>

        {/* Wallet card — full width */}
        <WalletCard />

        {/* Stats row */}
        <StatsGrid />

        {/* Two-column grid: transactions + token checker */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <TransactionList />
          </div>
          <div className="lg:col-span-2">
            <TokenChecker />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
