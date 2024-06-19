import {v2 as cloudinary} from 'cloudinary';
import config from '../config/config';

cloudinary.config({
	cloud_name: config?.cloudinary?.cloudinary_name,
	api_secret: config?.cloudinary?.cloudinary_api_secret,
	api_key: config?.cloudinary.cloudinary_api_key,
	secure: true,
});

export async function uploadImage(filePath: string) {
	try {
		const result = await cloudinary.uploader.upload(filePath, {
			folder: 'nabla_wind_hub',
		});
		return result;
	} catch (error) {
		console.error('Fail loading image to Cloudinary:', error);
		throw error;
	}
}

export const deleteImage = async (imageId: string) => {
	return await cloudinary.uploader.destroy(imageId);
};
