import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { RadioButton } from './radio';

interface RadioButtonGroupProps {
  name: string;
  options: { label: string; value: string }[];
  selectedValue: string;
  className?: string;
  onChange: (value: string) => void;
}

export function RadioButtonGroup({
  name,
  options,
  className,
  selectedValue,
  onChange,
}: RadioButtonGroupProps) {
  return (
    <RadioGroupPrimitive.Root
      name={name}
      value={selectedValue}
      onValueChange={onChange}
      className={`flex gap-2 ${className}`}
    >
      {options.map((option) => (
        <RadioButton
          key={option.value}
          value={option.value}
          label={option.label}
          name={name}
          checked={selectedValue === option.value}
          onChange={onChange}
        />
      ))}
    </RadioGroupPrimitive.Root>
  );
}
