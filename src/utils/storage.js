import Cookies from 'browser-cookies';

export function setStoredData (key, val) {
	Cookies.set(key, JSON.stringify(val), {
		expires: 30,
		path:    '/'
	});
}


export function getStoredData (key) {
	let val = Cookies.get(key);

	try {
		return JSON.parse(val);
	} catch (err) {
		return val && val.replace(/("|')/g, "");
	}
}

export function removeStoredData (key) {
	Cookies.erase(key);
}
