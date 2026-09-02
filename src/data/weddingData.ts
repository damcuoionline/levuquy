export interface EventDetail {
  id: string;
  tabName?: string;
  title: string;
  subtitle: string;
  dateStr: string;
  lunarDateStr: string;
  timeStr: string;
  locationName: string;
  address: string;
  dressCodeTip?: string;
  mapEmbedUrl: string;
  googleMapsUrl: string;
  timeline: { time: string; activity: string; icon: string }[];
  calendarData: {
    title: string;
    description: string;
    location: string;
    startTime: string; // ISO format
    endTime: string;
  };
}

export interface GalleryPhoto {
  id: string;
  title: string;
  caption: string;
  category: 'all' | 'prewedding' | 'studio' | 'moments';
  imageUrl: string;
  thumbnailUrl?: string;
}

export interface StoryMilestone {
  year: string;
  title: string;
  description: string;
  image: string;
  tag: string;
}

export interface WishMessage {
  id: string;
  name: string;
  relation: string; // 'Nhà Trai' | 'Nhà Gái' | 'Bạn Bè'
  message: string;
  date: string;
  likes: number;
}

export const WEDDING_CONFIG = {
  groom: {
    fullName: "Trương Minh Cảnh",
    shortName: "Minh Cảnh",
    role: "Chú Rể",
    title: "Groom",
    description: "Một chàng trai điềm tĩnh, ấm áp, luôn chu đáo và dành trọn tình yêu thương cho Thanh Nhi. Với Minh Cảnh, hạnh phúc là mỗi ngày được thấy nụ cười của người bạn đời.",
    quote: "“Gặp được em là điều may mắn nhất, và cùng em đi đến hết cuộc đời là ước mơ lớn nhất của anh.”",
    avatar: "https://raw.githubusercontent.com/hoaingotiengtrung/filenhac/main/DSC00438.jpg",
    phone: "0979.519.585",
    facebook: "https://facebook.com",
    zalo: "https://zalo.me/0979519585",
    bank: {
      bankName: "Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)",
      accountNumber: "990123456789",
      accountHolder: "TRUONG MINH CANH",
      qrCodeUrl: "https://api.vietqr.io/image/970436-990123456789-Q4zF6gH.jpg?accountName=TRUONG%20MINH%20CANH&amount=0"
    }
  },
  bride: {
    fullName: "Nguyễn Đàm Thanh Nhi",
    shortName: "Thanh Nhi",
    role: "Cô Dâu",
    title: "Bride",
    description: "Một cô gái ngọt ngào, dịu dàng và luôn tràn đầy năng lượng tích cực. Thanh Nhi tin rằng tình yêu đích thực là sự thấu hiểu, đồng hành và cùng nhau sẻ chia mọi khoảnh khắc trong cuộc sống.",
    quote: "“Cảm ơn anh vì đã luôn kiên nhẫn, yêu thương và biến mọi ngày bình thường của em thành ngày đặc biệt.”",
    avatar: "https://raw.githubusercontent.com/hoaingotiengtrung/filenhac/main/DSC00553.JPG",
    phone: "0357.695.265",
    facebook: "https://facebook.com",
    zalo: "https://zalo.me/0357695265",
    bank: {
      bankName: "Ngân hàng Quân Đội (MB Bank)",
      accountNumber: "090987654321",
      accountHolder: "NGUYEN DAM THANH NHI",
      qrCodeUrl: "https://api.vietqr.io/image/970422-090987654321-Q4zF6gH.jpg?accountName=NGUYEN%20DAM%20THANH%20NHI&amount=0"
    }
  },
  weddingDate: "2026-09-27T09:00:00+07:00", // Ngày Vu Quy: 27/09/2026
  weddingDateReception: "2026-09-27T18:00:00+07:00",
  dateFormatted: "Chủ Nhật, 27 Tháng 09 Năm 2026",
  lunarDateFormatted: "17 Tháng 08 Năm Bính Ngọ",
  googleDriveUrl: "https://drive.google.com/drive/folders/1zNxSGVaIqAS8SGRgT1xuTfpWTSw1iVSW?usp=sharing",
  bgImage: "https://raw.githubusercontent.com/hoaingotiengtrung/filenhac/main/DSC00130%20phong.JPG",
  heroImage: "https://raw.githubusercontent.com/hoaingotiengtrung/filenhac/main/DSC00130%20phong.JPG",
  coupleCoverImage: "https://raw.githubusercontent.com/hoaingotiengtrung/filenhac/main/DSC09971%20phong.JPG",
};

