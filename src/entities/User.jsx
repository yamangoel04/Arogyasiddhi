// src/entities/User.jsx

export class User {
  static async me() {
    // simulate API call
    return {
      full_name: "Tara Sharma",
      email: "tara@example.com",
      age: 25,
      weight: 72,
      height: 160,
      prakriti: {
        dominant_dosha: "vata-pitta"
      }
    };
  }

  static async logout() {
    // simulate logout
    console.log("User logged out");
  }
}
