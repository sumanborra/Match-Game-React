import {Component} from 'react'
import TabList from '../TabList'
import TabListImages from '../TabListImages'
import './index.css'

class MatchGame extends Component {
  state = {
    imageslist: this.props.imagesList,
    imageMatchedList:this.props.imagesList,
    activeTab: this.props.tabsList[0].tabId,
    randomimageValue: 0,
    endGame: false,
    count: 0,
    time: 60,
  }
  changeTabItems = id => {
    this.setState({activeTab: id})
  }

  componentWillMount() {
     this.timerId = setInterval(this.changeTime, 1000)
  }
  changeThumbnail = imageUrl => {
    const {imageslist, randomimageValue,imageMatchedList} = this.state
    // console.log(id)
    console.log(imageslist[randomimageValue].id)
    const randomNumber = Math.floor(Math.random() * imageMatchedList.length)
    console.log(randomNumber)
    if (imageUrl === imageslist[randomimageValue].imageUrl) {
      this.setState(prevState => ({
        count: prevState.count + 1,
        randomimageValue: randomNumber,
      }))
    } else {
      clearInterval(this.timerId)
      this.setState(prevState => ({endGame: !prevState.endGame}))
    }
  }
  geameRestart = () => {
    this.setState(prevState => ({
      imageslist: this.props.imagesList,
      activeTab: this.props.tabsList[0].tabId,
      randomimageValue: 0,
      endGame: !prevState.endGame,
      count: 0,
      time: 60,
    }))

    this.timerId = setInterval(this.changeTime, 1000)
  }
  changeTime = () => {
    const {time} = this.state
    if (time === 1) {
     clearInterval(this.timerId)
      this.setState(prevState => ({endGame: !prevState.endGame}))
    }
    this.setState(prevState => ({time: prevState.time - 1}))
  }

  render() {
    const {imageslist, randomimageValue, activeTab, endGame, count, time,imageMatchedList} =
      this.state
    const {tabsList} = this.props
    // const {category,imageUrl} = imageslist;
    const randomImage = imageMatchedList[randomimageValue].imageUrl
    const perticularTabImages = imageslist.filter(
      each => each.category === activeTab,
    )
    const resultPageOfTrophyOrGamePage = endGame ? (
      <div className="result-page">
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
          alt=" trophy"
          className="image-tropy"
        />
        <div>
          <p className="your-score-para-text">Your Score</p>
          <p className="your-score-para-text score">{count}</p>
        </div>

        <button className="button-reset" onClick={this.geameRestart}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
            alt="reset"
            className="image-reset"
          />
          <p className="play-again-button-text">PLAY AGAIN</p>
        </button>
      </div>
    ) : (
      <div className="bottom-container">
        <img src={randomImage} alt="match" className="random-image" />
        <>
          <ul className="tabslist-container">
            {tabsList.map(eachItem => (
              <TabList
                tabsList={eachItem}
                key={eachItem.tabId}
                activeTab={activeTab}
                changeTabItems={this.changeTabItems}
              />
            ))}
          </ul>
        </>

        <ul className="imagesList-container thunailsimages-container">
          {perticularTabImages.map(eachItem => (
            <TabListImages
              imagesList={eachItem}
              key={eachItem.id}
              changeThumbnail={this.changeThumbnail}
            />
          ))}
        </ul>
      </div>
    )
    return (
      <div className="background-container">
        <ul className="nav-bar-container">
          <li>
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
              alt="website logo"
              className="nav-bar-icon"
            />
          </li>
          <li className="score-time-container">
            <p className="score-para">
              score:<span className="span-style"> {count}</span>
            </p>
            <div className="time-icon-timedisplay-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
                className="time-icon-image"
              />
              <p className="seconds-time-text">{time} sec</p>
            </div>
          </li>
        </ul>
        {resultPageOfTrophyOrGamePage}
      </div>
    )
  }
}
export default MatchGame
