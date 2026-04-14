import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";

const videos = ["/src/assets/bg/cloud-bg-video.mp4", "/src/assets/bg/life.mp4"];

const VideoSlider = () => {
	return (
		<Swiper
			modules={[Autoplay, EffectFade, Navigation, Pagination]}
			autoplay={{ delay: 5000, disableOnInteraction: false }}
			loop
			navigation
			pagination={{ clickable: true }}
			effect="fade"
			slidesPerView={1}
			style={{ width: "100%", height: "100%" }}
		>
			{videos.map((video) => (
				<SwiperSlide key={`slide-dummy-${video}`}>
					<video
						src={video}
						autoPlay
						muted
						loop
						playsInline
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
						}}
					/>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default VideoSlider;
