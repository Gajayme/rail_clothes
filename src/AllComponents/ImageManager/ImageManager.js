import React from "react";

import {ImageUploader} from "./ImageUploader.js";
import {ImageViewer} from "./ImageViewer.js";

import '../../Styles/ImageManager/ImageManager.css'
import '../../Styles/UploadPageMarginBottom.css'
import '../../Styles/Bordered.css'
import '../../Styles/ErrorText.css'

export const ImageManager = ({images, errors, onChange, onDelete, className=""}) => {
	console.log(className)
	return <div className={className}>
		<div className={`image-manager bordered`}>
			<ImageViewer images={images}/>
			<ImageUploader images={images} onChange={onChange} onDelete={onDelete}/>
		</div>

		<div>
			{(errors.length > 0) && <p className={"error-text"}>{errors[0]}</p>}
		</div>
	</div>
}
