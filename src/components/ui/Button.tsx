import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn, isPendingLink } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const BASE =
  "group/btn inline-flex items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform,opacity] duration-300 ease-out-soft disabled:pointer-events-none disabled:opacity-50";

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-ink shadow-[0_20px_45px_-28px_var(--glow)] hover:brightness-110 active:translate-y-px",
  secondary:
    "border border-line bg-surface text-ink hover:border-line-strong hover:bg-elevated active:translate-y-px",
  outline:
    "border border-line-strong text-ink hover:border-accent hover:text-accent active:translate-y-px",
  ghost:
    "text-ink-soft hover:bg-[color-mix(in_oklab,var(--ink)_6%,transparent)] hover:text-ink",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

interface StyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export function buttonClass({
  variant = "primary",
  size = "md",
  className,
}: StyleOptions = {}) {
  return cn(BASE, VARIANTS[variant], SIZES[size], className);
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

export function Button({
  variant,
  size,
  className,
  leadingIcon,
  trailingIcon,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClass({ variant, size, className })}
      {...props}
    >
      {leadingIcon}
      {children}
      {trailingIcon}
    </button>
  );
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

/**
 * Anchor styled as a button.
 *
 * A `href` of `"#"` counts as pending: the element renders as a labelled
 * placeholder instead of a link that goes nowhere, which keeps the layout
 * intact while the real URL is still missing.
 */
export function LinkButton({
  href,
  variant,
  size,
  className,
  leadingIcon,
  trailingIcon,
  children,
  ...props
}: LinkButtonProps) {
  const classes = buttonClass({ variant, size, className });
  const content = (
    <>
      {leadingIcon}
      {children}
      {trailingIcon}
    </>
  );

  if (isPendingLink(href)) {
    return (
      <span
        className={cn(classes, "opacity-90")}
        data-pending="true"
        role="link"
        aria-disabled="true"
        title="Placeholder link — the real URL has not been added yet"
      >
        {content}
      </span>
    );
  }

  /* `mailto:` and `tel:` are not routes, and must never open a blank tab. */
  const isProtocolLink = /^(mailto:|tel:)/i.test(href);
  const isExternal = !isProtocolLink && /^(https?:)?\/\//i.test(href);
  /* Public files (PDFs, images) are not React routes either: send them through a
     normal anchor so the browser handles the request itself. */
  const isFile = !isProtocolLink && /\.[a-z0-9]{2,5}(\?.*)?$/i.test(href);

  if (isProtocolLink) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }

  if (isExternal || isFile) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {content}
    </Link>
  );
}