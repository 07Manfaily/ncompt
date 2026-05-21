import { useState, useMemo } from "react";

/* ─── Données ─────────────────────────────────────────── */
const initialData = [
  { id: "UC1", nbreAgence: 45, nbreCheque: 57, valeur: 22004800, chequeAConfirmer: 20 },
  { id: "UC2", nbreAgence: 12, nbreCheque: 30, valeur: 17000000, chequeAConfirmer: 20 },
  { id: "UC3", nbreAgence: 50, nbreCheque: 70, valeur: 140560000, chequeAConfirmer: 5  },
];

const categories = ["catégorie", "ID UC", "Nbre d'Agence", "Valeur", "Chèque à confirmer"];

const formatValeur = (val) => val.toLocaleString("fr-FR");

/* ─── CSS injecté (gardé séparé pour lisibilité) ─────── */
const css = `
.luc-page {
  min-height: 100vh;
  background-color: #f0f2f5;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 40px 16px;
  font-family: 'Segoe UI', sans-serif;
  box-sizing: border-box;
}
.luc-card {
  background-color: #fff;
  border-radius: 12px;
  padding: 32px 28px;
  width: 100%;
  max-width: 960px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
}
.luc-title {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 24px 0;
}
.luc-toolbar {
  display: flex;
  align-items: flex-end;
  gap: 20px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}
.luc-search-wrapper {
  position: relative;
  flex: 1;
  min-width: 200px;
}
.luc-search-input {
  width: 100%;
  padding: 10px 40px 10px 16px;
  border-radius: 20px;
  border: 1px solid #dde1e7;
  font-size: 14px;
  color: #444;
  outline: none;
  background-color: #f8f9fb;
  box-sizing: border-box;
  transition: border-color 0.2s;
}
.luc-search-input:focus { border-color: #4361ee; }
.luc-search-icon {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: #888;
  pointer-events: none;
}
.luc-sort-wrapper { display: flex; flex-direction: column; gap: 4px; }
.luc-sort-label   { font-size: 12px; color: #888; font-weight: 500; }
.luc-select-wrapper { position: relative; }
.luc-select {
  appearance: none;
  -webkit-appearance: none;
  padding: 10px 36px 10px 14px;
  border-radius: 8px;
  border: 1px solid #dde1e7;
  font-size: 14px;
  color: #333;
  background-color: #fff;
  cursor: pointer;
  outline: none;
  min-width: 160px;
  transition: border-color 0.2s;
}
.luc-select:focus { border-color: #4361ee; }
.luc-chevron {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: #555;
  pointer-events: none;
}
.luc-table-wrapper { overflow-x: auto; }
.luc-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  border: 1px solid #e2e8f0;
}
.luc-header-row { background-color: #f8f9fb; }
.luc-th {
  text-align: left;
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 600;
  color: #555;
  white-space: nowrap;
  border-right: 1px solid #e2e8f0;
  border-bottom: 2px solid #c8d0dc;
}
.luc-th:last-child  { border-right: none; }
.luc-th-checkbox    { width: 40px; }
.luc-row            { transition: background-color 0.15s; cursor: default; }
.luc-row:hover      { background-color: #f4f6ff !important; }
.luc-row-even       { background-color: #ffffff; }
.luc-row-odd        { background-color: #fafafa; }
.luc-row-selected   { background-color: #eef3ff !important; }
.luc-td {
  padding: 13px 16px;
  color: #333;
  border-bottom: 1px solid #e2e8f0;
  border-right: 1px solid #e2e8f0;
  white-space: nowrap;
}
.luc-td:last-child  { border-right: none; }
.luc-checkbox       { width: 15px; height: 15px; cursor: pointer; accent-color: #4361ee; }
.luc-cheque-link    { color: #4361ee; font-weight: 500; cursor: pointer; }
.luc-details-btn {
  background: none;
  border: none;
  color: #555;
  font-size: 14px;
  cursor: pointer;
  padding: 4px 0;
  font-family: inherit;
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.15s;
}
.luc-details-btn:hover { color: #4361ee; }
.luc-empty { text-align: center; padding: 32px; color: #aaa; font-size: 14px; }
`;

