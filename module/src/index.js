const Noodl = require('@noodl/noodl-sdk');
import { Button, Dropdown } from 'semantic-ui-react'

function ButtonComponent(props) {	
	return <Button onClick={props.onClick}>{props.label}</Button>
}
const ButtonNode = Noodl.defineReactNode({
	name: 'Button | Semantic UI',
	category: 'Semantic UI',
	getReactComponent() {
		return ButtonComponent;
	},
	inputProps: {
		label: {type: 'string', default: 'Button', displayName: 'Label'},
	},
	outputProps: {
		onClick: {type: 'signal', displayName: 'Click'}
	}
})


const options = [
  { key: 'angular', text: 'Angular', value: 'angular' },
  { key: 'css', text: 'CSS', value: 'css' },
  { key: 'design', text: 'Graphic Design', value: 'design' }
]

function SelectionComponent(props) {

	const handleOnChange = (e, data) => {
		props.onValueChange(data.value);
	 }

	return <Dropdown
				placeholder={props.placeholder}
				fluid
				clearable={props.clearable}
				multiple={props.multiple}
				search={props.search}
				selection
				onChange={handleOnChange}
				options={props.items} />
}

const SelectionNode = Noodl.defineReactNode({
	name: 'Selector | Semantic UI',
	category: 'Semantic UI',
	getReactComponent() {
		return SelectionComponent;
	},
	inputProps: {
		items: {type: "array", default: options},
		multiple: {type: "boolean", default: false},
		search: {type: "boolean", default: false},
		clearable: {type: "boolean", default: false},
		placeholder: {type: "string", default: "Select"}
	},
	outputProps: {
		onValueChange: {type: 'array', displayName: 'Values'}
	}
})


Noodl.defineModule({
    reactNodes: [
		ButtonNode,
    	SelectionNode
    ],
    nodes:[
    ],
    setup() {
    	console.log("noodl-semantic-ui-react-module loaded");
    }
});