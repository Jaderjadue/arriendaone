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
  imagen?: string
}

export function PropertyCard({
  id,
  ubicacion,
  precio,
  dormitorios,
  banos,
  tipo_propiedad,
  imagen,
}: PropertyCardProps) {
  const formattedPrice = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(precio)
  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={typeof imagen === "string" && imagen.trim() !== "" ? imagen : "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop"}
          alt={ubicacion}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <Badge className="bg-orange-500 text-white hover:bg-orange-500">
            SIN COMISIÓN
          </Badge>
        </div>
      </div>
      <p className="text-xs break-all p-2 text-red-500">
        {imagen}
      </p>
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
