import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Search, Users, Info, X, ChevronUp, ChevronDown, MapPin, MessageCircle } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MOCK_USERS } from "../data/mockUsers";

// Fix broken default marker icons in Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// ─── Types & Data ────────────────────────────────────────────────────────────

type VillageType = "capitale" | "ville" | "village";

interface Village {
  id: number;
  name: string;
  lat: number;
  lng: number;
  region: string;
  country: "Guinée-Bissau" | "Sénégal" | "Gambie";
  description: string;
  type: VillageType;
  population?: string;
  langue?: string;
  festivite?: string;
}

const VILLAGES: Village[] = [
  {
    id: 1, name: "Cacheu", lat: 12.271, lng: -16.163,
    region: "Cacheu", country: "Guinée-Bissau", type: "ville",
    description: "Capitale historique de la région de Cacheu et berceau culturel du peuple Manjak. Ancienne ville coloniale portugaise avec un fort historique du XVIe siècle.",
    population: "~8 000", langue: "Manjak, Portugais", festivite: "Festival de la pêche"
  },
  {
    id: 2, name: "Canchungo", lat: 12.068, lng: -15.942,
    region: "Cacheu", country: "Guinée-Bissau", type: "ville",
    description: "Principale ville économique de la région de Cacheu. Grand centre de rencontre de la communauté Manjak avec un marché hebdomadaire animé.",
    population: "~15 000", langue: "Manjak, Crioulo", festivite: "Marché du samedi"
  },
  {
    id: 3, name: "Caió", lat: 12.350, lng: -16.250,
    region: "Cacheu", country: "Guinée-Bissau", type: "village",
    description: "Village côtier traditionnel Manjak. Connu pour ses pêcheurs et ses traditions maritimes ancestrales transmises de génération en génération.",
    population: "~3 000", langue: "Manjak", festivite: "Fête de la mer"
  },
  {
    id: 4, name: "São Domingos", lat: 12.401, lng: -16.117,
    region: "Cacheu", country: "Guinée-Bissau", type: "village",
    description: "Village frontalier entre la Guinée-Bissau et le Sénégal. Pont culturel entre les deux communautés Manjak des deux pays.",
    population: "~4 500", langue: "Manjak, Wolof"
  },
  {
    id: 5, name: "Pelundo", lat: 12.317, lng: -16.450,
    region: "Cacheu", country: "Guinée-Bissau", type: "village",
    description: "Village traditionnel sur les rives de l'estuaire du Cacheu. Riche en mangroves et en biodiversité.",
    population: "~2 200", langue: "Manjak"
  },
  {
    id: 6, name: "Varela", lat: 12.183, lng: -16.533,
    region: "Cacheu", country: "Guinée-Bissau", type: "village",
    description: "Village balnéaire au bord de l'Atlantique. L'une des plus belles plages de Guinée-Bissau.",
    population: "~1 800", langue: "Manjak", festivite: "Fête de la plage"
  },
  {
    id: 7, name: "Calequisse", lat: 12.150, lng: -16.080,
    region: "Cacheu", country: "Guinée-Bissau", type: "village",
    description: "Village traditionnel Manjak au cœur de la région de Cacheu. Important centre de transmission des traditions orales.",
    population: "~2 500", langue: "Manjak"
  },
  {
    id: 8, name: "Bigene", lat: 12.333, lng: -15.767,
    region: "Cacheu", country: "Guinée-Bissau", type: "village",
    description: "Village à l'est de la région de Cacheu. Renommé pour son artisanat en bois sculpté.",
    population: "~3 200", langue: "Manjak, Balanta"
  },
  {
    id: 9, name: "Bula", lat: 12.150, lng: -15.850,
    region: "Cacheu", country: "Guinée-Bissau", type: "village",
    description: "Village au carrefour des routes de la région, animé par des échanges commerciaux et culturels.",
    population: "~4 000", langue: "Manjak, Crioulo"
  },
  {
    id: 10, name: "Jeta", lat: 12.300, lng: -16.100,
    region: "Cacheu", country: "Guinée-Bissau", type: "village",
    description: "Village sur l'île de Jeta, accessible par pirogue. Préservation exemplaire des traditions Manjak.",
    population: "~1 500", langue: "Manjak", festivite: "Rites d'initiation"
  },
  {
    id: 11, name: "Mansoa", lat: 12.067, lng: -15.300,
    region: "Oio", country: "Guinée-Bissau", type: "ville",
    description: "Capitale de la région d'Oio avec une présence Manjak notable. Centre administratif et commercial important.",
    population: "~10 000", langue: "Manjak, Fula"
  },
  {
    id: 12, name: "Quinhamel", lat: 11.870, lng: -15.850,
    region: "Biombo", country: "Guinée-Bissau", type: "village",
    description: "Village de la presqu'île de Biombo. Mondialement connu pour sa poterie traditionnelle.",
    population: "~5 000", langue: "Manjak, Papel", festivite: "Festival de poterie"
  },
  {
    id: 13, name: "Bissau", lat: 11.864, lng: -15.598,
    region: "Bissau", country: "Guinée-Bissau", type: "capitale",
    description: "Capitale nationale avec la plus grande diaspora Manjak urbaine. Hub culturel et économique.",
    population: "~600 000", langue: "Crioulo, Manjak", festivite: "Carnaval de Bissau"
  },
  {
    id: 14, name: "Nhacra", lat: 12.050, lng: -15.500,
    region: "Oio", country: "Guinée-Bissau", type: "village",
    description: "Village dans la région d'Oio avec traditions Manjak bien préservées.",
    population: "~2 800", langue: "Manjak"
  },
  {
    id: 15, name: "Ziguinchor", lat: 12.563, lng: -16.272,
    region: "Ziguinchor", country: "Sénégal", type: "ville",
    description: "Principale ville de Casamance avec une grande communauté Manjak active. Centre culturel et associatif incontournable.",
    population: "~230 000", langue: "Manjak, Wolof, Diola", festivite: "Festival Casamance"
  },
  {
    id: 16, name: "Kabrousse", lat: 12.667, lng: -16.733,
    region: "Ziguinchor", country: "Sénégal", type: "village",
    description: "Village frontalier en Casamance sénégalaise. Communauté Manjak vivant en harmonie avec les Diola.",
    population: "~8 000", langue: "Manjak, Diola"
  },
  {
    id: 17, name: "Dakar", lat: 14.693, lng: -17.447,
    region: "Dakar", country: "Sénégal", type: "capitale",
    description: "Capitale du Sénégal avec une très grande diaspora Manjak. Nombreuses associations culturelles actives.",
    population: "~3 500 000", langue: "Wolof, Manjak, Français", festivite: "Diaspora Day Manjak"
  },
  {
    id: 18, name: "Oussouye", lat: 12.485, lng: -16.545,
    region: "Ziguinchor", country: "Sénégal", type: "ville",
    description: "Ville de Casamance avec présence Manjak notable. Connue pour ses traditions spirituelles.",
    population: "~7 000", langue: "Manjak, Diola", festivite: "Fêtes traditionnelles"
  },
  {
    id: 19, name: "Thionck-Essyl", lat: 12.648, lng: -16.432,
    region: "Ziguinchor", country: "Sénégal", type: "village",
    description: "Village de Casamance avec communauté Manjak bien intégrée, réputé pour ses activités agricoles.",
    population: "~12 000", langue: "Manjak, Diola"
  },
  {
    id: 20, name: "Banjul", lat: 13.454, lng: -16.577,
    region: "Banjul", country: "Gambie", type: "capitale",
    description: "Capitale de la Gambie avec une communauté Manjak active, principalement composée de commerçants et de pêcheurs.",
    population: "~400 000", langue: "Mandinka, Manjak, Anglais"
  },
];

