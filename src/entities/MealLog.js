export const MealLog ={
  "name": "MealLog",
  "type": "object",
  "properties": {
    "user_id": {
      "type": "string",
      "description": "User ID"
    },
    "date": {
      "type": "string",
      "format": "date",
      "description": "Date of meal"
    },
    "meal_type": {
      "type": "string",
      "enum": [
        "breakfast",
        "mid_morning",
        "lunch",
        "evening_snack",
        "dinner"
      ],
      "description": "Type of meal"
    },
    "foods": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "food_id": {
            "type": "string"
          },
          "food_name": {
            "type": "string"
          },
          "quantity_grams": {
            "type": "number"
          },
          "calories": {
            "type": "number"
          }
        }
      },
      "description": "Foods consumed"
    },
    "total_calories": {
      "type": "number",
      "description": "Total calories for this meal"
    },
    "rasa_distribution": {
      "type": "object",
      "properties": {
        "madhura": {
          "type": "number"
        },
        "amla": {
          "type": "number"
        },
        "lavana": {
          "type": "number"
        },
        "katu": {
          "type": "number"
        },
        "tikta": {
          "type": "number"
        },
        "kashaya": {
          "type": "number"
        }
      },
      "description": "Distribution of six tastes"
    },
    "dosha_impact": {
      "type": "object",
      "properties": {
        "vata": {
          "type": "string",
          "enum": [
            "increase",
            "decrease",
            "neutral"
          ]
        },
        "pitta": {
          "type": "string",
          "enum": [
            "increase",
            "decrease",
            "neutral"
          ]
        },
        "kapha": {
          "type": "string",
          "enum": [
            "increase",
            "decrease",
            "neutral"
          ]
        }
      },
      "description": "Impact on doshas"
    },
    "satisfaction_rating": {
      "type": "number",
      "minimum": 1,
      "maximum": 5,
      "description": "User satisfaction rating"
    },
    "digestion_rating": {
      "type": "number",
      "minimum": 1,
      "maximum": 5,
      "description": "How well the meal was digested"
    }
  },
  "required": [
    "user_id",
    "date",
    "meal_type"
  ]
}