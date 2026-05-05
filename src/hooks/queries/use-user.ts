import type { User } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * API Response Types
 */
interface ApiResponse<T> {
  data: T;
}

interface PaginatedResponse<T> {
  users: T[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * Fetch users with pagination
 */
async function fetchUsers(options: {
  page?: number;
  pageSize?: number;
  role?: string;
}): Promise<PaginatedResponse<User>> {
  const params = new URLSearchParams();
  if (options.page) params.set("page", options.page.toString());
  if (options.pageSize) params.set("pageSize", options.pageSize.toString());
  if (options.role) params.set("role", options.role);

  const response = await fetch(`/api/users?${params}`);
  if (!response.ok) throw new Error("Failed to fetch users");

  const result: ApiResponse<PaginatedResponse<User>> = await response.json();
  return result.data;
}

/**
 * Fetch single user by ID
 */
async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) throw new Error("Failed to fetch user");

  const result: ApiResponse<User> = await response.json();
  return result.data;
}

/**
 * Create new user
 */
async function createUser(data: {
  email: string;
  name?: string;
  password?: string;
}): Promise<User> {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Failed to create user");

  const result: ApiResponse<User> = await response.json();
  return result.data;
}

/**
 * Update user
 */
async function updateUser(
  id: string,
  data: { name?: string; email?: string; image?: string },
): Promise<User> {
  const response = await fetch(`/api/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Failed to update user");

  const result: ApiResponse<User> = await response.json();
  return result.data;
}

/**
 * Delete user
 */
async function deleteUser(id: string): Promise<void> {
  const response = await fetch(`/api/users/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Failed to delete user");
}

/**
 * Hook: Get paginated users
 */
export function useUsers(
  options: { page?: number; pageSize?: number; role?: string } = {},
) {
  return useQuery({
    queryKey: ["users", options],
    queryFn: () => fetchUsers(options),
  });
}

/**
 * Hook: Get single user
 */
export function useUser(id: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id),
    enabled: !!id,
  });
}

/**
 * Hook: Create user mutation
 */
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

/**
 * Hook: Update user mutation
 */
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateUser(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["user", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

/**
 * Hook: Delete user mutation
 */
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
