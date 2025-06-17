import * as stytch from 'stytch';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Bindings } from '../../../../types/context.type';
import { SessionStytchService } from '../../services/session/implementations/session-stytch.service';

describe('AUTH', () => {
	describe('SERVICES', () => {
		describe('SESSION', () => {
			describe('STYTCH IMPLEM', () => {
				let sessionStytchService: SessionStytchService;
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
						sessions: {
							authenticateJwt: vi.fn(),
							revoke: vi.fn(),
						},
					} as unknown as stytch.B2BClient;

					vi.mocked(stytch.B2BClient).mockImplementation(
						() => mockStytchClient,
					);

					sessionStytchService = new SessionStytchService(mockBindings);
				});

				describe('when session-stytch class is instanciated', () => {
					it('it should be initialized with correct bindings and create a Stytch client', () => {
						expect(sessionStytchService.env).toBe(mockBindings);
						expect(sessionStytchService.client).toBe(mockStytchClient);
						expect(stytch.B2BClient).toHaveBeenCalledWith({
							project_id: 'test-project-id',
							secret: 'test-secret',
						});
					});
				});

				describe('when verifyJwt is called with a valid token', () => {
					it('should verify the JWT and return session data', async () => {
						const mockResponse = {
							member_session: {
								member_id: 'user-123',
								member_session_id: 'session-456',
							},
							session_jwt: 'new-jwt-token',
						} as unknown as stytch.B2BSessionsAuthenticateResponse;

						vi.mocked(
							mockStytchClient.sessions.authenticateJwt,
						).mockResolvedValue(mockResponse);

						const result =
							await sessionStytchService.verifyJwt('test-jwt-token');

						expect(
							mockStytchClient.sessions.authenticateJwt,
						).toHaveBeenCalledWith({
							session_jwt: 'test-jwt-token',
						});

						expect(result).toEqual({
							userId: 'user-123',
							sessionId: 'session-456',
							sessionJwt: 'new-jwt-token',
						});
					});

					it('should handle different user and session IDs', async () => {
						const mockResponse = {
							member_session: {
								member_id: 'different-user-789',
								member_session_id: 'different-session-abc',
							},
							session_jwt: 'refreshed-jwt-token',
						} as unknown as stytch.B2BSessionsAuthenticateResponse;

						vi.mocked(
							mockStytchClient.sessions.authenticateJwt,
						).mockResolvedValue(mockResponse);

						const result =
							await sessionStytchService.verifyJwt('another-jwt-token');

						expect(result).toEqual({
							userId: 'different-user-789',
							sessionId: 'different-session-abc',
							sessionJwt: 'refreshed-jwt-token',
						});
					});
				});

				describe('when verifyJwt is called and the stytch api fails', () => {
					it('it should throw error when JWT authentication fails', async () => {
						const mockError = new Error('Invalid JWT token');

						vi.mocked(
							mockStytchClient.sessions.authenticateJwt,
						).mockRejectedValue(mockError);

						await expect(
							sessionStytchService.verifyJwt('invalid-jwt-token'),
						).rejects.toThrow('Invalid JWT token');

						expect(
							mockStytchClient.sessions.authenticateJwt,
						).toHaveBeenCalledWith({
							session_jwt: 'invalid-jwt-token',
						});
					});

					it('it should throw error for expired JWT token', async () => {
						const mockError = new Error('JWT token expired');

						vi.mocked(
							mockStytchClient.sessions.authenticateJwt,
						).mockRejectedValue(mockError);

						await expect(
							sessionStytchService.verifyJwt('expired-jwt-token'),
						).rejects.toThrow('JWT token expired');
					});
				});

				describe('when signout is called with a valid token', () => {
					it('should revoke the session successfully', async () => {
						const mockResponse = {
							status_code: 200,
						} as unknown as stytch.B2BSessionsRevokeResponse;

						vi.mocked(mockStytchClient.sessions.revoke).mockResolvedValue(
							mockResponse,
						);

						await sessionStytchService.signout('test-session-token');

						expect(mockStytchClient.sessions.revoke).toHaveBeenCalledWith({
							session_token: 'test-session-token',
						});
					});

					it('should handle different session tokens', async () => {
						const mockResponse = {
							status_code: 200,
						} as unknown as stytch.B2BSessionsRevokeResponse;

						vi.mocked(mockStytchClient.sessions.revoke).mockResolvedValue(
							mockResponse,
						);

						await sessionStytchService.signout('another-session-token');

						expect(mockStytchClient.sessions.revoke).toHaveBeenCalledWith({
							session_token: 'another-session-token',
						});
					});
				});

				describe('when signout is called and the stytch api fails', () => {
					it('it should throw error when session revocation fails', async () => {
						const mockError = new Error('Session revocation failed');

						vi.mocked(mockStytchClient.sessions.revoke).mockRejectedValue(
							mockError,
						);

						await expect(
							sessionStytchService.signout('invalid-session-token'),
						).rejects.toThrow('Session revocation failed');

						expect(mockStytchClient.sessions.revoke).toHaveBeenCalledWith({
							session_token: 'invalid-session-token',
						});
					});

					it('it should throw error for already revoked session', async () => {
						const mockError = new Error('Session already revoked');

						vi.mocked(mockStytchClient.sessions.revoke).mockRejectedValue(
							mockError,
						);

						await expect(
							sessionStytchService.signout('revoked-session-token'),
						).rejects.toThrow('Session already revoked');
					});
				});
			});
		});
	});
});
