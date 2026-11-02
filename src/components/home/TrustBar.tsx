import { HeartHandshake, ShieldCheck, Sparkles, Users, UsersRound } from "lucide-react";
import { trustItems } from "@/data/home";
import Container from "@/components/ui/Container";

const icons = [Users, ShieldCheck, UsersRound, Sparkles, HeartHandshake];

export default function TrustBar() {
  return (
    <Container className="py-2">
      <div className="grid grid-cols-2 border-y border-gold/50 sm:grid-cols-3 lg:grid-cols-5">
        {trustItems.map((item, index) => {
          const Icon = icons[index];
          return (
            <div key={item.title} className="flex gap-3 border-b border-gold/30 px-3 py-5 last:border-0 sm:px-4 lg:border-b-0 lg:border-r lg:last:border-r-0">
              <Icon aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-terracotta" />
              <div>
                <h2 className="text-sm font-bold">{item.title}</h2>
                <p className="mt-1 text-xs leading-5 text-muted">{item.description}</p>
                {item.note ? <span className="sr-only">{item.note}</span> : null}
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
