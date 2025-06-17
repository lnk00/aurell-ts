import * as stytch from 'stytch';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Bindings } from '../../../../types/context.type';
import { AuthError } from '../../../../types/errors.type';
import { OrgStytchService } from '../../services/org/implementations/org-stytch.service';

describe('AUTH', () => {
	describe('SERVICES', () => {
		describe('ORG', () => {
			describe('STYTCH IMPLEM', () => {
				let orgStytchService: OrgStytchService;
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
						discovery: {
							organizations: {
								create: vi.fn(),
							},
							intermediateSessions: {
								exchange: vi.fn(),
							},
						},
					} as unknown as stytch.B2BClient;

					vi.mocked(stytch.B2BClient).mockImplementation(
						() => mockStytchClient,
					);

					orgStytchService = new OrgStytchService(mockBindings);
				});

				describe('when org-stytch class is instanciated', () => {
					it('it should be initialized with correct bindings and create a Stytch client', () => {
						expect(orgStytchService.env).toBe(mockBindings);
						expect(orgStytchService.client).toBe(mockStytchClient);
						expect(stytch.B2BClient).toHaveBeenCalledWith({
							project_id: 'test-project-id',
							secret: 'test-secret',
						});
					});
				});

				describe('when create is called with a valid org name and a intermediate token', () => {
					it('should create an organization and return session tokens', async () => {
						const mockResponse = {
							status_code: 200,
							session_token: 'test-session-token',
							session_jwt: 'test-session-jwt',
						} as unknown as stytch.B2BDiscoveryOrganizationsCreateResponse;

						vi.mocked(
							mockStytchClient.discovery.organizations.create,
						).mockResolvedValue(mockResponse);

						const result = await orgStytchService.create(
							'Test Organization Name',
							'test-intermediate-token',
						);

						expect(
							mockStytchClient.discovery.organizations.create,
						).toHaveBeenCalledWith({
							organization_name: 'Test Organization Name',
							organization_slug: 'test-organization-name',
							intermediate_session_token: 'test-intermediate-token',
						});

						expect(result).toEqual({
							sessionToken: 'test-session-token',
							sessionJwt: 'test-session-jwt',
						});
					});

					it('should handle organization names with multiple spaces', async () => {
						const mockResponse = {
							status_code: 200,
							session_token: 'test-session-token',
							session_jwt: 'test-session-jwt',
						} as unknown as stytch.B2BDiscoveryOrganizationsCreateResponse;

						vi.mocked(
							mockStytchClient.discovery.organizations.create,
						).mockResolvedValue(mockResponse);

						await orgStytchService.create(
							'Company   With    Multiple     Spaces',
							'test-intermediate-token',
						);

						expect(
							mockStytchClient.discovery.organizations.create,
						).toHaveBeenCalledWith({
							organization_name: 'Company   With    Multiple     Spaces',
							organization_slug: 'company-with-multiple-spaces',
							intermediate_session_token: 'test-intermediate-token',
						});
					});
				});
				describe('when create is called and the stytch api fail', () => {
					it('it should throw AuthError for non-200 status code', async () => {
						const mockResponse = {
							status_code: 400,
							session_token: null,
							session_jwt: null,
						} as unknown as stytch.B2BDiscoveryOrganizationsCreateResponse;

						vi.mocked(
							mockStytchClient.discovery.organizations.create,
						).mockResolvedValue(mockResponse);

						await expect(
							orgStytchService.create(
								'Test Organization Name',
								'test-intermediate-token',
							),
						).rejects.toThrow(AuthError);

						await expect(
							orgStytchService.create(
								'Test Organization Name',
								'test-intermediate-token',
							),
						).rejects.toThrow(
							'Could not create the organizations Test Organization Name, the provider returned en error: 400',
						);
					});
				});
			});
		});
	});
});
