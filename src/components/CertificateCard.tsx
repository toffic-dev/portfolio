import Image from "next/image";
import {
  ArrowUpRight,
  BadgeCheck,
  Clock,
  FileText,
  Layers,
  ShieldCheck,
} from "lucide-react";
import type { Certificate, CertificateAsset } from "@/types";
import { certificateCategoryLabel } from "@/data/certificates";
import { Badge } from "@/components/ui/Badge";
import { IssuerMark } from "@/components/ui/IssuerMark";
import { formatMonth, isPendingLink } from "@/lib/utils";

const ASPECT = "aspect-[4/3]";

/**
 * Preview area.
 *
 * Three states, all driven by data: an image scan, an embedded PDF marker, or
 * the designed "scan pending" frame. Adding `asset` to a certificate in
 * `src/data/certificates.ts` is all it takes to switch states.
 *
 * The image state **fits** the scan instead of covering the tile: the supplied
 * credentials are full achievement pages at roughly 16:9, and `object-cover` in
 * a 4:3 tile crops about a quarter of the width — enough to slice the badge
 * artwork's left edge off. Letterboxing over the canvas tint keeps every
 * credential whole; the viewer fits them the same way, so nothing is cropped at
 * either size.
 */
function CertificatePreview({
  asset,
  title,
  inProgress,
}: {
  asset?: CertificateAsset | null;
  title: string;
  /** An in-progress credential cannot have a scan yet — only an earned one can. */
  inProgress?: boolean;
}) {
  if (asset?.type === "image") {
    return (
      <div
        className={`${ASPECT} relative w-full overflow-hidden border-b border-line bg-[color-mix(in_oklab,var(--canvas)_80%,transparent)]`}
      >
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="object-contain transition-transform duration-[900ms] ease-out-soft group-hover:scale-[1.04]"
        />
      </div>
    );
  }

  if (asset?.type === "pdf") {
    return (
      <div
        className={`${ASPECT} relative flex w-full flex-col items-center justify-center gap-3 border-b border-line bg-[color-mix(in_oklab,var(--canvas)_80%,transparent)]`}
      >
        <span className="grid h-10 w-10 place-items-center rounded-md border border-line bg-surface text-accent">
          <FileText aria-hidden="true" className="h-5 w-5" />
        </span>
        <span className="meta text-muted">PDF credential</span>
        <span className="meta-sm text-muted">{title}</span>
      </div>
    );
  }

  return (
    <div
      className={`${ASPECT} media-frame scan-sweep relative w-full rounded-none border-x-0 border-t-0`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
        <span className="grid h-9 w-9 place-items-center rounded-md border border-line bg-surface/70 text-muted">
          <Layers aria-hidden="true" className="h-4 w-4" />
        </span>
        <span className="meta text-muted">[SCAN PENDING]</span>
        <span className="meta-sm max-w-[16rem] text-muted">
          {inProgress
            ? "The scan and badge follow once the exam is passed"
            : "Add the file to public/certificates/ and set `asset`"}
        </span>
      </div>
    </div>
  );
}

interface CertificateCardProps {
  certificate: Certificate;
  /** Omitted for in-progress entries: there is nothing to open yet. */
  onSelect?: () => void;
}

const TIER_LABEL = {
  professional: "Certification",
  additional: "Credential",
} as const;

/** Gallery tile: preview on top, credential metadata underneath. */
export function CertificateCard({ certificate, onSelect }: CertificateCardProps) {
  const issued = formatMonth(certificate.issued);
  const expires = formatMonth(certificate.expires);
  const verifiable = !isPendingLink(certificate.verifyUrl);
  const inProgress = certificate.status === "in-progress";

  const preview = (
    <CertificatePreview
      asset={certificate.asset}
      title={certificate.title}
      inProgress={inProgress}
    />
  );

  return (
    <article className="card card-lift group flex h-full flex-col overflow-hidden">
      {onSelect ? (
        <button
          type="button"
          onClick={onSelect}
          className="relative block w-full cursor-pointer"
          aria-label={`Open ${certificate.title}`}
        >
          {preview}

          {/* `pointer-coarse:opacity-100` keeps the affordance visible on touch:
              `group-hover` is gated behind `@media (hover: hover)`, so on a phone
              this chip would otherwise never appear and the preview would look
              inert rather than tappable. */}
          <span className="pointer-coarse:opacity-100 pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-4 opacity-0 transition-all duration-400 ease-out-soft group-hover:opacity-100 group-focus-visible:opacity-100">
            <span className="meta flex items-center gap-2 rounded-full border border-line bg-surface/90 px-3.5 py-2 text-ink backdrop-blur-sm">
              View credential
              <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            </span>
          </span>
        </button>
      ) : (
        <div className="relative">{preview}</div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          {/* Tier first: the distinction between a certification and a
              completion badge is the point of this section. */}
          <Badge tone={certificate.tier === "professional" ? "accent" : "muted"}>
            {TIER_LABEL[certificate.tier]}
          </Badge>
          <Badge tone="muted" className="border-line">
            {certificateCategoryLabel[certificate.category]}
          </Badge>
          {inProgress && <Badge tone="warn">In progress</Badge>}
          {verifiable && (
            <Badge tone="ok">
              <ShieldCheck aria-hidden="true" className="h-3 w-3" />
              Verifiable
            </Badge>
          )}
        </div>

        <h3 className="mt-4 text-base leading-snug font-semibold text-ink">
          {certificate.title}
        </h3>
        <div className="mt-3 flex items-center gap-2.5">
          <IssuerMark logo={certificate.issuerLogo} />
          <p className="meta-sm text-muted">{certificate.issuer}</p>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-4">
          <div>
            <dt className="meta text-muted">Issued</dt>
            <dd className="meta-sm mt-2 text-ink-soft">{issued ?? "—"}</dd>
          </div>
          <div>
            <dt className="meta text-muted">Expires</dt>
            <dd className="meta-sm mt-2 text-ink-soft">{expires ?? "—"}</dd>
          </div>
        </dl>

        {certificate.credentialId && (
          /* A UUID is one 36-character token with no space to break at, which is
             wider than the card is on a 320px phone. `break-all` lets it wrap to
             a second line rather than being clipped by the card's
             `overflow-hidden`; the icon is pinned so it stays on the first line. */
          <p className="meta mt-4 flex items-start gap-2 text-muted">
            <BadgeCheck
              aria-hidden="true"
              className="mt-0.5 h-3.5 w-3.5 shrink-0"
            />
            <span className="min-w-0 break-all">{certificate.credentialId}</span>
          </p>
        )}

        {inProgress ? (
          <p className="meta mt-auto flex items-center gap-2 border-t border-line pt-4 text-warn">
            <Clock aria-hidden="true" className="h-3.5 w-3.5" />
            Not yet earned — excluded from the credential count
          </p>
        ) : (
          /* Text-only controls are 11px tall — below the 24px minimum touch
             target. `min-h-6` gives the thumb something to hit without changing
             the type size or the row's visual weight. Comment form matters here:
             this ternary branch has to stay a single JSX expression, so it takes
             a block comment rather than a JSX comment node. */
          <div className="mt-auto flex items-center gap-4 border-t border-line pt-4">
            {onSelect && (
              <button
                type="button"
                onClick={onSelect}
                className="meta inline-flex min-h-6 cursor-pointer items-center text-ink transition-colors duration-300 hover:text-accent"
              >
                View credential
              </button>
            )}
            {verifiable && (
              <a
                href={certificate.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="meta inline-flex min-h-6 items-center text-muted transition-colors duration-300 hover:text-accent"
              >
                Verify
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}