import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RefreshCw } from 'lucide-react';

interface SimpleCaptchaProps {
  onVerify: (isValid: boolean) => void;
}

export default function SimpleCaptcha({ onVerify }: SimpleCaptchaProps) {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 10) + 1;
    const n2 = Math.floor(Math.random() * 10) + 1;
    setNum1(n1);
    setNum2(n2);
    setUserAnswer('');
    setIsVerified(false);
    onVerify(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleVerify = () => {
    const correctAnswer = num1 + num2;
    const isCorrect = parseInt(userAnswer) === correctAnswer;
    setIsVerified(isCorrect);
    onVerify(isCorrect);
    
    if (!isCorrect) {
      generateCaptcha();
    }
  };

  return (
    <div className="border-2 border-orange-200 rounded-lg p-4 bg-orange-50">
      <div className="flex items-center justify-between mb-3">
        <Label className="font-bold text-orange-900">🤖 Verificación Anti-Bot</Label>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={generateCaptcha}
          className="h-8"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-3">
        <div className="bg-white p-4 rounded border-2 border-orange-300 text-center">
          <p className="text-2xl font-bold text-slate-800">
            {num1} + {num2} = ?
          </p>
        </div>
        
        <div className="flex gap-2">
          <Input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Ingrese el resultado"
            className={isVerified ? 'border-green-500 bg-green-50' : ''}
            disabled={isVerified}
          />
          <Button
            type="button"
            onClick={handleVerify}
            disabled={isVerified || !userAnswer}
            className={isVerified ? 'bg-green-600' : ''}
          >
            {isVerified ? '✓ Verificado' : 'Verificar'}
          </Button>
        </div>
        
        {isVerified && (
          <p className="text-sm text-green-700 font-medium">
            ✓ Verificación exitosa
          </p>
        )}
      </div>
    </div>
  );
}