export const STORY_MILESTONES: StoryMilestone[] = [
  {
    year: "10/2021",
    tag: "Lần Đầu Gặp Gỡ",
    title: "Ánh nhìn đầu tiên định mệnh",
    description: "Một buổi chiều thu dịu mát tại quán cà phê sách nhỏ. Cuộc gặp gỡ tình cờ qua một người bạn chung đã mở ra cuộc trò chuyện kéo dài hàng giờ mà không ai muốn dừng lại.",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80"
  },
  {
    year: "02/2022",
    tag: "Lời Tỏ Tình Ngọt Ngào",
    title: "Anh muốn làm người che chở em",
    description: "Dưới ánh đèn lung linh của đêm Valentine bên bờ sông Sài Gòn, Minh Cảnh đã lấy hết can đảm trao bó hoa hướng dương và lời ngỏ: 'Em làm bạn gái anh nhé?'. Thanh Nhi đã mỉm cười gật đầu.",
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80"
  },
  {
    year: "2023 - 2024",
    tag: "Hành Trình Gắn Kết",
    title: "Cùng nhau đi khắp muôn nơi",
    description: "Từ những con dốc mù sương ở Đà Lạt, biển xanh Phú Quốc đến những chuyến phượt miền Trung nắng gió. Từng chuyến đi giúp tụi mình thêm thấu hiểu, cảm thông và sẻ chia mọi gia vị cuộc sống.",
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=80"
  },
  {
    year: "12/2025",
    tag: "Khoảnh Khắc Cầu Hôn",
    title: "‘Yes, I Do!’ - Lời đồng ý ngọt ngào",
    description: "Trong chuyến du lịch hoàng hôn đầy lãng mạn, Minh Cảnh quỳ xuống với chiếc nhẫn cưới trên tay. Nước mắt hạnh phúc và nụ cười rạng rỡ của Thanh Nhi đã biến khoảnh khắc ấy thành vĩnh cửu.",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80"
  },
  {
    year: "27/09/2026",
    tag: "Ngày Chung Đôi",
    title: "Về chung một mái nhà",
    description: "Trang mới của tình yêu chính thức mở ra. Minh Cảnh & Thanh Nhi hân hoan bước vào ngày trọng đại nhất cuộc đời với sự chúc phúc của gia đình và tất cả bạn bè thân thương.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
  }
];

