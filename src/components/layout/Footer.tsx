import React from "react";
import { Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border mt-12 py-6">
      <div className="container mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-mono text-xs text-text-muted">
          © 2024 ElfastsasaWEB3 — Built with Next.js & Ethers.js
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/elfastsasa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-text-secondary transition-colors"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href="https://twitter.com/elfastsasa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-text-secondary transition-colors"
            aria-label="Twitter"
          >
            <Twitter size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
