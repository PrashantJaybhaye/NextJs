// app/actions/update-user-status.ts
'use server'

import { db } from '@/database/drizzle';
import { users } from '@/database/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function updateUserStatus(
  userId: string,
  status: 'APPROVED' | 'REJECTED' | 'PENDING'
) {
  try {
    await db
      .update(users)
      .set({ status })
      .where(eq(users.id, userId));
    
    revalidatePath('/admin/account-requests');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to update user status' };
  }
}