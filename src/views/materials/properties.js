export default {
  newMaterial: function () {
    return {
      title: 'Material title...',
      author: 'Material author...',
      event: 'Material event...',
      time: 'Material time...',
      location: 'Material web location...',
      type: 'Material type...',
      questions: [
        {
          title: 'New Question...',
          options: [
            {
              key: 'New Option',
              value: 'New Value',
              pts: 0
            }
          ],
          uid: 'question-' + +new Date
        }
      ],
      uid: 'material-' + +new Date
    }
  },
  newOption: function () {
    return {
      value: 'Enter New Option...',
      pts: 0
    }
  },
  newQuestion: function () {
    return {
      title: 'Enter New Question',
      uid: 'Question-' + +new Date,
      options: [
        {
          value: 'Enter New Option...',
          pts: 0
        }
      ]
    }
  }
}