import React from 'react'
import Preview from '../components/builder-preview.js'
import Bar from '../components/builder-bar.js'
import Helper from '../components/builder-helper.js'

export default class BuilderPage extends React.Component {
  state = {
    host: undefined,
    badgeURL: '',
    placeholder: '',
    focus: false
  }

  setFocus = () => this.state.focus || this.setState({ focus: true })
  setBadgeURL = badgeURL => this.setState({ badgeURL })
  selectExample = exampleURL => this.setState({ badgeURL: exampleURL })

  componentDidMount () {
    const forceHost = new URL(window.location).searchParams.get('host')
    const autoHost = window.location.host === 'flat.badgen.net'
      ? 'https://flat.badgen.net'
      : 'https://badgen.net'
    this.setState({
      host: (forceHost || autoHost) + '/',
      placeholder: 'badge/:subject/:status/:color'
    })
  }

  render () {
    const { host, placeholder, badgeURL, focus } = this.state

    return (
      <div>
        <Preview host={host} badgeURL={badgeURL} focus={focus} />
        <Bar
          host={host}
          badgeURL={badgeURL}
          placeholder={placeholder}
          onChange={this.setBadgeURL}
          onFocus={this.setFocus} />
        <Helper host={host} badgeURL={badgeURL} onSelect={this.selectExample} />
        <style jsx>{`
          div {
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        `}</style>
      </div>
    )
  }
}
