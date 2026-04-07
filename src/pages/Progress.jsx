import React from 'react';
import ProgressStats from '@/components/dashboard/ProgressStats';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Progress = () => {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto py-8 px-4 md:px-0 space-y-6">
            <div className="flex items-center justify-between mb-4">
                <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2"
                    onClick={() => navigate(-1)}
                >
                    <ChevronLeft size={16} />
                    <span>Back</span>
                </Button>
            </div>

            <ProgressStats />
        </div>
    );
};

export default Progress;
