# Certificados

Dejá acá los archivos de tus certificados (imágenes o PDFs).

Luego enlazá cada archivo en `data/certifications.ts` usando el campo `document`:

    { type: 'image', src: '/certificates/mi-cert.png' }   // imagen -> modal
    { type: 'pdf',   src: '/certificates/mi-cert.pdf' }    // pdf    -> modal + descarga
    { type: 'link',  src: 'https://tryhackme.com/...' }     // link   -> verificar (pestaña nueva)
    null                                                    // sin doc -> "Próximamente"

Las rutas son relativas a `public/`, así que un archivo en
`public/certificates/foo.png` se referencia como `/certificates/foo.png`.
