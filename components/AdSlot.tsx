/**
 * Emplacements réservés pour bandeaux publicitaires (ex. Google AdSense).
 * Invisibles et sans espace occupé : le visiteur ne voit rien.
 * Pour activer plus tard : ajouter les dimensions (data-width, data-height) et le script pub dans ces éléments.
 * Tailles standards prévues : 160x600 (skyscraper), 300x250 (rectangle).
 */
export function AdSlotSkyscraper() {
  return (
    <aside
      className="hidden shrink-0 overflow-hidden lg:block"
      style={{ width: 0, minWidth: 0, minHeight: 0 }}
      data-ad-slot="skyscraper"
      data-ad-size="160x600"
      aria-hidden
    />
  );
}

export function AdSlotRectangle() {
  return (
    <aside
      className="hidden shrink-0 overflow-hidden md:block"
      style={{ width: 0, minWidth: 0, minHeight: 0 }}
      data-ad-slot="rectangle"
      data-ad-size="300x250"
      aria-hidden
    />
  );
}
