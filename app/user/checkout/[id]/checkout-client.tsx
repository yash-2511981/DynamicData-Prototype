import { checkDiscount } from "@/app/serveractions";

type CheckoutClientProp = {
  params: Promise<{ id: string }>;
};

const CheckoutClient = async ({ params }: CheckoutClientProp) => {
  const { id } = await params;
  const { payload: quote } = await checkDiscount(id);

  return (
    <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {quote?.product && (
        <section className="flex gap-4 rounded-xl bg-slate-50 p-4 shadow-sm border">
          <div className="flex items-center gap-4 justify-between w-full">
            <div className="flex gap-3">
              <h1 className="text-xl font-semibold text-slate-900">
                {quote?.product.name}
              </h1>

              <div className="flex gap-2 text-xs text-slate-600">
                {quote?.product.category && (
                  <span className="rounded-full bg-slate-200 px-2 flex items-center justify-center">
                    {quote?.product.category}
                  </span>
                )}
                {quote?.product.brand && (
                  <span className="rounded-full bg-slate-200 px-2 flex items-center justify-center">
                    {quote?.product.brand}
                  </span>
                )}
              </div>
            </div>

            <p className="text-sm text-slate-700 flex items-center">
              Price:{" "}
              <span className="font-semibold">₹{quote?.product.price}</span>
            </p>
          </div>
        </section>
      )}

      {quote && (
        <section className="rounded-xl bg-slate-50 p-4 text-sm space-y-2 border shadow-sm">
          <div className="flex justify-between border-b py-2">
            <span>Subtotal</span>
            <span className="font-semibold">₹{quote.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-b py-2 text-emerald-700">
            <span>Discount Name ( {quote?.discountName})</span>
            <span className="font-semibold">
              -₹{quote.discountAmount.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between border-b py-2">
            <span>After Discount</span>
            <span className="font-semibold">
              ₹{quote.amountAfterDiscount.toFixed(2)}
            </span>
          </div>

          {/* Fees */}
          {quote.fees.length > 0 &&
            quote.fees.map((fee) => (
              <div
                key={fee.name}
                className="flex justify-between border-b py-2 text-slate-600"
              >
                <span>{fee.name}</span>
                <span className="font-semibold">₹{fee.amount.toFixed(2)}</span>
              </div>
            ))}

          {/* Total Fees */}
          <div className="flex justify-between border-b py-2">
            <span>Total Fees</span>
            <span className="font-semibold">₹{quote.totalFees.toFixed(2)}</span>
          </div>

          {/* Final Total */}
          <div className="flex justify-between pt-2 text-base font-semibold">
            <span className="text-slate-900">Final Total</span>
            <span>₹{quote.totalPayable.toFixed(2)}</span>
          </div>
        </section>
      )}
    </div>
  );
};

export default CheckoutClient;
