import { HttpResponse, http } from "msw"; //mock service worker(msw)

export const handlers = [
	http.get("https://randomuser.me/api", () => {
		return HttpResponse.json({
			results: [
				{
					name: { first: "Manuela", last: "Delgado" },
					login: { username: "greencat244" },
					picture: {
						thumbnail: "https://example.com/img.jpg",
					},
				},
			],
		});
	}),
];
