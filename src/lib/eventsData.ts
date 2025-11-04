export const getEvents = async () => {
  try {
    const res = await fetch("/api/events", { cache: "no-store" });
    const data = await res.json();
    const filteredData = Array.isArray(data)
      ? data.filter((item) => item.included)
      : [];

    return filteredData;
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};

export const getWebinars = async () => {
  try {
    const res = await fetch("/api/webinars", { cache: "no-store" });
    const data = await res.json();
    const filteredData = Array.isArray(data)
      ? data.filter((item) => item.included)
      : [];

    return filteredData;
  } catch (error) {
    console.error("Error fetching webinars:", error);
  }
};

export const getNewsletters = async () => {
  try {
    const res = await fetch("/api/newsletters", { cache: "no-store" });
    const data = await res.json();
    const filteredData = Array.isArray(data)
      ? data.filter((item) => item.included)
      : [];

    return filteredData;
  } catch (error) {
    console.error("Error fetching newsletters:", error);
  }
};
