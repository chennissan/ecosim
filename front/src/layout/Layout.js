// src/layout/Layout.js
//Style done
import React from "react";
import { Outlet } from "react-router-dom";
import styles from "../styles/theme.module.css";
import Dashboard from "../base_pages/Dashboard";
import Sidebar from "../base_pages/Sidebar";


export default function Layout() {
  return (
    <div className={styles.layoutGrid}>
      <header className={styles.layoutHeader}>
        <Dashboard />
      </header>
      <aside className={styles.layoutMenu}>
        <Sidebar />
      </aside>
      <main className={styles.layoutMain}>
        <Outlet /> {/* Routed pages go here */}
      </main>
      <footer className={styles.layoutFooter}>
        <div className={styles.footerContent}>
          <div className={styles.footerQuote}>
            <h2>"When we try to pick out anything by itself, we find it hitched to everything else in the Universe."</h2>
            <h3>John Muir</h3>
          </div>
        </div>
      </footer>
    </div>
  );
}