import React from 'react'
import sty from './setup.cssm'
import ComposeNewDB from '../public/composeNewDB/composeNewDB.jsx'

export default class WelcomePage extends React.PureComponent {
    constructor() {
        super()
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(name, password) {
        this.props.setupDB(password, true, name)
    }
    render() {
        switch (this.props.status.get('status')) {
            case 'NO_CONFIG':
                return (
                    <div className={sty['setup-wrapper']}>
                        <div className={sty['header-setup']}>
                            <p className={sty['app-title']}>LOCK.IT</p>
                            <p className={sty['app-title-footnote']}>a safe home for all your key-value pairs</p>
                        </div>
                        <div className={sty['body-setup']}>
                            <section className={sty['setup-section'] + ' ' + sty['about-vault']}>
                                <h2>VAULT</h2>
                                <p>Each vault is a standalone encrypted databse capable of storing your private information.</p>
                                <p>Multiple vaults are supported in this app if you desire seperation of storage.</p>
                            </section>
                            <section className={sty['setup-section'] + ' ' + sty['getting-started']}>
                                <h2>Getting Started !</h2>
                                <p>Please enter the name and password you fancy for your first database ;-)</p>
                                <ComposeNewDB onSubmit={this.onSubmit} />
                            </section>
                        </div>
                    </div>
                )
        }

    }
}