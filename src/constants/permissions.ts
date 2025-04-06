type PermissionType = 'view' | 'edit' | 'delete' | 'approve';

export type Role = 'admin' | 'company' | 'customer';

export const rolePermissions: Record<Role, PermissionType[]> = {
  admin: ['view', 'edit', 'delete', 'approve'],
  company: ['view', 'edit'],
  customer: ['view'],
};
