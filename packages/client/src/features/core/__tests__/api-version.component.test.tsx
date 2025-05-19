import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ApiVersion } from '../components/api-version.component';

describe('CORE', () => {
	describe('COMPONENTS', () => {
		describe('api-version', () => {
			it('should renders name and version correctly', () => {
				const props = {
					name: 'Test API',
					version: '1.0.0',
				};

				render(<ApiVersion {...props} />);

				expect(screen.getByText('WELCOME TO FIQO')).toBeInstanceOf(HTMLElement);
				expect(screen.getByText('name: Test API')).toBeInstanceOf(HTMLElement);
				expect(screen.getByText('version: 1.0.0')).toBeInstanceOf(HTMLElement);
			});
		});
	});
});
