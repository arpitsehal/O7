function QuestionEditor({ question, index, onChange, onRemove, canRemove }) {
  function updateField(field, value) {
    onChange(index, { ...question, [field]: value })
  }

  function updateOption(optIndex, value) {
    const options = [...question.options]
    const oldValue = options[optIndex]
    options[optIndex] = value
    const correctAnswer =
      question.correctAnswer === oldValue ? value : question.correctAnswer
    onChange(index, { ...question, options, correctAnswer })
  }

  function addOption() {
    if (question.options.length >= 6) return
    onChange(index, { ...question, options: [...question.options, ''] })
  }

  function removeOption(optIndex) {
    if (question.options.length <= 2) return
    const removed = question.options[optIndex]
    const options = question.options.filter((_, i) => i !== optIndex)
    const correctAnswer =
      question.correctAnswer === removed ? '' : question.correctAnswer
    onChange(index, { ...question, options, correctAnswer })
  }

  return (
    <div className="question-block">
      <div className="question-block-header">
        <strong>Question {index + 1}</strong>
        {canRemove && (
          <button
            type="button"
            className="btn-danger"
            onClick={() => onRemove(index)}
          >
            Remove
          </button>
        )}
      </div>

      <label>
        Question text
        <input
          type="text"
          value={question.text}
          onChange={(e) => updateField('text', e.target.value)}
          placeholder="Enter question text"
        />
      </label>

      <div className="options-grid">
        {question.options.map((opt, optIndex) => (
          <label key={optIndex}>
            Option {optIndex + 1}
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <input
                type="text"
                value={opt}
                onChange={(e) => updateOption(optIndex, e.target.value)}
                placeholder={`Option ${optIndex + 1}`}
              />
              {question.options.length > 2 && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => removeOption(optIndex)}
                >
                  &times;
                </button>
              )}
            </div>
          </label>
        ))}
      </div>
      {question.options.length < 6 && (
        <button type="button" className="btn-secondary" onClick={addOption}>
          + Add Option
        </button>
      )}

      <div className="form-row" style={{ marginTop: '0.75rem' }}>
        <label>
          Correct answer
          <select
            value={question.correctAnswer}
            onChange={(e) => updateField('correctAnswer', e.target.value)}
          >
            <option value="">Select correct option</option>
            {question.options
              .filter((opt) => opt.trim() !== '')
              .map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
          </select>
        </label>
        <label>
          Marks
          <input
            type="number"
            min="1"
            value={question.marks}
            onChange={(e) => updateField('marks', e.target.value)}
          />
        </label>
      </div>
    </div>
  )
}

export default QuestionEditor
