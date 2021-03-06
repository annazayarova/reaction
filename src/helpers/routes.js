export const loginRoute = '/signin';
export const tenantRoute = (currentUser) => `/${ currentUser.uid }`;
