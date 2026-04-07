import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AlertCircle } from 'lucide-react';

export default function SessionExpiredModal({ isOpen, onClose, onLogin }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-orange-500" />
            <DialogTitle className="text-lg font-semibold">
              Session Expired
            </DialogTitle>
          </div>
          <DialogDescription className="text-gray-600 mt-2">
            Your session has expired. Please login again to continue.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 mt-6">
          <Button 
            onClick={onLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Login
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
