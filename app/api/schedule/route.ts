import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { accion, nombre, email, fecha, hora, oficina, codigoReserva } = body;

    const apiKey = process.env.BREVO_API_KEY || process.env.CLAVE_API_BREVO || '';
    const senderEmail = process.env.BREVO_SENDER_EMAIL || 'contacto@aslideas.cl';

      return NextResponse.json({ error: 'Clave API de Brevo no configurada' }, { status: 500 });
    }

    if (accion === 'agendar') {
      const linkSala = 'https://aslideasweb.vercel.app/sala-virtual';
      const codigoUnico = codigoReserva || ('ASL-' + Math.floor(100000 + Math.random() * 900000));

      // 1. Guardar/actualizar el contacto en la Lista #3 (Agendamientos B2B) en Brevo
      try {
        await fetch('[suspicious link removed]', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'api-key': apiKey,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            attributes: {
              NOMBRE: nombre,
              OFICINA: oficina || 'ASL Ideas SpA',
              FECHA_CITA: fecha,
              HORA_CITA: hora,
              CODIGO_RESERVA: codigoUnico,
              ESTADO_CITA: 'Confirmada'
            },
            listIds: [3],
            updateEnabled: true
          }),
        });
      } catch (e) {
        console.log('Contacto no guardado en lista 3 pero continuando envio:', e);
      }

      // 2. Enviar Correo Transaccional de Confirmacion con Codigo de Acceso
      const htmlAgendar = '<div style="font-family: Arial, sans-serif; background-color: #FAF8F5; padding: 20px; color: #2F3E46;">' +
        '<div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 25px; border-radius: 16px; border: 2px solid #84A59D;">' +
        '<h2 style="color: #52796F; text-align: center;">Tu Video Reunion ha sido Agendada</h2>' +
        '<p>Estimado/a <strong>' + nombre + '</strong>,</p>' +
        '<p>Confirmamos la reserva de tu cita en la plataforma interactiva de <strong>ASL Ideas SpA</strong>.</p>' +
        '<div style="background-color: #E6E7D5; padding: 15px; border-radius: 12px; margin: 20px 0;">' +
        '<p style="margin: 5px 0;"><strong>Portal / Oficina:</strong> ' + (oficina || 'ASL Ideas SpA') + '</p>' +
        '<p style="margin: 5px 0;"><strong>Fecha:</strong> ' + fecha + '</p>' +
        '<p style="margin: 5px 0;"><strong>Hora:</strong> ' + hora + '</p>' +
        '<p style="margin: 5px 0;"><strong>Contrasena / Codigo de Acceso:</strong> <span style="font-family: monospace; font-size: 16px; font-weight: bold; color: #2D6A4F;">' + codigoUnico + '</span></p>' +
        '</div>' +
        '<p style="font-size: 14px; color: #555;">Utiliza este codigo para ingresar a la Sala Virtual en la fecha y hora agendadas.</p>' +
        '<div style="text-align: center; margin: 30px 0;">' +
        '<a href="' + linkSala + '" style="background-color: #52796F; color: #ffffff; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: bold; display: inline-block;">Ingresar a la Sala Virtual en Vivo</a>' +
        '</div>' +
        '<p style="font-size: 12px; color: #666; text-align: center; border-top: 1px solid #eee; padding-top: 15px;">Entorno seguro de teleatencion bajo cumplimiento Ley TEA N 21.545 y Ley N 21.663.</p>' +
        '</div></div>';

      const responseMail = await fetch('[suspicious link removed]', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': apiKey,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          sender: { name: 'ASL Ideas SpA - Agenda', email: senderEmail },
          to: [
            { email: email, name: nombre },
            { email: senderEmail, name: 'ASL Ideas SpA' }
          ],
          replyTo: { email: senderEmail, name: 'Soporte ASL Ideas' },
          subject: 'Confirmacion de Video Reunion: ' + (oficina || 'ASL Ideas SpA') + ' [' + codigoUnico + ']',
          htmlContent: htmlAgendar,
        }),
      });

      return NextResponse.json({ success: true, codigoReserva: codigoUnico });
    }

    if (accion === 'cancelar') {
      const htmlCancelar = '<div style="font-family: Arial, sans-serif; background-color: #FAF8F5; padding: 20px; color: #2F3E46;">' +
        '<div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 25px; border-radius: 16px; border: 2px solid #DC8D6C;">' +
        '<h2 style="color: #DC8D6C; text-align: center;">Reunion Cancelada</h2>' +
        '<p>Estimado/a <strong>' + (nombre || 'Usuario') + '</strong>,</p>' +
        '<p>Le informamos que la videorreunion asociada a la reserva <strong>' + (codigoReserva || 'solicitada') + '</strong> ha sido cancelada exitosamente.</p>' +
        '</div></div>';

      await fetch('[suspicious link removed]', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': apiKey,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          sender: { name: 'ASL Ideas SpA - Agenda', email: senderEmail },
          to: [
            { email: email, name: nombre || 'Usuario' },
            { email: senderEmail, name: 'ASL Ideas SpA' }
          ],
          subject: 'Notificacion de Cancelacion de Reunion [' + (codigoReserva || 'Reserva') + ']',
          htmlContent: htmlCancelar,
        }),
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Accion no valida' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}