'use client';

import { forwardRef } from 'react';
import { useFormStatus } from 'react-dom';

import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FormPostErrors } from './form-errors';

interface FormInputProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
}

export const FormPostInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      label,
      type,
      placeholder,
      required,
      disabled,
      errors,
      className,
      defaultValue = '',
      onBlur,
    },
    ref,
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className="space-y-3">
        {label && (
          <Label
            htmlFor={id}
            className="text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            {label}
          </Label>
        )}
        <div className="relative">
          <Input
            onBlur={onBlur}
            defaultValue={defaultValue}
            ref={ref}
            required={required}
            name={id}
            id={id}
            placeholder={placeholder}
            type={type}
            disabled={pending || disabled}
            className={cn(
              'w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:focus:ring-blue-400',
              className,
            )}
            aria-describedby={`${id}-error`}
          />
          {pending && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400">
              <svg
                aria-hidden="true"
                className="h-5 w-5 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="stroke-gray-300 dark:stroke-gray-600"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="fill-blue-600 dark:fill-blue-500"
                  fill="currentColor"
                  d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"
                ></path>
              </svg>
            </div>
          )}
        </div>
        <FormPostErrors id={id} errors={errors} />
      </div>
    );
  },
);

FormPostInput.displayName = 'FormPostInput';