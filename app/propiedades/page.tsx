import { createClient } from '@/lib/supabase/server'
import { PropertyCard } from '@/components/property-card'

export const metadata = {
  title: 'Propiedades en Arriendo | ArriendaOne',
  description: 'Encuentra las mejores propiedades en arriendo. Departamentos, casas y más sin pagar comisión de corretaje.',
}

interface Propiedad {
  id: string
  ubicacion: string
  precio: number
  dormitorios: number
  banos: number
  tipo_propiedad: string
  fotos?: string

}

export default async function PropiedadesPage() {
  let propiedades: Propiedad[] = []

  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('propiedades')
      .select('id, ubicacion, precio, dormitorios, banos, tipo_propiedad, fotos')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching propiedades:', error)
    } else {
      propiedades = data || []
    }
  } catch (err) {
    console.error('Error connecting to Supabase:', err)
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Propiedades en Arriendo
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Encuentra tu próximo hogar sin pagar comisión de corretaje
          </p>
        </header>

        {propiedades.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {propiedades.map((propiedad: Propiedad) => (
              <PropertyCard
                key={propiedad.id}
                id={propiedad.id}
                ubicacion={propiedad.ubicacion}
                precio={propiedad.precio}
                dormitorios={propiedad.dormitorios}
                banos={propiedad.banos}
                tipo_propiedad={propiedad.tipo_propiedad}
                imagen={propiedad.fotos}

              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="rounded-full bg-muted p-6">
              <svg
                className="size-12 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <h2 className="mt-6 text-xl font-semibold text-foreground">
              No hay propiedades disponibles
            </h2>
            <p className="mt-2 text-muted-foreground">
              Vuelve pronto para ver nuevas propiedades en arriendo
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
