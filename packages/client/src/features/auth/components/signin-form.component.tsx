import appleLogo from '@/assets/images/apple.svg';
import googleLogo from '@/assets/images/google.svg';
import { useSigninForm } from '../hooks/use-signin-form.hook';

export function SigninForm() {
	const { form, handleAppleSignin, handleGoogleSignin, isLoading } =
		useSigninForm();

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
				<form.Field
					name="email"
					// biome-ignore lint/correctness/noChildrenProp: <explanation>
					children={(field) => (
						<>
							<fieldset className="fieldset w-full">
								<input
									type="email"
									className={`input w-full ${!form.state.isValid && 'input-error'}`}
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
					<button className="btn btn-block" type="submit">
						{isLoading && <span className="loading-spinner loading-xs" />}
						Continue with email
						{isLoading && (
							<span className="loading loading-spinner loading-xs" />
						)}
					</button>

					<div className="flex w-full flex-col">
						<div className="divider">or</div>
					</div>
					<button
						className="btn btn-block bg-white text-black border-[#e5e5e5]"
						onClick={handleGoogleSignin}
						type="button"
					>
						<img src={googleLogo} alt="apple logo" />
						Continue with Google
					</button>
					<button
						className="btn btn-block bg-black text-white border-black"
						onClick={handleAppleSignin}
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
