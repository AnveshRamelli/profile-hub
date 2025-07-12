'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { useMemo, useState } from 'react'
import EditUserDialog from '../editUserDialog'
import AddUserDialog from '../addUserDialog'

export default function UserTable({ users }: { users: any[] }) {
  const [search, setSearch] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)

  const filteredUsers = useMemo(() => {
    const query = search.toLowerCase()
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(query) ||
        u.email.toLowerCase().includes(query)
    )
  }, [search, users])

  return (
    <div className="space-y-6">
      {/* Header with Search and Add User */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">User Directory</h2>
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />
          <AddUserDialog onSuccess={() => setRefreshKey((k) => k + 1)} />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Photo</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id + refreshKey}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <img
                      src={user.photo_url}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                  </TableCell>
                  <TableCell>
                    <EditUserDialog
                      user={user}
                      onSuccess={() => setRefreshKey((k) => k + 1)}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500 py-6">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
