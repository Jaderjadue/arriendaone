import { PropertyForm } from "@/components/property-form"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <span className="text-sm font-bold text-primary-foreground">A</span>
            </div>
            <span className="text-lg font-semibold text-foreground">ArriendaOne</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-3xl px-4 py-12 md:py-16">
        {/* Hero Section */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
            Publica tu propiedad
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground leading-relaxed text-pretty">
            Publica tu propiedad gratis y encuentra arrendatarios verificados sin pagar comisión de corretaje.
          </p>
        </div>

        {/* Form */}
        <PropertyForm />

        {/* Benefits */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
              <svg
                className="h-5 w-5 text-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-foreground">Sin comisiones</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              No pagas comision de corretaje
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
              <svg
                className="h-5 w-5 text-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-foreground">Contacto directo</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Conecta directamente con arrendatarios
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
              <svg
                className="h-5 w-5 text-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-foreground">Rapido y simple</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Publica en minutos
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-6">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="text-xs text-muted-foreground">
            ArriendaOne - La forma mas simple de arrendar tu propiedad
          </p>
        </div>
      </footer>
    </div>
  )
}
