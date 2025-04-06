import { useAuth } from '../context/AuthContext';
import { rolePermissions } from '../constants/permissions';

export const usePermission = () => {
  const { role } = useAuth();

  const can = (action: string): boolean => {
    if (!role) return false;
    return rolePermissions[role].includes(action as any);
  };

  return { can };
};
