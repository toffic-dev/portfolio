"use client";

import { useMemo, useState } from "react";
import { ShieldCheck } from "lucide-react";
import {
  certificateCategories,
  earnedAdditionalCount,
  earnedCertificates,
  earnedProfessionalCount,
  inProgressCertificates,
} from "@/data/certificates";
import type { CertificateCategory } from "@/types";
import { CertificateCard } from "@/components/CertificateCard";
import { CertificateViewer } from "@/components/CertificateViewer";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

type Filter = CertificateCategory | "all";

/**
 * Certificates gallery.
 *
 * Only **earned** credentials appear in the filterable grid and the viewer;
 * certifications still in progress render in their own block below, so the
 * headline count can never include something not yet earned. Cards and the
 * viewer are separate, reusable components; the data comes from
 * `src/data/certificates.ts`.
 */
export function Certificates() {
  const [filter, setFilter] = useState<Filter>("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const visible = useMemo(
    () =>
      filter === "all"
        ? earnedCertificates
        : earnedCertificates.filter(
            (certificate) => certificate.category === filter
          ),
    [filter]
  );

  const active = activeIndex === null ? undefined : visible[activeIndex];

  /** Wraps around, so ←/→ in the viewer never falls off the ends. */
  function selectAt(index: number) {
    if (visible.length === 0) return;
    setActiveIndex(((index % visible.length) + visible.length) % visible.length);
  }

  function changeFilter(next: Filter) {
    setFilter(next);
    setActiveIndex(null);
  }

  return (
    <section
      id="certificates"
      className="relative border-t border-line py-24 sm:py-28 lg:py-32"
    >
      <div className="shell">
        <Reveal>
          <SectionHeading
            index="05"
            label="Certificates"
            title="Credentials earned."
            description="A professional certification plus three additional earned credentials and badges, each with its scan, credential ID and verification link in place."
            actions={
              <Badge tone="accent">
                <ShieldCheck aria-hidden="true" className="h-3 w-3" />
                {earnedProfessionalCount} certification ·{" "}
                {earnedAdditionalCount} additional
              </Badge>
            }
          />
        </Reveal>

        {/* Filters -------------------------------------------------------- */}
        <Reveal>
          <div
            role="group"
            aria-label="Filter certificates by category"
            className="mt-10 flex flex-wrap items-center gap-2 border-y border-line py-4"
          >
            {certificateCategories.map((category) => {
              const count =
                category.id === "all"
                  ? earnedCertificates.length
                  : earnedCertificates.filter(
                      (certificate) => certificate.category === category.id
                    ).length;
              const isActive = filter === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => changeFilter(category.id)}
                  className={cn(
                    /* `min-h-10` gives each chip a 40px touch height on phones
                       (the padding alone made it 29px, awkward to hit); from
                       `sm` up it returns to the compact height. */
                    "meta inline-flex min-h-10 cursor-pointer items-center rounded-full border px-3.5 py-2.5 transition-colors duration-300 sm:min-h-0 sm:py-2",
                    isActive
                      ? "border-accent/40 bg-accent/10 text-accent"
                      : "border-line text-muted hover:border-line-strong hover:text-ink"
                  )}
                >
                  {category.label}
                  <span
                    className={cn(
                      "ml-2",
                      isActive ? "text-accent/70" : "text-muted"
                    )}
                  >
                    {String(count).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {visible.length > 0 ? (
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((certificate, index) => (
              <li key={certificate.id}>
                <Reveal delay={(index % 3) * 70} className="h-full">
                  <CertificateCard
                    certificate={certificate}
                    onSelect={() => setActiveIndex(index)}
                  />
                </Reveal>
              </li>
            ))}
          </ul>
        ) : (
          <p className="meta mt-10 text-muted">
            No credentials in this category yet.
          </p>
        )}

        {/* In progress -------------------------------------------------- */}
        {inProgressCertificates.length > 0 && (
          <Reveal>
            <div className="mt-14 rounded-lg border border-line bg-surface/50 p-6 sm:p-7">
              <div className="flex flex-wrap items-center gap-3">
                <Badge tone="warn">In progress</Badge>
                <h3 className="text-sm font-semibold text-ink">
                  Working towards
                </h3>
              </div>
              <p className="meta-sm mt-3 max-w-2xl text-muted">
                Listed for transparency. These are not earned credentials yet,
                so they are excluded from the count above.
              </p>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {inProgressCertificates.map((certificate) => (
                  <li key={certificate.id}>
                    <CertificateCard certificate={certificate} />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}

        <p className="meta mt-8 text-muted">
          Every earned credential carries its scan, credential ID and verification
          link. Scans live in public/certificates/ and issuer badges in
          public/issuers/.
        </p>
      </div>

      {active && activeIndex !== null && (
        <CertificateViewer
          /* Remount per credential: zoom, copy feedback and scroll position all
             reset without extra effects. */
          key={active.id}
          certificate={active}
          position={{ index: activeIndex, total: visible.length }}
          onSelectIndex={selectAt}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </section>
  );
}