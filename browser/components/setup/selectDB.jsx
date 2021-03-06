import React from 'react'
import sty from './setup.cssm'
import config from '../../utils/config'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';


class NewDBDialog extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      name: '',
      password: '',
      message: ''
    }
    this.handleFormChange = this.handleFormChange.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
    this.createVault = this.createVault.bind(this)
  }

  handleFormChange(field) {
    return (event) => {
      this.setState({ [field]: event.target.value })
    }
  }

  closeDialog() {
    this.setState({
      name: '',
      password: '',
      message: ''
    })
    this.props.toggleDialog()
  }

  createVault() {
    var {
      success,
      message
    } = this.props.createVault(this.state.name, this.state.password)
    if (success) {
      this.props.toggleDialog()
    } else {
      message = message === 'PASSWORD_INVALID' ?
        'Password needs to be at least 8 characters long' :
        message
      this.setState({ message })
    }
  }


  render() {
    return (
      <Dialog open={this.props.open}
        onRequestClose={this.props.handleRequestClose} >
        <DialogTitle >
          Create New Vault
        </DialogTitle>
        <DialogContent >
          <DialogContentText >
            Please enter name and password for your new vault.
      </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Database Name"
            type="text"
            fullWidth
            onChange={this.handleFormChange('name')}
          /> <TextField
            margin="dense"
            label="Database Password"
            type="password"
            fullWidth
            onChange={this.handleFormChange('password')}
          />
          <p style={{
            height: '20px',
            color: 'red'
          }} >
            {this.state.message}
          </p>
        </DialogContent>
        <DialogActions >
          <Button
            onClick={this.closeDialog}
            color="accent" >
            Cancel
                </Button>
          <Button
            onClick={this.createVault}
            color="primary" >
            Confirm </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

class DB extends React.PureComponent {
  constructor() {
    super()
    this.state = { toolbar_open: false }
  }

  showToolbar = () => {
    this.setState({ toolbar_open: true })
  }

  hideToolbar = () => {
    this.setState({ toolbar_open: false })
  }

  deleteDB = () => {
    this.props.deleteDB(this.props.db.location)
  }

  render() {
    var db = this.props.db
    var classNameList = [sty['db-block']]
    if (this.props.highlighted_db === db.location) {
      classNameList.push(sty['is-selected'])
    }
    var toolbarClassNameList = [sty['toolbar']]
    if (!this.state.toolbar_open) {
      toolbarClassNameList.push('is-hidden')
    }
    return (
      <div
        className={classNameList.join(' ')}
        onMouseEnter={this.showToolbar}
        onMouseLeave={this.hideToolbar}
        onClick={() => { this.props.handleDBClick(db.location) }}
      >
        {db.name}
        <div className={toolbarClassNameList.join(' ')} onClick={this.deleteDB}>
          <i className={'fal fa-trash-alt'} />
        </div>
      </div>
    )
  }
}

class SelectDB extends React.PureComponent {
  constructor(props) {
    super()
    var defaultDB = config.getDefaultDBLocation()
    this.state = {
      highlighted_db: defaultDB ? defaultDB : null,
      passwd: '',
      dialog_open: false,
      dialog_message: '',
      message: ''
    }
    this.toggleNewDB = this.toggleNewDB.bind(this)
    this.handleDBClick = this.handleDBClick.bind(this)
    this.unlockDB = this.unlockDB.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
  }

  toggleNewDB() {
    this.setState({ dialog_open: !this.state.dialog_open })
  }

  handleDBClick(location) {
    this.setState({ highlighted_db: location })
  }

  unlockDB() {
    if (this.state.highlighted_db) {
      this.props.unlockDB(this.state.highlighted_db, this.state.passwd)
    } else {
      this.setState({ message: 'Please Select a Vault' })
    }
  }

  updatePassword(e) {
    this.setState({ passwd: e.target.value })
  }

  componentWillReceiveProps(nextProps) {
    var unlock = nextProps.status.get('unlock')
    if (unlock !== null) {
      this.setState({ message: unlock })
    }
  }

  render() {
    var listOfDB = config.getDBList().map((db) => (
      <DB key={db.location}
        db={db}
        highlighted_db={this.state.highlighted_db}
        handleDBClick={this.handleDBClick}
        deleteDB={this.props.deleteDB}
      />
    ))

    return (
      <div className={sty['wrapper-select-db']} >
        <Button style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          color: 'grey'
        }}
          onClick={this.toggleNewDB} >
          Add New Vault
         </Button>
        <NewDBDialog
          open={this.state.dialog_open}
          toggleDialog={this.toggleNewDB}
          createVault={this.props.setupDB}
          message={this.state.dialog_message}
        />
        <div className={sty['database-list']} >
          <h2 className={sty['database-list-header']}>Vaults</h2>
          {listOfDB}
        </div>
        <div className={sty['unlock-panel']} >
          <div className={sty['unlock-password-prompt']} >
            <TextField margin='dense'
              label='Master Password'
              type='password'
              onChange={this.updatePassword}
              FormHelperTextProps={{ error: true }}
              helperText={this.state.message}
              fullWidth
            />
            <Button
              classes={{ root: sty['btn-confirm-password'] }}
              raised color="primary"
              onClick={this.unlockDB}
            >
              UNLOCK
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default SelectDB
