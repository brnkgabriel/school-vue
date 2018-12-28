var expect = require('chai').expect;
var util = require('../src/util');
var process = require('../src/process-scores')
var quizData = require('./data')

var codedScore = '2018-12-10@0';
var decodedScore = {
  date: '2018-12-10',
  quizNo: '0',
}

var decodedStudent = {
  email: "brnkgabriel@gmail.com",
  first_name: "Olanrewaju",
  last_name: "Ibironke",
  roles_permissions: {
    roles: "student"
  },
  uid: "2Bs8P3CP1aMHXxQZ4gAJezLuzZG2",
  user_data: {
    birthday: "1990-10-31",
    quiz_status: {
      date: '2018-12-11',
      quizNo: '1',
    },
    scores: [
      {
        date: '2018-12-10',
        quizNo: '0',
      },
      {
        date: '2018-12-11',
        quizNo: '1',
      }
    ]
  }
}
var encodedStudent = {
  email: "brnkgabriel@gmail.com",
  first_name: "Olanrewaju",
  last_name: "Ibironke",
  roles_permissions: {
    roles: "student"
  },
  uid: "2Bs8P3CP1aMHXxQZ4gAJezLuzZG2",
  user_data: {
    birthday: "1990-10-31",
    scores: '2018-12-10@0*2018-12-11@1',
    quiz_status: '2018-12-11@1'
  }
}

describe('util', () => {
  it('should pass this canary test', () => {
    expect(true).to.be.true;
  })

  it('.decodeScores(codedScores) should return decodedScores', () => {
    expect(util.decodeScore(codedScore, quizData.materials)).to.be.eql(decodedScore)
  })

  it('.codeScores(decodedScores) should return codedScores', () => {
    expect(util.encodeScore(decodedScore)).to.be.eql(codedScore)
  })

  it('.decodeScores(encodedScores) should return decodedStudent', () => {
    expect(util.decodeScores(encodedStudent.user_data.scores, quizData.materials)).to.be
      .eql(decodedStudent.user_data.scores);
  })

  it('.encodeStudent(decodedStudent) should return encodedStudent', () => {
    expect(util.encodeScores(decodedStudent.user_data.scores)).to.be.eql(encodedStudent.user_data.scores);
  })
})

describe('util', () => {
  it(`.getBirthdayObject should return { day: 15, month: 10, year: 1990 } for '10/15/1990'`, () => {
    var birthday = '10/15/1990';
    var birthdayObject = {
      day: 15,
      month: 10,
      year: 1990
    };
    expect(util.getBirthdayObject(birthday).day).to.be.eql(birthdayObject.day);
    expect(util.getBirthdayObject(birthday).month).to.be.eql(birthdayObject.month);
    expect(util.getBirthdayObject(birthday).year).to.be.eql(birthdayObject.year);
  })

  it(`.getBirthdayObject should return { day: 15, month: 10, year: 2018 } for '2018-10-15`, () => {
    var birthday = '2018-10-15';
    var birthdayObject = {
      day: 15,
      month: 10,
      year: 2018
    };
    expect(util.getBirthdayObject(birthday).day).to.be.eql(birthdayObject.day);
    expect(util.getBirthdayObject(birthday).month).to.be.eql(birthdayObject.month);
    expect(util.getBirthdayObject(birthday).year).to.be.eql(birthdayObject.year);
  })

  it(`.getAge returns yrDifference-1 if today's < birthday's month and today's day < birthday's day`, () => {
    var birthday = '11/5/1990';
    const today = {
      day: 5,
      month: 4,
      year: 2018
    };

    expect(util.getAge(birthday, today)).to.be.eql(27);
  })

  it(`.getAge returns yrDifference-1 if today's month < birthday's month and today's day is > birthday's day`, () => {
    var birthday = '10/15/1990';
    var today = {
      day: 16,
      month: 8,
      year: 2018
    };
    expect(util.getAge(birthday, today)).to.be.eql(27)
  });

  it(`.getAge returns 28 if birthday is '1990-10-31 and today is 2018-11-25`, () => {
    var birthday = '1990-10-31';
    var today = {
      day: 25,
      month: 11,
      year: 2018
    };
    expect(util.getAge(birthday, today)).to.be.eql(28)
  })
})

// describe('util.getScores', () => {
//   it('should return quizData.formatExpectation for quizData.responses', () => {
//     expect(util.getScores(quizData.responses, quizData.questions)).to.be.eql(10);
//   })
// })

describe('process.compressResponse', () => {
  it('should compress quizData.expandedResponse', () => {
    expect(process.compressResponse(quizData.expandedResponse)).to.be.eql(quizData.compressedResponse)
  })
})

describe('process.expandResponse', () => {
  it('should expand quizData.compressedResponse', () => {
    expect(process.expandResponse(quizData.compressedResponse, quizData.materials)).to.be.eql(quizData.expandedResponse)
  })
})

describe('util.getQuizID', () => {
  it('should get one quiz from each stage', () => {
    var scores = quizData.dbStudent.user_data.scores;
    var materials = quizData.dbMaterials;
    var quiz = util.getQuizID(scores, materials);
    var expectation = {}
    util.quizTypes.forEach(type => {
      expectation[type] = {
        quizType: type,
        materialId: ''
      }
    })
    expectation['worship'].materialId = 'material-1544449100049';
    expectation['message'].materialId = 'material-1544367739730';
    expectation['bible'].materialId = 'material-1544608248064';
    expectation['book'].materialId = 'material-1544608070514';
    expectation['picture'].materialId = 'material-1544605596751';
    expect(quiz).to.be.eql(expectation)
  })
})

describe('util.getQuestions', () => {
  it('util.getQuestions should return corresponding Question', () => {
    var gotten = util.getQuestions(quizData.nextQuiz, quizData.dbMaterials);
    gotten.forEach((got, index) => {
      expect(got.questions.length).to.be.eql(quizData.questions[index].questions.length)
    })
  })
})