import React from 'react'
import sty from '../sty.cssm'
import NameField from './subfields_components/NameField.jsx'
import ContentField from './subfields_components/ContentField.jsx'
/**
 * HOC for various field components
 * `edit[A-Z]*` is for local state updates, updated on each keystroke
 * `toggle[A-Z]*` update on field input status change and pushes the local data to redux store
 */
class Field extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name_editing: false,
            content_editing: false,
            setting_shown: false,
            local_name: props.name,
            local_content: props.content,
            type: props.type
        }
        // edit* is for local state updates, updated on each keystroke
        // toggle* update on field input status change and pushes the local data to redux store
        this.editLocalName = this.editLocalName.bind(this)
        this.editLocalContent = this.editLocalContent.bind(this)

        this.toggleNameEdit = this.toggleNameEdit.bind(this)
        this.toggleContentEdit = this.toggleContentEdit.bind(this)
        this.delField = this.delField.bind(this)

        this.toggleTypeText = this.toggleTypeText.bind(this)
        this.toggleTypeCode = this.toggleTypeCode.bind(this)
        this.toggleTypeLink = this.toggleTypeLink.bind(this)
        this.toggleTypeNote = this.toggleTypeNote.bind(this)
    }

    editLocalName(e) { //name, content, type
        this.setState({ local_name: e.target.value })
    }

    editLocalContent(e) {
        this.setState({ local_content: e.target.value })
    }

    toggleNameEdit(e) {
        console.log('name edit')
        if (this.state.name_editing) {
            this.props.editField(this.props.id, this.props.field_id, 'name', this.state.local_name)
        }
        this.setState({ name_editing: !this.state.name_editing })
    }

    toggleContentEdit(e) {
        if (this.state.content_editing) {
            this.props.editField(this.props.id, this.props.field_id, 'content', this.state.local_content)
        }
        this.setState({
            content_editing: !this.state.content_editing,
            setting_shown: !this.state.setting_shown
        })
    }

    delField() {
        this.props.delField(this.props.id, this.props.idx, this.props.field_id)
    }

    toggleTypeText(e) {
        // need to figure out how to get type
        this.props.editField(this.props.id, this.props.field_id, 'type', 'text')
    }

    toggleTypeCode(e) {
        // need to figure out how to get type
        this.props.editField(this.props.id, this.props.field_id, 'type', 'code')
    }

    toggleTypeLink(e) {
        // need to figure out how to get type
        this.props.editField(this.props.id, this.props.field_id, 'type', 'link')
    }

    toggleTypeNote(e) {
        // need to figure out how to get type
        this.props.editField(this.props.id, this.props.field_id, 'type', 'note')
    }

    render() {
        var passdownProps = {
            editLocalName: this.editLocalName,
            editLocalContent: this.editLocalContent,
            toggleNameEdit: this.toggleNameEdit,
            toggleContentEdit: this.toggleContentEdit,
            delField: this.delField,
            toggleTypeText: this.toggleTypeText,
            toggleTypeCode: this.toggleTypeCode,
            toggleTypeLink: this.toggleTypeLink,
            toggleTypeNote: this.toggleTypeNote
        }
        return (
            <div className={sty['field']}>
                <div className={sty['field-name']}>
                    <NameField {...Object.assign({}, this.props, this.state, passdownProps) } />
                </div>
                <div className={sty['field-content']}>
                    <ContentField {...Object.assign({}, this.props, this.state, passdownProps) } />
                </div>
            </div>
        )
    }
}

export default Field