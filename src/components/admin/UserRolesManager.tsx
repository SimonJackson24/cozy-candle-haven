import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type UserRoleWithProfile = {
  id: string;
  user_id: string;
  role: 'admin' | 'user';
  created_at: string;
  profiles?: {
    username: string | null;
  } | null;
}

export const UserRolesManager = () => {
  const { data: userRoles, isLoading } = useQuery<UserRoleWithProfile[]>({
    queryKey: ['user-roles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_roles')
        .select(`
          *,
          profiles (username)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <div>Loading user roles...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">User Roles</h2>
        <Button>
          <Plus className="mr-2" />
          Assign Role
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userRoles?.map((userRole) => (
            <TableRow key={userRole.id}>
              <TableCell>{userRole.profiles?.username || userRole.user_id}</TableCell>
              <TableCell className="capitalize">{userRole.role}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};