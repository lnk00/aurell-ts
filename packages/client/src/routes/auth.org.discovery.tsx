import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/org/discovery')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/auth/org/discovery"!</div>
}