/* ─── Composant ───────────────────────────────────────── */
export default function ListeUnitesCommerciales() {
  const [search, setSearch]       = useState("");
  const [sortBy, setSortBy]       = useState("catégorie");
  const [selected, setSelected]   = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  /* filtered déclaré AVANT les handlers qui l'utilisent */
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return initialData
      .filter((row) => {
        if (!q) return true;
        return (
          row.id.toLowerCase().includes(q) ||
          String(row.nbreAgence).includes(q) ||
          String(row.nbreCheque).includes(q) ||
          String(row.valeur).includes(q) ||
          formatValeur(row.valeur).toLowerCase().includes(q) ||
          String(row.chequeAConfirmer).includes(q)
        );
      })
      .sort((a, b) => {
        if (sortBy === "ID UC")              return a.id.localeCompare(b.id);
        if (sortBy === "Nbre d'Agence")      return a.nbreAgence - b.nbreAgence;
        if (sortBy === "Valeur")             return a.valeur - b.valeur;
        if (sortBy === "Chèque à confirmer") return a.chequeAConfirmer - b.chequeAConfirmer;
        return 0;
      });
  }, [search, sortBy]);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelected([]);
    } else {
      setSelected(filtered.map((row) => row.id));
    }
    setSelectAll((prev) => !prev);
  };

  return (
    <>
      {/* Injection CSS — remplace l'import du fichier .css */}
      <style>{css}</style>

      <div className="luc-page">
        <div className="luc-card">

          <h2 className="luc-title">Liste des unité commerciales</h2>

          <div className="luc-toolbar">
            {/* Recherche */}
            <div className="luc-search-wrapper">
              <input
                type="text"
                placeholder="Rechercher"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="luc-search-input"
              />
              <span className="luc-search-icon">🔍</span>
            </div>

            {/* Tri */}
            <div className="luc-sort-wrapper">
              <label className="luc-sort-label">Trier</label>
              <div className="luc-select-wrapper">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="luc-select"
                >
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
                <span className="luc-chevron">▾</span>
              </div>
            </div>
          </div>

          <div className="luc-table-wrapper">
            <table className="luc-table">
              <thead>
                <tr className="luc-header-row">
                  <th className="luc-th luc-th-checkbox">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={toggleSelectAll}
                      className="luc-checkbox"
                    />
                  </th>
                  <th className="luc-th">ID UC</th>
                  <th className="luc-th">Nbre d'Agence</th>
                  <th className="luc-th">Nbre de chèque</th>
                  <th className="luc-th">Valeur</th>
                  <th className="luc-th">Chèque à confirmer</th>
                  <th className="luc-th">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, idx) => {
                  const isSelected = selected.includes(row.id);
                  const rowClass = [
                    "luc-row",
                    isSelected       ? "luc-row-selected"
                    : idx % 2 === 0  ? "luc-row-even"
                                     : "luc-row-odd",
                  ].join(" ");

                  return (
                    <tr key={row.id} className={rowClass}>
                      <td className="luc-td">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelect(row.id)}
                          className="luc-checkbox"
                        />
                      </td>
                      <td className="luc-td">{row.id}</td>
                      <td className="luc-td">{row.nbreAgence}</td>
                      <td className="luc-td">
                        <span className="luc-cheque-link">{row.nbreCheque}</span>
                      </td>
                      <td className="luc-td">{formatValeur(row.valeur)}</td>
                      <td className="luc-td">{row.chequeAConfirmer}</td>
                      <td className="luc-td">
                        <button
                          className="luc-details-btn"
                          onClick={() => alert(`Détails de ${row.id}`)}
                        >
                          Détails
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="luc-empty">
                      Aucun résultat trouvé.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </>
  );
} /* ===========================
   LISTE UNITÉS COMMERCIALES
   =========================== */

