import type { Player } from "$interfaces/api/player";
import ms from "ms";
import { cache } from "react";
import config from "./config";

export interface ErrorResponse {
	message: string;
	errorCode: string;
}

const apiFetch = async (target: string | URL, init?: RequestInit) => {
	const measurementTarget =
		typeof performance !== "undefined" ? performance : Date;
	const startTime = measurementTarget.now();
	const url = new URL(target, config.apiURL);
	return fetch(url, {
		next: { revalidate: 86400 },
		...init,
	}).then((response) => {
		const finishTime = measurementTarget.now();
		const duration = finishTime - startTime;
		if (duration >= 100)
			console.warn(
				`Loading \x1b[97;1m${target}\x1b[0m took \x1b[1;3${
					duration >= 200 ? "1" : "3"
				}m${ms(duration)}\x1b[0m`,
			);
		return response;
	});
};

export const isErrorResponse = (response: any): response is ErrorResponse =>
	typeof response.message == "string" && typeof response.errorCode == "string";

export const json = cache(<T>(...params: Parameters<typeof apiFetch>) =>
	apiFetch(...params).then(async (response) => {
		const data = (await response.json()) as T | ErrorResponse;
		if (isErrorResponse(data) || response.status >= 400) throw data;
		else return data;
	}),
);

export const getPlayer = (userId: string, category = "overall") =>
	json<Player>(`players/${encodeURIComponent(userId)}/${category}`);

export default apiFetch;
