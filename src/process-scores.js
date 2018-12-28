var mapData = require('./map-data')
var processScores = {
  getScores: function (responses, questions) {
    var scores = 0; 
    for (var i = 0; i < responses.length; i++) {
      var response = responses[i].split('|');
      var foundQuestion = questions
      .find(question => question.uid === response[0])

      if (foundQuestion) {
        scores += util.obtainScore(foundQuestion, response[1]); 
        break;
      }
    }
    return scores;
  },
  obtainScore: function (foundQuestion, studentAnswer) {
    var score = foundQuestion.options
    .find(option => option.key === studentAnswer);

    if (score !== undefined) { return parseInt(score.pts); }
    else { return 0; }
  },
  getType: function (id, materials) {
    var foundMaterial = materials.find(mat => mat.uid === id);
    return foundMaterial.type;
  },
  addQuizzes: function (quizzes, expandedResponse, materials) {
    for (var i = 0; i < quizzes.length; i++) {
      var splitted = quizzes[i].split(';');
      var id = splitted[0];
      var stopped = splitted[splitted.length - 1];
      var missed = [];
      for (var j = 1; j < splitted.length-1; j++) {
        missed.push(splitted[j]);
      }
      // made use of destructuring below
      expandedResponse[processScores.getType(id, materials)] = {
        id, stopped, missed
      }
    }
  },
  processQuizType: function (type, response) {
    var processedType = '|' + response[type]['id'];
    response[type]['missed'].forEach(item => {
      processedType += ';' + item;
    });
    processedType += ';' + response[type]['stopped'];
    return processedType;
  },
  expandResponse: function (response, materials) {
    var splittedResponse = response.split('|');
    var dateAndQuizNo = splittedResponse[0].split('@');
    var quizzes = splittedResponse
    .filter(response => response !== splittedResponse[0]);
    var expandedResponse = {
      date: dateAndQuizNo[0],
      quizNo: dateAndQuizNo[1]
    }
    processScores.addQuizzes(quizzes, expandedResponse, materials);
    return expandedResponse
  },
  compressResponse: function (response) {
    var compressedResponse = response['date'] + '@' + response['quizNo']; 
    mapData.quizTypes.forEach(type => {
      if (response[type]) {
        compressedResponse += processScores.processQuizType(type, response);
      }
    })
    return compressedResponse;
  },
  decodeScore: function (codedScore, materials) {
    return processScores.expandResponse(codedScore, materials);
  },
  encodeScore: function (decodedScore) {
    return processScores.compressResponse(decodedScore);
  },
  decodeScores: function (scores, materials) {
    var encodedScores = scores.split('*'), decodedScores = [];
    for (var i = 0; i < encodedScores.length; i++) {
      decodedScores.push(processScores.decodeScore(encodedScores[i], materials))
    }
    return decodedScores;
  },
  encodeScores: function (scores) {
    var encodedScores = [];
    for (var i = 0; i < scores.length; i++) {
      encodedScores.push(processScores.encodeScore(scores[i]))
    }
    return encodedScores.join('*')
  },
}

// module.exports = processScores;
// comment below, uncomment above when about to run unit tests and vice versa
export default processScores