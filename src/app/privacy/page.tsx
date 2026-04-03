import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad — IntroAlimentar',
  description: 'Política de privacidad y protección de datos de IntroAlimentar.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-gradient-to-br from-green-app to-green-dark text-white p-5 rounded-b-3xl">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="text-green-100 text-sm hover:underline">← Volver</Link>
          <h1 className="text-2xl font-bold mt-2">📄 Política de Privacidad</h1>
          <p className="text-green-100 text-sm mt-1">Última actualización: abril 2026</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-cream-dark space-y-6 text-sm text-text-secondary leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-text-primary mb-2">1. Responsable del tratamiento</h2>
            <p>
              IntroAlimentar es una aplicación web informativa sobre alimentación complementaria infantil.
              El responsable del tratamiento de datos es el titular de la aplicación.
              Para cualquier consulta sobre privacidad, puedes escribir a:{' '}
              <a href="mailto:privacy@introalimentar.com" className="text-green-dark hover:underline">
                privacy@introalimentar.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-text-primary mb-2">2. Datos que recopilamos</h2>
            <p className="mb-2">Recopilamos únicamente los datos que tú proporcionas voluntariamente:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Datos de cuenta:</strong> correo electrónico y contraseña (cifrada)</li>
              <li><strong>Perfil del bebé:</strong> nombre, fecha de nacimiento, tipo de alimentación, enfoque elegido</li>
              <li><strong>Diario de alimentación:</strong> alimentos probados, reacciones, notas</li>
              <li><strong>Seguimiento de alérgenos:</strong> alérgenos introducidos, fechas, reacciones</li>
              <li><strong>Progreso de aprendizaje:</strong> lecciones completadas</li>
            </ul>
            <p className="mt-2">
              <strong>No recopilamos</strong> datos de geolocalización, contactos, fotos, ni ningún dato
              del dispositivo más allá de lo necesario para el funcionamiento de la web.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-text-primary mb-2">3. Finalidad del tratamiento</h2>
            <p>Tus datos se utilizan exclusivamente para:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Personalizar tu experiencia en la app (plan semanal, seguimiento)</li>
              <li>Sincronizar tus datos entre dispositivos (si creas una cuenta)</li>
              <li>Permitirte exportar y gestionar tus datos</li>
            </ul>
            <p className="mt-2">
              <strong>No vendemos, compartimos ni cedemos tus datos a terceros.</strong> No usamos
              tus datos con fines publicitarios ni de marketing.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-text-primary mb-2">4. Base legal</h2>
            <p>
              El tratamiento de datos se basa en tu <strong>consentimiento</strong> (art. 6.1.a RGPD),
              otorgado al crear una cuenta y proporcionar tus datos voluntariamente.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-text-primary mb-2">5. Modo invitado</h2>
            <p>
              Puedes usar IntroAlimentar sin crear una cuenta. En modo invitado, todos los datos se
              almacenan <strong>únicamente en tu dispositivo</strong> (localStorage del navegador).
              No se envía ningún dato a nuestros servidores. Al borrar los datos del navegador,
              se eliminan permanentemente.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-text-primary mb-2">6. Almacenamiento y seguridad</h2>
            <p>
              Los datos de cuentas registradas se almacenan en <strong>Supabase</strong> (infraestructura
              de Amazon Web Services, región EU). La conexión está cifrada con TLS. Las contraseñas
              se almacenan con hash bcrypt. El acceso a los datos está protegido por políticas de
              seguridad a nivel de fila (Row Level Security): cada usuario solo puede ver y modificar
              sus propios datos.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-text-primary mb-2">7. Tus derechos (RGPD)</h2>
            <p className="mb-2">Tienes derecho a:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Acceso:</strong> ver todos tus datos almacenados (visible en la app)
              </li>
              <li>
                <strong>Portabilidad:</strong> exportar todos tus datos en formato JSON desde{' '}
                <Link href="/account" className="text-green-dark hover:underline">tu cuenta</Link>
              </li>
              <li>
                <strong>Rectificación:</strong> modificar tus datos directamente en la app
              </li>
              <li>
                <strong>Supresión:</strong> eliminar tu cuenta y todos tus datos desde{' '}
                <Link href="/account" className="text-green-dark hover:underline">tu cuenta</Link>
              </li>
              <li>
                <strong>Oposición:</strong> puedes dejar de usar la app en cualquier momento
              </li>
            </ul>
            <p className="mt-2">
              Para ejercer cualquier derecho, puedes hacerlo directamente desde la app o escribir a{' '}
              <a href="mailto:privacy@introalimentar.com" className="text-green-dark hover:underline">
                privacy@introalimentar.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-text-primary mb-2">8. Cookies</h2>
            <p>
              IntroAlimentar utiliza únicamente <strong>cookies técnicas esenciales</strong> para
              mantener tu sesión de usuario activa. No utilizamos cookies de seguimiento, analíticas
              ni publicitarias. No se requiere consentimiento adicional para cookies esenciales
              (art. 22.2 LSSI).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-text-primary mb-2">9. Menores</h2>
            <p>
              IntroAlimentar es una herramienta para <strong>padres y cuidadores</strong>. No
              recopilamos datos directamente de menores. Los datos del bebé son proporcionados
              por el adulto responsable.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-text-primary mb-2">10. Cambios en esta política</h2>
            <p>
              Nos reservamos el derecho de actualizar esta política. Cualquier cambio significativo
              será comunicado a través de la aplicación. La fecha de última actualización se indica
              al inicio de este documento.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-text-primary mb-2">11. Contacto</h2>
            <p>
              Para cualquier consulta sobre privacidad o protección de datos:{' '}
              <a href="mailto:privacy@introalimentar.com" className="text-green-dark hover:underline">
                privacy@introalimentar.com
              </a>
            </p>
          </section>

        </div>
      </main>
    </div>
  );
}
