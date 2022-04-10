import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

function App() {
	const [key, setKey] = useState('junkyard');
	return (
		<Container className='p-3' fluid>
			<Row className='p-3'>
				<div className='text-center'>
					<button onClick={() => setKey('partseller')}>Sell Now</button>
				</div>
			</Row>
			<Tabs
				id='main-view'
				activeKey={key}
				onSelect={k => setKey(k)}
				className='mb-3'
			>
				<Tab eventKey='junkyard' title='Junkyard'>
					Junkyard
				</Tab>
				<Tab eventKey='parkinglot' title='Parkinglot'>
					Parkinglot
				</Tab>
				<Tab eventKey='workshop' title='Workshop'>
					Workshop
				</Tab>
				<Tab eventKey='stockroom' title='Stockroom'>
					Stockroom
				</Tab>
				<Tab eventKey='partseller' title='Partseller' disabled>
					Partseller
				</Tab>
			</Tabs>
		</Container>
	);
};

export default App;
