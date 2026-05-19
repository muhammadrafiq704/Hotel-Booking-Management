import { PhotoProvider, PhotoView } from "react-photo-view";
import { ImageUploadApi } from "@/api/HBMSAPI";
import "react-photo-view/dist/react-photo-view.css";

export default function SwiperComponent({
	images = [],
}: {
	images?: string[];
}) {
	const IMAGE_BASE_URL = ImageUploadApi.defaults.baseURL;
	if (!images.length) return null;
	return (
		<PhotoProvider
			speed={() => 800}
			easing={(type) =>
				type === 1
					? "cubic-bezier(0.36, 0, 0.66, -0.56)"
					: "cubic-bezier(0.34, 1.56, 0.64, 1)"
			}
		>
			<div
				style={{
					width: "100%",
					height: "100%",
					// maxHeight: 450,
					cursor: "pointer",
				}}
			>
				{images.map((item, index) => (
					<PhotoView key={item} src={`${IMAGE_BASE_URL}/${item}`}>
						{index < 1 ? (
							<img
								src={`${IMAGE_BASE_URL}/${item}`}
								alt=""
								style={{ objectFit: "cover", width: "100%", height: "100%" }}
							/>
						) : undefined}
					</PhotoView>
				))}
			</div>
		</PhotoProvider>
	);
}
