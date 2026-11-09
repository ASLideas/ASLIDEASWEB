import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { accion, nombre, email, fecha, hora, oficina, codigoReserva } = body;
    const apiKey = process.env.BREVO_API_KEY || process.env.CLAVE_API_BREVO || '';
    const senderEmail = process.env.BREVO_SENDER_EMAIL || 'contacto@aslideas.cl';


    if (accion === 'agendar') {
      const codigoUnico = codigoReserva || ('ASL-' + Math.floor(100000 + Math.random() * 900000));
      await fetch('[suspicious link removed]', {
        method: 'POST',
        headers: { 'accept': 'application/json', 'api-key': apiKey, 'content-type': 'application/json' },
        body: JSON.stringify({
          sender: { name: 'ASL Ideas SpA', email: senderEmail },
          to: [{ email: email, name: nombre }, { email: senderEmail, name: 'ASL Ideas SpA' }],
          subject: 'Confirmacion de Cita [' + codigoUnico + ']',
          htmlContent: '<h2>Cita Agendada</h2><p><strong>Fecha:</strong> ' + fecha + '</p><p><strong>Hora:</strong> ' + hora + '</p><p><strong>Sala:</strong> https://aslideasweb.vercel.app/sala-virtual</p>'
        })
      });
      return NextResponse.json({ success: true, codigoReserva: codigoUnico });
    }

    if (accion === 'cancelar') {
      await fetch('[suspicious link removed]', {
        method: 'POST',
        headers: { 'accept': 'application/json', 'api-key': apiKey, 'content-type': 'application/json' },
        body: JSON.stringify({
          sender: { name: 'ASL Ideas SpA', email: senderEmail },
          to: [{ email: email, name: nombre || 'Usuario' }, { email: senderEmail, name: 'ASL Ideas SpA' }],
          subject: 'Cancelacion de Cita [' + (codigoReserva || '') + ']',
          htmlContent: '<h2>Reunion Cancelada</h2><p>Tu cita ha sido cancelada exitosamente.</p>'
        })
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Accion no valida' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
