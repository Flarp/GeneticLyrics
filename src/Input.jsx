import React from 'react'

export class Input extends React.Component {
	constructor(props) {
		super(props)
		this.element = React.createRef();
	}
	
	focusTest() {
		if (this.props.selected == this.props.index) {
			this.element.current.focus()
		}
	}
	
	componentDidMount() {
		this.focusTest()
	}
		
	
	componentDidUpdate() {
		this.focusTest()
	}
	
	render() {
		return (<div style={{display: "flex", flexDirection: "row"}}>
			<input type="text" className="lead" 
				ref={this.element}
				style={{outline: "none", boxShadow: "none", border: "0px", width: "75%"}}
				onChange={this.props.handleChange}
				onClick={this.props.handleClick}
				onKeyDown={this.props.handleEnter} 
				value={this.props.value.value}
			/>
			{ this.props.review && this.props.value.value != "" ? <div>
				<button onClick={_ => {this.props.handleDecision(0)}} className={`btn ${this.props.value.state == 0 ? "btn-danger" : "btn-outline-danger"} btn-sm`} style={{marginRight: "0.6em"}}>✗</button>
				<button onClick={_ => {this.props.handleDecision(1)}} className={`btn ${this.props.value.state == 1 ? "btn-success" : "btn-outline-success"} btn-sm`}>✓</button>
			  </div> : ""}
		</div>)
	}
}