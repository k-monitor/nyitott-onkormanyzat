import { GoogleTagManager } from '@next/third-parties/google'

export default function RootLayout({children}) {
    return (
        <html lang="hu">
            <body>{children}</body>
            <GoogleTagManager gtmId="GTM-MMHD8865" />
        </html>
     )
}
