import dayjs from "dayjs";
import { toast } from "sonner";

export function capitalizeFirstLetter(text: string) {
	return text.charAt(0)?.toUpperCase() + text.slice(1);
}

export function camelize(str: string) {
	return str
		.toLowerCase()
		.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

export const Decode = (token: string) => {
	var base64Url = token?.split(".")[1];
	var base64 = base64Url?.replace(/-/g, "+").replace(/_/g, "/");
	var jsonPayload = decodeURIComponent(
		atob(base64)
			.split("")
			.map(function (c) {
				return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join("")
	);

	return JSON.parse(jsonPayload);
};

export const bytesToSize = (bytes: number) => {
	const kilobyte = 1024;
	const megabyte = kilobyte * 1024;

	if (bytes < kilobyte) {
		return bytes + " B";
	} else if (bytes < megabyte) {
		return (bytes / kilobyte).toFixed(2) + " KB";
	} else {
		return (bytes / megabyte).toFixed(2) + " MB";
	}
};

export const NumberConverter = (number: number) => {
	function digits(number: number, count = 0): any {
		if (number) {
			return digits(Math.floor(number / 10), ++count);
		}
		return count;
	}
	const digitCount = digits(number);
	if (digitCount === 4) {
		return number;
	}

	if (digitCount === 5) {
		let output = number / 1000;
		return `${Math.round((output + Number.EPSILON) * 100) / 100}${" "}K`;
	}
	if (digitCount === 6) {
		let output = number / 100000;
		return `${
			Math.round((output + Number.EPSILON) * 100) / 100
		}${" "}Lakhs`;
	}
	if (digitCount === 7) {
		let output = number / 100000;
		return `${
			Math.round((output + Number.EPSILON) * 100) / 100
		}${" "}Lakhs`;
	}
};

export const DataToForm = (data: any) => {
	let formData = new FormData();
	for (var key in data) {
		formData.append(key, data[key]);
	}
	return formData;
};

export const DataToFormArray = (data: any) => {
	let formData = new FormData();
	for (var key in data) {
		if (Array.isArray(data[key])) {
			formData.append(key, JSON.stringify(data[key]));
		} else {
			if (data[key] !== null) {
				formData.append(key, data[key]);
			}
		}
	}
	return formData;
};

// DATE TRIMMER
export const dateTrimmer = (data: string) => {
	let date = data && new Date(data)?.toISOString().split("T")[0];
	return date;
};

// DATE FORMATTER
export const dateFormatter = (data: string) => {
	let date = dayjs(data).format("DD-MM-YYYY");
	return date;
};

// GET FILE NAME FROM URL
export const getFileName = (url: string) => {
	return url?.replace(/^.*[\\\/]/, "") || "";
};

// PRINT ACTION
export const print = () => {
	window.print();
};

// Warning Message
export const warning = () => {
	toast.warning("Sorry! This feature is not ready to use. Please try later");
};
