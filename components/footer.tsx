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
                  src="/file_00000000c518724687a64e9f7e791067.png" 
                  alt="SUPREMYX Logo" 
                  width={24}
                  height={24}
                  className="size-6"
                />
              </div>
              <span className="text-xl font-bold">
                SUPREMYX <span className="text-primary"> CI</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              La première plateforme esport PUBG Mobile de Côte d&apos;Ivoire. Tournois automatiques, classement en temps réel, et une communauté de passionnés.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-4 font-semibold">Navigation</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#tournois" className="transition-colors hover:text-foreground">
                  Tournois
                </Link>
              </li>
              <li>
                <Link href="#classement" className="transition-colors hover:text-foreground">
                  Classement
                </Link>
              </li>
              <li>
                <Link href="#regles" className="transition-colors hover:text-foreground">
                  Règles
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
                  href="https://www.facebook.com/share/1CaMzJknH6/"
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
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 SUPREMYX - Plateforme officielle
          </p>
          <p className="text-sm text-muted-foreground">
            Fait en Côte d&apos;Ivoire
          </p>
        </div>
      </div>
    </footer>
  )
}
