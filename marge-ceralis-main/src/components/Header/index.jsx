import React, { useState } from 'react';
import logo from '../../assets/LogoHeader2.png';
import Input from '../Input/Input';
import DropDown from '../Dropdowns/DropDown';

function Header() {
	const [selectedValue, setSelectedValue] = useState("");

	const options = [
		{ key: '0', label: 'Option 0', value: '0' },
		{ key: '1', label: 'Option 1', value: '1' },
		{ key: '2', label: 'Option 2', value: '2' },
		{ key: '3', label: 'Option 3', value: '3' },
		{ key: '4', label: 'Option 4', value: '4' },
		{ key: '5', label: 'Option 5', value: '5' },
	];

	return (
		<header className="bubble h-28 p-2 flex flex-row items-center">
			<img src={logo} className='ml-16 mt-4' alt="Logo Cerfrance" />
			<div className="header-container flex flex-row items-end justify-center w-4/5 m-auto space-x-5">
				<Input label="Input classique" type="text" name="input" id="input" placeholder="Input classique" required="true" />
				<DropDown
					title="Choisissez une option"
					elements={options}
					value={selectedValue}
					onChange={(value) => setSelectedValue(value)}
				/>
				<button className="primaryBtn-cerfrance">
					Rechercher
				</button>
				<button className="dangerBtn-cerfrance">
					Annuler
				</button>
			</div>
		</header>
	);
}

export default Header;
