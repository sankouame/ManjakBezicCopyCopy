import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, ChevronRight, Check, ChevronDown, MapPin, Globe, X } from "lucide-react";
import logo from "figma:asset/81d725438a4c9180c0f39c320c8caa2d5489af73.png";

// ── All Manjak villages (subset for registration) ──────────────────────────
const MANJAK_VILLAGES = [
  { name: "Cacheu", country: "Guinée-Bissau", region: "Cacheu" },
  { name: "Canchungo", country: "Guinée-Bissau", region: "Cacheu" },
  { name: "Caió", country: "Guinée-Bissau", region: "Cacheu" },
  { name: "São Domingos", country: "Guinée-Bissau", region: "Cacheu" },
  { name: "Pelundo", country: "Guinée-Bissau", region: "Cacheu" },
  { name: "Varela", country: "Guinée-Bissau", region: "Cacheu" },
  { name: "Calequisse", country: "Guinée-Bissau", region: "Cacheu" },
  { name: "Bigene", country: "Guinée-Bissau", region: "Cacheu" },
  { name: "Bula", country: "Guinée-Bissau", region: "Cacheu" },
  { name: "Jeta", country: "Guinée-Bissau", region: "Cacheu" },
  { name: "Mansoa", country: "Guinée-Bissau", region: "Oio" },
  { name: "Quinhamel", country: "Guinée-Bissau", region: "Biombo" },
  { name: "Bissau", country: "Guinée-Bissau", region: "Bissau" },
  { name: "Nhacra", country: "Guinée-Bissau", region: "Oio" },
  { name: "Ziguinchor", country: "Sénégal", region: "Ziguinchor" },
  { name: "Kabrousse", country: "Sénégal", region: "Ziguinchor" },
  { name: "Dakar", country: "Sénégal", region: "Dakar" },
  { name: "Oussouye", country: "Sénégal", region: "Ziguinchor" },
  { name: "Thionck-Essyl", country: "Sénégal", region: "Ziguinchor" },
  { name: "Banjul", country: "Gambie", region: "Banjul" },
];

const COUNTRIES = [
  "France", "Guinée-Bissau", "Sénégal", "Gambie", "Portugal", "Allemagne",
  "Espagne", "Italie", "Belgique", "Suisse", "Royaume-Uni", "Côte d'Ivoire",
  "Mali", "Guinée", "Mauritanie", "Maroc", "États-Unis", "Canada", "Autre",
];

const CITIES_BY_COUNTRY: Record<string, string[]> = {
  "France":       ["Paris", "Lyon", "Marseille", "Bordeaux", "Toulouse", "Nantes", "Strasbourg", "Nice", "Rennes", "Lille"],
  "Guinée-Bissau":["Bissau", "Bafatá", "Gabú", "Farim", "Canchungo", "Cacheu", "Bula", "Mansoa"],
  "Sénégal":      ["Dakar", "Touba", "Thiès", "Saint-Louis", "Kaolack", "Ziguinchor", "Mbour", "Diourbel"],
  "Gambie":       ["Banjul", "Serekunda", "Brikama", "Bakau", "Farafenni"],
  "Portugal":     ["Lisbonne", "Porto", "Faro", "Braga", "Setúbal"],
  "Autre":        ["Autre"],
};

type Step = 1 | 2 | 3;

