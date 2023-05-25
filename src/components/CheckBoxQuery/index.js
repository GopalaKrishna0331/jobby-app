import './index.css'

const CheckBoxQuery = props => {
  const {each, onChangeCheckBox} = props
  const {label, employmentTypeId} = each

  const checkBox = event => {
    const {checked} = event.target
    onChangeCheckBox(employmentTypeId, checked)
  }
  return (
    <li className="input-selection">
      <input
        type="checkbox"
        onChange={checkBox}
        id={employmentTypeId}
        className="checkbox-input"
      />
      <label htmlFor={employmentTypeId} className="checkbox-label">
        {label}
      </label>
    </li>
  )
}

export default CheckBoxQuery
