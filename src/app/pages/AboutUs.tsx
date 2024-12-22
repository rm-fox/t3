"use client";

const AboutUs = () => {
  return (
    <div style={styles.page}>
      <h1 style={styles.header}>About Us</h1>
      <p style={styles.text}>
        Risk Manager is your trusted tool for managing trading risks. Our mission is to empower traders with the insights and tools needed to trade responsibly and effectively.
      </p>
    </div>
  );
};

const styles = {
  page: {
    fontFamily: "Arial, sans-serif",
    height: "100vh",
    display: "flex",
    flexDirection: "column" as "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    textAlign: "center" as "center",
    padding: "20px",
  },
  header: {
    fontSize: "36px",
    marginBottom: "20px",
    color: "#333",
  },
  text: {
    fontSize: "18px",
    lineHeight: "1.6",
    color: "#666",
    maxWidth: "600px",
  },
};

export default AboutUs;
