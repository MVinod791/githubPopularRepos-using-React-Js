import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './index.css'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const apisConstatsStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    apisStatus: apisConstatsStatus.initial,
    repositoryData: [],
    activeFilterId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getRepositories()
  }

  getRepositories = async () => {
    const {activeFilterId} = this.state
    this.setState({apisStatus: apisConstatsStatus.inProgress})
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeFilterId}`,
    )
    if (response.ok === true) {
      const data = await response.json()
      const updateData = data.popular_repos.map(eachItem => ({
        avatarUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        starsCount: eachItem.stars_count,
        name: eachItem.name,
      }))
      this.setState({
        repositoryData: updateData,
        apisStatus: apisConstatsStatus.success,
      })
    } else {
      this.setState({apisStatus: apisConstatsStatus.failure})
    }
  }

  renderLoaderView = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepositoryItemView = () => {
    const {repositoryData} = this.state
    return (
      <ul className="repo-list">
        {repositoryData.map(eachItem => (
          <RepositoryItem repositoryDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure"
      />
      <h1 className="failure-heading">Something Went Wrong</h1>
    </div>
  )

  renderRepositories = () => {
    const {apisStatus} = this.state

    switch (apisStatus) {
      case apisConstatsStatus.success:
        return this.renderRepositoryItemView()
      case apisConstatsStatus.failure:
        return this.renderFailureView()
      case apisConstatsStatus.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  setLanguageFilterId = newFilterId => {
    this.setState({activeFilterId: newFilterId}, this.getRepositories)
  }

  renderLanguageFilterItem = () => {
    const {activeFilterId} = this.state
    return (
      <ul className="filter-list">
        {languageFiltersData.map(eachItem => (
          <LanguageFilterItem
            languageFilterData={eachItem}
            key={eachItem.id}
            isActive={eachItem.id === activeFilterId}
            setLanguageFilterId={this.setLanguageFilterId}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="app-container">
        <div className="responsive-container">
          <h1 className="popular-heading">Popular</h1>
          {this.renderLanguageFilterItem()}

          {this.renderRepositories()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
