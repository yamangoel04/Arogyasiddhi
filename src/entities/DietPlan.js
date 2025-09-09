export const DietPlan ={
  "name": "DietPlan",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Diet plan name"
    },
    "user_id": {
      "type": "string",
      "description": "ID of the user this plan is for"
    },
    "duration_days": {
      "type": "number",
      "description": "Duration of the diet plan in days"
    },
    "target_calories": {
      "type": "number",
      "description": "Daily calorie target"
    },
    "dosha_focus": {
      "type": "string",
      "enum": [
        "balance_all",
        "pacify_vata",
        "pacify_pitta",
        "pacify_kapha"
      ],
      "description": "Primary dosha balancing focus"
    },
    "meals": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "day": {
            "type": "number"
          },
          "meal_type": {
            "type": "string",
            "enum": [
              "breakfast",
              "mid_morning",
              "lunch",
              "evening_snack",
              "dinner"
            ]
          },
          "name": {
            "type": "string"
          },
          "ingredients": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "food_id": {
                  "type": "string"
                },
                "quantity_grams": {
                  "type": "number"
                }
              }
            }
          },
          "preparation_method": {
            "type": "string"
          },
          "total_calories": {
            "type": "number"
          },
          "ayurvedic_notes": {
            "type": "string"
          }
        }
      },
      "description": "Detailed meal plans"
    },
    "guidelines": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Dietary guidelines and recommendations"
    },
    "status": {
      "type": "string",
      "enum": [
        "active",
        "completed",
        "paused"
      ],
      "default": "active"
    }
  },
  "required": [
    "name",
    "user_id"
  ]
}