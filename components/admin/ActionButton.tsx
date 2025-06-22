// components/admin/ActionButton.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Check, X, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

type Props = {
  userId: string;
  currentStatus: 'APPROVED' | 'REJECTED' | 'PENDING' | null;
  updateUserStatus: (
    userId: string, 
    status: 'APPROVED' | 'REJECTED' | 'PENDING'
  ) => Promise<{ success: boolean; error?: string }>;
};

const ActionButton = ({ userId, currentStatus, updateUserStatus }: Props) => {
  const [isLoading, setIsLoading] = useState<'approve' | 'reject' | null>(null);

  const handleAction = async (action: 'approve' | 'reject') => {
    setIsLoading(action);
    try {
      const status = action === 'approve' ? 'APPROVED' : 'REJECTED';
      const result = await updateUserStatus(userId, status);
      
      if (result.success) {
        toast.success(`User ${action === 'approve' ? 'approved' : 'rejected'} successfully`);
      } else {
        toast.error(result.error || `Failed to ${action} user`);
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsLoading(null);
    }
  };

  const isApproved = currentStatus === 'APPROVED';
  const isRejected = currentStatus === 'REJECTED';

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant={isApproved ? 'default' : 'secondary'}
        className={`${isApproved ? 'bg-green-600 hover:bg-green-700' : 'hover:bg-green-500/10 text-green-500'} transition-all`}
        onClick={() => handleAction('approve')}
        disabled={isLoading !== null || isApproved}
      >
        {isLoading === 'approve' ? (
          <Loader2 className="w-4 h-4 mr-1 animate-spin" />
        ) : (
          <Check className="w-4 h-4 mr-1" />
        )}
        {isApproved ? 'Approved' : 'Approve'}
      </Button>
      
      <Button
        size="icon"
        variant={isRejected ? 'destructive' : 'outline'}
        className={isRejected ? '' : 'text-red-500 hover:bg-red-500/10 hover:text-red-600'}
        onClick={() => handleAction('reject')}
        disabled={isLoading !== null || isRejected}
      >
        {isLoading === 'reject' ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <X className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
};

export default ActionButton;