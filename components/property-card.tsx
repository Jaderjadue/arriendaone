import Link from 'next/link'
import { MapPin, Bed, Bath, Home } from 'lucide-react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface PropertyCardProps {
  id: string
  ubicacion: string
  precio: number
  dormitorios: number
  banos: number
  tipo_propiedad: string
}

export function PropertyCard({
  id,
  ubicacion,
  precio,
  dormitorios,
  banos,
  tipo_propiedad,
}: PropertyCardProps) {
  const formattedPrice = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(precio)

  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg leading-tight text-balance">
            {ubicacion}
          </CardTitle>
          <Badge variant="secondary" className="shrink-0">
            <Home className="mr-1 size-3" />
            {tipo_propiedad}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-2xl font-bold text-foreground">
          {formattedPrice}
          <span className="text-sm font-normal text-muted-foreground">/mes</span>
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Bed className="size-4" />
            <span>{dormitorios} {dormitorios === 1 ? 'dormitorio' : 'dormitorios'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="size-4" />
            <span>{banos} {banos === 1 ? 'baño' : 'baños'}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/propiedades/${id}`}>
            Ver propiedad
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
