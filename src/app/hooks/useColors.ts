import { useTheme } from "../context/ThemeContext";

/**
 * Tokens de couleurs adaptatifs dark / light — Bëzic Manjakù
 *
 * Mode clair  : fond crème #FEEECD, surfaces blanches, texte charbon chaud
 * Mode sombre : fond noir #111111, surfaces anthracite #1C1C1E, texte blanc doux
 */
export function useColors() {
  const { isDark } = useTheme();

  return {
    isDark,

    /* ── Fonds ────────────────────────────────────────────── */
    /** Fond de page */
    bg:       isDark ? "#111111" : "#FEEECD",
    /** Cartes, headers (blanc sur crème = contraste net) */
    surface:  isDark ? "#1C1C1E" : "#FFFFFF",
    /** Surfaces imbriquées légèrement différenciées */
    surface2: isDark ? "#2C2C2E" : "#FBF2E0",

    /* ── Textes ───────────────────────────────────────────── */
    /** Titre / texte principal — charbon chaud très lisible */
    txt:      isDark ? "#F2F2F2" : "#1A1A1A",
    /** Texte secondaire — ton brun chaud */
    txtSub:   isDark ? "#ABABAB" : "#3D2B1F",
    /** Hints, timestamps, labels discrets */
    muted:    isDark ? "#8E8E93" : "#8A7060",

    /* ── Bordures ─────────────────────────────────────────── */
    /** Légèrement teintées vert en clair, blanches opaques en sombre */
    border:   isDark ? "rgba(255,255,255,0.07)" : "rgba(30,77,58,0.13)",

    /* ── Chips & Inputs ───────────────────────────────────── */
    /** Fond de chips de filtre, badges neutres */
    chip:     isDark ? "#2C2C2E" : "#F0DDB8",
    /** Fond des champs input (blanc en clair pour netteté) */
    input:    isDark ? "#2C2C2E" : "#FFFFFF",

    /* ── Couleurs marque ──────────────────────────────────── */
    green:    "#1E4D3A",
    /** Fond de badge vert */
    greenBg:  isDark ? "rgba(30,77,58,0.22)"   : "#DFF0E8",
    terra:    "#C96A3D",
    /** Fond de badge terre cuite */
    terraBg:  isDark ? "rgba(201,106,61,0.18)"  : "#FAE9DE",
    gold:     "#D4A64A",
    /** Fond de badge or */
    goldBg:   isDark ? "rgba(212,166,74,0.18)"  : "#FBF1D7",
    cream:    "#FEEECD",
    /** Fond crème adapté (reste visible sur crème en ajoutant une ombre) */
    creamBg:  isDark ? "#1C1C1E"                : "#F5E4C0",

    /* ── Danger ───────────────────────────────────────────── */
    danger:   isDark ? "#FF453A" : "#D4183D",
    dangerBg: isDark ? "rgba(255,69,58,0.15)" : "#FDEAEC",
  };
}
