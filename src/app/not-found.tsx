import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="pt-40 pb-32">
      <div className="shell">
        <span className="meta text-accent">404 / Not found</span>
        <h1 className="mt-6 text-4xl leading-tight font-semibold text-ink sm:text-5xl">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-5 max-w-lg leading-relaxed text-ink-soft">
          The link may be out of date, or the project it pointed at may have been
          renamed. Everything the site offers is one step away.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <LinkButton
            href="/"
            leadingIcon={<ArrowLeft aria-hidden="true" className="h-4 w-4" />}
          >
            Back to home
          </LinkButton>
          <Link
            href="/projects"
            className="meta rounded-lg border border-line px-4 py-3 text-ink-soft transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            Browse projects
          </Link>
        </div>
      </div>
    </div>
  );
}