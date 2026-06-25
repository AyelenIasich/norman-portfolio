# Certificados

Archivos (PNG/JPG/PDF) de los certificados que se muestran en la sección
"Certificaciones".

Cada certificado se configura en `data/certifications.ts`:

    image:     '/certificates/mi-cert.png'   // captura -> se ve en el modal
    verifyUrl: 'https://...'                  // página oficial de verificación
    pdf:       '/certificates/mi-cert.pdf'    // PDF original (descarga, opcional)

Reglas de la tarjeta:
- con `image`  -> botón "Ver certificado" (abre modal con la captura + verificar)
- sin `image` pero con `verifyUrl` -> botón "Verificar" (link directo)
- sin nada     -> estado "Próximamente"

Las rutas son relativas a `public/`, así que `public/certificates/foo.png`
se referencia como `/certificates/foo.png`.

Para regenerar un PNG desde un PDF:

    convert -density 150 cert.pdf[0] -quality 92 -background white -flatten cert.png
