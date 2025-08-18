'use client';

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '@/src/lib/utils';

interface RadioButtonProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  name: string;
  checked: boolean;
}

const RadioButton = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Item>, RadioButtonProps>(
  ({ value, onChange, label, checked, ...props }, ref) => (
    <RadioGroupPrimitive.Item
      ref={ref}
      value={value}
      onChange={() => onChange(value)}
      className={cn(
        'flex items-center gap-2 cursor-pointer select-none text-sm font-medium text-gray-700',
        checked && 'text-blue-500',
      )}
      {...props}
    >
      <div
        className={cn(
          'w-4 h-4 border-2 rounded-full flex justify-center items-center',
          checked ? 'border-blue-500' : 'border-gray-500',
        )}
      >
        <RadioGroupPrimitive.Indicator
          className={cn('w-2 h-2 rounded-full', checked ? 'bg-blue-500' : 'bg-transparent')}
        />
      </div>
      {label}
    </RadioGroupPrimitive.Item>
  ),
);

RadioButton.displayName = 'RadioButton';

export { RadioButton };
