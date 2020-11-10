export const loginRoute = '/login';
export const tenantRoute = (currentUser) => `/${ currentUser.displayName }`;