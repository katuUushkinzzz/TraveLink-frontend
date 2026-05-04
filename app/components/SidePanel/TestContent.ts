import { PointData, RouteData } from "../LocalTypes";

export const TestPoints: PointData[] = [
  {
    id: 0,
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
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    isLiked: false,
    image: '/search-window/route-previews/checker.png'
  }
]

