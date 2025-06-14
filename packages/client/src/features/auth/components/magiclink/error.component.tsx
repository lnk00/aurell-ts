export function AuthenticateErrorComponent() {
	return (
		<div className="mt-4 p-4 bg-error border border-error-content rounded">
			<p className="text-error-content font-semibold">Error details:</p>
			<p className="text-error-content text-sm mt-1">
				We could not authenticate you. Please try again.
			</p>
		</div>
	);
}