export const WEDDING_EVENTS: EventDetail[] = [
  {
    id: "le-vu-quy",
    tabName: "Lễ Vu Quy",
    title: "LỄ VU QUY (TƯ GIA NHÀ GÁI)",
    subtitle: "Nghi Lễ Gia Tiên Trang Trọng",
    dateStr: "Chủ Nhật, Ngày 27 Tháng 09 Năm 2026",
    lunarDateStr: "Nhằm ngày 17 Tháng 08 Năm Bính Ngọ",
    timeStr: "09:00 Sáng",
    locationName: "Tư Gia Nhà Gái (Khu vực Chợ tình EaTam)",
    address: "Chợ tình EaTam, xã Tam Giang, huyện Krông Năng, tỉnh Đắk Lắk",
    dressCodeTip: "Áo dài truyền thống, trang phục lịch sự nhã nhặn (Tone Trắng Kem / Vàng Nhạt / Pastel)",
    mapEmbedUrl: "https://maps.google.com/maps?q=Ch%E1%BB%A3+t%C3%ACnh+EaTam%2C+x%C3%A3+Tam+Giang%2C+t%E1%BB%89nh+%C4%90%E1%BA%AFk+L%E1%BA%AFk&t=&z=15&ie=UTF8&iwloc=&output=embed",
    googleMapsUrl: "https://maps.google.com/?q=Ch%E1%BB%A3+t%C3%ACnh+EaTam%2C+x%C3%A3+Tam+Giang%2C+t%E1%BB%89nh+%C4%90%E1%BA%AFk+L%E1%BA%AFk",
    timeline: [
      { time: "08:30", activity: "Nhà Trai xuất phát & di chuyển đến Tư Gia Nhà Gái", icon: "Car" },
      { time: "09:00", activity: "Nghi thức trao tráp lễ, rước dâu & chào hỏi hai họ", icon: "Gift" },
      { time: "09:30", activity: "Lễ dâng hương gia tiên & trao nhẫn cưới thiêng liêng", icon: "Heart" },
      { time: "10:15", activity: "Chụp ảnh lưu niệm cùng gia đình, họ hàng & bạn bè thân hữu", icon: "Camera" },
      { time: "11:00", activity: "Khai tiệc thân mật mừng Lễ Vu Quy tại Tư Gia Nhà Gái", icon: "Utensils" }
    ],
    calendarData: {
      title: "Lễ Vu Quy Nhà Gái: Trương Minh Cảnh & Nguyễn Đàm Thanh Nhi",
      description: "Lễ Vu Quy trang trọng tại Tư Gia Nhà Gái. Địa chỉ: Chợ tình EaTam, xã Tam Giang, tỉnh Đắk Lắk. Trân trọng kính mời quý khách!",
      location: "Chợ tình EaTam, xã Tam Giang, tỉnh Đắk Lắk",
      startTime: "20260927T020000Z", // 09:00 UTC+7 is 02:00 UTC
      endTime: "20260927T050000Z"
    }
  },
  {
    id: "tiec-vu-quy",
    tabName: "Tiệc Mừng Vu Quy",
    title: "TIỆC MỪNG VU QUY (NHÀ GÁI)",
    subtitle: "Dạ Tiệc Mừng Hạnh Phúc Tại Tư Gia Nhà Gái",
    dateStr: "Chủ Nhật, Ngày 27 Tháng 09 Năm 2026",
    lunarDateStr: "Nhằm ngày 17 Tháng 08 Năm Bính Ngọ",
    timeStr: "11:00 Trưa (Đón khách: 10:30)",
    locationName: "Tư Gia Nhà Gái (Khu vực Chợ tình EaTam)",
    address: "Chợ tình EaTam, xã Tam Giang, huyện Krông Năng, tỉnh Đắk Lắk",
    dressCodeTip: "Tone màu gợi ý: Vàng Kim (Champagne Gold), Trắng Kem, Hồng Pastel hoặc Xanh Nhẹ",
    mapEmbedUrl: "https://maps.google.com/maps?q=Ch%E1%BB%A3+t%C3%ACnh+EaTam%2C+x%C3%A3+Tam+Giang%2C+t%E1%BB%89nh+%C4%90%E1%BA%AFk+L%E1%BA%AFk&t=&z=15&ie=UTF8&iwloc=&output=embed",
    googleMapsUrl: "https://maps.google.com/?q=Ch%E1%BB%A3+t%C3%ACnh+EaTam%2C+x%C3%A3+Tam+Giang%2C+t%E1%BB%89nh+%C4%90%E1%BA%AFk+L%E1%BA%AFk",
    timeline: [
      { time: "10:30", activity: "Đón tiếp quan khách & Chụp hình lưu niệm cùng Cô Dâu - Chú Rể", icon: "Camera" },
      { time: "11:15", activity: "Nghi lễ kính cẩn tri ân công ơn sinh thành dưỡng dục cha mẹ", icon: "Heart" },
      { time: "11:30", activity: "Khai tiệc mừng Vu Quy & Giao lưu văn nghệ ấm cúng gia đình", icon: "Utensils" },
      { time: "12:45", activity: "Cảm ơn quý quan khách & Tiễn khách thân mật", icon: "Sparkles" }
    ],
    calendarData: {
      title: "Tiệc Mừng Vu Quy Nhà Gái: Minh Cảnh & Thanh Nhi",
      description: "Tiệc cưới thân mật mừng Vu Quy tại Tư Gia Nhà Gái (Chợ tình EaTam, xã Tam Giang, tỉnh Đắk Lắk).",
      location: "Chợ tình EaTam, xã Tam Giang, tỉnh Đắk Lắk",
      startTime: "20260927T033000Z", // 10:30 UTC+7 is 03:30 UTC
      endTime: "20260927T073000Z"
    }
  }
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "p1",
    title: "Phông Nền Hạnh Phúc",
    caption: "Khoảnh khắc thiêng liêng rạng rỡ của Minh Cảnh & Thanh Nhi trong ngày trọng đại.",
    category: "prewedding",
    imageUrl: "https://raw.githubusercontent.com/hoaingotiengtrung/filenhac/main/DSC00130%20phong.JPG"
  },
  {
    id: "p2",
    title: "Nét Đẹp Duyên Dáng",
    caption: "Tình yêu dịu dàng và ánh mắt đong đầy yêu thương.",
    category: "prewedding",
    imageUrl: "https://raw.githubusercontent.com/hoaingotiengtrung/filenhac/main/DSC09971%20phong.JPG"
  },
  {
    id: "p3",
    title: "Nụ Cười Rạng Rỡ",
    caption: "Mỗi nụ cười đều là một niềm hạnh phúc vô giá khi được ở bên nhau.",
    category: "studio",
    imageUrl: "https://raw.githubusercontent.com/hoaingotiengtrung/filenhac/main/DSC00174.JPG"
  },
  {
    id: "p4",
    title: "Tay Trong Tay",
    caption: "Nắm chặt bàn tay cùng nhau đi qua mọi thăng trầm của cuộc đời.",
    category: "studio",
    imageUrl: "https://raw.githubusercontent.com/hoaingotiengtrung/filenhac/main/DSC00190.JPG"
  },
  {
    id: "p5",
    title: "Ngọt Ngào Bên Nhau",
    caption: "Hạnh phúc đơn giản là mỗi ngày đều có em đồng hành.",
    category: "moments",
    imageUrl: "https://raw.githubusercontent.com/hoaingotiengtrung/filenhac/main/DSC00280.JPG"
  },
  {
    id: "p6",
    title: "Ánh Mắt Yêu Thương",
    caption: "Tình yêu đong đầy trong từng cử chỉ ân cần, chu đáo.",
    category: "studio",
    imageUrl: "https://raw.githubusercontent.com/hoaingotiengtrung/filenhac/main/DSC00438.jpg"
  },
  {
    id: "p7",
    title: "Nàng Dâu Xinh Đẹp",
    caption: "Vẻ đẹp thuần khiết, rạng ngời của Thanh Nhi trong ngày chung đôi.",
    category: "studio",
    imageUrl: "https://raw.githubusercontent.com/hoaingotiengtrung/filenhac/main/DSC00553.JPG"
  },
  {
    id: "p8",
    title: "Hẹn Ước Trăm Năm",
    caption: "Lời nguyện ước bền lâu, thủy chung đến trọn cuộc đời.",
    category: "prewedding",
    imageUrl: "https://raw.githubusercontent.com/hoaingotiengtrung/filenhac/main/DSC00591.JPG"
  },
  {
    id: "p9",
    title: "Ánh Nhìn Định Mệnh",
    caption: "Khoảnh khắc thiêng liêng nhất khi hai trái tim hòa cùng một nhịp đập.",
    category: "prewedding",
    imageUrl: "https://raw.githubusercontent.com/hoaingotiengtrung/filenhac/main/DSC06745.JPG"
  },
  {
    id: "p10",
    title: "Bình Yên Bên Anh",
    caption: "Chỉ cần bên nhau, mọi giông bão đều dừng lại sau cánh cửa.",
    category: "moments",
    imageUrl: "https://raw.githubusercontent.com/hoaingotiengtrung/filenhac/main/DSC09855.JPG"
  },
  {
    id: "p11",
    title: "Hạnh Phúc Ngập Tràn",
    caption: "Những khoảnh khắc chân thật, ngọt ngào và đáng nhớ nhất.",
    category: "moments",
    imageUrl: "https://raw.githubusercontent.com/hoaingotiengtrung/filenhac/main/DSC09895.JPG"
  },
  {
    id: "p12",
    title: "Cùng Nhìn Về Một Hướng",
    caption: "Hành trình mới mở ra với biết bao ước mơ và hy vọng xây đắp tổ ấm.",
    category: "prewedding",
    imageUrl: "https://raw.githubusercontent.com/hoaingotiengtrung/filenhac/main/DSC09904.JPG"
  },
  {
    id: "p13",
    title: "Ngày Chung Đôi",
    caption: "Minh Cảnh & Thanh Nhi hân hoan bước vào ngày trọng đại nhất cuộc đời.",
    category: "studio",
    imageUrl: "https://raw.githubusercontent.com/hoaingotiengtrung/filenhac/main/DSC09963.JPG"
  }
];

