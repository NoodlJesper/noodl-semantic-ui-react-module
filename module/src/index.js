const Noodl = require('@noodl/noodl-sdk');
import { Button, Dropdown } from 'semantic-ui-react'
import { Slider } from "react-semantic-ui-range";
import 'semantic-ui-css/semantic.min.css';
//import { useState } from "react";
//import '../node_modules/semantic-ui-css/components/menu.min.css';
//import '../node_modules/semantic-ui-css/components/dropdown.min.css';
//import '../node_modules/semantic-ui-css/components/item.min.css';
//import '../node_modules/semantic-ui-css/components/icon.min.css';

function ButtonComponent(props) {	
	return <Button
				onClick={props.onClick}
				color="teal"
				fluid>
					{props.label}
				</Button>
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
  { key: 'e', text: 'Example', value: 'example' },
  { key: 'd', text: 'Dropdown', value: 'dropdown' },
  { key: 'i', text: 'Items', value: 'items' }
]

function SelectionComponent(props) {

	const handleOnChange = (e, data) => {
		if(props.onValueChange) props.onValueChange(data.value);
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


function RangeComponent(props) {	

	const settings = {
		start: [props.min,props.max],
		min: props.min,
		max: props.max,
		step: 1,
		onChange: value => {
			props.onLowValueChange(value[0]);
			props.onHighValueChange(value[1]);
		}
	};

	return <Slider
				multiple
				color="teal"
				settings={settings} />
}


const RangeNode = Noodl.defineReactNode({
	name: 'Range | Semantic UI',
	category: 'Semantic UI',
	getReactComponent() {
		return RangeComponent;
	},
	inputProps: {
		min: {type: "number",default: 0},
		max: {type: "number",default: 100}
	},
	outputProps: {
		onLowValueChange: {type: 'number', displayName: 'Low value'},
		onHighValueChange: {type: 'number', displayName: 'High value'}
	}
})


Noodl.defineModule({
    reactNodes: [
		ButtonNode,
		SelectionNode,
		RangeNode
    ],
    nodes:[
    ],
    setup() {
    	console.log("noodl-semantic-ui-react-module loaded");
    }
});