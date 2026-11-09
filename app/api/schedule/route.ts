import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { accion, nombre, email, fecha, hora, oficina, codigoReserva } = body;

    const apiKey = process.env.BREVO_API_KEY || process.env.CLAVE_API_BREVO || '';
    const senderEmail = process.env.BREVO_SENDER_EMAIL || 'contacto@aslideas.cl';

    if (!apiKey) {
      return NextResponse.json({ error: 'Clave API de Brevo no configurada' }, { status: 500 });
    }

    // A. AGENDAR REUNIÓN
    if (accion === 'agendar') {
      const linkSala = 'https://aslideasweb.vercel.app/sala-virtual';
      const codigoUnico = codigoReserva || `ASL-${Math.floor(100000 + Math.random() * 900000)}`;

      const brevoRes = await fetch('[suspicious link removed]', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': apiKey,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          sender: { name: 'ASL Ideas SpA — Agenda', email: senderEmail },
          to: [
            { email: email, name: nombre },
            { email: senderEmail, name: 'ASL Ideas SpA' }
          ],
          replyTo: { email: senderEmail, name: 'Soporte ASL Ideas' },
          subject: `Confirmación de Video Reunión: ${oficina || 'ASL Ideas SpA'} [${codigoUnico}]`,
          htmlContent: `
            <div style="font-family: Arial, sans-serif; background-color: #FAF8F5; padding: 20px; color: #2F3E46;">
              <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 25px; border-radius: 16px; border: 2px solid #84A59D;">
                <h2 style="color: #52796F; text-align: center;">¡Tu Video Reunión ha sido Agendada!</h2>
                <p>Hola <strong>${nombre}</strong>,</p>
                <p>Confirmamos la reserva de tu cita en la plataforma interactiva de <strong>ASL Ideas SpA</strong>.</p>
                
                <div style="background-color: #E6E7D5; padding: 15px; border-radius: 12px; margin: 20px 0;">
                  <p style="margin: 5px 0;">��� <strong>Oficina / Área:</strong> ${oficina || 'Casa Matriz B2B'}</p>
                  <p style="margin: 5px 0;">��� <strong>Fecha:</strong> ${fecha}</p>
                  <p style="margin: 5px 0;">⏰ <strong>Hora:</strong> ${hora}</p>
                  <p style="margin: 5px 0;">��� <strong>Código de Reserva:</strong> <span style="font-family: monospace; font-weight: bold;">${codigoUnico}</span></p>
                </div>

                <div style="text-align: center; margin: 30px 0;">
                  <a href="${linkSala}" style="background-color: #52796F; color: #ffffff; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: bold; display: inline-block;">
                    ��� Ingresar a la Sala Virtual en Vivo
                  </a>
                </div>

                <p style="font-size: 12px; color: #666; text-align: center; border-top: 1px solid #eee; padding-top: 15px;">
                  Entorno seguro de teleatención bajo cumplimiento Ley TEA N° 21.545 y Ley N° 21.663.
                </p>
              </div>
            </div>
          `,
        }),
      });

      if (!brevoRes.ok) {
        console.error('Error enviando correo de agendamiento:', await brevoRes.text());
      }

      return NextResponse.json({
        success: true,
        message: 'Reunión agendada con éxito',
        codigoReserva: codigoUnico,
      });
    }

    // B. CANCELAR REUNIÓN
    if (accion === 'cancelar') {
      const brevoRes = await fetch('[suspicious link removed]', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': apiKey,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          sender: { name: 'ASL Ideas SpA — Agenda', email: senderEmail },
          to: [
            { email: email, name: nombre || 'Usuario' },
            { email: senderEmail, name: 'ASL Ideas SpA' }
          ],
          subject: `Notificación de Cancelación de Reunión [${codigoReserva || 'Reserva'}]`,
          htmlContent: `
            <div style="font-family: Arial, sans-serif; background-color: #FAF8F5; padding: 20px; color: #2F3E46;">
              <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 25px; border-radius: 16px; border: 2px solid #DC8D6C;">
                <h2 style="color: #DC8D6C; text-align: center;">Reunión Cancelada</h2>
                <p>Estimado/a <strong>${nombre || 'Usuario'}</strong>,</p>
                <p>Le informamos que la videorreunión asociada a la reserva <strong>${codigoReserva || 'solicitada'}</strong> ha sido cancelada exitosamente.</p>
                <p>Si deseas reprogramar una nueva cita, puedes hacerlo directamente ingresando a nuestro sitio web.</p>
                <div style="text-align: center; margin: 25px 0;">
                  <a href="https://aslideasweb.vercel.app/" style="background-color: #52796F; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
                    Volver al Ecosistema ASL Ideas
                  </a>
                </div>
              </div>
            </div>
          `,
        }),
      });

      if (!brevoRes.ok) {
        console.error('Error enviando correo de cancelación:', await brevoRes.text());
      }

      return NextResponse.json({
        success: true,
        message: 'Reunión cancelada con éxito',
      });
    }

    return NextResponse.json({ error: 'Acción no válida' }, { status: 400 });
  } catch (error) {
    console.error('Error en API de agendamiento:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
