export const getTestimonials = async () => {
  try {
    const res = await fetch("/api/testimonials", { cache: "no-store" });
    const data = await res.json();
    const filteredData = Array.isArray(data)
      ? data.filter((item) => item.included)
      : [];

    return filteredData;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
  }
};
