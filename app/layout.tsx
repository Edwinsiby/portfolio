import "./globals.css";
import Providers from "./providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen flex flex-col items-center">
            <header className="w-full py-6 px-6 flex justify-end container">
            </header>
            <main className="w-full px-4 container">{children}</main>
            <footer className="w-full py-8 text-center text-sm text-gray-500">
              © {new Date().getFullYear()} Edwin Siby — Built with Next.js
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
