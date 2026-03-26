export const BEARER_JWT = 'JWT' as const;

export const OpenApi = {
  Err400: 'Request validation failed (400).',
  Err401: 'Missing or invalid Bearer token (401).',
  Err403: {
    admin: 'Requires ADMIN role (403).',
    manager: 'Requires MANAGER role (403).',
    adminOrManager: 'Requires ADMIN or MANAGER role (403).',
    managerOnly: 'Requires MANAGER role; ADMIN cannot use this endpoint (403).',
  },
} as const;
