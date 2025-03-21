export const metadata = {
    title: "AIVIA Search",
    description: "AI-поисковик с искусственным интеллектом",
  };
  
  export default function RootLayout({ children }) {
    return (
      <html lang="ru">
        <body>
          {children}
        </body>
      </html>
    );
  }