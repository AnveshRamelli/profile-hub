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

export default function AddUserDialog({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      email: '',
      role: 'user',
      photo_url: '',
    },
  })

  const onSubmit = async (values: any) => {
    setLoading(true)

    const { error } = await supabase.from('users').insert([values])
    setLoading(false)

    if (!error) {
      onSuccess()
      reset()
    } else {
      alert('Failed to add user: ' + error.message)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add New User</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          <div>
            <Label>Name</Label>
            <Input {...register('name', { required: true })} />
          </div>
          <div>
            <Label>Email</Label>
            <Input {...register('email', { required: true })} />
          </div>
          <div>
            <Label>Role</Label>
            <Input {...register('role')} />
          </div>
          <div>
            <Label>Photo URL</Label>
            <Input {...register('photo_url')} />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Add User'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
