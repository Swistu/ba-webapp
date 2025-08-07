import "../../styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <head>
        <title>BA</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      <body>
        <div>{children}</div>
      </body>
    </html>
  );
}
