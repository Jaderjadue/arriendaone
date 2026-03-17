'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Loader2 } from 'lucide-react'

interface ContactModalProps {
  propiedadId: string
  ubicacion: string
}

export function ContactModal({ propiedadId, ubicacion }: ContactModalProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const nombre = formData.get('nombre') as string
    const email = formData.get('email') as string
    const telefono = formData.get('telefono') as string
    const mensaje = formData.get('mensaje') as string

    const supabase = createClient()

    const { error: insertError } = await supabase.from('postulaciones').insert({
      propiedad_id: propiedadId,
      nombre,
      email,
      telefono: telefono || null,
      mensaje: mensaje || null,
    })

    setIsSubmitting(false)

    if (insertError) {
      setError('Hubo un error al enviar tu solicitud. Por favor intenta de nuevo.')
      return
    }

    setIsSuccess(true)
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      // Reset state when closing
      setIsSuccess(false)
      setError(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full">
          Contactar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {isSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle>Solicitud enviada</DialogTitle>
              <DialogDescription>
                Gracias por tu interés en la propiedad en {ubicacion}. Nos pondremos en contacto contigo pronto.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setOpen(false)} className="w-full">
                Cerrar
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Contactar por esta propiedad</DialogTitle>
              <DialogDescription>
                Completa el formulario y te contactaremos a la brevedad sobre la propiedad en {ubicacion}.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre *</Label>
                <Input
                  id="nombre"
                  name="nombre"
                  placeholder="Tu nombre completo"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  placeholder="+56 9 1234 5678"
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mensaje">Mensaje</Label>
                <Textarea
                  id="mensaje"
                  name="mensaje"
                  placeholder="Escribe tu mensaje o consulta..."
                  rows={3}
                  disabled={isSubmitting}
                />
              </div>
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    'Enviar solicitud'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
