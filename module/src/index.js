const Noodl = require('@noodl/noodl-sdk');
import { Button, Dropdown, Icon, Breadcrumb } from 'semantic-ui-react'
import { Slider } from "react-semantic-ui-range";
//import 'semantic-ui-css/semantic.min.css';
//import { useState } from "react";
//import '../node_modules/semantic-ui-css/components/menu.min.css';
//import '../node_modules/semantic-ui-css/components/dropdown.min.css';
//import '../node_modules/semantic-ui-css/components/item.min.css';
//import '../node_modules/semantic-ui-css/components/icon.min.css';

var SemanticColorEnum = [
	{value: "", label: "Default"},
	{value: "red", label: "Red"},
	{value: "orange", label: "Orange"},
	{value: "yellow", label: "Yellow"},
	{value: "olive", label: "Olive"},
	{value: "green", label: "Green"},
	{value: "teal", label: "Teal"},
	{value: "blue", label: "Blue"},
	{value: "violet", label: "Violet"},
	{value: "purple", label: "Purple"},
	{value: "pink", label: "Pink"},
	{value: "brown", label: "Brown"},
	{value: "grey", label: "Grey"},
	{value: "black", label: "Black"},
];

var SemanticSizeEnum = [
	{value: "mini", label: "Mini"},
	{value: "tiny", label: "Tiny"},
	{value: "small", label: "Small"},
	{value: "medium", label: "Medium"},
	{value: "large", label: "Large"},
	{value: "big", label: "Big"},
	{value: "huge", label: "Huge"},
	{value: "massive", label: "Massive"}
];

function ButtonComponent(props) {	
	let opt = {
		size:props.size,
		onClick:props.onClick,
		color:props.color,
		fluid: true,
		circular:props.circular,
		compact:props.compact,
		basic:props.basic,
		inverted:props.inverted
	}

	if (props.icon !== "" && props.label !== "") {
		return <Button
					{... opt}
				>
					<Icon name={props.icon} />
					{props.label}
				</Button>
	}

	if (props.icon !== "") {
		return <Button
					{... opt}
					icon
				>
					<Icon name={props.icon} />
				</Button>
	}

	return <Button
				{... opt}
			>
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
		label: {group: "Properties", type: 'string', default: 'Button', displayName: 'Label'},
		icon: {group: "Properties", type: 'string', default: '', displayName: 'Icon'},
		//fluid: {group: "Style",type:"boolean",displayName: "Fluid"},
		circular: {group: "Style",type:"boolean",displayName: "Circular"},
		compact: {group: "Style",type:"boolean",displayName: "Compact"},
		basic: {group: "Style",type:"boolean",displayName: "Basic"},
		inverted: {group: "Style",type:"boolean",displayName: "Inverted"},
		size: {
			type: 	{
				name: 'enum',
				enums: SemanticSizeEnum
			},
			displayName: "Size",
			default: "medium",
			group: "Style"
		},
		color: {
			type: 	{
				name: 'enum',
				enums: SemanticColorEnum
			},
			displayName: "Color",
			default: "",
			group: "Style"
		},
	},
	outputProps: {
		onClick: {type: 'signal', displayName: 'Click'}
	}
})


const SelectionExampleOptions = [
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
		items: {type: "array", default: SelectionExampleOptions},
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

const BreadcrumbExampleSections = [
	{ key: 'home', content: 'Home', link: true, href:"#" },
	{ key: 'category', content: 'Indoor', link: true, href:"#/category/indoor" },
	{ key: 'family', content: 'Lighting', link: true, href:"#/family/lighting" },
	{ key: 'group', content: 'Lamps', link: true, href:"#/group/lamps" },
	{ key: 'product', content: 'Nice lamp', active: true }
];

function BreadcrumbComponent(props) {	
	let handleClick = (e) => console.log(e.target);
	return <Breadcrumb

				//onClick={handleClick}
				icon={props.icon}
				size={props.size}
				sections={props.items}
			/>
}


const BreadcrumbNode = Noodl.defineReactNode({
	name: 'Breadcrumb | Semantic UI',
	category: 'Semantic UI',
	getReactComponent() {
		return BreadcrumbComponent;
	},
	inputProps: {
		items: {group: "Properties", type: "array", default: BreadcrumbExampleSections},
		icon: {group: "Properties", type: 'string', default: '', displayName: 'Icon'},
		size: {
			type: 	{
				name: 'enum',
				enums: SemanticSizeEnum
			},
			displayName: "Size",
			default: "medium",
			group: "Style"
		},
	},
	outputProps: {
	}
})


Noodl.defineModule({
    reactNodes: [
		ButtonNode,
		SelectionNode,
		RangeNode,
		BreadcrumbNode
    ],
    nodes:[
    ],
    setup() {
    	console.log("noodl-semantic-ui-react-module loaded");
    }
});