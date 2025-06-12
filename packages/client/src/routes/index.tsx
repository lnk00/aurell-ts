import { useSignout } from '@/features/auth/hooks/use-signout.hook';
import {
	getBankAccounts,
	useGetBankAccounts,
} from '@/features/bankaccount/api/get-bank-accounts.api';
import { getService } from '@/libs/ioc.lib';
import { Link, createFileRoute, redirect } from '@tanstack/react-router';
import { useEffect } from 'react';

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
	const aggregService = getService('aggreg');
	const { data } = useGetBankAccounts();

	return (
		<div className="drawer lg:drawer-open bg-base-100">
			<input id="drawer-toggle" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content flex flex-col">
				<main className="flex flex-col flex-1 p-6">
					<h1 className="text-2xl font-bold mb-6">Dashboard</h1>
					<div className="bg-base-200 rounded-xl flex-1 p-6">
						<div className="flex gap-4">
							<div className="card card-border border-base-300 bg-base-100 w-96">
								<div className="card-body">
									<h2 className="card-title">Link your bank account</h2>
									<p>
										Link a bank account so you we can track and analyse your
										buying habits.
									</p>
									<div className="card-actions">
										<button
											className="btn btn-primary btn-block"
											type="button"
											onClick={aggregService.openAggregator}
										>
											Start
										</button>
									</div>
								</div>
							</div>
							<div className="card card-border border-base-300 bg-base-100 w-96">
								<div className="card-body">
									<h2 className="card-title">Bank accounts</h2>
									{data?.accounts.map((account) => (
										<div key={account.number}>
											<p>{account.name}</p>
											<p>{account.balance}</p>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
			<div className="drawer-side">
				<aside className="w-64 min-h-full flex flex-col">
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
					<div className="p-6 mt-auto">
						<button
							className="btn w-full"
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
