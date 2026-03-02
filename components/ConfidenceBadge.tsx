import { cn } from "@/lib/utils";

export type DataConfidence = "high" | "medium" | "low";

interface ConfidenceBadgeProps {
  confidence: DataConfidence | null | undefined;
  className?: string;
  /** Si true, affiche "En cours" pour medium au lieu de "Vérifié partiel" */
  short?: boolean;
}

const LABELS: Record<DataConfidence, string> = {
  high: "Vérifié",
  medium: "En cours",
  low: "Non confirmé",
};

export function ConfidenceBadge({ confidence, className, short }: ConfidenceBadgeProps) {
  if (!confidence || confidence === "low") return null;

  const label = LABELS[confidence];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold",
        confidence === "high" && "bg-green-100 text-green-800",
        confidence === "medium" && "bg-amber-100 text-amber-800",
        className
      )}
      title={confidence === "high" ? "Données confirmées par plusieurs sources" : "Données en cours de vérification"}
    >
      {label}
    </span>
  );
}
