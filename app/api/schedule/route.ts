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

      // 1. Guardar o actualizar el contacto en la Lista #3 (Agendamientos B2B) en Brevo
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
        console.log('Error registrando contacto en Brevo:', e);
      }

      // 2. Correo de Confirmacion + Aviso de Recordatorios + Cancelacion
      const htmlAgendar = '<div style="font-family: Arial, sans-serif; background-color: #FAF8F5; padding: 20px; color: #2F3E46;">' +
        '<div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 25px; border-radius: 16px; border: 2px solid #84A59D;">' +
        '<h2 style="color: #52796F; text-align: center; margin-bottom: 5px;">¡Cita Agendada con Éxito!</h2>' +
        '<p style="text-align: center; font-size: 14px; color: #52796F; font-weight: bold;">ASL Ideas SpA - Salud Digital Inclusiva</p>' +
        '<hr style="border: none; border-top: 1px solid #E6E7D5; margin: 15px 0;" />' +
        '<p>Hola <strong>' + nombre + '</strong>,</p>' +
        '<p>Hemos recibido correctamente la reserva de tu videorreunión en nuestra plataforma.</p>' +
        '<div style="background-color: #E6E7D5; padding: 18px; border-radius: 12px; margin: 20px 0;">' +
        '<p style="margin: 4px 0;"><strong>Unidad / Área:</strong> ' + (oficina || 'ASL Ideas SpA') + '</p>' +
        '<p style="margin: 4px 0;"><strong>Fecha Programada:</strong> ' + fecha + '</p>' +
        '<p style="margin: 4px 0;"><strong>Bloque Horario:</strong> ' + hora + '</p>' +
        '<p style="margin: 4px 0;"><strong>Código de Acceso:</strong> <span style="font-family: monospace; font-size: 16px; font-weight: bold; color: #2D6A4F;">' + codigoUnico + '</span></p>' +
        '</div>' +
        '<div style="background-color: #F0F7F4; border-left: 4px solid #52796F; padding: 12px 15px; margin: 20px 0; border-radius: 4px;">' +
        '<p style="margin: 0; font-size: 13px; color: #2F3E46;"><strong>� Recordatorios Automáticos:</strong> Te enviaremos un correo de recordatorio <strong>24 horas antes</strong> y <strong>1 hora antes</strong> de la reunión con el enlace de acceso directo.</p>' +
        '</div>' +
        '<div style="text-align: center; margin: 25px 0;">' +
        '<a href="' + linkSala + '" style="background-color: #52796F; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block; margin-bottom: 10px;">Ingresar a la Sala Virtual</a>' +
        '</div>' +
        '<div style="background-color: #FAF8F5; padding: 12px; border-radius: 8px; text-align: center; font-size: 12px; color: #666;">' +
        '<p style="margin: 0 0 5px 0;">¿Necesitas modificar o cancelar tu cita?</p>' +
        '<p style="margin: 0;">Responde directamente a este correo o escríbenos a <a href="mailto:' + senderEmail + '" style="color: #52796F; font-weight: bold;">' + senderEmail + '</a> indicando tu código <strong>' + codigoUnico + '</strong>.</p>' +
        '</div>' +
        '<p style="font-size: 11px; color: #888; text-align: center; border-top: 1px solid #eee; padding-top: 15px; margin-top: 20px;">Entorno seguro de teleatención bajo cumplimiento Ley TEA N° 21.545 y Ley N° 21.663.</p>' +
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
            { email: email, name: nombre },
            { email: senderEmail, name: 'ASL Ideas SpA' }
          ],
          replyTo: { email: senderEmail, name: 'Soporte ASL Ideas' },
          subject: 'Confirmación de Reserva y Recordatorio: ' + (oficina || 'ASL Ideas SpA') + ' [' + codigoUnico + ']',
          htmlContent: htmlAgendar,
        }),
      });

      return NextResponse.json({ success: true, codigoReserva: codigoUnico });
    }

    if (accion === 'cancelar') {
      const htmlCancelar = '<div style="font-family: Arial, sans-serif; background-color: #FAF8F5; padding: 20px; color: #2F3E46;">' +
        '<div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 25px; border-radius: 16px; border: 2px solid #DC8D6C;">' +
        '<h2 style="color: #DC8D6C; text-align: center;">Reunión Cancelada</h2>' +
        '<p>Estimado/a <strong>' + (nombre || 'Usuario') + '</strong>,</p>' +
        '<p>Le informamos que la videorreunión asociada al código <strong>' + (codigoReserva || 'solicitada') + '</strong> ha sido cancelada exitosamente.</p>' +
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
          subject: 'Notificación de Cancelación de Reunión [' + (codigoReserva || 'Reserva') + ']',
          htmlContent: htmlCancelar,
        }),
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Acción no válida' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}