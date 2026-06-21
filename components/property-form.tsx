"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function PropertyForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [photos, setPhotos] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)
  const [propertyType, setPropertyType] = useState("")
  const [bedrooms, setBedrooms] = useState("")
  const [bathrooms, setBathrooms] = useState("")

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setPhotos(prev => [...prev, ...newFiles])
    }
  }

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  setIsSubmitting(true)
  setError(null)

  const formData = new FormData(e.currentTarget)
  const supabase = createClient()

  try {
    const uploadedPhotoUrls: string[] = []

    for (const photo of photos) {
      const safeName = photo.name.replace(/[^a-zA-Z0-9._-]/g, "-")
      const filePath = `${crypto.randomUUID()}-${safeName}`

      const { error: uploadError } = await supabase.storage
        .from("propiedades")
        .upload(filePath, photo)

      if (uploadError) {
        throw uploadError
      }

      const { data } = supabase.storage
        .from("propiedades")
        .getPublicUrl(filePath)

      uploadedPhotoUrls.push(data.publicUrl)
    }

    const { error: insertError } = await supabase.from("propiedades").insert({
      nombre: formData.get("name") as string,
      email: formData.get("email") as string,
      telefono: formData.get("phone") as string,
      ubicacion: formData.get("location") as string,
      tipo_propiedad: propertyType,
      precio: parseInt(formData.get("rent") as string, 10),
      dormitorios: parseInt(bedrooms, 10),
      banos: parseInt(bathrooms, 10),
      descripcion: formData.get("description") as string,
      fotos: JSON.stringify(uploadedPhotoUrls),
    })

    if (insertError) {
      throw insertError
    }

    setIsSubmitted(true)
  } catch (err) {
    console.error("Error publicando propiedad:", err)
    setError(`Error: ${err instanceof Error ? err.message : "Error desconocido"}`)
  } finally {
    setIsSubmitting(false)
  }
}

  if (isSubmitted) {
    return (
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
            <svg
              className="h-6 w-6 text-primary-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            Tu propiedad fue enviada correctamente.
          </h3>
          <Button
            className="mt-6"
            variant="outline"
            onClick={() => setIsSubmitted(false)}
          >
            Publicar otra propiedad
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 md:flex-row md:gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <Label htmlFor="name">Nombre completo</Label>
              <Input
                id="name"
                name="name"
                placeholder="Juan Perez"
                required
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <Label htmlFor="email">Correo electronico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="juan@ejemplo.com"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <Label htmlFor="phone">Telefono</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+56 9 1234 5678"
                required
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <Label htmlFor="location">Ubicacion de la propiedad</Label>
              <Input
                id="location"
                name="location"
                placeholder="Santiago, Las Condes"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <Label htmlFor="propertyType">Tipo de propiedad</Label>
              <Select value={propertyType} onValueChange={setPropertyType} required>
                <SelectTrigger id="propertyType">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="departamento">Departamento</SelectItem>
                  <SelectItem value="casa">Casa</SelectItem>
                  <SelectItem value="oficina">Oficina</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <Label htmlFor="rent">Arriendo mensual (CLP)</Label>
              <Input
                id="rent"
                name="rent"
                type="number"
                placeholder="500000"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <Label htmlFor="bedrooms">Dormitorios</Label>
              <Select value={bedrooms} onValueChange={setBedrooms} required>
                <SelectTrigger id="bedrooms">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <Label htmlFor="bathrooms">Banos</Label>
              <Select value={bathrooms} onValueChange={setBathrooms} required>
                <SelectTrigger id="bathrooms">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Descripcion de la propiedad</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe las caracteristicas principales de tu propiedad..."
              className="min-h-[120px] resize-none"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="photos">Fotos de la propiedad</Label>
            <div className="flex flex-col gap-3">
              <label 
                htmlFor="photos"
                className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-input bg-background p-6 cursor-pointer transition-colors hover:border-muted-foreground/50 hover:bg-muted/50"
              >
                <svg
                  className="h-8 w-8 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm text-muted-foreground">
                  Haz clic para subir fotos
                </span>
                <span className="text-xs text-muted-foreground">
                  PNG, JPG hasta 10MB
                </span>
                <input
                  id="photos"
                  type="file"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  onChange={handlePhotoChange}
                />
              </label>
              {photos.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {photos.map((photo, index) => (
                    <div
                      key={index}
                      className="relative group rounded-lg overflow-hidden bg-muted"
                    >
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Preview ${index + 1}`}
                        className="h-20 w-20 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute inset-0 flex items-center justify-center bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg
                          className="h-5 w-5 text-background"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full mt-2" 
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Publicar propiedad"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
