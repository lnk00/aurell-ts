import appleLogo from '@/assets/images/apple.svg';
import googleLogo from '@/assets/images/google.svg';
import { useSigninForm } from '../hooks/use-signin-form.hook';

export function SigninForm() {
	const { form } = useSigninForm();

	return (
		<form
			noValidate
			className="card w-96 bg-base-100 card-border"
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<div className="card-body">
				<h2 className="card-title">Signin</h2>
				<form.Field
					name="email"
					// biome-ignore lint/correctness/noChildrenProp: <explanation>
					children={(field) => (
						<>
							<fieldset className="fieldset">
								<legend className="fieldset-legend">With your email</legend>
								<input
									type="email"
									className={`input ${!form.state.isValid && 'input-error'}`}
									placeholder="Enter your email"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
								/>
								<p className={`label ${!form.state.isValid && 'text-error'}`}>
									{!form.state.isValid
										? form.state.errors[0]
										: 'exemple: john.doe@email.com'}
								</p>
							</fieldset>
						</>
					)}
				/>
				<div className="card-actions">
					<button className="btn btn-soft btn-block" type="submit">
						Continue with email
					</button>

					<div className="flex w-full flex-col">
						<div className="divider">or</div>
					</div>
					<button
						className="btn btn-block bg-white text-black border-[#e5e5e5]"
						type="button"
					>
						<img src={googleLogo} alt="apple logo" />
						Continue with Google
					</button>
					<button
						className="btn btn-block bg-black text-white border-black"
						type="button"
					>
						<img src={appleLogo} alt="apple logo" />
						Continue with Apple
					</button>
				</div>
			</div>
		</form>
	);
}
