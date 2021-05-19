import React from 'react'
import ReactDOM from 'react-dom'
import {Input} from './Input.jsx'

class Main extends React.Component {
	constructor(props) {
		super(props)
		const items = JSON.parse(window.localStorage.getItem("items")) || [[{
				value: "hello",
				state: -1 // -1 is undecided, 0 is reject, and 1 is keep
			}]]
		this.state = {
			tab: 0,
			items,
			review: false,
			selected: 0
		}
	}
	
	componentDidUpdate(prevProps, prevState) {
		if (this.state.tab === prevState.tab && this.state.review === prevState.review && this.state.selected === prevState.selected) {
			window.localStorage.setItem("items", JSON.stringify(this.state.items))
		}
	}
	
	addTab() {
		const items = this.state.items
		let tab = items.length
		items.push([{
				value: "hello",
				state: -1 // -1 is undecided, 0 is reject, and 1 is keep
			}]
		)
		this.setState({items, tab})
	}
	
	changeTab(i) {
		this.setState({tab: i})
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
		items[this.state.tab][i] = {value: e.target.value, state: -1}
		this.setState({items})
	}
	
	handleClick(i) {
		this.setState({selected: i})
	}
	
	handleEnter(i, e) {
		if (e.key == "Enter") {
			const items = this.state.items
			items[this.state.tab].splice(i + 1, 0, {value: "", state: -1})
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
		const items = this.state.items
		items[this.state.tab] = items[this.state.tab].map(item => {
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
			<ul className="nav nav-tabs">
				{this.state.items.map((_, i) => 
					<li className="nav-item"><a className={`nav-link ${i === this.state.tab ? "active" : ""}`} onClick={this.changeTab.bind(this, i)}>Song {i}</a></li>
				)}
			</ul>
			<div style={{overflowY: "auto", maxHeight: "72vh"}}>
			{this.state.items[this.state.tab].map((item, i) => 
				<Input handleChange={this.handleChange.bind(this, i)} key={i} index={i} handleEnter={this.handleEnter.bind(this, i)} handleClick={this.handleClick.bind(this, i)} value={item} review={this.state.review} handleDecision={this.handleLyricDecision.bind(this, i)} selected={this.state.selected}/>
			)}
			</div>
			<div style={{position: "absolute", bottom: "0", width: "100%", marginBottom: "0.3em", marginLeft: "0.3em", maxHeight: "12vh"}}>
				{ this.state.review 
					? <div>
						<button onClick={this.runLyricToss.bind(this, 0)} className="btn btn-outline-danger" style={{marginRight: "1em"}}>Reject All Remaining</button>
						<button onClick={this.runLyricToss.bind(this, 1)} className="btn btn-outline-success">Accept All Remaining</button>
					</div>
					: <div>
						<button className="btn btn-outline-primary" onClick={this.review.bind(this)}>Review</button>
						<button className="btn btn-outline-success" onClick={this.addTab.bind(this)}>Add New Tab</button>
					</div>
				}
				
			</div>
		</div>)
	}
}

ReactDOM.render(<Main/>, document.getElementById("container"))
