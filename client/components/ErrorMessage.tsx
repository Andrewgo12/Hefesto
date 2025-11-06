import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
  fullScreen?: boolean;
}

export default function ErrorMessage({ 
  message = 'Ocurrió un error al cargar los datos', 
  onRetry,
  fullScreen = false 
}: ErrorMessageProps) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center gap-4 p-6"
    >
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
        <AlertCircle className="w-8 h-8 text-red-600" />
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-slate-900">Error</h3>
        <p className="text-slate-600">{message}</p>
      </div>
      {onRetry && (
        <Button
          onClick={onRetry}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Reintentar
        </Button>
      )}
    </motion.div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
}
