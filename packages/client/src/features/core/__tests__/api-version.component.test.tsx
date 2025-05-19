import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ApiVersion } from '../components/api-version.component';

describe('CORE', () => {
	describe('COMPONENTS', () => {
		describe('api-version', () => {
			it('renders name and version correctly', () => {
				// Arrange
				const props = {
					name: 'Test API',
					version: '1.0.0',
				};

				// Act
				render(<ApiVersion {...props} />);

				// Assert
				expect(screen.getByText('WELCOME TO FIQO')).toBeInstanceOf(HTMLElement);
				expect(screen.getByText('name: Test API')).toBeInstanceOf(HTMLElement);
				expect(screen.getByText('version: 1.0.0')).toBeInstanceOf(HTMLElement);
			});
		});
	});
});
