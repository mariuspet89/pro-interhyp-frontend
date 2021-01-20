import Button from 'react-bootstrap/Button'
import React, {Component} from 'react'
import '../styles/modal.css'


class Modal extends Component {
  render(){
    let dialog = (
      <div className='dialog'>
          {this.props.children}
          <br/>
          <Button variant="success" onClick={this.props.onClose} className='lower'>
                  Close
          </Button>
        </div>
    )
    if(!this.props.isOpen) dialog=null;
    return (
      <div>
        {dialog}
      </div>
    )
  }
 
            
}

export default Modal

            