export const Food = {
  name: "",
  category: "other", // default category
  nutrients: {
    calories_per_100g: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    vitamins: {},
    minerals: {}
  },
  ayurvedic_properties: {
    rasa: [],
    virya: "",
    vipaka: "",
    guna: [],
    digestibility: "",
    dosha_effects: {
      vata: "neutral",
      pitta: "neutral",
      kapha: "neutral"
    }
  },
  contraindications: [],
  best_time_to_consume: [],
  seasonal_suitability: []
};
