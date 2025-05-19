import { renderHook } from '@testing-library/react';
import { useSigninForm } from '../hooks/use-signin-form.hook';
import { describe, expect, it } from 'vitest';

describe('AUTH', () => {
	describe('HOOKS', () => {
		describe('useSigninForm', () => {
			it('Should throw on call handleAppleSignin', () => {
				const { result } = renderHook(() => useSigninForm());
				expect(() => result.current.handleAppleSignin()).toThrowError(
					'Apple signin not implemented',
				);
			});

			it('Should throw on call handleGoogleSignin', () => {
				const { result } = renderHook(() => useSigninForm());
				expect(() => result.current.handleGoogleSignin()).toThrowError(
					'Google signin not implemented',
				);
			});
		});
	});
});
