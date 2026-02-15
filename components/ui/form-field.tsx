import * as React from 'react';

import { cn } from '@/lib/utils';

function Root({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='form-field' className={cn('space-y-2', className)} {...props} />;
}

function Header({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='form-field-header' className={cn('space-y-1', className)} {...props} />;
}

function Description({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot='form-field-description'
      className={cn('text-sm text-gray-500', className)}
      {...props}
    />
  );
}

function OptionCard({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='form-field-option-card'
      className={cn(
        'flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50',
        className,
      )}
      {...props}
    />
  );
}

function CheckItem({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='form-field-check-item'
      className={cn('flex items-start space-x-2', className)}
      {...props}
    />
  );
}

const FormField = {
  Root,
  Header,
  Description,
  OptionCard,
  CheckItem,
} as const;

export { FormField };
