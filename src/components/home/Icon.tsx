import {
  ArrowDown, ArrowDownRight, ArrowRight, CalendarDays, Camera, Check, CheckCircle2,
  ChevronDown, Compass, HeartHandshake, Map, MapPin, MapPinned, MessageCircle,
  Mountain, Plane, ShieldCheck, Sparkles, Star, Users, UsersRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const icons: Record<string, LucideIcon> = {
  "arrow-down": ArrowDown,
  "arrow-down-right": ArrowDownRight,
  "arrow-right": ArrowRight,
  calendar: CalendarDays,
  camera: Camera,
  check: Check,
  "check-circle": CheckCircle2,
  "chevron-down": ChevronDown,
  compass: Compass,
  "heart-handshake": HeartHandshake,
  map: Map,
  "map-pin": MapPin,
  "map-pinned": MapPinned,
  "message-circle": MessageCircle,
  mountain: Mountain,
  plane: Plane,
  shield: ShieldCheck,
  "shield-check": ShieldCheck,
  sparkles: Sparkles,
  star: Star,
  users: Users,
  "users-round": UsersRound,
};

export default function Icon({ name, className = "size-5", ...props }: { name: string; className?: string; "aria-hidden"?: boolean }) {
  const Component = icons[name] ?? Compass;
  return <Component className={className} {...props} />;
}
