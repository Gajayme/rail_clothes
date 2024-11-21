import { useState } from "react"
import { DefaultButton } from "./Button.js"
import {LabeledInput} from "./LabeledInput.js"
import {LabeledDropdown} from "./LabeledDropDown.js"
import {ImageManager} from "./ImageManager/ImageManager.js"
import * as Constants from './Constants.js';

import '../Styles/UploadForm.css';



export const UploadPageForm = () => {


	// все стейты
	const [formState, setFormState] = useState({
		item_name: '',
		bought_for: '',
		price: '',
		buyers_part: '',
		sold_for: '',
		size: '',
		buyer: '',
		location: '',

		images: [],
	})

	// обработать нажатие на кнопку подтверждения
	const handleOnSubmit = (event) => {
		event.preventDefault()
		console.log(formState)


	}

	// обработать изменение всех полей (кроме загрузки изображений)
	const handleOnChange = (key) => {
		return (event) => {
			if (event && event.target) {
				setFormState((prevState) => ({
						...prevState, [key]: event.target.value || event.target.innerText}))
				}
		}
	}

	// обработать изменение превью изображений
	const handleOnChangeImages = (key) => {
		return (event) => {
			if (event && event.target) {
				const images = Array.from(event.target.files);
				const newImages = images.map(image => URL.createObjectURL(image));
				console.log(newImages)
				setFormState((prevState) => ({
						...prevState, [key]: [...prevState[key], ...newImages]} ))
				}
		}
	}

	// удалить все изображения
	const handleOnDeleteAllImages = (key) => {
		return () => {
			setFormState((prevState) => ({
					...prevState, [key]: []} ))
			}
	}


	// TODO собрать все пропсы отдельно, а потом декомпозировать
	const buyerOptions = {
		[Constants.chooseBuyer]: "",
		[Constants.rail]: [Constants.rail],
		[Constants.ljuba]: [Constants.ljuba],
		[Constants.igor]: [Constants.igor],
		[Constants.gosha]: [Constants.gosha],
		[Constants.oleg]: [Constants.oleg],
		[Constants.unknown]: [Constants.unknown] };


	const locationOptions = {
		[Constants.chooseLocation]: "",
		[Constants.plava]: [Constants.plava],
		[Constants.gosha]: [Constants.gosha],
		[Constants.oleg]: [Constants.oleg],
		[Constants.unknown]: [Constants.unknown]
	};

	return (
		<form onSubmit={handleOnSubmit}>

			<ImageManager		images={formState.images} 			onChange={handleOnChangeImages('images')}	onDelete={handleOnDeleteAllImages('images')}/>

			<div className="upload-form">

				<LabeledInput		value={formState.item_name}			onChange={handleOnChange('item_name')}		className="upload-form-item"	labelText={Constants.item_name}		id="item_name_input"		maxLength={50}/>
				<LabeledInput 		value={formState.buyers_part}		onChange={handleOnChange('buyers_part')}	className="upload-form-item"	labelText={Constants.buyer_part}	id="buyer_part_input"		maxLength={10}/>
				<LabeledInput 		value={formState.bought_for}		onChange={handleOnChange('bought_for')}		className="upload-form-item"	labelText={Constants.bought_for}	id="bought_for_input"		maxLength={10}/>
				<LabeledInput 		value={formState.price}				onChange={handleOnChange('price')}			className="upload-form-item"	labelText={Constants.price} 		id="price_input"			maxLength={10}/>
				<LabeledInput 		value={formState.sold_for}			onChange={handleOnChange('sold_for')}		className="upload-form-item"	labelText={Constants.sold_for}		id="sold_for_input"			maxLength={10}/>
				<LabeledInput 		value={formState.size}				onChange={handleOnChange('size')}			className="upload-form-item"	labelText={Constants.item_size}		id="size_input"				maxLength={10}/>

				<LabeledDropdown		options={locationOptions}		onChange={handleOnChange('location')}		className="upload-form-item"	labelText={Constants.location}		id="location_dropdown"/>
				<LabeledDropdown 		options={buyerOptions}			onChange={handleOnChange('buyer')}			className="upload-form-item"	labelText={Constants.buyer}			id="buyer_dropdown"/>

			</div>

			<DefaultButton labelText={'Add to database'} type="submit" onClick={handleOnSubmit}/>

		</form>
	)
}
