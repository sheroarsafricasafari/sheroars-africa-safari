import { seasonHighlights, seasonRows, months } from "@/data/seasons";
import { homeCopy } from "@/data/home";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const seasonClasses = {
  peak: "bg-gold text-forest",
  good: "bg-terracotta/70 text-white",
  low: "bg-white/10 text-white/80",
} as const;

export default function WhenToGo() {
  return (
    <Container>
      <SectionHeading {...homeCopy.seasonsHeading} tone="light" />
      <div className="overflow-x-auto rounded-2xl border border-white/20">
        <table className="w-full min-w-[850px] border-collapse text-sm">
          <thead>
            <tr>
              <th scope="col" className="sticky left-0 z-10 bg-forest px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-cream">Experience</th>
              {months.map((month) => <th key={month} scope="col" className="px-2 py-4 text-center text-xs font-bold text-cream">{month}</th>)}
            </tr>
          </thead>
          <tbody>
            {seasonRows.map((row) => (
              <tr key={row.name} className="border-t border-white/15">
                <th scope="row" className="sticky left-0 z-10 min-w-44 bg-forest px-4 py-4 text-left font-semibold text-cream">{row.name}</th>
                {row.seasons.map((season, index) => (
                  <td key={`${row.name}-${months[index]}`} className="px-1.5 py-3">
                    <span aria-label={`${row.name}, ${months[index]}: ${season === "peak" ? "Peak" : season === "good" ? "Good" : "Low"}`} className={`mx-auto block h-8 min-w-8 rounded-md ${seasonClasses[season]}`} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-5 text-xs text-cream/85" aria-label="Season calendar legend">
        {([["peak", "Peak"], ["good", "Good"], ["low", "Low"]] as const).map(([key, label]) => <span key={key} className="inline-flex items-center gap-2"><i className={`size-3 rounded-sm ${seasonClasses[key].split(" ")[0]}`} />{label}</span>)}
      </div>
      <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {seasonHighlights.map((item) => (
          <Reveal key={item.title} className="rounded-2xl border border-white/15 bg-white/5 p-5">
            <h3 className="font-heading text-xl text-gold">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-cream/80">{item.description}</p>
          </Reveal>
        ))}
      </div>
      <div className="mt-9 text-center"><Button href="/travel-guide/best-time-to-visit" variant="light">Full Best-Time Guide</Button></div>
    </Container>
  );
}
