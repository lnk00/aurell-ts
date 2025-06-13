import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/auth')({
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <div className="min-h-screen">
      <div className="absolute top-8 left-8">
        <h1 className="text-xl font-bold">Aurell</h1>
      </div>
      <div className="flex items-center justify-center min-h-screen">
        <Outlet />
      </div>
    </div>
  )
}
