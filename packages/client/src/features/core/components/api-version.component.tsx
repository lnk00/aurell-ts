type IProps = {
	name: string;
	version: string;
};

export function ApiVersion({ name, version }: IProps) {
	return (
		<div>
			<h1>WELCOME TO AURELL</h1>
			<h2>name: {name}</h2>
			<h3>version: {version}</h3>
		</div>
	);
}
