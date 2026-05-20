import { PointData, RouteData, PinData } from "../types/localTypes";

export const TestPoints: PointData[] = [
  {
    id: 100,
    pointName: 'Парк Альпак Пача Мама',
    pointType: 'Парк',
    pointLocation: 'пр-кт Сельмаш, 1А Парк культуры и отдыха им. Николая Островского, Ростов-на-Дону',
    pointRating: 4.9,
    ratingCount: 912,
    pointDescription: 'Пача Мама - уютный уголок природы в Ростове-на-Дону, где обитают милые альпаки из Перу, ласковые кролики и ручные козы. Ко всем животным можно зайти в вольеры, покормить, погладить и даже обнять! Зарядитесь альпакотерапией и порцией позитива!',
    nextDistance: 1160,
    nextTime: 13,
    imageCarousel: ['/search-window/point-previews/alpaca.jpg', '/search-window/point-previews/alpaca.jpg', '/search-window/point-previews/alpaca.jpg'],
    image: '/search-window/point-previews/alpaca.jpg'
  },
  {
    id: 101,
    pointName: 'Сицилия',
    pointType: 'Ресторан',
    pointLocation: 'просп. Шолохова, 31А, Ростов-на-Дону',
    pointRating: 5.0,
    ratingCount: 3608,
    pointDescription: 'Пиццерия «Сицилия» — это место, где вы можете насладиться вкусной едой и приятной атмосферой. Здесь вы найдете разнообразное меню, включая пиццу, роллы, салаты и основные блюда, а также детское меню.',
    nextDistance: 1160,
    nextTime: 13,
    imageCarousel: ['/search-window/point-previews/sicily.jpg', '/search-window/point-previews/sicily.jpg', '/search-window/point-previews/sicily.jpg'],
    image: '/search-window/point-previews/sicily.jpg'
  },
  {
    id: 102,
    pointName: 'Дом Нино',
    pointType: 'Ресторан',
    pointLocation: 'Московское ш., 254, Самара, Самарская обл., 443125',
    pointRating: 4.9,
    ratingCount: 15247,
    pointDescription: 'Дом Нино — место, где многовековые традиции Грузии сливаются рекой вина.',
    nextDistance: 1160,
    nextTime: 13,
    imageCarousel: ['/search-window/point-previews/ninho.png', '/search-window/point-previews/ninho.png', '/search-window/point-previews/ninho.png'],
    image: '/search-window/point-previews/ninho.png'
  },
  {
    id: 103,
    pointName: 'Утесов',
    pointType: 'Ресторан',
    pointLocation: 'ул. Лесная, 23, Самара, Самарская обл., 443110',
    pointRating: 4.8,
    ratingCount: 10523,
    pointDescription: 'Нарядный ресторан в одной из лучших городских локаций — прямо на набережной Волги.',
    nextDistance: 1160,
    nextTime: 13,
    imageCarousel: ['/search-window/point-previews/restaurant.jpg', '/search-window/point-previews/restaurant.jpg', '/search-window/point-previews/restaurant.jpg'],
    image: '/search-window/point-previews/restaurant.jpg'
  },
  {
    id: 104,
    pointName: 'Sapore Italiano',
    pointType: 'Ресторан',
    pointLocation: 'пр-т Михаила Нагибина, 32/2, Ростов-на-Дону, Ростовская обл., 344068',
    pointRating: 4.9,
    ratingCount: 912,
    pointDescription: 'Здесь вас ждут сырное меню, итальянские десерты, торты и муссы, меню для наших маленьких гостей, ваших детей.',
    nextDistance: 1160,
    nextTime: 13,
    imageCarousel: ['/search-window/point-previews/sapore.jpg', '/search-window/point-previews/sapore.jpg', '/search-window/point-previews/sapore.jpg'],
    image: '/search-window/point-previews/sapore.jpg'
  },
  {
    id: 105,
    pointName: 'Филармония Самары',
    pointType: 'Культура',
    pointLocation: 'ул. Фрунзе, 141, Самара, Самарская обл., 443010',
    pointRating: 4.9,
    ratingCount: 912,
    pointDescription: 'Самарская государственная филармония — государственное учреждение культуры городского округа Самара',
    imageCarousel: ['/search-window/point-previews/filarmony.png', '/search-window/point-previews/filarmony.png', '/search-window/point-previews/filarmony.png'],
    image: '/search-window/point-previews/filarmony.png'
  },
  {
    id: 106,
    pointName: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo eu aenean.',
    pointType: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo eu aenean.',
    pointLocation: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo eu aenean.',
    pointRating: 4.9,
    ratingCount: 2935649087349732906723923912,
    pointDescription: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo eu aenean.',
    imageCarousel: ['/search-window/point-previews/filarmony.png', '/search-window/point-previews/filarmony.png', '/search-window/point-previews/filarmony.png'],
    image: '/search-window/point-previews/filarmony.png'
  }
]

