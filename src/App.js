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
    .filter((row) => {
      const q = search.toLowerCase().trim();
      if (!q) return true;
      return (
        row.id.toLowerCase().includes(q) ||
        String(row.nbreAgence).includes(q) ||
        String(row.nbreCheque).includes(q) ||
        String(row.valeur).includes(q) ||
        String(row.chequeAConfirmer).includes(q)
      );
    })
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
    border: "1px solid #e2e8f0",
  },
  headerRow: {
    borderBottom: "2px solid #e2e8f0",
    backgroundColor: "#f8f9fb",
  },
  th: {
    textAlign: "left",
    padding: "12px 16px",
    fontSize: 13,
    fontWeight: 600,
    color: "#555",
    whiteSpace: "nowrap",
    borderRight: "1px solid #e2e8f0",
    borderBottom: "2px solid #c8d0dc",
  },
  row: {
    transition: "background 0.15s",
    cursor: "default",
  },
  td: {
    padding: "13px 16px",
    color: "#333",
    borderBottom: "1px solid #e2e8f0",
    borderRight: "1px solid #e2e8f0",
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
