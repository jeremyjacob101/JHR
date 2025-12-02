export default function HomePage() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Welcome to My Site</h1>
      <p>This is the homepage.</p>

      <nav style={{ marginTop: "2rem" }}>
        <a href="/listings" style={{ marginRight: "1rem" }}>
          Listings
        </a>
        <a href="/contact">Contact</a>
      </nav>
    </main>
  );
}
