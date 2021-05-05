import React from 'react'
import ReactDOM from 'react-dom'
import {Input} from './Input.jsx'

class Main extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			items: [{
				value: "hello",
				state: -1 // -1 is undecided, 0 is reject, and 1 is keep
			}],
			review: false,
			selected: 0
		}
	}
	
	review() {
		this.setState({review: true})
	}
	
	handleLyricDecision(i, value) {
		const items = this.state.items
		items[i].state = value
		this.setState({items})
	}
	
	handleChange(i, e) {
		const items = this.state.items
		items[i] = {value: e.target.value, state: -1}
		this.setState({items})
	}
	
	handleClick(i) {
		this.setState({selected: i})
	}
	
	handleEnter(i, e) {
		if (e.key == "Enter") {
			const items = this.state.items
			items.splice(i + 1, 0, {value: "", state: -1})
			const selected = i + 1
			this.setState({items, selected})
		} else if (i > 0 && e.key == "ArrowUp") {
			this.setState({selected: i - 1})
		} else if (i < this.state.items.length - 1 && e.key == "ArrowDown") {
			this.setState({selected: i + 1})
		}
		console.log(this.state.selected)
		return true;
	}
	
	runLyricToss(defaultVal) {
		const items = this.state.items.map(item => {
			if (item.state == -1) {
				item.state = defaultVal
			}
			if (item.state == 0) {
				item.value = ""
			}
			
			item.state = -1
			return item
		})
		
		this.setState({items, review: false})
	}
	
	render() {
		return (<div>
			<div style={{overflowY: "auto", maxHeight: "72vh"}}>
			{this.state.items.map((item, i) => 
				<Input handleChange={this.handleChange.bind(this, i)} key={i} index={i} handleEnter={this.handleEnter.bind(this, i)} handleClick={this.handleClick.bind(this, i)}value={item} review={this.state.review} handleDecision={this.handleLyricDecision.bind(this, i)} selected={this.state.selected}/>
			)}
			</div>
			<div style={{position: "absolute", bottom: "0", width: "100%", marginBottom: "0.3em", marginLeft: "0.3em", maxHeight: "12vh"}}>
				<hr/>
				{ this.state.review 
					? <div><button onClick={this.runLyricToss.bind(this, 0)} className="btn btn-outline-danger" style={{marginRight: "1em"}}>Reject All Remaining</button><button onClick={this.runLyricToss.bind(this, 1)} className="btn btn-outline-success">Accept All Remaining</button></div>
					: <button className="btn btn-outline-primary" onClick={this.review.bind(this)}>Review</button>
				}
				
			</div>
		</div>)
	}
}

ReactDOM.render(<Main/>, document.getElementById("container"))
