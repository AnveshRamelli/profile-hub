'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { supabase } from '@/lib/supabaseClient'
import { useState } from 'react'

export default function EditUserDialog({ user, onSuccess }: { user: any; onSuccess: () => void }) {
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
  })

  const onSubmit = async (values: any) => {
    setLoading(true)
    const { error } = await supabase
      .from('users')
      .update(values)
      .eq('id', user.id)

    setLoading(false)

    if (!error) {
      onSuccess()
      reset()
    } else {
      alert('Update failed: ' + error.message)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          <div>
            <Label>Name</Label>
            <Input {...register('name')} />
          </div>
          <div>
            <Label>Email</Label>
            <Input {...register('email')} />
          </div>
          <div>
            <Label>Role</Label>
            <Input {...register('role')} />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
