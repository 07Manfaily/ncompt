/* ===== PAGE ===== */
.luc-page {
  min-height: 100vh;
  background-color: #f0f2f5;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 40px 16px;
  font-family: 'Segoe UI', sans-serif;
}

/* ===== CARD ===== */
.luc-card {
  background-color: #fff;
  border-radius: 12px;
  padding: 32px 28px;
  width: 100%;
  max-width: 960px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
}

/* ===== TITRE ===== */
.luc-title {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 24px;
}

/* ===== TOOLBAR ===== */
.luc-toolbar {
  display: flex;
  align-items: flex-end;
  gap: 20px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

/* ===== RECHERCHE ===== */
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

/* ===== TRI ===== */
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

/* ===== TABLE ===== */
.luc-table-wrapper {
  overflow-x: auto;
}

.luc-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  border: 1px solid #e2e8f0;
}

/* ===== HEADER ===== */
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

/* ===== ROWS ===== */
.luc-row {
  transition: background 0.15s;
  cursor: default;
}

.luc-row:hover {
  background-color: #f4f6ff !important;
}

.luc-row-even {
  background-color: #fff;
}

.luc-row-odd {
  background-color: #fafafa;
}

.luc-row-selected {
  background-color: #eef3ff !important;
}

/* ===== TD ===== */
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

/* ===== CHECKBOX ===== */
.luc-checkbox {
  width: 15px;
  height: 15px;
  cursor: pointer;
  accent-color: #4361ee;
}

/* ===== CHEQUE LINK ===== */
.luc-cheque-link {
  color: #4361ee;
  font-weight: 500;
  cursor: pointer;
}

/* ===== BOUTON DÉTAILS ===== */
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

/* ===== EMPTY ===== */
.luc-empty {
  text-align: center;
  padding: 32px;
  color: #aaa;
  font-size: 14px;
}
import { useState } from "react";

const initialData = [
  { id: "UC1", nbreAgence: 45, nbreCheque: 57, valeur: 22004800, chequeAConfirmer: 20 },
  { id: "UC2", nbreAgence: 12, nbreCheque: 30, valeur: 17000000, chequeAConfirmer: 20 },
  { id: "UC3", nbreAgence: 50, nbreCheque: 70, valeur: 140560000, chequeAConfirmer: 5 },
];

const categories = ["catégorie", "ID UC", "Nbre d'Agence", "Valeur", "Chèque à confirmer"];

const formatValeur = (val) => val.toLocaleString("fr-FR");

export default function ListeUnitesCommerciales() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("catégorie");
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

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
    setSelectAll(!selectAll);
  };

  const filtered = initialData
    .filter((row) =>
      row.id.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "ID UC") return a.id.localeCompare(b.id);
      if (sortBy === "Nbre d'Agence") return a.nbreAgence - b.nbreAgence;
      if (sortBy === "Valeur") return a.valeur - b.valeur;
      if (sortBy === "Chèque à confirmer") return a.chequeAConfirmer - b.chequeAConfirmer;
      return 0;
    });

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Titre */}
        <h2 style={styles.title}>Liste des unité commerciales</h2>

        {/* Barre recherche + tri */}
        <div style={styles.toolbar}>
          <div style={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Rechercher"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
            />
            <span style={styles.searchIcon}>🔍</span>
          </div>

          <div style={styles.sortWrapper}>
            <label style={styles.sortLabel}>Trier</label>
            <div style={styles.selectWrapper}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={styles.select}
              >
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <span style={styles.chevron}>▾</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.headerRow}>
                <th style={{ ...styles.th, width: 40 }}>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                    style={styles.checkbox}
                  />
                </th>
                <th style={styles.th}>ID UC</th>
                <th style={styles.th}>Nbre d'Agence</th>
                <th style={styles.th}>Nbre de chèque</th>
                <th style={styles.th}>Valeur</th>
                <th style={styles.th}>Chèque à confirmer</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, idx) => {
                const isSelected = selected.includes(row.id);
                return (
                  <tr
                    key={row.id}
                    style={{
                      ...styles.row,
                      backgroundColor: isSelected
                        ? "#eef3ff"
                        : idx % 2 === 0
                        ? "#fff"
                        : "#fafafa",
                    }}
                  >
                    <td style={styles.td}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(row.id)}
                        style={styles.checkbox}
                      />
                    </td>
                    <td style={styles.td}>{row.id}</td>
                    <td style={styles.td}>{row.nbreAgence}</td>
                    <td style={styles.td}>
                      <span style={styles.chequeLink}>{row.nbreCheque}</span>
                    </td>
                    <td style={styles.td}>{formatValeur(row.valeur)}</td>
                    <td style={styles.td}>{row.chequeAConfirmer}</td>
                    <td style={styles.td}>
                      <button
                        style={styles.detailsBtn}
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
                  <td colSpan={7} style={styles.empty}>
                    Aucun résultat trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "40px 16px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: "32px 28px",
    width: "100%",
    maxWidth: 960,
    boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
    color: "#1a1a2e",
    marginBottom: 24,
  },
  toolbar: {
    display: "flex",
    alignItems: "flex-end",
    gap: 20,
    marginBottom: 28,
    flexWrap: "wrap",
  },
  searchWrapper: {
    position: "relative",
    flex: 1,
    minWidth: 200,
  },
  searchInput: {
    width: "100%",
    padding: "10px 40px 10px 16px",
    borderRadius: 20,
    border: "1px solid #dde1e7",
    fontSize: 14,
    color: "#444",
    outline: "none",
    backgroundColor: "#f8f9fb",
    boxSizing: "border-box",
  },
  searchIcon: {
    position: "absolute",
    right: 14,
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: 14,
    color: "#888",
    pointerEvents: "none",
  },
  sortWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  sortLabel: {
    fontSize: 12,
    color: "#888",
    fontWeight: 500,
  },
  selectWrapper: {
    position: "relative",
  },
  select: {
    appearance: "none",
    WebkitAppearance: "none",
    padding: "10px 36px 10px 14px",
    borderRadius: 8,
    border: "1px solid #dde1e7",
    fontSize: 14,
    color: "#333",
    backgroundColor: "#fff",
    cursor: "pointer",
    outline: "none",
    minWidth: 160,
  },
  chevron: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: 14,
    color: "#555",
    pointerEvents: "none",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 14,
  },
  headerRow: {
    borderBottom: "2px solid #e2e8f0",
  },
  th: {
    textAlign: "left",
    padding: "12px 16px",
    fontSize: 13,
    fontWeight: 600,
    color: "#555",
    whiteSpace: "nowrap",
  },
  row: {
    transition: "background 0.15s",
    cursor: "default",
  },
  td: {
    padding: "13px 16px",
    color: "#333",
    borderBottom: "1px solid #f0f0f0",
    whiteSpace: "nowrap",
  },
  checkbox: {
    width: 15,
    height: 15,
    cursor: "pointer",
    accentColor: "#4361ee",
  },
  chequeLink: {
    color: "#4361ee",
    fontWeight: 500,
    cursor: "pointer",
    textDecoration: "none",
  },
  detailsBtn: {
    background: "none",
    border: "none",
    color: "#555",
    fontSize: 14,
    cursor: "pointer",
    padding: "4px 0",
    fontFamily: "inherit",
    textDecoration: "underline",
    textUnderlineOffset: 3,
  },
  empty: {
    textAlign: "center",
    padding: 32,
    color: "#aaa",
    fontSize: 14,
  },
};
