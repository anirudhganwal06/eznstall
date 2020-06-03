import toKebabCase from './toKebabCase';

const getFileExtension = file => {
	return file.name.split('.').pop();
};

const getImageStoragePath = (installation, image, stepNumber) => {
	return 'images/' + toKebabCase(installation.name, true) + '__' + toKebabCase(installation.version, false) + '__' + stepNumber + '.' + getFileExtension(image);
};

export default getImageStoragePath;