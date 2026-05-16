export default function TopBanner({ settings }) {
  const free = settings?.freeShippingBanner;
  const discount = settings?.discountBanner;

  if (!free?.enabled && !discount?.enabled) return null;

  return (
    <div className="bg-accent text-secondary text-center text-sm py-2.5 px-4">
      {discount?.enabled && discount.text && (
        <span className="font-medium">{discount.text}</span>
      )}
      {discount?.enabled && free?.enabled && <span className="mx-2 opacity-40">|</span>}
      {free?.enabled && <span>{free.text}</span>}
    </div>
  );
}