/* PAGE */
.luc-page {
  min-height: 100vh;
  background-color: #f0f2f5;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 40px 16px;
  font-family: 'Segoe UI', sans-serif;
  box-sizing: border-box;
}

/* CARD */
.luc-card {
  background-color: #fff;
  border-radius: 12px;
  padding: 32px 28px;
  width: 100%;
  max-width: 960px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
}

/* TITRE */
.luc-title {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 24px 0;
}

/* TOOLBAR */
.luc-toolbar {
  display: flex;
  align-items: flex-end;
  gap: 20px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

/* RECHERCHE */
.luc-search-wrapper {
  position: relative;
  flex: 1;
  min-width: 200px;
}

.luc-search-input {
  width: 100%;
  padding: 10px 40px 10px 16px;
  border-radius: 20px;
  border: 1px solid #dde1e7;
  font-size: 14px;
  color: #444;
  outline: none;
  background-color: #f8f9fb;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.luc-search-input:focus {
  border-color: #4361ee;
}

.luc-search-icon {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: #888;
  pointer-events: none;
}

/* TRI */
.luc-sort-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.luc-sort-label {
  font-size: 12px;
  color: #888;
  font-weight: 500;
}

.luc-select-wrapper {
  position: relative;
}

.luc-select {
  appearance: none;
  -webkit-appearance: none;
  padding: 10px 36px 10px 14px;
  border-radius: 8px;
  border: 1px solid #dde1e7;
  font-size: 14px;
  color: #333;
  background-color: #fff;
  cursor: pointer;
  outline: none;
  min-width: 160px;
  transition: border-color 0.2s;
}

.luc-select:focus {
  border-color: #4361ee;
}

.luc-chevron {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: #555;
  pointer-events: none;
}

/* TABLE WRAPPER */
.luc-table-wrapper {
  overflow-x: auto;
}

/* TABLE */
.luc-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  border: 1px solid #e2e8f0;
}

/* HEADER */
.luc-header-row {
  background-color: #f8f9fb;
}

.luc-th {
  text-align: left;
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 600;
  color: #555;
  white-space: nowrap;
  border-right: 1px solid #e2e8f0;
  border-bottom: 2px solid #c8d0dc;
}

.luc-th:last-child {
  border-right: none;
}

.luc-th-checkbox {
  width: 40px;
}

/* LIGNES */
.luc-row {
  transition: background-color 0.15s;
  cursor: default;
}

.luc-row:hover {
  background-color: #f4f6ff !important;
}

.luc-row-even    { background-color: #ffffff; }
.luc-row-odd     { background-color: #fafafa; }
.luc-row-selected { background-color: #eef3ff !important; }

/* CELLULES */
.luc-td {
  padding: 13px 16px;
  color: #333;
  border-bottom: 1px solid #e2e8f0;
  border-right: 1px solid #e2e8f0;
  white-space: nowrap;
}

.luc-td:last-child {
  border-right: none;
}

/* CHECKBOX */
.luc-checkbox {
  width: 15px;
  height: 15px;
  cursor: pointer;
  accent-color: #4361ee;
}

/* LIEN CHÈQUE */
.luc-cheque-link {
  color: #4361ee;
  font-weight: 500;
  cursor: pointer;
}

/* BOUTON DÉTAILS */
.luc-details-btn {
  background: none;
  border: none;
  color: #555;
  font-size: 14px;
  cursor: pointer;
  padding: 4px 0;
  font-family: inherit;
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.15s;
}

.luc-details-btn:hover {
  color: #4361ee;
}

/* VIDE */
.luc-empty {
  text-align: center;
  padding: 32px;
  color: #aaa;
  font-size: 14px;
}
