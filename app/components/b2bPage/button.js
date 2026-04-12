// components/ui/button.js
import React from 'react';

/**
 * Button component with variant and size options
 * No external dependencies - pure CSS classes
 */

const buttonVariants = {
  base: "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",

  variants: {
    default: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-100",
    ghost: "hover:bg-gray-100"
  },

  sizes: {
    default: "h-10 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-12 rounded-lg px-8 text-base"
  }
};

/**
 * Helper function to combine class names
 * @param {...string} classes - Class names to combine
 * @returns {string} Combined class names
 */
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Get button classes based on variant and size
 * @param {string} variant - Button variant (default, outline, ghost)
 * @param {string} size - Button size (default, sm, lg)
 * @param {string} className - Additional custom classes
 * @returns {string} Combined button classes
 */
function getButtonClasses(variant = 'default', size = 'default', className = '') {
  const variantClass = buttonVariants.variants[variant] || buttonVariants.variants.default;
  const sizeClass = buttonVariants.sizes[size] || buttonVariants.sizes.default;

  return cn(
    buttonVariants.base,
    variantClass,
    sizeClass,
    className
  );
}

/**
 * Button component
 * @param {Object} props - Component props
 * @param {string} props.variant - Button style variant
 * @param {string} props.size - Button size
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.asChild - If true, renders as child component
 * @param {React.ReactNode} props.children - Button content
 * @param {Object} props.rest - Additional button attributes
 */
export const Button = React.forwardRef(({
  variant = 'default',
  size = 'default',
  className = '',
  asChild = false,
  children,
  ...props
}, ref) => {
  const buttonClasses = getButtonClasses(variant, size, className);

  if (asChild) {
    return React.cloneElement(children, {
      className: buttonClasses,
      ref,
      ...props
    });
  }

  return (
    <button
      ref={ref}
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

// Export button variants helper if needed
export { buttonVariants, getButtonClasses, cn };