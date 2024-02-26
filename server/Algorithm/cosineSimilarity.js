function tokenizeAndClean(text) {
    const excludeWords = new Set(["the","i","I","my","My","a","on","in","is","lost","found","there","at"]);
  
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, "") // Remove punctuation
      .split(/\s+/) // Split into words
      .filter(word => word.length > 0 && !excludeWords.has(excludeWords)); // Remove empty words and exclude some specific words
}
  
  // Calculate cosine similarity between two text strings
function calculateCosineSimilarity(text1, text2) {
    const words1 = tokenizeAndClean(text1);
    const words2 = tokenizeAndClean(text2);
  
    const uniqueWords = new Set([...words1, ...words2]);
  
    const vector1 = Array.from(uniqueWords).map(word =>
      words1.includes(word) ? 1 : 0
    );
    const vector2 = Array.from(uniqueWords).map(word =>
      words2.includes(word) ? 1 : 0
    );
  
    let dotProduct = 0;
    let magnitude1 = 0;
    let magnitude2 = 0;
  
    for (let i = 0; i < uniqueWords.size; i++) {
      dotProduct += vector1[i] * vector2[i];
      magnitude1 += vector1[i] ** 2;
      magnitude2 += vector2[i] ** 2;
    }
  
    const similarity = dotProduct / (Math.sqrt(magnitude1) * Math.sqrt(magnitude2));
    return similarity;
}

module.exports = {
    tokenizeAndClean,
    calculateCosineSimilarity
}