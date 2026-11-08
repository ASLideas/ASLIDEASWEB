import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { nombre, email, asunto, mensaje, oficina } = await req.json();

    const brevoRes = await fetch('[suspicious link removed]', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY || '',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: nombre, email: 'contacto@aslideas.cl' },
        to: [{ email: 'contacto@aslideas.cl', name: 'ASL Ideas SpA' }],
        replyTo: { email: email, name: nombre },
        subject: `[Contacto Web - ${oficina || 'General'}] ${asunto || 'Nuevo mensaje'}`,
        htmlContent: `
          <h2>Nuevo mensaje de contacto desde la Web</h2>
          <p><strong>Nombre:</strong> ${nombre}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Oficina / Área:</strong> ${oficina || 'General'}</p>
          <p><strong>Asunto:</strong> ${asunto || 'Sin asunto'}</p>
          <p><strong>Mensaje:</strong></p>
          <blockquote style="background: #f4f4f4; padding: 10px; border-left: 4px solid #52796F;">
            ${mensaje}
          </blockquote>
        `,
      }),
    });

    if (!brevoRes.ok) {
      console.error('Error enviando correo en Brevo:', await brevoRes.text());
    }

    return NextResponse.json({ success: true, message: 'Mensaje enviado con éxito' });
  } catch (error) {
    console.error('Error en API de contacto:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
