import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function ListingsPage() {
  const { data: listings, error } = await supabase.from("units").select("*");

  if (error) {
    return (
      <main style={{ padding: "2rem" }}>
        <h1>Listings</h1>
        <p>Error loading listings.</p>

        <nav style={{ marginTop: "2rem" }}>
          <Link href="/">Home</Link>
        </nav>
      </main>
    );
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Listings</h1>

      {listings?.length === 0 && <p>No listings found.</p>}

      {listings?.map((item) => (
        <div key={item.id} style={{ marginBottom: "1.5rem" }}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </div>
      ))}

      <nav style={{ marginTop: "2rem" }}>
        <Link href="/">Home</Link>
      </nav>
    </main>
  );
}
