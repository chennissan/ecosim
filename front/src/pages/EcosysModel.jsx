import React, { useMemo, useState } from "react";
import styles from "../styles/ecosystem.module.css";

export default function EcosysModel() {
  const [biome, setBiome] = useState("desert");
  const [deltaT, setDeltaT] = useState(0);
  const [deltaP, setDeltaP] = useState(0);

  // Temporary: just to prove the UI reacts (we’ll replace with real model output next)
  const preview = useMemo(() => {
    return { biome, deltaT, deltaP };
  }, [biome, deltaT, deltaP]);

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
            onClick={() => {
              setBiome("desert");
              setDeltaT(0);
              setDeltaP(0);
            }}
          >
            Reset
          </button>
        </aside>

        {/* Results */}
        <section className={styles.results}>
          <h2 className={styles.panelTitle}>Results</h2>

          <div className={styles.cards}>
            <div className={styles.card}>
              <div className={styles.cardLabel}>Preview (temporary)</div>
              <div className={styles.cardValue}>{preview.biome}</div>
              <div className={styles.cardMeta}>
                ΔT: {preview.deltaT.toFixed(1)}°C | ΔP: {preview.deltaP}%
              </div>
            </div>

            {/* Next step: PET / WAI / NPP cards */}
          </div>
        </section>
      </div>
    </div>
  );
}
