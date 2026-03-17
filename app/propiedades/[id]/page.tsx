import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, MapPin, Bed, Bath, Home } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ContactModal } from '@/components/contact-modal'

interface PropiedadDetail {
  id: string
  ubicacion: string
  precio: number
  dormitorios: number
  banos: number
  tipo_propiedad: string
  descripcion: string | null
  fotos: string[] | string | null
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: propiedad } = await supabase
    .from('propiedades')
    .select('ubicacion, tipo_propiedad')
    .eq('id', id)
    .single()

  if (!propiedad) {
    return {
      title: 'Propiedad no encontrada | ArriendaOne',
    }
  }

  return {
    title: `${propiedad.tipo_propiedad} en ${propiedad.ubicacion} | ArriendaOne`,
    description: `Arrienda este ${propiedad.tipo_propiedad.toLowerCase()} en ${propiedad.ubicacion} sin pagar comisión de corretaje.`,
  }
}

export default async function PropiedadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: propiedad, error } = await supabase
    .from('propiedades')
    .select('id, ubicacion, precio, dormitorios, banos, tipo_propiedad, descripcion, fotos')
    .eq('id', id)
    .single()

  if (error || !propiedad) {
    notFound()
  }

  const formattedPrice = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(propiedad.precio)

  // Handle photos - parse if string, ensure array, filter valid entries
  const parsePhotos = (fotos: unknown): string[] => {
    if (!fotos) return []
    
    // If it's already an array, use it
    if (Array.isArray(fotos)) {
      return fotos.filter((p): p is string => typeof p === 'string' && p.length > 0)
    }
    
    // If it's a string, try to parse as JSON or treat as single URL
    if (typeof fotos === 'string') {
      try {
        const parsed = JSON.parse(fotos)
        if (Array.isArray(parsed)) {
          return parsed.filter((p): p is string => typeof p === 'string' && p.length > 0)
        }
        return []
      } catch {
        // If it's a single URL string, wrap it in an array
        return fotos.startsWith('http') ? [fotos] : []
      }
    }
    
    return []
  }
  
  const photos: string[] = parsePhotos(propiedad.fotos)

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <div className="mb-6">
          <Button variant="ghost" asChild className="gap-2">
            <Link href="/propiedades">
              <ArrowLeft className="size-4" />
              Volver a propiedades
            </Link>
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Photo gallery */}
            {photos.length > 0 ? (
              <div className="space-y-4">
                <div className="relative aspect-video overflow-hidden rounded-xl">
                  <Image
                    src={photos[0]}
                    alt={`${propiedad.tipo_propiedad} en ${propiedad.ubicacion}`}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {photos.length > 1 && (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {photos.slice(1).map((photo, index) => (
                      <div
                        key={index}
                        className="relative aspect-square overflow-hidden rounded-lg"
                      >
                        <Image
                          src={photo}
                          alt={`Foto ${index + 2} de ${propiedad.tipo_propiedad}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex aspect-video items-center justify-center rounded-xl bg-muted">
                <div className="text-center text-muted-foreground">
                  <Home className="mx-auto size-16 opacity-50" />
                  <p className="mt-4">No hay fotos disponibles</p>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Descripción</h2>
              {propiedad.descripcion ? (
                <p className="leading-relaxed text-muted-foreground whitespace-pre-wrap">
                  {propiedad.descripcion}
                </p>
              ) : (
                <p className="text-muted-foreground italic">
                  No hay descripción disponible para esta propiedad.
                </p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6 space-y-6">
                {/* Header info */}
                <div className="space-y-3">
                  <Badge variant="secondary" className="gap-1">
                    <Home className="size-3" />
                    {propiedad.tipo_propiedad}
                  </Badge>
                  <h1 className="text-xl font-bold text-foreground flex items-start gap-2">
                    <MapPin className="size-5 shrink-0 text-muted-foreground mt-0.5" />
                    {propiedad.ubicacion}
                  </h1>
                </div>

                {/* Price */}
                <div className="border-t border-b py-4">
                  <p className="text-3xl font-bold text-foreground">
                    {formattedPrice}
                    <span className="text-base font-normal text-muted-foreground">/mes</span>
                  </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                    <Bed className="size-5 text-muted-foreground" />
                    <div>
                      <p className="text-lg font-semibold text-foreground">{propiedad.dormitorios}</p>
                      <p className="text-sm text-muted-foreground">
                        {propiedad.dormitorios === 1 ? 'Dormitorio' : 'Dormitorios'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                    <Bath className="size-5 text-muted-foreground" />
                    <div>
                      <p className="text-lg font-semibold text-foreground">{propiedad.banos}</p>
                      <p className="text-sm text-muted-foreground">
                        {propiedad.banos === 1 ? 'Baño' : 'Baños'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact CTA */}
                <ContactModal propiedadId={propiedad.id} ubicacion={propiedad.ubicacion} />
                <p className="text-center text-sm text-muted-foreground">
                  Sin comisión de corretaje
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
