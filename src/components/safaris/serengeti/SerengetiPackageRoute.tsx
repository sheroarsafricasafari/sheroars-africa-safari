import Link from "next/link";
import type { SerengetiPackage } from "@/types/serengeti-package";

export default function SerengetiPackageRoute({ stops, endpoints }: { stops: SerengetiPackage["route"]; endpoints: SerengetiPackage["routeEndpoints"] }) {
  const routeItems = [
    { id: "route-start", label: endpoints.start ?? "Starting point not supplied", nights: undefined, endpoint: true },
    ...stops.map((stop) => ({ ...stop, endpoint: false })),
    { id: "route-end", label: endpoints.end ?? "Ending point not supplied", nights: undefined, endpoint: true },
  ];
  return (
    <div className="rounded-3xl border border-sand bg-white p-5 shadow-card sm:p-7">
      <p className="mb-6 text-xs text-muted">Illustrative route, not to scale.</p>
      <div className="overflow-x-auto pb-2">
        <ol className="relative flex min-w-[620px] items-start justify-between gap-3">
          <svg aria-hidden="true" viewBox="0 0 1000 60" preserveAspectRatio="none" className="pointer-events-none absolute left-0 top-3 h-8 w-full text-gold">
            <path d="M20 20 H980" fill="none" stroke="currentColor" strokeWidth="3" />
          </svg>
          {routeItems.map((stop, index) => (
            <li key={stop.id} className="relative z-10 flex min-w-28 flex-1 flex-col items-center text-center">
              <span className="flex size-8 items-center justify-center rounded-full border-2 border-terracotta bg-cream font-semibold text-terracotta">{index + 1}</span>
              <Link href="#itinerary" className="mt-3 rounded-sm text-sm font-semibold text-earth underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">
                {stop.label}
              </Link>
              <span className="mt-1 text-xs text-muted">{stop.endpoint ? "Endpoint details to confirm" : stop.nights === undefined ? "Nights not specified" : `${stop.nights} ${stop.nights === 1 ? "night" : "nights"}`}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
