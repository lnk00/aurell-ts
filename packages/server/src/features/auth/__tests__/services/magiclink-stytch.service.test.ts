import * as stytch from 'stytch';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Bindings } from '../../../../types/context.type';
import { AuthError } from '../../../../types/errors.type';
import { MagicLinkStytchService } from '../../services/magiclink/implementations/magiclink-stytch.service';

describe('AUTH', () => {
	describe('SERVICES', () => {
		describe('MAGICLINK', () => {
			describe('STYTCH IMPLEM', () => {
				let magicLinkStytchService: MagicLinkStytchService;
				let mockStytchClient: stytch.B2BClient;
				let mockBindings: Bindings;

				beforeEach(() => {
					vi.clearAllMocks();

					mockBindings = {
						STYTCH_PROJECT_ID: 'test-project-id',
						STYTCH_SECRET: 'test-secret',
						DB: {} as D1Database,
						CLIENT_URL: 'http://localhost:5173',
						TINK_CLIENT_ID: 'test-tink-client-id',
						TINK_CLIENT_SECRET: 'test-tink-client-secret',
					};

					mockStytchClient = {
						magicLinks: {
							email: {
								discovery: {
									send: vi.fn(),
								},
							},
							discovery: {
								authenticate: vi.fn(),
							},
						},
					} as unknown as stytch.B2BClient;

					vi.mocked(stytch.B2BClient).mockImplementation(
						() => mockStytchClient,
					);

					magicLinkStytchService = new MagicLinkStytchService(mockBindings);
				});

				describe('when magiclink-stytch class is instanciated', () => {
					it('it should be initialized with correct bindings and create a Stytch client', () => {
						expect(magicLinkStytchService.env).toBe(mockBindings);
						expect(magicLinkStytchService.client).toBe(mockStytchClient);
						expect(stytch.B2BClient).toHaveBeenCalledWith({
							project_id: 'test-project-id',
							secret: 'test-secret',
						});
					});
				});

				describe('when sendEmail is called with a valid email', () => {
					it('should send a magic link email successfully', async () => {
						const mockResponse = {
							status_code: 200,
						} as unknown as stytch.B2BMagicLinksEmailDiscoverySendResponse;

						vi.mocked(
							mockStytchClient.magicLinks.email.discovery.send,
						).mockResolvedValue(mockResponse);

						await magicLinkStytchService.sendEmail('test@example.com');

						expect(
							mockStytchClient.magicLinks.email.discovery.send,
						).toHaveBeenCalledWith({
							email_address: 'test@example.com',
							discovery_redirect_url:
								'http://localhost:5173/auth/magiclink/authenticate',
						});
					});

					it('should use the correct redirect URL from CLIENT_URL', async () => {
						const mockResponse = {
							status_code: 200,
						} as unknown as stytch.B2BMagicLinksEmailDiscoverySendResponse;

						vi.mocked(
							mockStytchClient.magicLinks.email.discovery.send,
						).mockResolvedValue(mockResponse);

						const customBindings = {
							...mockBindings,
							CLIENT_URL: 'https://myapp.com',
						};

						const customService = new MagicLinkStytchService(customBindings);

						await customService.sendEmail('test@example.com');

						expect(
							mockStytchClient.magicLinks.email.discovery.send,
						).toHaveBeenCalledWith({
							email_address: 'test@example.com',
							discovery_redirect_url:
								'https://myapp.com/auth/magiclink/authenticate',
						});
					});
				});

				describe('when sendEmail is called and the stytch api fails', () => {
					it('it should throw AuthError for non-200 status code', async () => {
						const mockResponse = {
							status_code: 400,
						} as unknown as stytch.B2BMagicLinksEmailDiscoverySendResponse;

						vi.mocked(
							mockStytchClient.magicLinks.email.discovery.send,
						).mockResolvedValue(mockResponse);

						await expect(
							magicLinkStytchService.sendEmail('test@example.com'),
						).rejects.toThrow(AuthError);

						await expect(
							magicLinkStytchService.sendEmail('test@example.com'),
						).rejects.toThrow(
							'Could not send magic link email, the provider returned en error: 400',
						);
					});
				});

				describe('when verify is called with a valid token', () => {
					it('should verify the token and return session data with organizations', async () => {
						const mockResponse = {
							status_code: 200,
							intermediate_session_token: 'test-intermediate-token',
							discovered_organizations: [
								{
									organization: {
										organization_id: 'org-1',
										organization_name: 'Organization One',
										organization_logo_url: 'https://example.com/logo1.png',
									},
								},
								{
									organization: {
										organization_id: 'org-2',
										organization_name: 'Organization Two',
										organization_logo_url: 'https://example.com/logo2.png',
									},
								},
							],
						} as unknown as stytch.B2BMagicLinksDiscoveryAuthenticateResponse;

						vi.mocked(
							mockStytchClient.magicLinks.discovery.authenticate,
						).mockResolvedValue(mockResponse);

						const result = await magicLinkStytchService.verify('test-token');

						expect(
							mockStytchClient.magicLinks.discovery.authenticate,
						).toHaveBeenCalledWith({
							discovery_magic_links_token: 'test-token',
						});

						expect(result).toEqual({
							token: 'test-intermediate-token',
							orgs: [
								{
									id: 'org-1',
									name: 'Organization One',
									logo: 'https://example.com/logo1.png',
								},
								{
									id: 'org-2',
									name: 'Organization Two',
									logo: 'https://example.com/logo2.png',
								},
							],
						});
					});

					it('should handle empty organizations array', async () => {
						const mockResponse = {
							status_code: 200,
							intermediate_session_token: 'test-intermediate-token',
							discovered_organizations: [],
						} as unknown as stytch.B2BMagicLinksDiscoveryAuthenticateResponse;

						vi.mocked(
							mockStytchClient.magicLinks.discovery.authenticate,
						).mockResolvedValue(mockResponse);

						const result = await magicLinkStytchService.verify('test-token');

						expect(result).toEqual({
							token: 'test-intermediate-token',
							orgs: [],
						});
					});
				});

				describe('when verify is called and the stytch api fails', () => {
					it('it should throw AuthError for non-200 status code', async () => {
						const mockResponse = {
							status_code: 401,
							intermediate_session_token: null,
							discovered_organizations: [],
						} as unknown as stytch.B2BMagicLinksDiscoveryAuthenticateResponse;

						vi.mocked(
							mockStytchClient.magicLinks.discovery.authenticate,
						).mockResolvedValue(mockResponse);

						await expect(
							magicLinkStytchService.verify('invalid-token'),
						).rejects.toThrow(AuthError);

						await expect(
							magicLinkStytchService.verify('invalid-token'),
						).rejects.toThrow(
							'Could not verify the token, the provider returned en error: 401',
						);
					});
				});
			});
		});
	});
});
