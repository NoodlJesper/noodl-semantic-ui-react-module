const Noodl = require('@noodl/noodl-sdk');
import { Button } from 'semantic-ui-react'


function MyCustomReactComponent(props) {
	const style = {
		color: props.textColor,
		backgroundColor: props.backgroundColor,
		borderRadius: '10px',
		padding: '20px',
		marginBottom: props.marginBottom
	};

	return <Button onClick={props.onClick}>Click Here</Button>
}

const MyCustomReactComponentNode = Noodl.defineReactNode({
	name: 'Custom React Component',
	category: 'Tutorial',
	getReactComponent() {
		return MyCustomReactComponent;
	},
	inputProps: {
		backgroundColor: {type: 'color', default: 'white'},
		marginBottom: {type: {name: 'number', units: ['px'], defaultUnit: 'px'}, default: 10}
	},
	outputProps: {
		onClick: {type: 'signal', displayName: 'Click'}
	}
})


Noodl.defineModule({
    reactNodes: [
    	MyCustomReactComponentNode
    ],
    nodes:[
    ],
    setup() {
    	console.log("noodl-semantic-ui-react-module loaded");
    }
});