{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "AIResumeAnalysis",
  "type": "object",
  "additionalProperties": false,
  "required": [
    "overallScore",
    "ats",
    "contact",
    "readability",
    "length",
    "sections",
    "experience",
    "grammar",
    "writingStyle",
    "skills",
    "keywords",
    "strengths",
    "weaknesses",
    "redFlags",
    "repetition",
    "timeline",
    "recommendations"
  ],
  "properties": {
    "overallScore": {
      "type": "number",
      "minimum": 0,
      "maximum": 100
    },

    "ats": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "score",
        "formatting",
        "keywords",
        "experience",
        "education",
        "readability"
      ],
      "properties": {
        "score": {
          "type": "number",
          "minimum": 0,
          "maximum": 100
        },
        "formatting": {
          "type": "number",
          "minimum": 0,
          "maximum": 100
        },
        "keywords": {
          "type": "number",
          "minimum": 0,
          "maximum": 100
        },
        "experience": {
          "type": "number",
          "minimum": 0,
          "maximum": 100
        },
        "education": {
          "type": "number",
          "minimum": 0,
          "maximum": 100
        },
        "readability": {
          "type": "number",
          "minimum": 0,
          "maximum": 100
        }
      }
    },

    "contact": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "status",
        "overview"
      ],
      "properties": {
        "status": {
          "type": "string",
          "enum": [
            "complete",
            "mostly complete",
            "partially complete",
            "incomplete",
            "missing"
          ]
        },
        "overview": {
          "type": "string"
        }
      }
    },

    "readability": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "score",
        "readingLevel",
        "overview"
      ],
      "properties": {
        "score": {
          "type": "number",
          "minimum": 0,
          "maximum": 100
        },
        "readingLevel": {
          "type": "string",
          "enum": [
            "basic",
            "intermediate",
            "professional",
            "advanced",
            "highly advanced"
            ]
        },
        "overview": {
          "type": "string"
        }
      }
    },

    "length": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "pages",
        "wordCount",
        "assessment",
        "overview"
      ],
      "properties": {
        "pages": {
          "type": "integer",
          "minimum": 0
        },
        "wordCount": {
          "type": "integer",
          "minimum": 0
        },
        "assessment": {
          "type": "string",
          "enum": [
            "appropriate",
            "slightly long",
            "too long",
            "slightly short",
            "too short"
          ]
        },
        "overview": {
          "type": "string"
        }
      }
    },

    "sections": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "status",
        "present",
        "missing",
        "overview"
      ],
      "properties": {
        "status": {
          "type": "string",
          "enum": [
            "complete",
            "mostly complete",
            "partially complete",
            "incomplete"
          ]
        },
        "present": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "missing": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "overview": {
          "type": "string"
        }
      }
    },

    "experience": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "score",
        "achievementScore",
        "quantificationScore",
        "overview"
      ],
      "properties": {
        "score": {
          "type": "number",
          "minimum": 0,
          "maximum": 100
        },
        "achievementScore": {
          "type": "number",
          "minimum": 0,
          "maximum": 100
        },
        "quantificationScore": {
          "type": "number",
          "minimum": 0,
          "maximum": 100
        },
        "overview": {
          "type": "string"
        }
      }
    },

    "grammar": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "score",
        "overview",
        "issues"
      ],
      "properties": {
        "score": {
          "type": "number",
          "minimum": 0,
          "maximum": 100
        },
        "overview": {
          "type": "string"
        },
        "issues": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },

    "writingStyle": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "score",
        "type",
        "characteristics",
        "overview",
        "issues"
      ],
      "properties": {
        "score": {
          "type": "number",
          "minimum": 0,
          "maximum": 100
        },
        "type": {
          "type": "string",
          "enum": [
            "professional",
            "confident",
            "technical",
            "concise",
            "verbose",
            "informal",
            "passive",
            "academic",
            "inconsistent",
            "generic"
          ]
        },
        "characteristics": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "overview": {
          "type": "string"
        },
        "issues": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },

    "skills": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "detected",
        "recommended",
        "overview"
      ],
      "properties": {
        "detected": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "recommended": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "overview": {
          "type": "string"
        }
      }
    },

    "keywords": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "suggested",
        "overview"
      ],
      "properties": {
        "suggested": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "overview": {
          "type": "string"
        }
      }
    },

    "strengths": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": false,
        "required": [
          "title",
          "description"
        ],
        "properties": {
          "title": {
            "type": "string"
          },
          "description": {
            "type": "string"
          }
        }
      }
    },

    "weaknesses": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": false,
        "required": [
          "title",
          "description"
        ],
        "properties": {
          "title": {
            "type": "string"
          },
          "description": {
            "type": "string"
          }
        }
      }
    },

    "redFlags": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": false,
        "required": [
          "title",
          "description"
        ],
        "properties": {
          "title": {
            "type": "string"
          },
          "description": {
            "type": "string"
          }
        }
      }
    },

    "repetition": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "status",
        "overview",
        "items"
      ],
      "properties": {
        "status": {
          "type": "string",
          "enum": [
            "no issues",
            "minor repetition",
            "moderate repetition",
            "significant repetition"
          ]
        },
        "overview": {
          "type": "string"
        },
        "items": {
          "type": "array",
          "items": {
            "type": "object",
            "additionalProperties": false,
            "required": [
              "phrase",
              "count"
            ],
            "properties": {
              "phrase": {
                "type": "string"
              },
              "count": {
                "type": "integer",
                "minimum": 1
              }
            }
          }
        }
      }
    },

    "timeline": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "status",
        "overview",
        "issues"
      ],
      "properties": {
        "status": {
          "type": "string",
          "enum": [
            "consistent",
            "minor inconsistencies",
            "inconsistencies found",
            "significant inconsistencies"
          ]
        },
        "overview": {
          "type": "string"
        },
        "issues": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },

    "recommendations": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": false,
        "required": [
          "priority",
          "title",
          "description"
        ],
        "properties": {
          "priority": {
            "type": "string",
            "enum": [
              "high",
              "medium",
              "low"
            ]
          },
          "title": {
            "type": "string"
          },
          "description": {
            "type": "string"
          }
        }
      }
    }
  }
}