export const TestRoutes: RouteData[] = [
  {
    id: 100,
    author: 'Jonh Doe',
    authorPfp: '/search-window/route-previews/checker.png',
    creationDate: '01 января 1970',
    routeName: 'Сердце Ростова',
    routeDescription: 'Маршрут, где встречаются неожиданные радости: от обаятельных альпак и итальянской пиццы к высокому искусству в легендарном театре и безудержному веселью в аквапарке. Откройте для себя Ростов, где природа, гастрономия, культура и адреналин бьются в одном сердце.',
    routeTags: ['с_детьми', 'культура', 'развлечения', 'рестораны'],
    likeCount: 157,
    commentCount: 52,
    points: TestPoints,
    stops: [
      {
        order: 1,
        id: 188,
        lat: 47.220882,
        lng: 38.937658,
      },
      {
        order: 2,
        id: 185,
        lat: 47.216553,
        lng: 38.938986,
      },
      {
        order: 3,
        id: 96,
        lat: 47.21264,
        lng: 38.938132,
      },
      {
        order: 4,
        id: 102,
        lat: 47.214336,
        lng: 38.941752,
      },
    ],
    isLiked: false,
    image: '/search-window/point-previews/alpaca.jpg'
  },
  {
    id: 101,
    author: 'Jane Doe',
    authorPfp: '/search-window/route-previews/checker.png',
    creationDate: '02 января 1970',
    routeName: 'Таганрогский бриз',
    routeDescription: 'Этот маршрут проведёт вас через все фазы идеального отдыха: релакс в пляжной беседке, адреналин на картинге «Формула», гастрономическое наслаждение в «Мидийном Месте» и лирическое завершение на Пушкинской набережной. Погрузитесь в многогранный Таганрог.',
    routeTags: ['отдых', 'развлечения', 'рестораны', 'природа'],
    likeCount: 100,
    commentCount: 31,
    points: TestPoints,
    stops: [
      {
        order: 1,
        id: 767,
        lat: 47.22123,
        lng: 38.85495,
      },
      {
        order: 2,
        id: 766,
        lat: 47.22156,
        lng: 38.856664,
      },
      {
        order: 3,
        id: 772,
        lat: 47.227443,
        lng: 38.863572,
      },
      {
        order: 4,
        id: 715,
        lat: 47.227004,
        lng: 38.835535,
      },
      {
        order: 5,
        id: 719,
        lat: 47.228288,
        lng: 38.843189,
      },
    ],
    isLiked: false,
    image: '/search-window/route-previews/park.jpg'
  },
  {
    id: 102,
    author: 'Jonh Doe',
    authorPfp: '/search-window/route-previews/checker.png',
    creationDate: '01 января 1970',
    routeName: 'Парк. Пироги. Пони.',
    routeDescription: 'Идеальный маршрут для неторопливого отдыха в Таганроге. Начните с прогулки по тенистым аллеям парка 300-летия, выпейте ароматный кофе в уютной кофейне на его территории и попробуйте знаменитые осетинские пироги. А кульминацией дня станет конная прогулка по берегу моря — лучший способ ощутить свободу и единение с природой.',
    routeTags: ['отдых', 'развлечения', 'кофе', 'пиццерия', 'природа'],
    likeCount: 50,
    commentCount: 3,
    points: TestPoints,
    stops: [
      {
        order: 1,
        id: 58,
        lat: 47.209564,
        lng: 38.93788,
      },
      {
        order: 2,
        id: 59,
        lat: 47.209146,
        lng: 38.93597,
      },
      {
        order: 3,
        id: 130,
        lat: 47.206874,
        lng: 38.931242,
      },
      {
        order: 4,
        id: 71,
        lat: 47.210729,
        lng: 38.932238,
      },
      {
        order: 5,
        id: 117,
        lat: 47.210754,
        lng: 38.933708,
      },
      {
        order: 6,
        id: 118,
        lat: 47.210678,
        lng: 38.933651,
      },
      {
        order: 7,
        id: 132,
        lat: 47.21362,
        lng: 38.928386,
      },
      {
        order: 8,
        id: 167,
        lat: 47.214494,
        lng: 38.930249,
      },
      {
        order: 9,
        id: 174,
        lat: 47.215371,
        lng: 38.928602,
      },
      {
        order: 10,
        id: 143,
        lat: 47.21571,
        lng: 38.9312,
      },
    ],
    isLiked: false,
    image: '/search-window/route-previews/horse.png'
  },
  {
    id: 103,
    author: 'Jane Doe',
    authorPfp: '/search-window/route-previews/checker.png',
    creationDate: '02 января 1970',
    routeName: 'New Placeholder Route',
    routeDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    routeTags: ['test4', 'test3', 'test2', 'test1', 'test4', 'test3', 'test2', 'test1', 'test4', 'test3', 'test2', 'test1'],
    likeCount: 228,
    commentCount: 413,
    points: TestPoints,
    stops: [
      {
        order: 1,
        id: 10,
        lat: 47.204338,
        lng: 38.946064,
      },
      {
        order: 2,
        id: 9,
        lat: 47.205017,
        lng: 38.946396,
      },
      {
        order: 3,
        id: 11,
        lat: 47.204139,
        lng: 38.945882,
      },
      {
        order: 4,
        id: 19,
        lat: 47.205845,
        lng: 38.944411,
      },
      {
        order: 5,
        id: 75,
        lat: 47.211765,
        lng: 38.933267,
      },
      {
        order: 6,
        id: 164,
        lat: 47.21848,
        lng: 38.92485,
      },
      {
        order: 7,
        id: 216,
        lat: 47.220766,
        lng: 38.925035,
      },
      {
        order: 8,
        id: 215,
        lat: 47.218877,
        lng: 38.925427,
      },
    ],
    isLiked: false,
    image: '/search-window/route-previews/checker.png'
  }
]

export const TestPins: PinData[] = []