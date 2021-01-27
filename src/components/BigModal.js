import Button from 'react-bootstrap/Button'
import React, {Component} from 'react'
import '../styles/bigModal.css'


class BigModal extends Component {
  render(){
    let dialog = (
      <div className='dialogb'>
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

export default BigModal

            