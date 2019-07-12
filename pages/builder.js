import React from 'react'
import Preview from '../components/builder-preview.js'
import Bar from '../components/builder-bar.js'
import Hints from '../components/builder-hints.js'
import Helper from '../components/builder-helper.js'
import Footer from '../components/footer.js'

export default class BuilderPage extends React.Component {
  state = {
    host: undefined,
    badgeURL: '',
    placeholder: '',
    focus: false
  }

  setBlur = () => this.setState({ focus: false })

  setFocus = () => this.setState({ focus: true })

  setBadgeURL = badgeURL => this.setState({ badgeURL })

  selectExample = exampleURL => this.setState({ badgeURL: exampleURL })

  componentDidMount () {
    const forceHost = new URL(window.location).searchParams.get('host')
    this.setState({
      host: (forceHost || window.location.origin) + '/',
      badgeURL: window.location.hash.replace(/^#/, ''),
      placeholder: 'badge/:subject/:status/:color?icon=github'
    })
  }

  render () {
    const { host, placeholder, badgeURL, focus } = this.state

    return (
      <div className='home'>
        <div className='hero'>
          <Preview host={host} badgeURL={badgeURL} focus={focus} />
          <Bar
            host={host}
            badgeURL={badgeURL}
            placeholder={placeholder}
            onChange={this.setBadgeURL}
            onBlur={this.setBlur}
            onFocus={this.setFocus} />
          <Hints focus={focus} badgeURL={badgeURL} />
          { badgeURL && <Helper host={host} badgeURL={badgeURL} onSelect={this.selectExample} /> }
        </div>
        <Footer />
        <style jsx>{`
          .hero {
            min-height: 100vh;
            position: relative;
          }
        `}</style>
      </div>
    )
  }
}
