import { useSignout } from '@/features/auth/hooks/use-signout.hook';
import { getService } from '@/libs/ioc.lib';
import { createFileRoute, Link, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
	component: RouteComponent,
	beforeLoad: async () => {
		const sessionService = getService('session');
		if (!sessionService.isUserAuthenticated()) {
			throw redirect({
				to: '/auth/signin',
				search: {
					redirect: location.href,
				},
			});
		}
	},
});

function RouteComponent() {
	const { signout } = useSignout();

	return (
		<div className="drawer lg:drawer-open">
			<input id="drawer-toggle" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content flex flex-col">
				<main className="flex flex-col flex-1 p-6 bg-base-200">
					<h1 className="text-2xl font-bold mb-6">Dashboard</h1>
					<div className="bg-white rounded-2xl flex-1" />
				</main>
			</div>
			<div className="drawer-side">
				<aside className="w-64 min-h-full bg-base-200 flex flex-col">
					<nav className="flex-1 p-4">
						<ul className="menu menu-lg">
							<li>
								<h2 className="menu-title">Aurell</h2>
								<ul>
									<li>
										<Link to="/">Dashboard</Link>
									</li>
									<li>
										<Link to="/">Account</Link>
									</li>
									<li>
										<Link to="/">Transactions</Link>
									</li>
								</ul>
							</li>
						</ul>
					</nav>
					<div className="p-4 mt-auto">
						<button
							className="btn btn-accent w-full"
							type="button"
							onClick={() => signout()}
						>
							Sign out
						</button>
					</div>
				</aside>
			</div>
		</div>
	);
}
