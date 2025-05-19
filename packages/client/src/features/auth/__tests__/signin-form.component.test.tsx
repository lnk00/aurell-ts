import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SigninForm } from '../components/signin-form.component';

describe('AUTH', () => {
	describe('COMPONENTS', () => {
		describe('signin-form', () => {
			it('should renders form correctly correctly', () => {
				render(<SigninForm />);

				expect(screen.getByText('Signin')).toBeInstanceOf(HTMLElement);
				expect(screen.getByText('exemple: john.doe@email.com')).toBeInstanceOf(
					HTMLElement,
				);
			});

			it('should trigger the email validation error if no email is entered', async () => {
				render(<SigninForm />);

				await act(async () => {
					fireEvent.click(screen.getByText('Continue with email'));
				});

				expect(
					await screen.findByText('Email invalid, please enter a valid email.'),
				).toBeInstanceOf(HTMLElement);
			});

			it('should trigger the email validation error if an invalid email is entered', async () => {
				render(<SigninForm />);

				await act(async () => {
					const emailInput = screen.getByPlaceholderText('Enter your email');
					fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
					fireEvent.click(screen.getByText('Continue with email'));
				});
				expect(
					await screen.findByText('Email invalid, please enter a valid email.'),
				).toBeInstanceOf(HTMLElement);
			});

			it('should not show error message when a valid email is entered', async () => {
				render(<SigninForm />);

				await act(async () => {
					const emailInput = screen.getByPlaceholderText('Enter your email');
					fireEvent.change(emailInput, {
						target: { value: 'test@example.com' },
					});
					fireEvent.click(screen.getByText('Continue with email'));
				});

				expect(
					screen.queryByText('Email invalid, please enter a valid email.'),
				).toBeNull();
				expect(screen.getByText('exemple: john.doe@email.com')).toBeInstanceOf(
					HTMLElement,
				);
			});
		});
	});
});
