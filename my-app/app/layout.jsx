// layout.jsx - Root layout for Next.js app
// Required by Next.js app router - wraps all pages with html and body tags

export const metadata = {
  title: "QUGeeks",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts - EB Garamond to match Phase 1 design */}
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Font Awesome icons via CDN - avoids CORS issues with kit URL */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body
        style={{
          margin: 0,
          fontFamily: "'EB Garamond', serif",
          backgroundColor: "#FFE2C9",
          color: "#2C1810",
        }}
      >
        {children}
      </body>
    </html>
  );
}