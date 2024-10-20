import { IProduct } from "./product.model";

export const productMock: IProduct[] = [
  {
    id: "6713d7ce1e766dfb9055ec4e",
    name: "Giày Adidas Mule Superstar",
    slug: "giay-adidas-mule-superstar",
    description:
      "Giày Adidas Mule Superstar\nGiày Adidas Mule Superstar là phiên bản độc đáo và hiện đại của mẫu giày Superstar kinh điển, mang lại sự tiện lợi và phong cách cho người sử dụng.\n\nĐặc điểm nổi bật:\nThiết kế mở: Với kiểu dáng mule (mở gót), giày dễ dàng xỏ vào và tháo ra, phù hợp cho những ai yêu thích sự nhanh chóng và tiện lợi trong việc mang giày.\nChất liệu: Giày được làm từ da cao cấp, mang lại độ bền và vẻ đẹp sang trọng, đồng thời dễ dàng vệ sinh.\nĐế giày: Đế cao su đặc trưng của dòng Superstar, cung cấp độ bám tốt trên nhiều bề mặt, giúp bạn di chuyển tự tin và thoải mái.\nPhong cách: Với thiết kế đơn giản nhưng tinh tế, giày Adidas Mule Superstar dễ dàng kết hợp với nhiều trang phục, từ casual đến thể thao, tạo nên phong cách thời trang đa dạng cho người mang.\nGiày Adidas Mule Superstar là lựa chọn hoàn hảo cho những ai muốn kết hợp giữa sự thoải mái và phong cách trong từng bước đi.",
    thumbnail: "https://res.cloudinary.com/dbju2ugir/image/upload/v1729353583/Beemely/b3rfkj7s4oex0vk1lif6.png",
    images: [
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729353611/Beemely/mcxubv8fpthdq37jfnhi.png",
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729353612/Beemely/vrq91cwiqyvmdkfu5034.png",
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729353612/Beemely/xvtwpmvrcc12luukeuq1.png",
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729353612/Beemely/njzj4tdk04rq1agxtoze.png",
    ],
    tags: [
      {
        id: "670ffe710a9054a83674a5c5",
        name: "Giày Thể Thao Nữ",
        slug: "giay-the-thao-nu",
        image: "https://res.cloudinary.com/dbju2ugir/image/upload/v1729101421/Beemely/x3eqh1il2k8ukfaedaww.png",
        description: "Giày thể thao nữ phong cách, thích hợp cho luyện tập và dạo phố.",
        parentId: null,
        status: 1,
      },
    ],
    gender: {
      id: "671208505ce9910c4f861ffa",
      name: "Dành cho Nữ",
      slug: "danh-cho-nu",
    },
    variants: [
      {
        id: "6713d7ce1e766dfb9055ec48",
        color: {
          id: "66b0f71d158d4e5fd613361c",
          name: "Màu Trắng",
          value: "#FFFFFF",
        },
        stock: 23,
        price: 1700000,
        discountPrice: 1499000,
        size: {
          id: "6712eac4b1b995cd15d2edce",
          name: "39",
          gender: "671208505ce9910c4f861ffa",
        },
      },
      {
        id: "6713d7ce1e766dfb9055ec49",
        color: {
          id: "66b0f71d158d4e5fd613361c",
          name: "Màu Trắng",
          value: "#FFFFFF",
        },
        stock: 24,
        price: 1700000,
        discountPrice: 1499000,
        size: {
          id: "6712eabdb1b995cd15d2edb7",
          name: "38",
          gender: "671208505ce9910c4f861ffa",
        },
      },
      {
        id: "6713d7ce1e766dfb9055ec4a",
        color: {
          id: "66b0f71d158d4e5fd613361c",
          name: "Màu Trắng",
          value: "#FFFFFF",
        },
        stock: 43,
        price: 1700000,
        discountPrice: 1499000,
        size: {
          id: "6712eab6b1b995cd15d2eda0",
          name: "37",
          gender: "671208505ce9910c4f861ffa",
        },
      },
      {
        id: "6713d7ce1e766dfb9055ec4b",
        color: {
          id: "66b0f71d158d4e5fd613361c",
          name: "Màu Trắng",
          value: "#FFFFFF",
        },
        stock: 42,
        price: 1700000,
        discountPrice: 1499000,
        size: {
          id: "6712eaafb1b995cd15d2ed89",
          name: "36",
          gender: "671208505ce9910c4f861ffa",
        },
      },
    ],
    labels: [
      {
        id: "6712b63db1b995cd15d2e1ce",
        name: "Bán chạy",
        slug: "ban-chay",
        description: "Giày không có gót cao, mang lại cảm giác thoải mái khi di chuyển, thích hợp cho các hoạt động hàng ngày.",
        status: 1,
      },
      {
        id: "670ffcba0a9054a83674a525",
        name: "Giày Thể Thao",
        slug: "giay-the-thao",
        description: "Giày thể thao năng động, phù hợp cho các hoạt động thể dục, thể thao.",
        status: 1,
      },
      {
        id: "670ffcfa0a9054a83674a54f",
        name: "Hot",
        slug: "hot",
        description: "Giày sneaker phong cách trẻ trung, phù hợp cho các bạn trẻ.",
        status: 1,
      },
    ],
    brand: {
      id: "671000e30a9054a83674a68d",
      name: "Adidas",
      image: "https://res.cloudinary.com/dbju2ugir/image/upload/v1729102050/Beemely/jt9ztsppb5dzhp7myktn.png",
      description: "Giày thể thao Đức, thiết kế hiện đại.",
      slug: "adidas",
    },
    productColors: [
      {
        id: "6713d7ce1e766dfb9055ec47",
        colorId: {
          id: "66b0f71d158d4e5fd613361c",
          name: "Màu Trắng",
          value: "#FFFFFF",
        },
        imageUrl: "https://res.cloudinary.com/dbju2ugir/image/upload/v1729353635/Beemely/vqzq56e3o3mq7fgoaaqi.png",
      },
    ],
    productSizes: [
      {
        id: "6712eac4b1b995cd15d2edce",
        name: "39",
        gender: "671208505ce9910c4f861ffa",
      },
      {
        id: "6712eabdb1b995cd15d2edb7",
        name: "38",
        gender: "671208505ce9910c4f861ffa",
      },
      {
        id: "6712eab6b1b995cd15d2eda0",
        name: "37",
        gender: "671208505ce9910c4f861ffa",
      },
      {
        id: "6712eaafb1b995cd15d2ed89",
        name: "36",
        gender: "671208505ce9910c4f861ffa",
      },
    ],
    productType: {
      id: "66d52242741cf88d736d3cc7",
      name: "Giày lười",
      slug: "giay-luoi",
    },
    flag: "all_page",
    status: 1,
  },
  {
    id: "6713d73a1e766dfb9055eb9c",
    name: "Giày adidas TAEKWONDO W",
    slug: "giay-adidas-taekwondo-w",
    description:
      "Giày Adidas Taekwondo W\nGiày Adidas Taekwondo W được thiết kế đặc biệt dành cho các vận động viên taekwondo nữ, mang lại sự thoải mái và hiệu suất tối ưu trong các buổi tập luyện và thi đấu.\n\nĐặc điểm nổi bật:\nChất liệu: Sản phẩm được làm từ chất liệu cao cấp, nhẹ và bền, giúp giảm trọng lượng và tăng cường độ linh hoạt cho người mang.\nThiết kế: Thiết kế ôm sát chân với màu sắc thanh lịch, giúp tôn lên vẻ đẹp của đôi chân trong các bộ đồ taekwondo truyền thống.\nĐế giày: Đế giày bằng cao su với độ bám tốt, cho phép người mang di chuyển linh hoạt và nhanh nhẹn trên sàn đấu.\nHỗ trợ chân: Phần lót bên trong được trang bị công nghệ đệm, mang lại cảm giác êm ái và hỗ trợ tốt cho bàn chân khi thực hiện các động tác mạnh mẽ và nhanh chóng.\nGiày Adidas Taekwondo W không chỉ là một đôi giày tập luyện mà còn là một người bạn đồng hành đáng tin cậy giúp các vận động viên nâng cao kỹ năng và phong cách trong môn thể thao này.",
    thumbnail: "https://res.cloudinary.com/dbju2ugir/image/upload/v1729353423/Beemely/ps7lwwn7cbjxeestnkdl.png",
    images: [
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729353430/Beemely/kwe4ovduyvk7adwx4mgz.png",
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729353430/Beemely/al5k682hggdfdjefqjpg.png",
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729353430/Beemely/tbxd5xrmsry3ax0rqhyo.png",
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729353430/Beemely/hiuqjkyrnpb7ncgrj8xq.png",
    ],
    tags: [
      {
        id: "670ffe710a9054a83674a5c5",
        name: "Giày Thể Thao Nữ",
        slug: "giay-the-thao-nu",
        image: "https://res.cloudinary.com/dbju2ugir/image/upload/v1729101421/Beemely/x3eqh1il2k8ukfaedaww.png",
        description: "Giày thể thao nữ phong cách, thích hợp cho luyện tập và dạo phố.",
        parentId: null,
        status: 1,
      },
    ],
    gender: {
      id: "671208505ce9910c4f861ffa",
      name: "Dành cho Nữ",
      slug: "danh-cho-nu",
    },
    variants: [
      {
        id: "6713d73a1e766dfb9055eb96",
        color: {
          id: "66b0f71d158d4e5fd613361c",
          name: "Màu Trắng",
          value: "#FFFFFF",
        },
        stock: 23,
        price: 2400000,
        discountPrice: 2199000,
        size: {
          id: "6712eac4b1b995cd15d2edce",
          name: "39",
          gender: "671208505ce9910c4f861ffa",
        },
      },
      {
        id: "6713d73a1e766dfb9055eb97",
        color: {
          id: "66b0f71d158d4e5fd613361c",
          name: "Màu Trắng",
          value: "#FFFFFF",
        },
        stock: 14,
        price: 2400000,
        discountPrice: 2199000,
        size: {
          id: "6712eabdb1b995cd15d2edb7",
          name: "38",
          gender: "671208505ce9910c4f861ffa",
        },
      },
      {
        id: "6713d73a1e766dfb9055eb98",
        color: {
          id: "66b0f71d158d4e5fd613361c",
          name: "Màu Trắng",
          value: "#FFFFFF",
        },
        stock: 24,
        price: 2400000,
        discountPrice: 2199000,
        size: {
          id: "6712eab6b1b995cd15d2eda0",
          name: "37",
          gender: "671208505ce9910c4f861ffa",
        },
      },
      {
        id: "6713d73a1e766dfb9055eb99",
        color: {
          id: "66b0f71d158d4e5fd613361c",
          name: "Màu Trắng",
          value: "#FFFFFF",
        },
        stock: 50,
        price: 2400000,
        discountPrice: 2199000,
        size: {
          id: "6712eaafb1b995cd15d2ed89",
          name: "36",
          gender: "671208505ce9910c4f861ffa",
        },
      },
    ],
    labels: [
      {
        id: "670ffcba0a9054a83674a525",
        name: "Giày Thể Thao",
        slug: "giay-the-thao",
        description: "Giày thể thao năng động, phù hợp cho các hoạt động thể dục, thể thao.",
        status: 1,
      },
      {
        id: "670ffcfa0a9054a83674a54f",
        name: "Hot",
        slug: "hot",
        description: "Giày sneaker phong cách trẻ trung, phù hợp cho các bạn trẻ.",
        status: 1,
      },
    ],
    brand: {
      id: "671000e30a9054a83674a68d",
      name: "Adidas",
      image: "https://res.cloudinary.com/dbju2ugir/image/upload/v1729102050/Beemely/jt9ztsppb5dzhp7myktn.png",
      description: "Giày thể thao Đức, thiết kế hiện đại.",
      slug: "adidas",
    },
    productColors: [
      {
        id: "6713d73a1e766dfb9055eb95",
        colorId: {
          id: "66b0f71d158d4e5fd613361c",
          name: "Màu Trắng",
          value: "#FFFFFF",
        },
        imageUrl: "https://res.cloudinary.com/dbju2ugir/image/upload/v1729353482/Beemely/de5puhqpi6cov0ejuykt.png",
      },
    ],
    productSizes: [
      {
        id: "6712eac4b1b995cd15d2edce",
        name: "39",
        gender: "671208505ce9910c4f861ffa",
      },
      {
        id: "6712eabdb1b995cd15d2edb7",
        name: "38",
        gender: "671208505ce9910c4f861ffa",
      },
      {
        id: "6712eab6b1b995cd15d2eda0",
        name: "37",
        gender: "671208505ce9910c4f861ffa",
      },
      {
        id: "6712eaafb1b995cd15d2ed89",
        name: "36",
        gender: "671208505ce9910c4f861ffa",
      },
    ],
    productType: {
      id: "6712b265b1b995cd15d2e083",
      name: "Giày Thể Thao",
      slug: "giay-the-thao",
    },
    flag: "all_page",
    status: 1,
  },
  {
    id: "6713d6641e766dfb9055e95a",
    name: "Giày Adidas Đá Bóng Turf Predator League Trẻ Em",
    slug: "giay-adidas-a-bong-turf-predator-league-tre-em",
    description:
      "Giày Đá Bóng Turf Predator League Trẻ Em\nGiày Đá Bóng Turf Predator League dành cho trẻ em là một sản phẩm lý tưởng cho các cầu thủ nhí yêu thích môn thể thao vua. Với thiết kế tinh tế và tính năng nổi bật, mẫu giày này không chỉ mang lại phong cách mà còn giúp cải thiện hiệu suất thi đấu.\n\nĐặc điểm nổi bật:\nChất liệu: Được làm từ chất liệu synthetic bền bỉ, giúp bảo vệ đôi chân và tạo cảm giác thoải mái khi di chuyển.\nThiết kế: Màu sắc bắt mắt và họa tiết thể thao nổi bật, phù hợp với sở thích của trẻ em. Phần thân giày được thiết kế ôm sát, giúp tăng cường sự hỗ trợ cho chân.\nĐế giày: Đế cao su với các chấu nhỏ giúp tạo độ bám tốt trên mặt sân cỏ nhân tạo, hỗ trợ trẻ em chạy nhanh và xử lý bóng chính xác.\nCông nghệ: Hệ thống đệm trong giày giúp giảm chấn thương và mang lại cảm giác êm ái khi di chuyển.\nGiày Đá Bóng Turf Predator League Trẻ Em là lựa chọn hoàn hảo cho các buổi tập luyện và thi đấu, giúp các cầu thủ trẻ tự tin thể hiện khả năng của mình trên sân cỏ.",
    thumbnail: "https://res.cloudinary.com/dbju2ugir/image/upload/v1729353220/Beemely/ctfoltuuxfzjfcp9elg5.png",
    images: [
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729353224/Beemely/jicwxztwcu3ymhdqrkvl.png",
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729353224/Beemely/u5ugzsgmwmnqzr82uvqy.png",
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729353224/Beemely/oqwvjw2sowxmh3spkyn3.png",
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729353224/Beemely/niaxs8sfr7tb1mnnxlyu.png",
    ],
    tags: [
      {
        id: "670ffeb70a9054a83674a5da",
        name: "Giày Sneaker Trẻ Em",
        slug: "giay-sneaker-tre-em",
        image: "https://res.cloudinary.com/dbju2ugir/image/upload/v1729101492/Beemely/htzedjfbqt7se3ick26l.png",
        description: "Giày sneaker trẻ em năng động, bảo vệ bàn chân khi vận động.",
        parentId: null,
        status: 1,
      },
    ],
    gender: {
      id: "671208565ce9910c4f862008",
      name: "Dành cho Trẻ em",
      slug: "danh-cho-tre-em",
    },
    variants: [
      {
        id: "6713d67d1e766dfb9055ea18",
        color: {
          id: "670ffb420a9054a83674a498",
          name: "Màu Xám",
          value: "#808080",
        },
        stock: 21,
        price: 1700000,
        discountPrice: 1499000,
        size: {
          id: "6712b1dab1b995cd15d2dfa9",
          name: "35",
          gender: "671208565ce9910c4f862008",
        },
      },
      {
        id: "6713d67d1e766dfb9055ea19",
        color: {
          id: "670ffb420a9054a83674a498",
          name: "Màu Xám",
          value: "#808080",
        },
        stock: 50,
        price: 1700000,
        discountPrice: 1499000,
        size: {
          id: "6712140cc99274a435dda475",
          name: "36",
          gender: "671208565ce9910c4f862008",
        },
      },
    ],
    labels: [
      {
        id: "670ffcfa0a9054a83674a54f",
        name: "Hot",
        slug: "hot",
        description: "Giày sneaker phong cách trẻ trung, phù hợp cho các bạn trẻ.",
        status: 1,
      },
      {
        id: "670ffcba0a9054a83674a525",
        name: "Giày Thể Thao",
        slug: "giay-the-thao",
        description: "Giày thể thao năng động, phù hợp cho các hoạt động thể dục, thể thao.",
        status: 1,
      },
      {
        id: "6712b63db1b995cd15d2e1ce",
        name: "Bán chạy",
        slug: "ban-chay",
        description: "Giày không có gót cao, mang lại cảm giác thoải mái khi di chuyển, thích hợp cho các hoạt động hàng ngày.",
        status: 1,
      },
    ],
    brand: {
      id: "671000e30a9054a83674a68d",
      name: "Adidas",
      image: "https://res.cloudinary.com/dbju2ugir/image/upload/v1729102050/Beemely/jt9ztsppb5dzhp7myktn.png",
      description: "Giày thể thao Đức, thiết kế hiện đại.",
      slug: "adidas",
    },
    productColors: [
      {
        id: "6713d67d1e766dfb9055ea1d",
        colorId: {
          id: "670ffb420a9054a83674a498",
          name: "Màu Xám",
          value: "#808080",
        },
        imageUrl: "https://res.cloudinary.com/dbju2ugir/image/upload/v1729353282/Beemely/sp9clcsr2jfhgq3e0iqt.png",
      },
    ],
    productSizes: [
      {
        id: "6712b1dab1b995cd15d2dfa9",
        name: "35",
        gender: "671208565ce9910c4f862008",
      },
      {
        id: "6712140cc99274a435dda475",
        name: "36",
        gender: "671208565ce9910c4f862008",
      },
    ],
    productType: {
      id: "66d46c2a741cf88d736d372f",
      name: "Giày Bata",
      slug: "giay-bata",
    },
    flag: "all_page",
    status: 1,
  },
  {
    id: "6713d5d71e766dfb9055e8aa",
    name: "Giày Adidias Đá Bóng Trong Nhà Samba",
    slug: "giay-adidias-a-bong-trong-nha-samba",
    description:
      "Giày Đá Bóng Trong Nhà Samba là một trong những mẫu giày đá bóng huyền thoại, nổi tiếng với thiết kế đặc trưng và hiệu suất cao. Mẫu giày này được làm từ chất liệu da mềm mại, giúp mang lại cảm giác thoải mái và bám sân tốt.\n\nĐặc điểm nổi bật:\nChất liệu: Da tổng hợp hoặc da thật (tuỳ phiên bản), bền bỉ và dễ vệ sinh.\nThiết kế: Đường chỉ may tỉ mỉ, logo đặc trưng, với màu sắc nổi bật giúp tạo phong cách riêng.\nĐế giày: Đế cao su chống trượt, thiết kế đặc biệt giúp tăng độ bám trên bề mặt sân trong nhà, hỗ trợ các pha di chuyển nhanh và linh hoạt.\nCông nghệ: Hệ thống đệm tốt giúp giảm chấn thương và tạo cảm giác dễ chịu khi di chuyển.\nGiày đá bóng trong nhà Samba là lựa chọn lý tưởng cho những ai yêu thích môn thể thao này, đặc biệt khi chơi trong nhà hoặc trên sân cỏ nhân tạo.",
    thumbnail: "https://res.cloudinary.com/dbju2ugir/image/upload/v1729353080/Beemely/opqcbh997s6mk7hzv4uz.png",
    images: [
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729353085/Beemely/pxyrhhohnecg04ioxzp1.png",
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729353087/Beemely/ewy6h8oxtuggmf3boibj.png",
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729353087/Beemely/mo1lubdbewjpfx93jkcz.png",
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729353087/Beemely/of2v4r7m02dea3dowtaf.png",
    ],
    tags: [
      {
        id: "670ffe1f0a9054a83674a5b0",
        name: "Giày Thể Thao Nam",
        slug: "giay-the-thao-nam",
        image: "https://res.cloudinary.com/dbju2ugir/image/upload/v1729101340/Beemely/ihdn4rjph23ksoeag5zw.png",
        description: "Giày thể thao nam, thiết kế bền bỉ, thoải mái cho các hoạt động ngoài trời.",
        parentId: null,
        status: 1,
      },
    ],
    gender: {
      id: "671208425ce9910c4f861fec",
      name: "Dành cho Nam",
      slug: "danh-cho-nam",
    },
    variants: [
      {
        id: "6713d6891e766dfb9055eadd",
        color: {
          id: "670ffb420a9054a83674a498",
          name: "Màu Xám",
          value: "#808080",
        },
        stock: 13,
        price: 2700000,
        discountPrice: 2499000,
        size: {
          id: "6712b237b1b995cd15d2e046",
          name: "43",
          gender: "671208425ce9910c4f861fec",
        },
      },
      {
        id: "6713d6891e766dfb9055eade",
        color: {
          id: "670ffb420a9054a83674a498",
          name: "Màu Xám",
          value: "#808080",
        },
        stock: 32,
        price: 2700000,
        discountPrice: 2499000,
        size: {
          id: "6712b22bb1b995cd15d2e02f",
          name: "42",
          gender: "671208425ce9910c4f861fec",
        },
      },
      {
        id: "6713d6891e766dfb9055eadf",
        color: {
          id: "670ffb420a9054a83674a498",
          name: "Màu Xám",
          value: "#808080",
        },
        stock: 34,
        price: 2700000,
        discountPrice: 2499000,
        size: {
          id: "6712b20db1b995cd15d2e005",
          name: "41",
          gender: "671208425ce9910c4f861fec",
        },
      },
      {
        id: "6713d6891e766dfb9055eae0",
        color: {
          id: "670ffb420a9054a83674a498",
          name: "Màu Xám",
          value: "#808080",
        },
        stock: 43,
        price: 2700000,
        discountPrice: 2499000,
        size: {
          id: "67120f78c99274a435dd9b3c",
          name: "40",
          gender: "671208425ce9910c4f861fec",
        },
      },
    ],
    labels: [
      {
        id: "670ffcba0a9054a83674a525",
        name: "Giày Thể Thao",
        slug: "giay-the-thao",
        description: "Giày thể thao năng động, phù hợp cho các hoạt động thể dục, thể thao.",
        status: 1,
      },
      {
        id: "6712b63db1b995cd15d2e1ce",
        name: "Bán chạy",
        slug: "ban-chay",
        description: "Giày không có gót cao, mang lại cảm giác thoải mái khi di chuyển, thích hợp cho các hoạt động hàng ngày.",
        status: 1,
      },
    ],
    brand: {
      id: "671000e30a9054a83674a68d",
      name: "Adidas",
      image: "https://res.cloudinary.com/dbju2ugir/image/upload/v1729102050/Beemely/jt9ztsppb5dzhp7myktn.png",
      description: "Giày thể thao Đức, thiết kế hiện đại.",
      slug: "adidas",
    },
    productColors: [
      {
        id: "6713d6891e766dfb9055eae6",
        colorId: {
          id: "670ffb420a9054a83674a498",
          name: "Màu Xám",
          value: "#808080",
        },
        imageUrl: "https://res.cloudinary.com/dbju2ugir/image/upload/v1729353143/Beemely/zcrvisqaavdogirew0ut.png",
      },
    ],
    productSizes: [
      {
        id: "6712b237b1b995cd15d2e046",
        name: "43",
        gender: "671208425ce9910c4f861fec",
      },
      {
        id: "6712b22bb1b995cd15d2e02f",
        name: "42",
        gender: "671208425ce9910c4f861fec",
      },
      {
        id: "6712b20db1b995cd15d2e005",
        name: "41",
        gender: "671208425ce9910c4f861fec",
      },
      {
        id: "67120f78c99274a435dd9b3c",
        name: "40",
        gender: "671208425ce9910c4f861fec",
      },
    ],
    productType: {
      id: "66d46c2a741cf88d736d372f",
      name: "Giày Bata",
      slug: "giay-bata",
    },
    flag: "all_page",
    status: 1,
  },
  {
    id: "6713d5291e766dfb9055e7e8",
    name: "Giày VANS SKATE SLIP-ON BLACK/WHITE",
    slug: "giay-vans-skate-slip-on-blackwhite",
    description:
      "Giày VANS Skate Slip-On Black/White là mẫu giày trượt ván cổ điển với thiết kế không dây, tiện lợi và dễ mang. Phiên bản này nổi bật với tông màu đen/trắng đơn giản nhưng tinh tế, mang đậm phong cách đặc trưng của VANS. Phần upper được làm từ chất liệu vải canvas bền bỉ, kết hợp với đế cao su waffle giúp tăng độ bám và linh hoạt trên bề mặt trượt. Đây là lựa chọn hoàn hảo cho những người yêu thích thể thao đường phố, đặc biệt là bộ môn trượt ván, nhờ vào sự thoải mái và độ bền vượt trội.",
    thumbnail: "https://res.cloudinary.com/dbju2ugir/image/upload/v1729352939/Beemely/k355djynhmyb4i5wedhk.png",
    images: [
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729352945/Beemely/xx1qvjwf4gnxdcea1mev.png",
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729352945/Beemely/dfz7uruxn9ch4bo2q6qm.png",
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729352946/Beemely/p0kvaqbo403ikpdcbbhj.png",
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729352946/Beemely/q6mc4hdyrz5l93npkb0a.png",
    ],
    tags: [
      {
        id: "670ffe1f0a9054a83674a5b0",
        name: "Giày Thể Thao Nam",
        slug: "giay-the-thao-nam",
        image: "https://res.cloudinary.com/dbju2ugir/image/upload/v1729101340/Beemely/ihdn4rjph23ksoeag5zw.png",
        description: "Giày thể thao nam, thiết kế bền bỉ, thoải mái cho các hoạt động ngoài trời.",
        parentId: null,
        status: 1,
      },
    ],
    gender: {
      id: "671208425ce9910c4f861fec",
      name: "Dành cho Nam",
      slug: "danh-cho-nam",
    },
    variants: [
      {
        id: "6713d5291e766dfb9055e7e2",
        color: {
          id: "66b8ddb90ad51bb46773dfd1",
          name: "Màu Đen",
          value: "#000000",
        },
        stock: 32,
        price: 2100000,
        discountPrice: 1999000,
        size: {
          id: "6712b237b1b995cd15d2e046",
          name: "43",
          gender: "671208425ce9910c4f861fec",
        },
      },
      {
        id: "6713d5291e766dfb9055e7e3",
        color: {
          id: "66b8ddb90ad51bb46773dfd1",
          name: "Màu Đen",
          value: "#000000",
        },
        stock: 32,
        price: 2100000,
        discountPrice: 1999000,
        size: {
          id: "6712b22bb1b995cd15d2e02f",
          name: "42",
          gender: "671208425ce9910c4f861fec",
        },
      },
      {
        id: "6713d5291e766dfb9055e7e4",
        color: {
          id: "66b8ddb90ad51bb46773dfd1",
          name: "Màu Đen",
          value: "#000000",
        },
        stock: 43,
        price: 2100000,
        discountPrice: 1999000,
        size: {
          id: "6712b20db1b995cd15d2e005",
          name: "41",
          gender: "671208425ce9910c4f861fec",
        },
      },
      {
        id: "6713d5291e766dfb9055e7e5",
        color: {
          id: "66b8ddb90ad51bb46773dfd1",
          name: "Màu Đen",
          value: "#000000",
        },
        stock: 54,
        price: 2100000,
        discountPrice: 1999000,
        size: {
          id: "67120f78c99274a435dd9b3c",
          name: "40",
          gender: "671208425ce9910c4f861fec",
        },
      },
    ],
    labels: [
      {
        id: "670ffcba0a9054a83674a525",
        name: "Giày Thể Thao",
        slug: "giay-the-thao",
        description: "Giày thể thao năng động, phù hợp cho các hoạt động thể dục, thể thao.",
        status: 1,
      },
      {
        id: "670ffcfa0a9054a83674a54f",
        name: "Hot",
        slug: "hot",
        description: "Giày sneaker phong cách trẻ trung, phù hợp cho các bạn trẻ.",
        status: 1,
      },
    ],
    brand: {
      id: "6710012b0a9054a83674a6b7",
      name: "Vans",
      image: "https://res.cloudinary.com/dbju2ugir/image/upload/v1729102111/Beemely/d15fwrvy5fet4njikqrc.png",
      description: "Giày skate, phong cách đường phố.",
      slug: "vans",
    },
    productColors: [
      {
        id: "6713d5291e766dfb9055e7e1",
        colorId: {
          id: "66b8ddb90ad51bb46773dfd1",
          name: "Màu Đen",
          value: "#000000",
        },
        imageUrl: "https://res.cloudinary.com/dbju2ugir/image/upload/v1729352971/Beemely/r1c6gfctwpbekk2ymahc.png",
      },
    ],
    productSizes: [
      {
        id: "6712b237b1b995cd15d2e046",
        name: "43",
        gender: "671208425ce9910c4f861fec",
      },
      {
        id: "6712b22bb1b995cd15d2e02f",
        name: "42",
        gender: "671208425ce9910c4f861fec",
      },
      {
        id: "6712b20db1b995cd15d2e005",
        name: "41",
        gender: "671208425ce9910c4f861fec",
      },
      {
        id: "67120f78c99274a435dd9b3c",
        name: "40",
        gender: "671208425ce9910c4f861fec",
      },
    ],
    productType: {
      id: "66d46c2a741cf88d736d372f",
      name: "Giày Bata",
      slug: "giay-bata",
    },
    flag: "all_page",
    status: 1,
  },
  {
    id: "6713d4791e766dfb9055e716",
    name: "Giày VANS AUTHENTIC JOYFUL DENIM LIGHT NAVY",
    slug: "giay-vans-authentic-joyful-denim-light-navy",
    description:
      "Giày VANS Authentic Joyful Denim Light Navy là phiên bản cải tiến của dòng giày cổ thấp Authentic, nổi bật với chất liệu denim màu xanh nhạt độc đáo. Thiết kế này mang lại cảm giác mới mẻ và trẻ trung, kết hợp cùng đế cao su trắng cổ điển giúp giữ vững phong cách đặc trưng của VANS. Đôi giày mang đến sự thoải mái cho người dùng nhờ vào chất liệu vải mềm mại và đường may tỉ mỉ. Với kiểu dáng đơn giản nhưng phong cách, VANS Authentic Joyful Denim Light Navy là lựa chọn lý tưởng cho những ai yêu thích vẻ đẹp cổ điển pha chút hiện đại.",
    thumbnail: "https://res.cloudinary.com/dbju2ugir/image/upload/v1729352723/Beemely/jbjp5pihjyhu1gdmblos.png",
    images: [
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729352731/Beemely/qtwc1fl6ukzr0xdpapu3.png",
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729352731/Beemely/mxbnnjhsdracgkc0ecdk.png",
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729352731/Beemely/zhhies4j1oizmiefdtxg.png",
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729352731/Beemely/mwihr6b9gsditnrtq1mp.png",
    ],
    tags: [
      {
        id: "670ffeb70a9054a83674a5da",
        name: "Giày Sneaker Trẻ Em",
        slug: "giay-sneaker-tre-em",
        image: "https://res.cloudinary.com/dbju2ugir/image/upload/v1729101492/Beemely/htzedjfbqt7se3ick26l.png",
        description: "Giày sneaker trẻ em năng động, bảo vệ bàn chân khi vận động.",
        parentId: null,
        status: 1,
      },
    ],
    gender: {
      id: "671208565ce9910c4f862008",
      name: "Dành cho Trẻ em",
      slug: "danh-cho-tre-em",
    },
    variants: [
      {
        id: "6713d4791e766dfb9055e712",
        color: {
          id: "670ffb790a9054a83674a4b2",
          name: "Màu Xanh Lam",
          value: "#99FFFF",
        },
        stock: 32,
        price: 1550000,
        discountPrice: 1350000,
        size: {
          id: "6712b1dab1b995cd15d2dfa9",
          name: "35",
          gender: "671208565ce9910c4f862008",
        },
      },
      {
        id: "6713d4791e766dfb9055e713",
        color: {
          id: "670ffb790a9054a83674a4b2",
          name: "Màu Xanh Lam",
          value: "#99FFFF",
        },
        stock: 43,
        price: 1550000,
        discountPrice: 1350000,
        size: {
          id: "6712140cc99274a435dda475",
          name: "36",
          gender: "671208565ce9910c4f862008",
        },
      },
    ],
    labels: [
      {
        id: "6712b63db1b995cd15d2e1ce",
        name: "Bán chạy",
        slug: "ban-chay",
        description: "Giày không có gót cao, mang lại cảm giác thoải mái khi di chuyển, thích hợp cho các hoạt động hàng ngày.",
        status: 1,
      },
      {
        id: "670ffcba0a9054a83674a525",
        name: "Giày Thể Thao",
        slug: "giay-the-thao",
        description: "Giày thể thao năng động, phù hợp cho các hoạt động thể dục, thể thao.",
        status: 1,
      },
      {
        id: "6712b651b1b995cd15d2e1dc",
        name: "Mới về",
        slug: "moi-ve",
        description: "Dép có quai, thoáng mát, thường dùng trong mùa hè hoặc các dịp đi chơi, du lịch.",
        status: 1,
      },
    ],
    brand: {
      id: "6710012b0a9054a83674a6b7",
      name: "Vans",
      image: "https://res.cloudinary.com/dbju2ugir/image/upload/v1729102111/Beemely/d15fwrvy5fet4njikqrc.png",
      description: "Giày skate, phong cách đường phố.",
      slug: "vans",
    },
    productColors: [
      {
        id: "6713d4791e766dfb9055e711",
        colorId: {
          id: "670ffb790a9054a83674a4b2",
          name: "Màu Xanh Lam",
          value: "#99FFFF",
        },
        imageUrl: "https://res.cloudinary.com/dbju2ugir/image/upload/v1729352796/Beemely/rrncystwvow35x0gk4r0.png",
      },
    ],
    productSizes: [
      {
        id: "6712b1dab1b995cd15d2dfa9",
        name: "35",
        gender: "671208565ce9910c4f862008",
      },
      {
        id: "6712140cc99274a435dda475",
        name: "36",
        gender: "671208565ce9910c4f862008",
      },
    ],
    productType: {
      id: "66d46de6741cf88d736d377a",
      name: "Giày chạy bộ",
      slug: "giay-chay-bo",
    },
    flag: "all_page",
    status: 1,
  },
  {
    id: "6713d3e61e766dfb9055e666",
    name: "GIÀY VANS CHECKERBOARD SLIP-ON CLASSIC ĐEN/TRẮNG",
    slug: "giay-vans-checkerboard-slip-on-classic-entrang",
    description:
      'Đối với VANS không một tín đồ nào còn xa lại với khả năng sáng tạo, phấn đấu không ngừng nghỉ cũng như sự chuyên chú vào chất lượng ngày một cải tiến. Sự hài lòng và phong cách của các tín đồ được VANS đặt làm tôn chỉ ngay từ những ngày đầu tiên bước chân vào ngành giày chuyên nghiệp. Minh chứng rõ nhất cho sự ưu ái mà nhà mốt OFF THE WALL dành cho các tín đồ yêu quý mình chính là siêu phẩm VANS SLIP-ON. Đây là siêu phẩm với bề dày lịch sử gần một nửa thế kỷ. Tuy nhiên, được cho ra mắt với một tên gọi khác - VANS #44 vào năm 1979 sau này được đổi tên thành VANS SLIP-ON hay “giày lười” cái tên thân thiết mà tín đồ dành riêng gọi cho tuyệt phẩm. VANS SLIP-ON với ưu điểm lớn phần đế giày được thiết kế bằng chất liệu cao su lưu hoá, cùng phần Upper đệm thun có thể dễ dàng tùy chỉnh, tiện lợi và linh động hơn trong việc sử dụng sản phẩm. Đối với siêu phẩm VANS SLIP-ON, VANS cần gắn liền với một họa tiết đỉnh cao làm nên tên tuổi của nó - có lẽ ai cũng biết đó chính là Checkerboard. \n\nTừ đấy, có lẽ chúng ta không cần nói nhiều về độ hot của VANS SLIP-ON CHECKERBOARD trong những năm gần đây, khi mà nó được nhiều ngôi sao nổi tiếng "trên chân" và quan trọng là được rất nhiều bạn trẻ trên toàn thế giới ủng hộ. Nổi tiếng từ khi được SEAN PENN mang trong bộ phim FAST TIMES năm 1982, đôi giày này đã mang đến một luồn gió mới cho thời trang, đó là thiết kế SLIP-ON trứ danh cùng hoạ tiết ô caro checkerboard kinh điển.',
    thumbnail: "https://res.cloudinary.com/dbju2ugir/image/upload/v1729352676/Beemely/lvcnvfugksxemae3jgv8.png",
    images: [
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729352600/Beemely/cgodycriqdfjwvgq6esn.png",
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729352600/Beemely/hvasr3ikctrta6eildoy.png",
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729352600/Beemely/roabo43m6myxrbxapfcp.png",
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729352600/Beemely/bjw9c7aj27u8bvvc0ojw.png",
    ],
    tags: [
      {
        id: "670ffe710a9054a83674a5c5",
        name: "Giày Thể Thao Nữ",
        slug: "giay-the-thao-nu",
        image: "https://res.cloudinary.com/dbju2ugir/image/upload/v1729101421/Beemely/x3eqh1il2k8ukfaedaww.png",
        description: "Giày thể thao nữ phong cách, thích hợp cho luyện tập và dạo phố.",
        parentId: null,
        status: 1,
      },
    ],
    gender: {
      id: "671208505ce9910c4f861ffa",
      name: "Dành cho Nữ",
      slug: "danh-cho-nu",
    },
    variants: [
      {
        id: "6713d3e61e766dfb9055e660",
        color: {
          id: "66b8ddb90ad51bb46773dfd1",
          name: "Màu Đen",
          value: "#000000",
        },
        stock: 53,
        price: 1450000,
        discountPrice: 1250000,
        size: {
          id: "6712eac4b1b995cd15d2edce",
          name: "39",
          gender: "671208505ce9910c4f861ffa",
        },
      },
      {
        id: "6713d3e61e766dfb9055e661",
        color: {
          id: "66b8ddb90ad51bb46773dfd1",
          name: "Màu Đen",
          value: "#000000",
        },
        stock: 32,
        price: 1450000,
        discountPrice: 1250000,
        size: {
          id: "6712eabdb1b995cd15d2edb7",
          name: "38",
          gender: "671208505ce9910c4f861ffa",
        },
      },
      {
        id: "6713d3e61e766dfb9055e662",
        color: {
          id: "66b8ddb90ad51bb46773dfd1",
          name: "Màu Đen",
          value: "#000000",
        },
        stock: 3,
        price: 1450000,
        discountPrice: 1250000,
        size: {
          id: "6712eab6b1b995cd15d2eda0",
          name: "37",
          gender: "671208505ce9910c4f861ffa",
        },
      },
      {
        id: "6713d3e61e766dfb9055e663",
        color: {
          id: "66b8ddb90ad51bb46773dfd1",
          name: "Màu Đen",
          value: "#000000",
        },
        stock: 23,
        price: 1450000,
        discountPrice: 1250000,
        size: {
          id: "6712eaafb1b995cd15d2ed89",
          name: "36",
          gender: "671208505ce9910c4f861ffa",
        },
      },
    ],
    labels: [
      {
        id: "670ffcfa0a9054a83674a54f",
        name: "Hot",
        slug: "hot",
        description: "Giày sneaker phong cách trẻ trung, phù hợp cho các bạn trẻ.",
        status: 1,
      },
      {
        id: "6712b651b1b995cd15d2e1dc",
        name: "Mới về",
        slug: "moi-ve",
        description: "Dép có quai, thoáng mát, thường dùng trong mùa hè hoặc các dịp đi chơi, du lịch.",
        status: 1,
      },
      {
        id: "670ffcd10a9054a83674a533",
        name: "Giày Da",
        slug: "giay-da",
        description: "Giày da cao cấp, mang lại vẻ lịch lãm và sang trọng.",
        status: 1,
      },
    ],
    brand: {
      id: "6710012b0a9054a83674a6b7",
      name: "Vans",
      image: "https://res.cloudinary.com/dbju2ugir/image/upload/v1729102111/Beemely/d15fwrvy5fet4njikqrc.png",
      description: "Giày skate, phong cách đường phố.",
      slug: "vans",
    },
    productColors: [
      {
        id: "6713d3e61e766dfb9055e65f",
        colorId: {
          id: "66b8ddb90ad51bb46773dfd1",
          name: "Màu Đen",
          value: "#000000",
        },
        imageUrl: "https://res.cloudinary.com/dbju2ugir/image/upload/v1729352639/Beemely/lu9f2d8xana41sx44ang.png",
      },
    ],
    productSizes: [
      {
        id: "6712eac4b1b995cd15d2edce",
        name: "39",
        gender: "671208505ce9910c4f861ffa",
      },
      {
        id: "6712eabdb1b995cd15d2edb7",
        name: "38",
        gender: "671208505ce9910c4f861ffa",
      },
      {
        id: "6712eab6b1b995cd15d2eda0",
        name: "37",
        gender: "671208505ce9910c4f861ffa",
      },
      {
        id: "6712eaafb1b995cd15d2ed89",
        name: "36",
        gender: "671208505ce9910c4f861ffa",
      },
    ],
    productType: {
      id: "66d46c2a741cf88d736d372f",
      name: "Giày Bata",
      slug: "giay-bata",
    },
    flag: "all_page",
    status: 1,
  },
  {
    id: "6713d33b1e766dfb9055e5b4",
    name: "Giày VANS AUTHENTIC CLASSIC ĐEN/TRẮNG",
    slug: "giay-vans-authentic-classic-entrang",
    description:
      "Khi thế giới ngày càng phát triển hơn về mọi mặt, thời trang cũng vì thế mà không ngừng tiến bước về phía trước. Nhưng! Tất cả những cái mới đều được xây dựng dựa trên một thứ gọi là NỀN TẢNG. Và dĩ nhiên, VANS được cộng đồng thể thao biết đến như một thương hiệu thời trang chuyên về giày dành cho các bộ môn nghệ thuật đường phố, nổi bật là trượt ván. Với chiều dài hoạt động chuyên môn hơn 50 năm trong ngành thời trang may mặc, thương hiệu được sáng lập bởi một nghệ nhân giày - ông Paul Van Doren vào năm 1966. VANS được đặt trụ sở đầu tiên tại Anaheim, California, Mỹ và hoạt động cho đến ngày nay. VANS AUTHENTIC là một trong những sản phẩm xung phong đầu tiên, mở đầu cho một con đường tiếp nối đam mê của một thương hiệu giày vươn tầm thế giới. Và khi mà cái cũng cùng cái mới giao thoa kết hợp cùng với sự tinh tế và sự cố gắng không ngừng phá bỏ giới hạn của nhà OFF THE WALL, một tinh hoa đã của làng Sneaker đã ra đời được ra mắt sớm nhất từ năm 1966 với tên gọi VANS #44, được trang bị đế cao su độ bám tốt cho những môn thể thao mạo hiểm như trượt ván, BMX v.v..., upper vải canvas cao cấp, phong cách cổ điển hợp với cả nam lẫn nữ.",
    thumbnail: "https://res.cloudinary.com/dbju2ugir/image/upload/v1729352397/Beemely/fi9sejsx46e4p1q5dyey.png",
    images: [
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729352403/Beemely/rj3bcw3q8pk7n9ldyeqt.png",
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729352403/Beemely/gp25yucaqgaujd1x5sze.png",
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729352403/Beemely/b6ac6bpoiihg3jeoakrf.png",
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729352403/Beemely/rsjhaejlxvpdlmov2xs3.png",
    ],
    tags: [
      {
        id: "670ffe1f0a9054a83674a5b0",
        name: "Giày Thể Thao Nam",
        slug: "giay-the-thao-nam",
        image: "https://res.cloudinary.com/dbju2ugir/image/upload/v1729101340/Beemely/ihdn4rjph23ksoeag5zw.png",
        description: "Giày thể thao nam, thiết kế bền bỉ, thoải mái cho các hoạt động ngoài trời.",
        parentId: null,
        status: 1,
      },
    ],
    gender: {
      id: "671208425ce9910c4f861fec",
      name: "Dành cho Nam",
      slug: "danh-cho-nam",
    },
    variants: [
      {
        id: "6713d33b1e766dfb9055e5ae",
        color: {
          id: "66b8ddb90ad51bb46773dfd1",
          name: "Màu Đen",
          value: "#000000",
        },
        stock: 34,
        price: 1650000,
        discountPrice: 1450000,
        size: {
          id: "6712b237b1b995cd15d2e046",
          name: "43",
          gender: "671208425ce9910c4f861fec",
        },
      },
      {
        id: "6713d33b1e766dfb9055e5af",
        color: {
          id: "66b8ddb90ad51bb46773dfd1",
          name: "Màu Đen",
          value: "#000000",
        },
        stock: 40,
        price: 1650000,
        discountPrice: 1450000,
        size: {
          id: "6712b22bb1b995cd15d2e02f",
          name: "42",
          gender: "671208425ce9910c4f861fec",
        },
      },
      {
        id: "6713d33b1e766dfb9055e5b0",
        color: {
          id: "66b8ddb90ad51bb46773dfd1",
          name: "Màu Đen",
          value: "#000000",
        },
        stock: 54,
        price: 1650000,
        discountPrice: 1450000,
        size: {
          id: "6712b20db1b995cd15d2e005",
          name: "41",
          gender: "671208425ce9910c4f861fec",
        },
      },
      {
        id: "6713d33b1e766dfb9055e5b1",
        color: {
          id: "66b8ddb90ad51bb46773dfd1",
          name: "Màu Đen",
          value: "#000000",
        },
        stock: 21,
        price: 1650000,
        discountPrice: 1450000,
        size: {
          id: "67120f78c99274a435dd9b3c",
          name: "40",
          gender: "671208425ce9910c4f861fec",
        },
      },
    ],
    labels: [
      {
        id: "670ffcba0a9054a83674a525",
        name: "Giày Thể Thao",
        slug: "giay-the-thao",
        description: "Giày thể thao năng động, phù hợp cho các hoạt động thể dục, thể thao.",
        status: 1,
      },
      {
        id: "6712b63db1b995cd15d2e1ce",
        name: "Bán chạy",
        slug: "ban-chay",
        description: "Giày không có gót cao, mang lại cảm giác thoải mái khi di chuyển, thích hợp cho các hoạt động hàng ngày.",
        status: 1,
      },
    ],
    brand: {
      id: "6710012b0a9054a83674a6b7",
      name: "Vans",
      image: "https://res.cloudinary.com/dbju2ugir/image/upload/v1729102111/Beemely/d15fwrvy5fet4njikqrc.png",
      description: "Giày skate, phong cách đường phố.",
      slug: "vans",
    },
    productColors: [
      {
        id: "6713d33b1e766dfb9055e5ad",
        colorId: {
          id: "66b8ddb90ad51bb46773dfd1",
          name: "Màu Đen",
          value: "#000000",
        },
        imageUrl: "https://res.cloudinary.com/dbju2ugir/image/upload/v1729352478/Beemely/lskvwbqgvcsggqo8a302.png",
      },
    ],
    productSizes: [
      {
        id: "6712b237b1b995cd15d2e046",
        name: "43",
        gender: "671208425ce9910c4f861fec",
      },
      {
        id: "6712b22bb1b995cd15d2e02f",
        name: "42",
        gender: "671208425ce9910c4f861fec",
      },
      {
        id: "6712b20db1b995cd15d2e005",
        name: "41",
        gender: "671208425ce9910c4f861fec",
      },
      {
        id: "67120f78c99274a435dd9b3c",
        name: "40",
        gender: "671208425ce9910c4f861fec",
      },
    ],
    productType: {
      id: "66d46c2a741cf88d736d372f",
      name: "Giày Bata",
      slug: "giay-bata",
    },
    flag: "all_page",
    status: 1,
  },
  {
    id: "6713d2951e766dfb9055e502",
    name: " Giày PUMA sneakers unisex cổ thấp Essentials Rider FV",
    slug: "giay-puma-sneakers-unisex-co-thap-essentials-rider-fv",
    description:
      "Giày PUMA sneakers unisex cổ thấp **Essentials Rider FV** là mẫu giày thể thao mang thiết kế cổ điển kết hợp với sự hiện đại. Với phom dáng cổ thấp đặc trưng của dòng Rider, đôi giày này mang lại sự thoải mái và phong cách tối giản, phù hợp cho cả nam và nữ. Chất liệu thoáng khí cùng đế giày êm ái giúp nâng cao trải nghiệm di chuyển, đồng thời thiết kế tinh tế giúp dễ dàng kết hợp với nhiều loại trang phục hàng ngày. Essentials Rider FV là lựa chọn hoàn hảo cho những ai yêu thích sự đơn giản nhưng vẫn năng động.",
    thumbnail: "https://res.cloudinary.com/dbju2ugir/image/upload/v1729352211/Beemely/up1wyofafto4nxvdyfmj.png",
    images: [
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729352257/Beemely/i3qfsbkxyjrc527wf6ga.png",
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729352257/Beemely/nlks4zmnab9gq6dbsl0o.png",
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729352257/Beemely/o5vkudas5ua7lsjb1uyj.png",
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729352256/Beemely/gnly3fdhzdwrwolweden.png",
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729352257/Beemely/cpn2xcswsgieoyhtwjwp.png",
    ],
    tags: [
      {
        id: "670ffe1f0a9054a83674a5b0",
        name: "Giày Thể Thao Nam",
        slug: "giay-the-thao-nam",
        image: "https://res.cloudinary.com/dbju2ugir/image/upload/v1729101340/Beemely/ihdn4rjph23ksoeag5zw.png",
        description: "Giày thể thao nam, thiết kế bền bỉ, thoải mái cho các hoạt động ngoài trời.",
        parentId: null,
        status: 1,
      },
    ],
    gender: {
      id: "671208425ce9910c4f861fec",
      name: "Dành cho Nam",
      slug: "danh-cho-nam",
    },
    variants: [
      {
        id: "6713d2951e766dfb9055e4fc",
        color: {
          id: "670ffb790a9054a83674a4b2",
          name: "Màu Xanh Lam",
          value: "#99FFFF",
        },
        stock: 34,
        price: 1399000,
        discountPrice: 1199000,
        size: {
          id: "6712b237b1b995cd15d2e046",
          name: "43",
          gender: "671208425ce9910c4f861fec",
        },
      },
      {
        id: "6713d2951e766dfb9055e4fd",
        color: {
          id: "670ffb790a9054a83674a4b2",
          name: "Màu Xanh Lam",
          value: "#99FFFF",
        },
        stock: 54,
        price: 1399000,
        discountPrice: 1199000,
        size: {
          id: "6712b22bb1b995cd15d2e02f",
          name: "42",
          gender: "671208425ce9910c4f861fec",
        },
      },
      {
        id: "6713d2951e766dfb9055e4fe",
        color: {
          id: "670ffb790a9054a83674a4b2",
          name: "Màu Xanh Lam",
          value: "#99FFFF",
        },
        stock: 50,
        price: 1399000,
        discountPrice: 1199000,
        size: {
          id: "6712b20db1b995cd15d2e005",
          name: "41",
          gender: "671208425ce9910c4f861fec",
        },
      },
      {
        id: "6713d2951e766dfb9055e4ff",
        color: {
          id: "670ffb790a9054a83674a4b2",
          name: "Màu Xanh Lam",
          value: "#99FFFF",
        },
        stock: 54,
        price: 1399000,
        discountPrice: 1199000,
        size: {
          id: "67120f78c99274a435dd9b3c",
          name: "40",
          gender: "671208425ce9910c4f861fec",
        },
      },
    ],
    labels: [
      {
        id: "670ffcba0a9054a83674a525",
        name: "Giày Thể Thao",
        slug: "giay-the-thao",
        description: "Giày thể thao năng động, phù hợp cho các hoạt động thể dục, thể thao.",
        status: 1,
      },
      {
        id: "6712b651b1b995cd15d2e1dc",
        name: "Mới về",
        slug: "moi-ve",
        description: "Dép có quai, thoáng mát, thường dùng trong mùa hè hoặc các dịp đi chơi, du lịch.",
        status: 1,
      },
    ],
    brand: {
      id: "671000f70a9054a83674a69b",
      name: "Puma",
      image: "https://res.cloudinary.com/dbju2ugir/image/upload/v1729102061/Beemely/ruefdspetdxizkleeu15.png",
      description: " Giày thể thao năng động, phong cách trẻ trung.",
      slug: "puma",
    },
    productColors: [
      {
        id: "6713d2951e766dfb9055e4fb",
        colorId: {
          id: "670ffb790a9054a83674a4b2",
          name: "Màu Xanh Lam",
          value: "#99FFFF",
        },
        imageUrl: "https://res.cloudinary.com/dbju2ugir/image/upload/v1729352285/Beemely/p3rarfpdpgkpiuuudkbz.png",
      },
    ],
    productSizes: [
      {
        id: "6712b237b1b995cd15d2e046",
        name: "43",
        gender: "671208425ce9910c4f861fec",
      },
      {
        id: "6712b22bb1b995cd15d2e02f",
        name: "42",
        gender: "671208425ce9910c4f861fec",
      },
      {
        id: "6712b20db1b995cd15d2e005",
        name: "41",
        gender: "671208425ce9910c4f861fec",
      },
      {
        id: "67120f78c99274a435dd9b3c",
        name: "40",
        gender: "671208425ce9910c4f861fec",
      },
    ],
    productType: {
      id: "6712b265b1b995cd15d2e083",
      name: "Giày Thể Thao",
      slug: "giay-the-thao",
    },
    flag: "all_page",
    status: 1,
  },
  {
    id: "6713d0c01e766dfb9055e43a",
    name: "Giày Puma sneakers unisex cổ thấp 180 Corduroy",
    slug: "giay-puma-sneakers-unisex-co-thap-180-corduroy",
    description:
      "\nGiày Puma sneakers unisex cổ thấp 180 Corduroy là mẫu giày thể thao nổi bật với thiết kế cổ thấp, mang phong cách thời trang cổ điển và tinh tế. Sự kết hợp giữa chất liệu vải nhung kẻ (corduroy) độc đáo và các chi tiết da lộn, giúp đôi giày có vẻ ngoài sang trọng nhưng vẫn rất thoải mái khi mang. Đế giày được làm từ cao su bền bỉ, đảm bảo độ bám và êm ái khi di chuyển. Đây là lựa chọn lý tưởng cho những ai yêu thích sự kết hợp giữa phong cách retro và hiện đại trong các hoạt động hàng ngày.",
    thumbnail: "https://res.cloudinary.com/dbju2ugir/image/upload/v1729351767/Beemely/d2rvvgdnj0nmblsduear.png",
    images: [
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729351771/Beemely/we3tj8j56ii9ensmumd5.png",
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729351768/Beemely/bbzphovuxxhffu5yggqv.png",
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729351769/Beemely/gvvwc3kida0hpk3x0fev.png",
      "https://res.cloudinary.com/dbju2ugir/image/upload/v1729351769/Beemely/fiprc5gmfk2jwhyc7jwb.png",
    ],
    tags: [
      {
        id: "670ffeb70a9054a83674a5da",
        name: "Giày Sneaker Trẻ Em",
        slug: "giay-sneaker-tre-em",
        image: "https://res.cloudinary.com/dbju2ugir/image/upload/v1729101492/Beemely/htzedjfbqt7se3ick26l.png",
        description: "Giày sneaker trẻ em năng động, bảo vệ bàn chân khi vận động.",
        parentId: null,
        status: 1,
      },
    ],
    gender: {
      id: "671208565ce9910c4f862008",
      name: "Dành cho Trẻ em",
      slug: "danh-cho-tre-em",
    },
    variants: [
      {
        id: "6713d0c01e766dfb9055e436",
        color: {
          id: "670ffbbb0a9054a83674a4cc",
          name: "Màu Nâu",
          value: "#8B4513",
        },
        stock: 34,
        price: 3119000,
        discountPrice: 3019000,
        size: {
          id: "6712b1dab1b995cd15d2dfa9",
          name: "35",
          gender: "671208565ce9910c4f862008",
        },
      },
      {
        id: "6713d0c01e766dfb9055e437",
        color: {
          id: "670ffbbb0a9054a83674a4cc",
          name: "Màu Nâu",
          value: "#8B4513",
        },
        stock: 50,
        price: 3119000,
        discountPrice: 3019000,
        size: {
          id: "6712140cc99274a435dda475",
          name: "36",
          gender: "671208565ce9910c4f862008",
        },
      },
    ],
    labels: [
      {
        id: "6712b63db1b995cd15d2e1ce",
        name: "Bán chạy",
        slug: "ban-chay",
        description: "Giày không có gót cao, mang lại cảm giác thoải mái khi di chuyển, thích hợp cho các hoạt động hàng ngày.",
        status: 1,
      },
      {
        id: "670ffcba0a9054a83674a525",
        name: "Giày Thể Thao",
        slug: "giay-the-thao",
        description: "Giày thể thao năng động, phù hợp cho các hoạt động thể dục, thể thao.",
        status: 1,
      },
    ],
    brand: {
      id: "671000f70a9054a83674a69b",
      name: "Puma",
      image: "https://res.cloudinary.com/dbju2ugir/image/upload/v1729102061/Beemely/ruefdspetdxizkleeu15.png",
      description: " Giày thể thao năng động, phong cách trẻ trung.",
      slug: "puma",
    },
    productColors: [
      {
        id: "6713d0c01e766dfb9055e435",
        colorId: {
          id: "670ffbbb0a9054a83674a4cc",
          name: "Màu Nâu",
          value: "#8B4513",
        },
        imageUrl: "https://res.cloudinary.com/dbju2ugir/image/upload/v1729351818/Beemely/bmvewzaybj46pxggi1oo.png",
      },
    ],
    productSizes: [
      {
        id: "6712b1dab1b995cd15d2dfa9",
        name: "35",
        gender: "671208565ce9910c4f862008",
      },
      {
        id: "6712140cc99274a435dda475",
        name: "36",
        gender: "671208565ce9910c4f862008",
      },
    ],
    productType: {
      id: "66d46c2a741cf88d736d372f",
      name: "Giày Bata",
      slug: "giay-bata",
    },
    flag: "all_page",
    status: 1,
  },
];
