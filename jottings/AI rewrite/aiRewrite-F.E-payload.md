proposed rewrite resume payload assuming the ai original analysis is in a variable called "aiAnalysis"
const rewriteContext = {
  readability: {
    score: aiAnalysis.readability.score,
    readingLevel: aiAnalysis.readability.readingLevel,
    overview: aiAnalysis.readability.overview
  },

  length: {
    pages: aiAnalysis.length.pages,
    wordCount: aiAnalysis.length.wordCount,
    assessment: aiAnalysis.length.assessment,
    overview: aiAnalysis.length.overview
  },

  sections: {
    status: aiAnalysis.sections.status,
    present: [...aiAnalysis.sections.present],
    missing: [...aiAnalysis.sections.missing],
    overview: aiAnalysis.sections.overview
  },

  experience: {
    score: aiAnalysis.experience.score,
    achievementScore: aiAnalysis.experience.achievementScore,
    quantificationScore: aiAnalysis.experience.quantificationScore,
    overview: aiAnalysis.experience.overview
  },

  grammar: {
    score: aiAnalysis.grammar.score,
    overview: aiAnalysis.grammar.overview,
    issues: [...aiAnalysis.grammar.issues]
  },

  writingStyle: {
    score: aiAnalysis.writingStyle.score,
    type: aiAnalysis.writingStyle.type,
    characteristics: [...aiAnalysis.writingStyle.characteristics],
    overview: aiAnalysis.writingStyle.overview,
    issues: [...aiAnalysis.writingStyle.issues]
  },

  technologies: {
    detected: [...aiAnalysis.technologies.detected],
    recommended: [...aiAnalysis.technologies.recommended],
    overview: aiAnalysis.technologies.overview
  },

  keywords: {
    suggested: [...aiAnalysis.keywords.suggested],
    overview: aiAnalysis.keywords.overview
  },

  strengths: aiAnalysis.strengths.map((strength) => ({
    title: strength.title,
    description: strength.description
  })),

  weaknesses: aiAnalysis.weaknesses.map((weakness) => ({
    title: weakness.title,
    description: weakness.description
  })),

  redFlags: aiAnalysis.redFlags.map((flag) => ({
    title: flag.title,
    description: flag.description
  })),

  repetition: {
    status: aiAnalysis.repetition.status,
    overview: aiAnalysis.repetition.overview,
    items: aiAnalysis.repetition.items.map((item) => ({
      phrase: item.phrase,
      count: item.count
    }))
  },

  timeline: {
    status: aiAnalysis.timeline.status,
    overview: aiAnalysis.timeline.overview,
    issues: [...aiAnalysis.timeline.issues]
  },

  recommendations: aiAnalysis.recommendations.map((recommendation) => ({
    priority: recommendation.priority,
    title: recommendation.title,
    description: recommendation.description
  }))
};