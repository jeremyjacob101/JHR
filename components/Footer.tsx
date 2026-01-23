export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--navy)] text-[#FAF9F6]">
      <div className="max-w-5xl mx-auto px-5 py-8 text-sm">
        {/* Mobile: flex col (ordered). Desktop: grid puts copyright under title */}
        <div className="flex flex-col gap-6 text-center md:text-left md:grid md:grid-cols-2 md:grid-rows-2 md:gap-x-10 md:gap-y-2 md:items-start">
          {/* Always first */}
          <p className="order-1 text-sm font-semibold tracking-[0.18em] uppercase md:order-none md:col-start-1 md:row-start-1">
            Jerusalem Heritage Realty
          </p>

          {/* Contact should be second on mobile, right on desktop */}
          <div className="order-2 text-sm text-gray-400 md:order-none md:col-start-2 md:row-start-1 md:row-span-2 md:text-right">
            <p>Phone: +972-53-454-5304</p>
            <p>Email: office@jhrisrael.com</p>
          </div>

          {/* Copyright last on mobile; under title on desktop */}
          <p className="order-3 text-sm text-gray-400 md:order-none md:col-start-1 md:row-start-2">
            © {year} Jerusalem Heritage Realty. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
