import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/org/select')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/auth/org/select"!</div>
}
