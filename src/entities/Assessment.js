export const Assessment ={
  "name": "Assessment",
  "type": "object",
  "properties": {
    "user_id": {
      "type": "string",
      "description": "User ID"
    },
    "assessment_type": {
      "type": "string",
      "enum": [
        "prakriti",
        "vikriti",
        "agni"
      ],
      "description": "Type of assessment"
    },
    "responses": {
      "type": "object",
      "additionalProperties": true,
      "description": "User responses to assessment questions"
    },
    "results": {
      "type": "object",
      "properties": {
        "vata_score": {
          "type": "number"
        },
        "pitta_score": {
          "type": "number"
        },
        "kapha_score": {
          "type": "number"
        },
        "dominant_dosha": {
          "type": "string"
        },
        "recommendations": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "description": "Assessment results"
    },
    "completed_at": {
      "type": "string",
      "format": "date-time",
      "description": "When assessment was completed"
    }
  },
  "required": [
    "user_id",
    "assessment_type"
  ]
}