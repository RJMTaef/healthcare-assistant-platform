import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'gradient';
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  className,
  children,
  ...props
}) => {
  const variants = {
    default: 'bg-white border border-gray-200 shadow-sm',
    elevated: 'bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300',
    outlined: 'bg-white border-2 border-gray-200',
    gradient: 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200'
  };

  return (
    <div
      className={cn(
        'rounded-xl p-6 transition-all duration-200',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ className, children, ...props }) => {
  return (
    <div className={cn('flex flex-col space-y-1.5 pb-4', className)} {...props}>
      {children}
    </div>
  );
};

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const CardTitle: React.FC<CardTitleProps> = ({ className, children, ...props }) => {
  return (
    <h3 className={cn('text-xl font-semibold leading-none tracking-tight text-gray-900', className)} {...props}>
      {children}
    </h3>
  );
};

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({ className, children, ...props }) => {
  return (
    <p className={cn('text-sm text-gray-600', className)} {...props}>
      {children}
    </p>
  );
};

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({ className, children, ...props }) => {
  return (
    <div className={cn('pt-0', className)} {...props}>
      {children}
    </div>
  );
};

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({ className, children, ...props }) => {
  return (
    <div className={cn('flex items-center pt-4', className)} {...props}>
      {children}
    </div>
  );
}; 