import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary">
                <Image 
                  src="Logo1 Supremyx.png" 
                  alt="SUPREMYX Logo" 
                  width={40}
                  height={40}
                  className="size-9"
                />
              </div>
              <span className="text-xl font-bold">
                SUPREMYX <span className="text-primary">CI</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              La première plateforme esport PUBG Mobile de Côte d&apos;Ivoire. Tournois automatiques, classement en temps réel, et une communauté de passionnés.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-4 font-semibold"></h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#tournois" className="transition-colors hover:text-foreground">
                  
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 font-semibold">Communauté</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="https://discord.gg/bT49UQFUMt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  Discord
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.facebook.com/supremyx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  Facebook
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.tiktok.com/@supremyxci"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  TikTok
                </Link>
              </li>
              <li>
                <Link
                  href="https://youtube.com/@supremyx-ci"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  YouTube
                </Link>
              </li>
              <li>
                <Link
                  href="https://discord.gg/bT49UQFUMt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  WhatsApp
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 SUPREMYX - Tous droits réservés
          </p>
          <p className="text-sm text-muted-foreground">
            Fait en Côte d&apos;Ivoire
          </p>
        </div>
      </div>
    </footer>
  )
}
