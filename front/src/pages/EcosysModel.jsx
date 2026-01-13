import React, {useState } from "react";
import styles from "../styles/ecosystem.module.css";

const BIOME_BASELINES = {
  desert: { T0: 25, P0: 150, PET0: 2000, NPP0: 90 },
  tropical: { T0: 26, P0: 2500, PET0: 1400, NPP0: 2200 },
};

// "current values" (baseline- default UI state)
  const CURRENT_BASELINE = {
    biome: "desert",
    deltaT: 0,
    deltaP: 0,  
  };

  const PET_SCALE_PER_DEG = 1.07;


export default function EcosysModel() {


  // initialize state from CURRENT_BASELINE
  const [biome, setBiome] = useState(CURRENT_BASELINE.biome);
  const [deltaT, setDeltaT] = useState(CURRENT_BASELINE.deltaT);
  const [deltaP, setDeltaP] = useState(CURRENT_BASELINE.deltaP);

  //reset function
  const resetToCurrent = () => {
    setBiome(CURRENT_BASELINE.biome);
    setDeltaT(CURRENT_BASELINE.deltaT);
    setDeltaP(CURRENT_BASELINE.deltaP);
  };


  // --- Derived outputs (Stage 1) ---
  const base = BIOME_BASELINES[biome];
   // PET: temperature-driven evaporative demand (scaled from PET0)
  const PET = base.PET0 * (PET_SCALE_PER_DEG ** deltaT);
  // Precipitation response (percent change)
  const P = base.P0 * (1 + deltaP / 100);
  // WAI: water availability proxy = P / PET (clamped to 0..1)
  const WAI_raw = P / PET;
  const WAI = Math.max(0, Math.min(1, WAI_raw));

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Ecosystem Simulator</h1>
        <p className={styles.subtitle}>Desert vs. Tropical Rainforest — climate-driven response</p>
      </header>

      <div className={styles.grid}>
        {/* Parameters sidebar */}
        <aside className={styles.paramsPanel}>
          <h2 className={styles.panelTitle}>Parameters</h2>

          <label className={styles.field}>
            <span className={styles.label}>Biome</span>
            <select
              className={styles.control}
              value={biome}
              onChange={(e) => setBiome(e.target.value)}
            >
              <option value="desert">Desert</option>
              <option value="tropical">Tropical Rainforest</option>
            </select>
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Δ Temperature (°C)</span>
            <input
              className={styles.control}
              type="range"
              min={-5}
              max={8}
              step={0.5}
              value={deltaT}
              onChange={(e) => setDeltaT(Number(e.target.value))}
            />
            <div className={styles.valueRow}>
              <span className={styles.value}>{deltaT.toFixed(1)} °C</span>
            </div>
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Δ Precipitation (%)</span>
            <input
              className={styles.control}
              type="range"
              min={-50}
              max={50}
              step={5}
              value={deltaP}
              onChange={(e) => setDeltaP(Number(e.target.value))}
            />
            <div className={styles.valueRow}>
              <span className={styles.value}>{deltaP}%</span>
            </div>
          </label>

          <button
            className={styles.secondaryButton}
            onClick={resetToCurrent}>
            Reset
          </button>
        </aside>

        {/* Results */}
        <section className={styles.results}>
          <h2 className={styles.panelTitle}>Results (Stage 1)</h2>

          <div className={styles.cards}>
            {/* PET card (real output) */}
            <div className={styles.card}>
              <div className={styles.cardLabel}>PET (Potential Evapotranspiration)</div>
              <div className={styles.cardValue}>{Math.round(PET)}</div>
              <div className={styles.cardMeta}>
              Baseline: {base.PET0} mm/yr · ΔT: {deltaT.toFixed(1)}°C
              </div>
            </div>
            {/* WAI card (real output) */}
            <div className={styles.card}>
              <div className={styles.cardLabel}>WAI (Water Availability Index)</div>
              <div className={styles.cardValue}>{WAI.toFixed(2)}</div>
              <div className={styles.cardMeta}>
                P: {Math.round(P)} mm/yr · PET: {Math.round(PET)} mm/yr
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
