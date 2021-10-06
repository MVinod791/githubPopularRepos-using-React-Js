// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageFilterData, setLanguageFilterId, isActive} = props
  const activeButton = isActive ? 'button active' : 'button'
  const {id, language} = languageFilterData
  const onClickLanguages = () => {
    setLanguageFilterId(id)
  }

  return (
    <li>
      <button type="button" className={activeButton} onClick={onClickLanguages}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
