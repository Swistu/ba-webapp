import "../../../styles/globals.css";

export default function PanelPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
          <h1>Panel Layout</h1>
          {children}
        </div>
        <div className=""></div>
        <main></main>
        <footer className="text-center mt-8">
          <p>Footer Content</p>
        </footer>
      </body>
    </html>
  );
}