export const INITIAL_WISHES: WishMessage[] = [
  {
    id: "w1",
    name: "Gia đình Bác Hai",
    relation: "Nhà Trai",
    message: "Chúc hai cháu Minh Cảnh và Thanh Nhi trăm năm hạnh phúc, răng long đầu bạc, luôn yêu thương và thấu hiểu nhau trong mọi chặng đường!",
    date: "10 phút trước",
    likes: 12
  },
  {
    id: "w2",
    name: "Hoàng Yến (Bạn thân Cô Dâu)",
    relation: "Nhà Gái",
    message: "Cuối cùng ngày này cũng tới rồi Nhi ơiii! Chúc cô dâu xinh đẹp nhất trần đời và chú rể mãi mãi hạnh phúc bên nhau nhé. Chờ ngày quẩy hết mình!",
    date: "25 phút trước",
    likes: 18
  },
  {
    id: "w3",
    name: "Nhóm Bạn Đại Học Bách Khoa",
    relation: "Bạn Bè",
    message: "Chúc mừng người anh em Cảnh đã chính thức 'chống lầy'! Chúc hai bạn sớm đón thêm thiên thần nhỏ đáng yêu nha!",
    date: "1 giờ trước",
    likes: 9
  }
];

export const FAQ_LIST = [
  {
    question: "Trang Phục Đám Cưới (Dress Code) như thế nào?",
    answer: "Minh Cảnh & Thanh Nhi gợi ý quý khách có thể chọn trang phục lịch thiệp với tone màu chủ đạo: Xanh Ngọc Bích (Emerald), Vàng Kim (Champagne Gold), Trắng Kem hoặc các gam màu Pastel nhẹ nhàng để những bức ảnh kỷ niệm thêm phần hài hòa và lung linh."
  },
  {
    question: "Địa điểm có chỗ đậu xe ô tô và xe máy không?",
    answer: "Dạ có, địa điểm tổ chức tại khu vực Chợ tình EaTam, xã Tam Giang, tỉnh Đắk Lắk có bãi đậu xe ô tô và xe máy rộng rãi, có người hướng dẫn chu đáo và hoàn toàn miễn phí cho khách mời."
  },
  {
    question: "Tôi có thể dẫn theo người thân hoặc trẻ em đi cùng không?",
    answer: "Minh Cảnh & Thanh Nhi vô cùng hoan nghênh quý khách đi cùng người thương và các bé. Xin quý khách vui lòng ghi chú rõ số lượng người tham dự trong mục Đăng Ký (RSVP) bên dưới để tụi mình chuẩn bị bàn tiệc và phần ăn chu đáo nhất nhé!"
  },
  {
    question: "Tôi có chế độ ăn kiêng / ăn chay thì phải làm sao?",
    answer: "Trong form RSVP, bạn có thể tích chọn hoặc ghi chú yêu cầu ăn chay hoặc dị ứng thực phẩm. Nhà hàng sẽ chuẩn bị riêng thực đơn chay thanh đạm, cao cấp dành riêng cho bạn."
  },
  {
    question: "Nếu không thể tham dự trực tiếp, tôi có thể gửi lời chúc bằng cách nào?",
    answer: "Nếu bạn bận hoặc ở xa, bạn có thể gửi lời chúc mừng và tình cảm yêu thương tại mục 'Sổ Lưu Bút & Gửi Lời Chúc Online' hoặc gửi qua form Đăng Ký (RSVP). Sự hiện diện và lời chúc phúc của quý khách dù gần hay xa đều là món quà vô giá với gia đình chúng tôi!"
  }
];

export const MUSIC_PLAYLIST = [
  {
    title: "Until I Found You (Piano & Cello Romantic)",
    artist: "Stephen Sanchez (Wedding Instrumental)",
    src: "https://actions.google.com/sounds/v1/ambiences/outdoor_ambience.ogg" // placeholder ambient audio
  },
  {
    title: "Canon in D Major (Wedding Classic)",
    artist: "Johann Pachelbel",
    src: "https://actions.google.com/sounds/v1/ambiences/gentle_stream.ogg"
  },
  {
    title: "A Thousand Years (Acoustic Strings)",
    artist: "Christina Perri",
    src: "https://actions.google.com/sounds/v1/ambiences/soft_breeze.ogg"
  }
];
