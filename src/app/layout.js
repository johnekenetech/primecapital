import "./globals.css";

export const metadata = {
  title: "Prime Capital",
  description: "Prime Capital Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
