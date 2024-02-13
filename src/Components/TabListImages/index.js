import './index.css'

const TabListImages = props => {
  const {imagesList, changeThumbnail} = props
  const {id, thumbnailUrl, category,imageUrl} = imagesList
  const changeThumbnailImage = () => {
    changeThumbnail(imageUrl)
  }
  return (
    <li className="list-item-images-list">
      <button
        className="button-image-list-of-items"
        onClick={changeThumbnailImage}
      >
        <img src={thumbnailUrl} alt="thumbnail" className="thumbnail-image" />
      </button>
    </li>
  )
}
export default TabListImages
