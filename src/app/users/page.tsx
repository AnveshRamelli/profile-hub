import UserTable from '@/components/ui/usertable'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function UsersPage() {
  const { data: users, error } = await supabase.from('users').select('*')

  if (error) {
    return <p className="text-red-600">Failed to fetch users: {error.message}</p>
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">User Directory</h1>
      <UserTable users={users} />
    </div>
  )
}