// ─── Config ───────────────────────────────────────────────────────────────────

const COUNTRY_CONFIG = {
  "Guinée-Bissau": { color: "#1E4D3A", light: "#e8f5ef", flag: "🇬🇼" },
  "Sénégal":       { color: "#C96A3D", light: "#fdf0ea", flag: "🇸🇳" },
  "Gambie":        { color: "#D4A64A", light: "#fdf8ed", flag: "🇬🇲" },
} as const;

const TYPE_EMOJI: Record<VillageType, string> = {
  capitale: "🏛️",
  ville:    "🏙️",
  village:  "🏡",
};

const TYPE_SIZE: Record<VillageType, number> = {
  capitale: 40,
  ville:    32,
  village:  24,
};

function createVillageIcon(v: Village, selected: boolean): L.DivIcon {
  const cfg = COUNTRY_CONFIG[v.country];
  const sz  = TYPE_SIZE[v.type];
  const ring = selected ? `box-shadow:0 0 0 5px ${cfg.color}55, 0 0 0 9px ${cfg.color}22;` : "";
  return L.divIcon({
    className: "",
    html: `
      <div style="
        position:relative;
        width:${sz}px; height:${sz}px;
        background:${selected ? "#fff" : cfg.color};
        border:3px solid ${cfg.color};
        border-radius:50% 50% 50% 4px;
        transform:rotate(-45deg);
        display:flex; align-items:center; justify-content:center;
        ${ring}
        cursor:pointer;
        transition:all .2s ease;
      ">
        <span style="transform:rotate(45deg); font-size:${sz * 0.42}px; line-height:1; display:block;">
          ${TYPE_EMOJI[v.type]}
        </span>
      </div>`,
    iconSize:    [sz, sz],
    iconAnchor:  [sz / 2, sz],
    popupAnchor: [0, -sz],
  });
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export function VillagesMap() {
  const navigate = useNavigate();
  const mapRef       = useRef<HTMLDivElement>(null);
  const leafletMap   = useRef<L.Map | null>(null);
  const markersRef   = useRef<Record<number, L.Marker>>({});

  const [search, setSearch]               = useState("");
  const [showSearch, setShowSearch]       = useState(false);
  const [activeCountry, setActiveCountry] = useState<string>("Tous");
  const [selected, setSelected]           = useState<Village | null>(null);
  const [panelOpen, setPanelOpen]         = useState(false);
  const [panelTab, setPanelTab]           = useState<"info" | "members">("info");

  const countries = ["Tous", "Guinée-Bissau", "Sénégal", "Gambie"];

  const filtered = VILLAGES.filter((v) => {
    const cOk = activeCountry === "Tous" || v.country === activeCountry;
    const sOk = !search ||
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.region.toLowerCase().includes(search.toLowerCase());
    return cOk && sOk;
  });

  // Initialise Leaflet once
  useEffect(() => {
    if (!mapRef.current || leafletMap.current) return;

    const map = L.map(mapRef.current, {
      center:          [12.2, -15.8],
      zoom:            7,
      zoomControl:     false,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
    }).addTo(map);

    leafletMap.current = map;

    return () => {
      map.remove();
      leafletMap.current = null;
    };
  }, []);

  // Sync markers when filtered list or selection changes
  useEffect(() => {
    const map = leafletMap.current;
    if (!map) return;

    // Remove all existing markers
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    // Add filtered markers
    filtered.forEach((v) => {
      const marker = L.marker([v.lat, v.lng], {
        icon: createVillageIcon(v, selected?.id === v.id),
      }).addTo(map);

      marker.on("click", () => {
        setSelected(v);
        setPanelOpen(true);
        map.flyTo([v.lat, v.lng], 11, { duration: 1.1 });
      });

      markersRef.current[v.id] = marker;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered.map(v => v.id).join(","), selected?.id]);

  function pick(v: Village) {
    setSelected(v);
    setPanelOpen(true);
    setPanelTab("info");
    leafletMap.current?.flyTo([v.lat, v.lng], 11, { duration: 1.1 });
    if (search) { setSearch(""); setShowSearch(false); }
  }

  const cfg = selected ? COUNTRY_CONFIG[selected.country] : null;
  const countBy = (c: string) => VILLAGES.filter((v) => v.country === c).length;
  const villageMembers = selected ? MOCK_USERS.filter(u => u.village === selected.name) : [];

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">

      {/* ─ Header ──────────────────────────────────────────────────────────── */}
      <div className="flex-shrink-0 bg-gradient-to-br from-[#1E4D3A] to-[#1a6347] text-white px-4 pt-12 pb-3 z-10">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-lg leading-tight">Carte des villages Manjak</h1>
            <p className="text-white/75 text-xs mt-0.5">{VILLAGES.length} villages · 3 pays</p>
          </div>
          <button
            onClick={() => setShowSearch((s) => !s)}
            className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>

        {showSearch && (
          <div className="mb-2 flex items-center gap-2 bg-white/20 rounded-2xl px-3 h-10">
            <Search className="w-4 h-4 text-white/70 flex-shrink-0" />
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un village, une région…"
              className="flex-1 bg-transparent text-white placeholder-white/60 text-sm outline-none"
            />
            {search && (
              <button onClick={() => setSearch("")}>
                <X className="w-4 h-4 text-white/70" />
              </button>
            )}
          </div>
        )}

        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {countries.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCountry(c)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeCountry === c
                  ? "bg-white text-[#1E4D3A] shadow-sm"
                  : "bg-white/20 text-white"
              }`}
            >
              {c === "Guinée-Bissau" ? "🇬🇼 Guinée-Bissau"
                : c === "Sénégal" ? "🇸🇳 Sénégal"
                : c === "Gambie"  ? "🇬🇲 Gambie"
                : "🌍 Tous"}
            </button>
          ))}
        </div>
      </div>

      {/* ─ Stats bar ─────────────────────────────────────────────────────────── */}
      <div className="flex-shrink-0 bg-white border-b border-gray-100 px-4 py-2 flex items-center gap-3 overflow-x-auto z-10" style={{ scrollbarWidth: "none" }}>
        {(["Guinée-Bissau", "Sénégal", "Gambie"] as const).map((c) => (
          <button
            key={c}
            onClick={() => setActiveCountry(c)}
            className="flex items-center gap-1.5 flex-shrink-0"
          >
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: COUNTRY_CONFIG[c].color }} />
            <span className="text-xs text-gray-600">{countBy(c)} {c === "Guinée-Bissau" ? "en G.-B." : c === "Sénégal" ? "au Sén." : "en Gambie"}</span>
          </button>
        ))}
        <span className="ml-auto text-xs text-gray-400 flex-shrink-0">{filtered.length} affichés</span>
      </div>

      {/* ─ Map ───────────────────────────────────────────────────────────────── */}
      <div className="flex-1 relative z-0" style={{ minHeight: 0 }}>
        <div ref={mapRef} style={{ width: "100%", height: "100%" }} />

        {/* Legend */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur rounded-2xl px-3 py-2.5 shadow-lg z-[1000] pointer-events-none">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1.5">Légende</p>
          {(Object.entries(TYPE_EMOJI) as [VillageType, string][]).map(([t, e]) => (
            <div key={t} className="flex items-center gap-1.5 mb-1 last:mb-0">
              <span className="text-sm leading-none">{e}</span>
              <span className="text-xs text-gray-600 capitalize">{t}</span>
            </div>
          ))}
        </div>

        {activeCountry !== "Tous" && (
          <button
            onClick={() => setActiveCountry("Tous")}
            className="absolute top-3 left-3 z-[1000] flex items-center gap-1 text-white rounded-full px-3 py-1 text-xs font-semibold shadow"
            style={{ background: COUNTRY_CONFIG[activeCountry as keyof typeof COUNTRY_CONFIG]?.color }}
          >
            {COUNTRY_CONFIG[activeCountry as keyof typeof COUNTRY_CONFIG]?.flag} {activeCountry}
            <X className="w-3 h-3 ml-0.5" />
          </button>
        )}
      </div>

      {/* ─ Search results ─────────────────────────────────────────────────────── */}
      {showSearch && search && (
        <div className="flex-shrink-0 bg-white border-t border-gray-100 z-20 max-h-52 overflow-y-auto shadow-lg">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-400 text-sm py-5">Aucun résultat pour « {search} »</p>
          ) : (
            filtered.map((v) => {
              const c = COUNTRY_CONFIG[v.country];
              return (
                <button
                  key={v.id}
                  onClick={() => pick(v)}
                  className="w-full flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-0 text-left active:bg-gray-50"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: c.light, border: `2px solid ${c.color}` }}
                  >
                    <span className="text-base leading-none">{TYPE_EMOJI[v.type]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900">{v.name}</p>
                    <p className="text-xs text-gray-500 truncate">{v.region} · {c.flag} {v.country}</p>
                  </div>
                  <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: c.color }} />
                </button>
              );
            })
          )}
        </div>
      )}

      {/* ─ Village detail bottom sheet ────────────────────────────────────────── */}
      {selected && cfg && (
        <div
          className="flex-shrink-0 bg-white rounded-t-3xl shadow-2xl z-30 transition-all duration-300 overflow-hidden"
          style={{ maxHeight: panelOpen ? "65vh" : "72px" }}
        >
          <div className="flex flex-col items-center pt-2.5 pb-2 px-4">
            <div className="w-10 h-1 bg-gray-200 rounded-full mb-2" />
            <button
              className="w-full flex items-center justify-between"
              onClick={() => setPanelOpen((o) => !o)}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: cfg.light, border: `2.5px solid ${cfg.color}` }}
                >
                  <span className="text-lg leading-none">{TYPE_EMOJI[selected.type]}</span>
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-900 text-sm leading-tight">{selected.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{selected.region} · {cfg.flag} {selected.country}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!panelOpen && selected.population && (
                  <span className="text-xs text-gray-400">{selected.population} hab.</span>
                )}
                {panelOpen
                  ? <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  : <ChevronUp   className="w-5 h-5 text-gray-400 flex-shrink-0" />
                }
              </div>
            </button>
          </div>

          {/* Tabs */}
          {panelOpen && (
            <div className="flex border-b border-gray-100 px-4">
              <button
                onClick={() => setPanelTab("info")}
                className={`py-2.5 mr-5 text-sm border-b-2 transition-colors ${panelTab === "info" ? "border-[#1E4D3A] text-[#1E4D3A]" : "border-transparent text-gray-400"}`}
                style={{ fontWeight: panelTab === "info" ? 600 : 400 }}
              >
                Infos
              </button>
              <button
                onClick={() => setPanelTab("members")}
                className={`py-2.5 text-sm border-b-2 transition-colors ${panelTab === "members" ? "border-[#C96A3D] text-[#C96A3D]" : "border-transparent text-gray-400"}`}
                style={{ fontWeight: panelTab === "members" ? 600 : 400 }}
              >
                Membres ({villageMembers.length > 0 ? villageMembers.length : "0"})
              </button>
            </div>
          )}

          <div className="overflow-y-auto px-4 pb-6" style={{ maxHeight: "calc(65vh - 110px)" }}>

            {/* ── Info tab ── */}
            {(!panelOpen || panelTab === "info") && (
              <>
                <div className="flex gap-2 mb-3 mt-3">
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-semibold text-white capitalize"
                    style={{ background: cfg.color }}
                  >
                    {TYPE_EMOJI[selected.type]} {selected.type}
                  </span>
                </div>

                <p className="text-sm text-gray-700 leading-relaxed mb-4">{selected.description}</p>

                <div className="grid grid-cols-2 gap-2.5 mb-3">
                  {selected.population && (
                    <div className="rounded-2xl p-3" style={{ background: cfg.light }}>
                      <div className="flex items-center gap-1.5 mb-1">
                        <Users className="w-3.5 h-3.5 flex-shrink-0" style={{ color: cfg.color }} />
                        <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: cfg.color }}>Population</span>
                      </div>
                      <p className="text-sm font-bold text-gray-900">{selected.population}</p>
                    </div>
                  )}
                  {selected.langue && (
                    <div className="rounded-2xl p-3" style={{ background: cfg.light }}>
                      <div className="flex items-center gap-1.5 mb-1">
                        <Info className="w-3.5 h-3.5 flex-shrink-0" style={{ color: cfg.color }} />
                        <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: cfg.color }}>Langues</span>
                      </div>
                      <p className="text-sm font-bold text-gray-900 leading-tight">{selected.langue}</p>
                    </div>
                  )}
                </div>

                {selected.festivite && (
                  <div className="rounded-2xl p-3 mb-3 border" style={{ background: "#fffbf0", borderColor: "#D4A64A55" }}>
                    <p className="text-[11px] font-bold text-[#C96A3D] mb-0.5 uppercase tracking-wide">🎉 Événement phare</p>
                    <p className="text-sm font-bold text-gray-900">{selected.festivite}</p>
                  </div>
                )}

                <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-2.5">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                  <span className="text-xs text-gray-400 font-mono">
                    {selected.lat.toFixed(4)}°N &nbsp;·&nbsp; {Math.abs(selected.lng).toFixed(4)}°O
                  </span>
                </div>
              </>
            )}

            {/* ── Members tab ── */}
            {panelOpen && panelTab === "members" && (
              <div className="mt-3">
                {villageMembers.length === 0 ? (
                  <div className="text-center py-6">
                    <Users className="w-10 h-10 text-gray-200 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm" style={{ fontWeight: 400 }}>Aucun membre enregistré pour ce village</p>
                    <p className="text-gray-300 text-xs mt-1" style={{ fontWeight: 400 }}>Inscrivez-vous en sélectionnant ce village</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {villageMembers.map((user) => (
                      <div key={user.id} className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-11 h-11 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>{user.name}</p>
                          <p className="text-gray-400 text-xs truncate" style={{ fontWeight: 400 }}>{user.bio}</p>
                          <p className="text-gray-300 text-xs mt-0.5" style={{ fontWeight: 400 }}>📍 {user.residence}</p>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <button
                            onClick={() => navigate(`/app/profile/${user.id}`)}
                            className="px-2.5 py-1 rounded-xl text-xs text-white"
                            style={{ background: cfg.color, fontWeight: 600 }}
                          >
                            Profil
                          </button>
                          <button
                            onClick={() => navigate(`/app/messages/${user.id}`)}
                            className="px-2.5 py-1 rounded-xl text-xs border flex items-center gap-1"
                            style={{ borderColor: cfg.color, color: cfg.color, fontWeight: 600 }}
                          >
                            <MessageCircle className="w-3 h-3" />
                            MSG
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {selected && !panelOpen && (
        <button
          onClick={() => setSelected(null)}
          className="absolute z-40 w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center shadow"
          style={{ bottom: "80px", right: "12px" }}
        >
          <X className="w-3.5 h-3.5 text-gray-500" />
        </button>
      )}

      <style>{`
        .leaflet-container { background: #dbe8d4; }
        .leaflet-attribution-flag { display: none !important; }
      `}</style>
    </div>
  );
}