import { useOrgCreate } from '../../hooks/org-create.hook';

export function OrgCreateComponent() {
	const { form, isLoading } = useOrgCreate();

	return (
		<form
			noValidate
			className="w-96"
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<div className="card-body">
				<div className="card-title text-3xl font-bold">Create Organization</div>
				<p className="text-sm opacity-50 mb-2">
					Your account don't seem to be linked to an organization. Please create
					an organization to continue.
				</p>
				<form.Field
					name="name"
					// biome-ignore lint/correctness/noChildrenProp: <explanation>
					children={(field) => (
						<>
							<fieldset className="fieldset w-full">
								<input
									type="text"
									className={`input w-full ${!form.state.isValid && 'input-error'}`}
									placeholder="Enter your organization name"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
								/>
								<p className={`label ${!form.state.isValid && 'text-error'}`}>
									{!form.state.isValid
										? form.state.errors[0]
										: 'exemple: dupont family'}
								</p>
							</fieldset>
						</>
					)}
				/>
				<div className="card-actions">
					<button className="btn btn-block" type="submit">
						{isLoading && <span className="loading-spinner loading-xs" />}
						Continue
						{isLoading && (
							<span className="loading loading-spinner loading-xs" />
						)}
					</button>
				</div>
			</div>
		</form>
	);
}
