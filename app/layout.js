export const metadata = {
  title: 'Bazaru - Best Deals in India',
  description: 'India ka apna deals aur offers wala website',
}

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif', background: '#f5f5f5' }}>
        {children}
      </body>
    </html>
  )
}
