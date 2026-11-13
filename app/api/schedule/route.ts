import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { accion, nombre, email, telefono, servicio, fecha, hora, codigoReserva } = body;

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Clave API de Brevo no configurada' }, { status: 500 });
    }

    if (accion === 'agendar') {
      const linkSala = 'https://aslideasweb.vercel.app/sala-virtual';
      const codigoUnico = codigoReserva || ('ASL-' + Math.floor(100000 + Math.random() * 900000));

      const brevoRes = await fetch('[suspicious link removed]', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': apiKey,
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          sender: { name: 'ASL Ideas SpA', email: 'contacto@aslideas.cl' },
          to: [{ email, name: nombre }],
          subject: `Confirmación de Cita - Código: ${codigoUnico}`,
          htmlContent: `<p>Hola <strong>${nombre}</strong>,</p><p>Tu cita para <strong>${servicio || 'Atención Virtual'}</strong> ha sido agendada con éxito.</p><p><strong>Fecha:</strong> ${fecha}<br/><strong>Hora:</strong> ${hora}<br/><strong>Código de Reserva:</strong> ${codigoUnico}</p><p><a href="${linkSala}">Ingresar a la Sala Virtual</a></p>`
        })
      });

      if (!brevoRes.ok) {
        const errData = await brevoRes.json().catch(() => ({}));
        return NextResponse.json({ error: 'Error al enviar correo vía Brevo', details: errData }, { status: 500 });
      }

      return NextResponse.json({ success: true, codigoReserva: codigoUnico });
    }

    return NextResponse.json({ error: 'Acción no válida' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
