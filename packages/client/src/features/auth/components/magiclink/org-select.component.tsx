type Props = {
	orgs: {
		id: string;
		name: string;
		logo: string;
	}[];
};

export function OrgSelectComponent({ orgs }: Props) {
	return (
		<div>
			<p>orgs:</p>
			{orgs.map((org) => (
				<p key={org.id}>{org.name}</p>
			))}
		</div>
	);
}
