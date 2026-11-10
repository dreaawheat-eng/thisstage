import { INDOOR } from "@/data/indoor";
import { SectionHead } from "@/components/thisstage/ui";

export function Indoor() {
  return (
    <div>
      <p className="mb-3 text-sm font-medium text-terra">The toddler</p>
      <SectionHead title="Inside" sub="Free play for a day that stays home. Uses what you already have." />
      <ul className="space-y-3">
        {INDOOR.map((play) => (
          <li key={play.id} className="rounded-3xl border border-line bg-cream px-4 py-4">
            <p className="text-sm font-medium text-terra">{play.tag}</p>
            <h3 className="mt-1 font-medium">{play.title}</h3>
            <p className="mt-1 text-sm leading-relaxed">{play.line}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
