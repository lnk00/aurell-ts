import { useOrgSelect } from '../../hooks/org-select.hook';

type Props = {
	orgs: {
		id: string;
		name: string;
		logo: string;
	}[];
	token: string;
};

export function OrgSelectComponent({ orgs, token }: Props) {
	const { form, isLoading } = useOrgSelect(orgs[0].id, token);

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
				<div className="card-title text-3xl font-bold">Select Organization</div>
				<p className="text-sm opacity-50 mb-2">
					Select the organization you want to sign in and click on Continue.
				</p>
				<form.Field
					name="orgId"
					// biome-ignore lint/correctness/noChildrenProp: <explanation>
					children={(field) => (
						<>
							<fieldset className="fieldset w-full">
								<select
									defaultValue="Select the organization"
									className="select w-full"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
								>
									{orgs.map((org) => (
										<option key={org.id} value={org.id}>
											{org.name}
										</option>
									))}
								</select>
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
