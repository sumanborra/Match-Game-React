import './index.css'

const TabList = props => {
  const {tabsList, activeTab, changeTabItems} = props
  const {displayText, tabId} = tabsList
  const classNameActive = activeTab === tabId ? 'active-button' : ''
  console.log(activeTab === tabId)
  const changeTab = () => {
    changeTabItems(tabId)
  }
  return (
    <li className="list-item">
      <button
        type="button"
        className={`buttn ${classNameActive}`}
        onClick={changeTab}
      >
        <p className="tablist-text-para">{displayText}</p>
        <hr className="horizantal-line" />
      </button>
    </li>
  )
}
export default TabList
