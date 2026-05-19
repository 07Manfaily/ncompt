import { useState } from "react";

const DGARetail = () => {
  const [hoveredLink, setHoveredLink] = useState(null);

  const styles = {
    wrapper: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f0f2f5 0%, #e8eaf0 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: "24px",
    },
    card: {
      background: "#ffffff",
      borderRadius: "16px",
      padding: "32px 36px",
      width: "100%",
      maxWidth: "860px",
      boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
    },
    title: {
      textAlign: "center",
      fontSize: "22px",
      fontWeight: "700",
      color: "#1a1a2e",
      marginBottom: "28px",
      letterSpacing: "0.3px",
    },
    body: {
      display: "flex",
      gap: "24px",
      alignItems: "stretch",
    },

    // LEFT PANEL
    leftPanel: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      flex: "0 0 auto",
      width: "200px",
    },
    metricCard: {
      background: "#f7f8fa",
      borderRadius: "12px",
      padding: "18px 20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "6px",
    },
    iconBox: {
      width: "40px",
      height: "40px",
      borderRadius: "8px",
      background: "#E2001A",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "6px",
    },
    metricLabel: {
      fontSize: "13px",
      fontWeight: "600",
      color: "#555",
      margin: 0,
    },
    metricValue: {
      fontSize: "28px",
      fontWeight: "700",
      color: "#1a1a2e",
      margin: 0,
      lineHeight: 1.1,
    },
    link: {
      fontSize: "12px",
      color: "#020235",
      textDecoration: "underline",
      cursor: "pointer",
      marginTop: "2px",
      opacity: 0.7,
      transition: "opacity 0.2s",
    },
    linkHovered: {
      opacity: 1,
    },

    // DIVIDER
    divider: {
      width: "1px",
      background: "#e5e7eb",
      margin: "0 4px",
      borderRadius: "1px",
    },

    // RIGHT PANEL
    rightPanel: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    confirmHeader: {
      textAlign: "center",
    },
    confirmLabel: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#5B4FCF",
      margin: 0,
    },
    confirmValue: {
      fontSize: "36px",
      fontWeight: "700",
      color: "#1a1a2e",
      margin: "2px 0 0 0",
      lineHeight: 1,
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "1px",
      background: "#e5e7eb",
      borderRadius: "10px",
      overflow: "hidden",
    },
    statCell: {
      background: "#f7f8fa",
      padding: "14px 10px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "4px",
    },
    statLabel: {
      fontSize: "12px",
      fontWeight: "600",
      color: "#444",
      textAlign: "center",
      margin: 0,
    },
    statCount: (color) => ({
      fontSize: "26px",
      fontWeight: "700",
      color: color || "#1a1a2e",
      margin: 0,
      lineHeight: 1,
    }),
    statAmount: {
      fontSize: "11px",
      color: "#888",
      margin: 0,
      textAlign: "center",
    },
    moreDetails: {
      textAlign: "center",
      fontSize: "12px",
      color: "#020235",
      textDecoration: "underline",
      cursor: "pointer",
      opacity: 0.7,
    },
  };

  const CheckIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="14" height="3" rx="1" fill="white" />
      <rect x="3" y="11" width="14" height="3" rx="1" fill="white" />
      <path d="M16 15l2.5 2.5L22 13" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const MoneyIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="6" width="20" height="13" rx="2" stroke="white" strokeWidth="2" />
      <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2" />
      <path d="M6 9v0M18 15v0" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        {/* TITLE */}
        <h2 style={styles.title}>DGA retail</h2>

        <div style={styles.body}>
          {/* LEFT PANEL */}
          <div style={styles.leftPanel}>
            {/* Nbre de chèque */}
            <div style={styles.metricCard}>
              <div style={styles.iconBox}>
                <CheckIcon />
              </div>
              <p style={styles.metricLabel}>Nbre de chèque</p>
              <p style={styles.metricValue}>150</p>
              <span
                style={{
                  ...styles.link,
                  ...(hoveredLink === "cheque" ? styles.linkHovered : {}),
                }}
                onMouseEnter={() => setHoveredLink("cheque")}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Détails
              </span>
            </div>

            {/* Valeur */}
            <div style={styles.metricCard}>
              <div style={styles.iconBox}>
                <MoneyIcon />
              </div>
              <p style={styles.metricLabel}>Valeur</p>
              <p style={{ ...styles.metricValue, fontSize: "22px" }}>
                132 450 000
              </p>
              <span
                style={{
                  ...styles.link,
                  ...(hoveredLink === "valeur" ? styles.linkHovered : {}),
                }}
                onMouseEnter={() => setHoveredLink("valeur")}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Détails
              </span>
            </div>
          </div>

          {/* DIVIDER */}
          <div style={styles.divider} />

          {/* RIGHT PANEL */}
          <div style={styles.rightPanel}>
            {/* Header chèque à confirmer */}
            <div style={styles.confirmHeader}>
              <p style={styles.confirmLabel}>Chèque à confirmer</p>
              <p style={styles.confirmValue}>157</p>
            </div>

            {/* Stats grid */}
            <div style={styles.statsGrid}>
              {/* Validés */}
              <div style={styles.statCell}>
                <p style={styles.statLabel}>Validés</p>
                <p style={styles.statCount("#2EB85C")}>45</p>
                <p style={styles.statAmount}>1 000 004 587</p>
              </div>

              {/* Réfusés */}
              <div style={styles.statCell}>
                <p style={styles.statLabel}>Réfusés</p>
                <p style={styles.statCount("#E2001A")}>5</p>
                <p style={{ ...styles.statAmount, color: "#E2001A" }}>
                  21 000 000
                </p>
              </div>

              {/* Appel infructeux */}
              <div style={styles.statCell}>
                <p style={styles.statLabel}>Appel infructeux</p>
                <p style={styles.statCount("#1a1a2e")}>2</p>
                <p style={styles.statAmount}>700 000</p>
              </div>

              {/* Non traités */}
              <div style={styles.statCell}>
                <p style={styles.statLabel}>Non traités</p>
                <p style={styles.statCount("#1a1a2e")}>7</p>
                <p style={styles.statAmount}>10 000 000</p>
              </div>
            </div>

            {/* Plus de détails */}
            <div>
              <span
                style={{
                  ...styles.moreDetails,
                  ...(hoveredLink === "more" ? { opacity: 1 } : {}),
                }}
                onMouseEnter={() => setHoveredLink("more")}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Plus de détails
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DGARetail;
