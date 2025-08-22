import BookingForm from "@/components/BookingForm";
import SEO from "@/lib/seo";
import { Suspense } from "react";

export default function BookPage() {
  return (
    <>
      <SEO
        title="Booking | A&P Buyer's Agency"
        description="Book a consultation with A&P Buyer's Agency to discuss your property needs."
        url="https://www.apbuyersagency.com.au/book"
      />
      <Suspense fallback={<div>Loading...</div>}>
        <BookingForm />
      </Suspense>
    </>
  );
}
