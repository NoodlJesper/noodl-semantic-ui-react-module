const Noodl = require('@noodl/noodl-sdk');
import { Button, Dropdown, Icon, Breadcrumb, Search } from 'semantic-ui-react'
import { Slider } from "react-semantic-ui-range";
import {useEffect,useState} from "react";
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

	let iconProps = {};
	let buttonProps = {};

	if(props.icon && props.icon !== ""){
		iconProps.icon = props.icon;
		iconProps.className = "icon";
	} else {
		iconProps = {};
	}

	if(props.button){
		buttonProps.button = true;
		if(props.icon || props.icon !== "") buttonProps.labeled = true;
		if(iconProps.className !== "icon") iconProps.className = "icon";
	} else {
		buttonProps = {};
	}


	let val;
	if(props.multiple) {
		val = [];
		val = props.value && props.value.split(",");
	} else {
		val = "";
		val = props.value && props.value;
	}

	const [value, setValue] = useState(val);
	props.onValueChange && props.onValueChange(value);


	useEffect(() => {
		
		if(props.multiple) {
			val = [];
			val = props.value && props.value.split(",");
		} else {
			val = "";
			val = props.value && props.value;
		}
		
		setValue(val);
		props.onValueChange && props.onValueChange(value);
	}, [props.value]);


	const handleChange = (e, { value }) => {
		
		if(props.multiple) {
			val = typeof value === "object" ? value : [];
		} else {
			val = typeof value === "string" ? value : "";
		}
		setValue(val);
		props.onValueChange && props.onValueChange(value);
		props.valueChanged && props.valueChanged();
		!value[0] && props.cleared && props.cleared();
	};

	const handleSearchChange = (e, { searchQuery }) => {
		props.searchTerm && props.searchTerm(searchQuery);
	};


	return <Dropdown
	
				options={props.items}
				value={value}

				onChange={handleChange}
				onSearchChange={handleSearchChange}
				
				placeholder={props.placeholder}
				//text='Select Language'
				
				multiple={props.multiple}
				clearable={props.clearable}
				search={props.search}
				
				fluid
				scrolling
				
				floating={props.floating}
				compact={props.compact}
				
				selection={props.selection}
				
				{...iconProps}
				{...buttonProps}
				
				//pointing
				loading={props.loading}
				disabled={props.disabled}
				//noResultsMessage='Try another search.'
				//noResultsMessage={null}
				wrapSelection={true}
				 />
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
		selection: {type: "boolean", default: false},
		placeholder: {type: "string", default: "Select"},
		value: {type: "string", default: ""},
		icon:  {type: "string", default: ""},
		loading: {type: "boolean", default: false},
		disabled: {type: "boolean", default: false},
		compact: {type: "boolean", default: false},
		floating: {type: "boolean", default: false},

		button: {type: "boolean", default: false},
	},
	outputProps: {
		onValueChange: {type: 'array', displayName: 'Values'},
		searchTerm: {type: 'string', displayName: 'Search'},
		valueChanged: {type: 'signal', displayName: 'Changed',group:"Events"},
		cleared: {type: 'signal', displayName: 'Cleared',group:"Events"}
	}
})


function RangeComponent(props) {	

	const settings = {
		start: [props.min*100,props.max*100],
		min: props.min*100,
		max: props.max*100,
		step: 1,
		onChange: props.onChange
	};

	let disabled = props.min === props.max;

	return <Slider
				multiple
				color="teal"
				disabled={disabled}
				settings={settings} />
}


const RangeNode = Noodl.defineReactNode({
	name: 'Range | Semantic UI',
	category: 'Semantic UI',
	getReactComponent() {
		return RangeComponent;
	},
	initialize() {
		this.props.onChange = value => {
			this.setOutputs({
				onLowValueChange: value[0]/100,
				onHighValueChange: value[1]/100
			});
		}
	},
	inputProps: {
		min: {type: "number",default: 0},
		max: {type: "number",default: 100}
	},
	outputs: {
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

const BreadcrumbNode = Noodl.defineReactNode({
	name: 'Breadcrumb | Semantic UI',
	category: 'Semantic UI',
	useInputAsLabel: "size",
	getReactComponent() {
		return ({items, ...props}) => {	
			return <Breadcrumb sections={items} {...props}/>
		};
	},
	inputCss: {
		backgroundColor: {type: "color"}
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