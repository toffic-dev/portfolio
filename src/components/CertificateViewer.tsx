"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type TouchEvent } from "react";
import {
  BadgeCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  ExternalLink,
  FileText,
  Layers,
  Maximize2,
  ShieldCheck,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import type { Certificate } from "@/types";
import { certificateCategoryLabel } from "@/data/certificates";
import { Badge } from "@/components/ui/Badge";
import { buttonClass } from "@/components/ui/Button";
import { IssuerMark } from "@/components/ui/IssuerMark";
import { TagList } from "@/components/ui/Tag";
import { useOverlay } from "@/hooks/useOverlay";
import { cn, formatMonth, isPendingLink } from "@/lib/utils";

/**
 * Certificate viewer.
 *
 * A keyboard-complete dialog: Escape closes, ←/→ move between credentials, +/-
 * zoom the scan, focus is trapped inside and restored on close, and the page
 * behind cannot scroll. Images, embedded PDFs and the "asset pending" state all
 * come from the same certificate object.
 */
export const SCALE_MIN = 1;
export const SCALE_MAX = 3;

/** Horizontal drag (px) that counts as a swipe rather than a stray touch. */
const SWIPE_THRESHOLD = 48;

interface CertificateViewerProps {
  certificate: Certificate;
  position: { index: number; total: number };
  onSelectIndex: (index: number) => void;
  onClose: () => void;
}

export function CertificateViewer({
  certificate,
  position,
  onSelectIndex,
  onClose,
}: CertificateViewerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(SCALE_MIN);
  const [copied, setCopied] = useState(false);

  useOverlay({ isOpen: true, onClose, containerRef: panelRef });

  /* Keyboard shortcuts. The component is remounted per credential (see the
     `key` in Certificates.tsx), so zoom and copy feedback reset on their own. */
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") onSelectIndex(position.index + 1);
      else if (event.key === "ArrowLeft") onSelectIndex(position.index - 1);
      else if (event.key === "+" || event.key === "=") {
        setScale((current) => Math.min(SCALE_MAX, current + 0.25));
      } else if (event.key === "-") {
        setScale((current) => Math.max(SCALE_MIN, current - 0.25));
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onSelectIndex, position.index]);

  async function copyCredentialId() {
    if (!certificate.credentialId) return;
    try {
      await navigator.clipboard.writeText(certificate.credentialId);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* Clipboard access can be blocked — the ID stays selectable by hand. */
    }
  }

  /* Touch navigation. The handlers only read the touch — nothing calls
     `preventDefault`, so the dialog keeps scrolling exactly as before and the
     gesture is never stolen from the browser. A decisive sideways drag steps to
     the next or previous credential, which is what a phone user expects from a
     set of images. While the scan is zoomed in, the same drag is a pan across
     the enlarged image, so the swipe is deliberately disabled then. */
  const swipeStart = useRef<{ x: number; y: number } | null>(null);

  function onTouchStart(event: TouchEvent<HTMLDivElement>) {
    const touch = event.touches[0];
    swipeStart.current =
      scale === SCALE_MIN && event.touches.length === 1 && touch
        ? { x: touch.clientX, y: touch.clientY }
        : null;
  }

  function onTouchEnd(event: TouchEvent<HTMLDivElement>) {
    const start = swipeStart.current;
    swipeStart.current = null;

    const touch = event.changedTouches[0];
    if (!start || !touch || scale > SCALE_MIN) return;

    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;

    /* Must travel far enough, and be more sideways than vertical, so a diagonal
       scroll flick never changes the credential by accident. */
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) <= Math.abs(dy)) return;

    onSelectIndex(position.index + (dx < 0 ? 1 : -1));
  }

  const issued = formatMonth(certificate.issued);
  const expires = formatMonth(certificate.expires);
  const verifiable = !isPendingLink(certificate.verifyUrl);
  const asset = certificate.asset ?? null;
  const isImage = asset?.type === "image";
  const isPdf = asset?.type === "pdf";

  const viewerButton = "meta inline-flex cursor-pointer items-center gap-2 rounded-lg border border-line px-3 py-2 text-ink-soft transition-colors duration-300 hover:border-accent hover:text-accent";

  return (
    <div
      /* `h-[100dvh]`: the scroll port should match the visible area, not the
         layout viewport — otherwise the footer controls sit below the fold twice
         over on a phone (once for the dialog, once for the browser toolbar). */
      className="fixed inset-0 z-[80] flex h-[100dvh] items-start justify-center overflow-y-auto p-3 sm:items-center sm:p-6"
    >
      <button
        type="button"
        aria-label="Close credential viewer"
        onClick={onClose}
        tabIndex={-1}
        className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="certificate-viewer-title"
        tabIndex={-1}
        className="panel-enter relative z-10 my-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-line bg-surface shadow-lift"
      >
        <div className="flex items-start justify-between gap-4 border-b border-line p-5 sm:p-6">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="muted">
                {certificateCategoryLabel[certificate.category]}
              </Badge>
              {verifiable && (
                <Badge tone="ok">
                  <ShieldCheck aria-hidden="true" className="h-3 w-3" />
                  Verifiable
                </Badge>
              )}
              <span className="meta text-muted">
                {String(position.index + 1).padStart(2, "0")} /{" "}
                {String(position.total).padStart(2, "0")}
              </span>
            </div>

            <h2
              id="certificate-viewer-title"
              className="mt-4 text-lg leading-snug font-semibold text-ink sm:text-xl"
            >
              {certificate.title}
            </h2>
            <div className="mt-3 flex items-center gap-3">
              <IssuerMark logo={certificate.issuerLogo} size="md" />
              <p className="meta-sm text-muted">{certificate.issuer}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close credential viewer"
            className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-lg border border-line text-ink-soft transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            <X className="h-[18px] w-[18px]" aria-hidden="true" />
          </button>
        </div>

        <div className="grid gap-0 lg:grid-cols-[1.35fr_1fr]">
          {/* Preview --------------------------------------------------- */}
          <div className="border-b border-line p-5 sm:p-6 lg:border-r lg:border-b-0">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="meta text-muted">Preview</span>

              {isImage && (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() =>
                      setScale((current) => Math.max(SCALE_MIN, current - 0.25))
                    }
                    aria-label="Zoom out"
                    className="grid h-8 w-8 cursor-pointer place-items-center rounded-md border border-line text-ink-soft transition-colors duration-300 hover:border-accent hover:text-accent"
                  >
                    <ZoomOut aria-hidden="true" className="h-3.5 w-3.5" />
                  </button>
                  <span className="meta w-11 text-center text-muted">
                    {Math.round(scale * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setScale((current) => Math.min(SCALE_MAX, current + 0.25))
                    }
                    aria-label="Zoom in"
                    className="grid h-8 w-8 cursor-pointer place-items-center rounded-md border border-line text-ink-soft transition-colors duration-300 hover:border-accent hover:text-accent"
                  >
                    <ZoomIn aria-hidden="true" className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setScale(SCALE_MIN)}
                    aria-label="Reset zoom"
                    className="grid h-8 w-8 cursor-pointer place-items-center rounded-md border border-line text-ink-soft transition-colors duration-300 hover:border-accent hover:text-accent"
                  >
                    <Maximize2 aria-hidden="true" className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>

            <div
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              className="mt-4 h-[40vh] overflow-auto rounded-lg border border-line bg-[color-mix(in_oklab,var(--canvas)_75%,transparent)] sm:h-[46vh]"
            >
              {isImage && asset ? (
                <div className="relative h-full w-full">
                  <Image
                    src={asset.src}
                    alt={asset.alt}
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    style={{ transform: `scale(${scale})` }}
                    className="object-contain transition-transform duration-300 ease-out-soft"
                  />
                </div>
              ) : isPdf && asset ? (
                <iframe
                  src={asset.src}
                  title={asset.alt}
                  className="h-full w-full bg-white"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
                  <span className="grid h-10 w-10 place-items-center rounded-md border border-line bg-surface text-muted">
                    <Layers aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span className="meta text-muted">[CREDENTIAL SCAN PENDING]</span>
                  <span className="meta-sm max-w-sm text-muted">
                    Add the file to public/certificates/ and set the `asset` field for
                    this credential in src/data/certificates.ts
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <span className="meta text-muted">Credential details</span>

            <dl className="mt-5 space-y-4">
              <div>
                <dt className="meta text-muted">Issued</dt>
                <dd className="meta-sm mt-2 text-ink">{issued ?? "—"}</dd>
              </div>

              {expires && (
                <div>
                  <dt className="meta text-muted">Expires</dt>
                  <dd className="meta-sm mt-2 text-ink">{expires}</dd>
                </div>
              )}

              {certificate.credentialId && (
                <div>
                  <dt className="meta text-muted">Credential ID</dt>
                  <dd className="mt-2 flex items-center gap-2">
                    <span className="meta-sm break-all text-ink">
                      {certificate.credentialId}
                    </span>
                    <button
                      type="button"
                      onClick={copyCredentialId}
                      aria-label="Copy credential ID"
                      className="grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded-md border border-line text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
                    >
                      {copied ? (
                        <Check aria-hidden="true" className="h-3.5 w-3.5 text-ok" />
                      ) : (
                        <Copy aria-hidden="true" className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </dd>
                </div>
              )}

              <div>
                <dt className="meta text-muted">Category</dt>
                <dd className="mt-2">
                  <Badge tone="muted">
                    {certificateCategoryLabel[certificate.category]}
                  </Badge>
                </dd>
              </div>
            </dl>

            {certificate.skills && certificate.skills.length > 0 && (
              <div className="mt-6 border-t border-line pt-5">
                <span className="meta text-muted">Skills covered</span>
                <TagList items={certificate.skills} className="mt-3" />
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line pt-5">
              {asset ? (
                <a
                  href={asset.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClass({ variant: "secondary", size: "sm" })}
                >
                  <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
                  View certificate
                </a>
              ) : (
                <span
                  role="link"
                  aria-disabled="true"
                  title="No scan has been added for this credential yet"
                  className={cn(
                    buttonClass({ variant: "secondary", size: "sm" }),
                    "opacity-90"
                  )}
                >
                  <FileText aria-hidden="true" className="h-3.5 w-3.5" />
                  View certificate
                </span>
              )}

              {verifiable && (
                <a
                  href={certificate.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClass({ size: "sm" })}
                >
                  <ShieldCheck aria-hidden="true" className="h-3.5 w-3.5" />
                  Verify credential
                </a>
              )}
            </div>

            {(!asset || !verifiable) && (
              <p className="meta mt-5 flex items-center gap-2 text-muted">
                <BadgeCheck aria-hidden="true" className="h-3.5 w-3.5" />
                {/* The credential itself is real — only the scan and any
                    verification details may still be outstanding. Each
                    outstanding item is named, so the note never claims a scan is
                    missing while a scan is on screen. */}
                {!asset && !verifiable
                  ? "Credential scan and verification details pending"
                  : !asset
                    ? "Credential scan pending"
                    : "Verification details pending"}
              </p>
            )}
          </div>
        </div>

        {/* Footer ------------------------------------------------------ */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onSelectIndex(position.index - 1)}
              className={viewerButton}
            >
              <ChevronLeft aria-hidden="true" className="h-3.5 w-3.5" />
              Previous
            </button>
            <button
              type="button"
              onClick={() => onSelectIndex(position.index + 1)}
              className={viewerButton}
            >
              Next
              <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Spelled out for whichever input the device actually has: on a phone
              the keyboard hint would list keys that do not exist, and on a
              desktop the swipe hint would describe a gesture the mouse cannot
              make. Both are `hidden` by default so neither is read out twice. */}
          <span className="meta text-muted">
            <span className="pointer-coarse:inline hidden">
              Swipe to change credential
            </span>
            <span className="pointer-fine:inline hidden">
              Esc closes · ← → change credential · + − zoom
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}