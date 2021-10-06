// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    name,
    avatarUrl,
    starsCount,
    forksCount,
    issuesCount,
  } = repositoryDetails
  return (
    <li className="repo-items">
      <img className="repository-image" src={avatarUrl} alt={name} />
      <h1 className="repo-heading">{name}</h1>
      <div className="stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png "
          alt="stars"
          className="star-image"
        />
        <p className="stars-count">{starsCount} stars</p>
      </div>
      <div className="stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="star-image"
        />
        <p className="stars-count">{forksCount} forks</p>
      </div>
      <div className="stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="star-image"
        />
        <p className="stars-count">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
