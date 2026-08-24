 export const resumeDataSchema = {
  type: "object",
  properties: {
    metadata: {
      type: "object",
      properties: {
        resumeTitle: { type: "string" },
        resumeType: { type: "string" },
        industry: { type: "string" },
        lastUpdated: { type: "string" }
      },
      required: [
        "resumeTitle",
        "resumeType",
        "industry",
        "lastUpdated"
      ],
      additionalProperties: false
    },

    candidate: {
      type: "object",
      properties: {
        fullName: { type: "string" },
        email: { type: "string" },
        phone: { type: "string" },
        location: { type: "string" },
        linkedin: { type: "string" },
        website: { type: "string" },
        portfolio: { type: "string" },
        otherLinks: {
          type: "array",
          items: {
            type: "string"
          }
        }
      },
      required: [
        "fullName",
        "email",
        "phone",
        "location",
        "linkedin",
        "website",
        "portfolio",
        "otherLinks"
      ],
      additionalProperties: false
    },

    professionalProfile: {
      type: "object",
      properties: {
        headline: { type: "string" },
        profession: { type: "string" },
        careerLevel: { type: "string" },
        yearsOfExperience: { type: "number" }
      },
      required: [
        "headline",
        "profession",
        "careerLevel",
        "yearsOfExperience"
      ],
      additionalProperties: false
    },

    summary: {
      type: "string"
    },

    experience: {
      type: "array",
      items: {
        type: "object",
        properties: {
          organization: { type: "string" },
          position: { type: "string" },
          employmentType: { type: "string" },
          location: { type: "string" },
          startDate: { type: "string" },
          endDate: { type: "string" },
          currentlyWorking: { type: "boolean" },

          description: {
            type: "array",
            items: {
              type: "object",
              properties: {
                text: { type: "string" },
                type: {
                  type: "string",
                  enum: [
                    "responsibility",
                    "achievement"
                  ]
                }
              },
              required: ["text", "type"],
              additionalProperties: false
            }
          }
        },
        required: [
          "organization",
          "position",
          "employmentType",
          "location",
          "startDate",
          "endDate",
          "currentlyWorking",
          "description"
        ],
        additionalProperties: false
      }
    },

    education: {
      type: "array",
      items: {
        type: "object",
        properties: {
          institution: { type: "string" },
          qualification: { type: "string" },
          fieldOfStudy: { type: "string" },
          grade: { type: "string" },
          location: { type: "string" },
          startDate: { type: "string" },
          endDate: { type: "string" },
          currentlyStudying: { type: "boolean" },

          description: {
            type: "array",
            items: {
              type: "object",
              properties: {
                text: { type: "string" }
              },
              required: ["text"],
              additionalProperties: false
            }
          }
        },
        required: [
          "institution",
          "qualification",
          "fieldOfStudy",
          "grade",
          "location",
          "startDate",
          "endDate",
          "currentlyStudying",
          "description"
        ],
        additionalProperties: false
      }
    },

    skills: {
      type: "array",
      items: {
        type: "object",
        properties: {
          category: {
            type: "string"
          },
          items: {
            type: "array",
            items: {
              type: "string"
            }
          }
        },
        required: [
          "category",
          "items"
        ],
        additionalProperties: false
      }
    },

    projects: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          role: { type: "string" },
          organization: { type: "string" },
          startDate: { type: "string" },
          endDate: { type: "string" },

          description: {
            type: "array",
            items: {
              type: "object",
              properties: {
                text: { type: "string" }
              },
              required: ["text"],
              additionalProperties: false
            }
          },

          links: {
            type: "array",
            items: {
              type: "string"
            }
          }
        },
        required: [
          "title",
          "role",
          "organization",
          "startDate",
          "endDate",
          "description",
          "links"
        ],
        additionalProperties: false
      }
    },

    additionalSections: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          summary: { type: "string" }
        },
        required: [
          "title",
          "summary"
        ],
        additionalProperties: false
      }
    }
  },

  required: [
    "metadata",
    "candidate",
    "professionalProfile",
    "summary",
    "experience",
    "education",
    "skills",
    "projects",
    "additionalSections"
  ],

  additionalProperties: false
};
export const resumeDataSchema={
  "metadata": {
    "resumeTitle": "",
    "resumeType": "",
    "industry": "",
    "lastUpdated": ""
  },
  "candidate": {
    "fullName": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": "",
    "portfolio": "",
    "otherLinks": []
  },
  "professionalProfile": {
    "headline": "",
    "profession": "",
    "careerLevel": "",
    "yearsOfExperience": 0
  },
  "summary": "",
  "experience": [
    {
      "organization": "",
      "position": "",
      "employmentType": "",
      "location": "",
      "startDate": "",
      "endDate": "",
      "currentlyWorking": false,
      "description": [
        {
          "text": "",
          "type": "responsibility | achievement"
        }
      ] 
    }
  ],
  "education": [
    {
      "institution": "",
      "qualification": "",
      "fieldOfStudy": "",
      "grade": "",
      "location": "",
      "startDate": "",
      "endDate": "",
      "currentlyStudying": false,
    }
  ],
  "skills": [
      {
        "category": "",
        "items": [
          ""
        ]
      }
    ],
  "projects": [
    {
      "title": "",
      "role": "",
      "organization": "",
      "startDate": "",
      "endDate": "",
      "description": [
        {
          "text": ""
        }
      ],
      "links": []
    }
  ],
  "additionalSections": [
    {
      "title": "",
      "summary": ""
    }
  ]
}