export function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    name: "", email: "", password: "",
    village: "", villageCountry: "", villageRegion: "",
    residenceCountry: "", residenceCity: "",
  });
  const [villageSearch, setVillageSearch]   = useState("");
  const [showVillageDropdown, setShowVillageDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown]       = useState(false);

  const filteredVillages = MANJAK_VILLAGES.filter(v =>
    v.name.toLowerCase().includes(villageSearch.toLowerCase()) ||
    v.region.toLowerCase().includes(villageSearch.toLowerCase())
  );

  const availableCities = CITIES_BY_COUNTRY[formData.residenceCountry] || [];

  const handleNext = () => {
    if (step < 3) setStep((s) => (s + 1) as Step);
    else navigate("/app");
  };

  const canNext = () => {
    if (step === 1) return formData.name.trim() && formData.email.trim() && formData.password.length >= 6;
    if (step === 2) return formData.village.trim();
    if (step === 3) return formData.residenceCountry && formData.residenceCity;
    return false;
  };

  const STEP_LABELS = ["Compte", "Village", "Résidence"];

  return (
    <div className="flex flex-col min-h-screen overflow-y-auto" style={{ background: "#FEEECD" }}>
      {/* Header */}
      <div className="px-4 pt-10 pb-4 flex items-center" style={{ background: "#FEEECD", borderBottom: "1px solid rgba(30,77,58,0.13)" }}>
        <button
          onClick={() => step === 1 ? navigate("/login") : setStep((s) => (s - 1) as Step)}
          className="p-2 -ml-2"
          style={{ color: "#1A1A1A" }}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 flex justify-center">
          <img src={logo} alt="Bëzic" className="w-8 h-8 object-contain" />
        </div>
        <div className="w-9" />
      </div>

      {/* Step indicator */}
      <div className="px-6 pt-5 pb-2">
        <div className="flex items-center gap-2 mb-1">
          {([1, 2, 3] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs"
                style={{
                  background: step > s ? "#1E4D3A" : step === s ? "#1E4D3A" : "#EDD9A4",
                  color: step >= s ? "white" : "#8A7060",
                  fontWeight: 700,
                }}
              >
                {step > s ? <Check className="w-3.5 h-3.5" /> : s}
              </div>
              <div className="flex-1 h-1 rounded-full" style={{
                background: step > s ? "#1E4D3A" : "#EDD9A4",
                display: i < 2 ? "block" : "none",
              }} />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1 px-1">
          {STEP_LABELS.map((l, i) => (
            <span key={l} className="text-xs" style={{ color: step === i + 1 ? "#1E4D3A" : "#8A7060", fontWeight: step === i + 1 ? 600 : 400 }}>
              {l}
            </span>
          ))}
        </div>
      </div>

      {/* Form area */}
      <div className="flex-1 px-6 pt-4 pb-12">

        {/* ── Step 1: Account ── */}
        {step === 1 && (
          <div>
            <h1 className="mb-1" style={{ color: "#1A1A1A", fontWeight: 700, fontSize: "1.4rem" }}>Rejoignez-nous</h1>
            <p className="text-sm mb-6" style={{ color: "#8A7060", fontWeight: 400 }}>Créez votre compte Bëzic Manjakù</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#1A1A1A", fontWeight: 500 }}>Nom complet</label>
                <input
                  type="text"
                  placeholder="Votre nom et prénom"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-12 rounded-2xl px-4 text-sm outline-none border-2 border-transparent focus:border-[#1E4D3A]"
                  style={{ background: "#FFFFFF", color: "#1A1A1A" }}
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#1A1A1A", fontWeight: 500 }}>Email</label>
                <input
                  type="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-12 rounded-2xl px-4 text-sm outline-none border-2 border-transparent focus:border-[#1E4D3A]"
                  style={{ background: "#FFFFFF", color: "#1A1A1A" }}
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#1A1A1A", fontWeight: 500 }}>Mot de passe</label>
                <input
                  type="password"
                  placeholder="••••••••  (min. 6 caractères)"
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  className="w-full h-12 rounded-2xl px-4 text-sm outline-none border-2 border-transparent focus:border-[#1E4D3A]"
                  style={{ background: "#FFFFFF", color: "#1A1A1A" }}
                />
              </div>
            </div>
          </div>
        )}

        {/* ── Step 2: Village ── */}
        {step === 2 && (
          <div>
            <h2 className="mb-1" style={{ color: "#1A1A1A", fontWeight: 700, fontSize: "1.4rem" }}>Votre village d'origine</h2>
            <p className="text-sm mb-5" style={{ color: "#8A7060", fontWeight: 400 }}>
              Sélectionnez le village Manjak dont vous êtes originaire. Cela permettra à d'autres membres de vous retrouver.
            </p>

            {/* Selected village chip */}
            {formData.village && (
              <div className="flex items-center gap-2 mb-4 p-3 rounded-2xl" style={{ background: "#E8F0EC" }}>
                <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: "#1E4D3A" }} />
                <div className="flex-1">
                  <p className="text-sm" style={{ color: "#1E4D3A", fontWeight: 700 }}>{formData.village}</p>
                  <p className="text-xs" style={{ color: "#1E4D3A", opacity: 0.7, fontWeight: 400 }}>{formData.villageRegion} · {formData.villageCountry}</p>
                </div>
                <button onClick={() => setFormData({ ...formData, village: "", villageCountry: "", villageRegion: "" })}>
                  <X className="w-4 h-4" style={{ color: "#1E4D3A" }} />
                </button>
              </div>
            )}

            {/* Search */}
            <div className="relative mb-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#8A7060" }} />
              <input
                type="text"
                placeholder="Rechercher un village..."
                value={villageSearch}
                onFocus={() => setShowVillageDropdown(true)}
                onChange={e => { setVillageSearch(e.target.value); setShowVillageDropdown(true); }}
                className="w-full h-12 rounded-2xl pl-10 pr-4 text-sm outline-none border-2 border-transparent focus:border-[#1E4D3A]"
                style={{ background: "#FFFFFF", color: "#1A1A1A" }}
              />
            </div>

            {/* Village list */}
            {showVillageDropdown && (
              <div className="bg-white border border-gray-100 rounded-2xl shadow-lg max-h-60 overflow-y-auto mt-1">
                {filteredVillages.length === 0 && (
                  <p className="text-center text-gray-400 text-sm py-4">Aucun résultat</p>
                )}
                {filteredVillages.map((v) => (
                  <button
                    key={v.name}
                    onClick={() => {
                      setFormData({ ...formData, village: v.name, villageCountry: v.country, villageRegion: v.region });
                      setVillageSearch(v.name);
                      setShowVillageDropdown(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left border-b border-gray-50 last:border-0 active:bg-gray-50 ${formData.village === v.name ? "bg-[#E8F0EC]" : ""}`}
                  >
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: v.country === "Sénégal" ? "#F7EDE6" : v.country === "Gambie" ? "#F9F3E3" : "#E8F0EC" }}>
                      <span className="text-base leading-none">
                        {v.country === "Guinée-Bissau" ? "🇬🇼" : v.country === "Sénégal" ? "🇸🇳" : "🇬🇲"}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>{v.name}</p>
                      <p className="text-gray-400 text-xs" style={{ fontWeight: 400 }}>{v.region} · {v.country}</p>
                    </div>
                    {formData.village === v.name && <Check className="w-4 h-4" style={{ color: "#1E4D3A" }} />}
                  </button>
                ))}
              </div>
            )}

            <p className="text-xs mt-3 text-center" style={{ color: "#8A7060", fontWeight: 400 }}>
              Vous ne trouvez pas votre village ?{" "}
              <button className="underline" style={{ color: "#C96A3D" }} onClick={() => handleNext()}>Passer cette étape</button>
            </p>
          </div>
        )}

        {/* ── Step 3: Residence ── */}
        {step === 3 && (
          <div>
            <h2 className="mb-1" style={{ color: "#1A1A1A", fontWeight: 700, fontSize: "1.4rem" }}>Votre lieu de résidence</h2>
            <p className="text-sm mb-5" style={{ color: "#8A7060", fontWeight: 400 }}>
              Où habitez-vous actuellement ? Cela vous connectera aux membres et associations proches de chez vous.
            </p>

            {/* Country */}
            <div className="mb-4">
              <label className="block text-sm mb-1.5" style={{ color: "#1A1A1A", fontWeight: 500 }}>
                <Globe className="w-4 h-4 inline mr-1" />
                Pays de résidence
              </label>
              <button
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                className="w-full h-12 rounded-2xl px-4 flex items-center justify-between text-sm border-2"
                style={{
                  background: "#FFFFFF",
                  borderColor: formData.residenceCountry ? "#1E4D3A" : "transparent",
                }}
              >
                <span style={{ color: formData.residenceCountry ? "#1A1A1A" : "#8A7060", fontWeight: formData.residenceCountry ? 500 : 400 }}>
                  {formData.residenceCountry || "Sélectionnez un pays"}
                </span>
                <ChevronDown className="w-4 h-4" style={{ color: "#8A7060" }} />
              </button>
              {showCountryDropdown && (
                <div className="bg-white border border-gray-100 rounded-2xl shadow-lg max-h-48 overflow-y-auto mt-1">
                  {COUNTRIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => { setFormData({ ...formData, residenceCountry: c, residenceCity: "" }); setShowCountryDropdown(false); }}
                      className={`w-full flex items-center justify-between px-4 py-3 text-left border-b border-gray-50 last:border-0 text-sm ${formData.residenceCountry === c ? "bg-[#E8F0EC] text-[#1E4D3A]" : "text-gray-700"}`}
                      style={{ fontWeight: formData.residenceCountry === c ? 600 : 400 }}
                    >
                      {c}
                      {formData.residenceCountry === c && <Check className="w-4 h-4" style={{ color: "#1E4D3A" }} />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* City */}
            {formData.residenceCountry && (
              <div className="mb-4">
                <label className="block text-sm mb-1.5" style={{ color: "#1A1A1A", fontWeight: 500 }}>
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Ville de résidence
                </label>
                {availableCities.length > 1 ? (
                  <>
                    <button
                      onClick={() => setShowCityDropdown(!showCityDropdown)}
                      className="w-full h-12 rounded-2xl px-4 flex items-center justify-between text-sm border-2"
                      style={{
                        background: "#FFFFFF",
                        borderColor: formData.residenceCity ? "#1E4D3A" : "transparent",
                      }}
                    >
                      <span style={{ color: formData.residenceCity ? "#1A1A1A" : "#8A7060", fontWeight: formData.residenceCity ? 500 : 400 }}>
                        {formData.residenceCity || "Sélectionnez une ville"}
                      </span>
                      <ChevronDown className="w-4 h-4" style={{ color: "#8A7060" }} />
                    </button>
                    {showCityDropdown && (
                      <div className="bg-white border border-gray-100 rounded-2xl shadow-lg max-h-48 overflow-y-auto mt-1">
                        {availableCities.map((c) => (
                          <button
                            key={c}
                            onClick={() => { setFormData({ ...formData, residenceCity: c }); setShowCityDropdown(false); }}
                            className={`w-full flex items-center justify-between px-4 py-3 text-left border-b border-gray-50 last:border-0 text-sm ${formData.residenceCity === c ? "bg-[#E8F0EC] text-[#1E4D3A]" : "text-gray-700"}`}
                            style={{ fontWeight: formData.residenceCity === c ? 600 : 400 }}
                          >
                            {c}
                            {formData.residenceCity === c && <Check className="w-4 h-4" style={{ color: "#1E4D3A" }} />}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <input
                    type="text"
                    placeholder="Ex: Bruxelles, Amsterdam..."
                    value={formData.residenceCity}
                    onChange={e => setFormData({ ...formData, residenceCity: e.target.value })}
                    className="w-full h-12 rounded-2xl px-4 text-sm outline-none border-2 border-transparent focus:border-[#1E4D3A]"
                    style={{ background: "#FFFFFF", color: "#1A1A1A" }}
                  />
                )}
              </div>
            )}

            {/* Summary */}
            {formData.residenceCountry && formData.residenceCity && (
              <div className="rounded-2xl p-4 flex items-center gap-3" style={{ background: "#E8F0EC" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#D4A64A" }}>
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs" style={{ color: "#8A7060", fontWeight: 400 }}>Votre résidence</p>
                  <p className="text-sm" style={{ color: "#1A1A1A", fontWeight: 600 }}>{formData.residenceCity}, {formData.residenceCountry}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Next / Submit button */}
        <button
          onClick={handleNext}
          disabled={!canNext()}
          className="w-full h-13 rounded-2xl flex items-center justify-center gap-2 mt-8 transition-all shadow-sm"
          style={{
            height: "52px",
            background: canNext() ? "#1E4D3A" : "#EDD9A4",
            color: canNext() ? "white" : "#8A7060",
            fontWeight: 700,
            fontSize: "1rem",
          }}
        >
          {step < 3 ? (
            <><span>Continuer</span><ChevronRight className="w-5 h-5" /></>
          ) : (
            <><Check className="w-5 h-5" /><span>Créer mon compte</span></>
          )}
        </button>

        {step === 1 && (
          <div className="mt-5 text-center">
            <span className="text-sm" style={{ color: "#8A7060", fontWeight: 400 }}>Déjà un compte ? </span>
            <button onClick={() => navigate("/login")} className="text-sm" style={{ color: "#1E4D3A", fontWeight: 600 }}>
              Se connecter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}