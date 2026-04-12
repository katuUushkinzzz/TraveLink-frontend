import { RouteData, State } from "./SidePanelTypes";

export const TestRoutes: RouteData[] = [
    {
        id: 0,
        author: 'Jonh Doe',
        authorPfp: '/search-window/checker.png',
        creationDate: '01 января 1970',
        routeName: 'Placeholder Route',
        routePanelDescriptionription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        routePanelTags: ['test1', 'test2', 'test3', 'test4'],
        likeCount: 1337,
        commentCount: 420,
        points: [{
            pointName: 'Парк Альпак Пача Мама',
            pointType: 'Парк',
            pointLocation: 'пр-кт Сельмаш, 1А Парк культуры и отдыха им. Николая Островского, Ростов-на-Дону',
            pointRating: 4.9,
            ratingCount: 912,
            pointDescription: 'Пача Мама - уютный уголок природы в Ростове-на-Дону, где обитают милые альпаки из Перу, ласковые кролики и ручные козы. Ко всем животным можно зайти в вольеры, покормить, погладить и даже обнять! Зарядитесь альпакотерапией и порцией позитива!',
            nextDistance: 1160,
            nextTime: 13
        },
        {
            pointName: 'Парк Альпак Пача Мама',
            pointType: 'Парк',
            pointLocation: 'пр-кт Сельмаш, 1А Парк культуры и отдыха им. Николая Островского, Ростов-на-Дону',
            pointRating: 4.9,
            ratingCount: 912,
            pointDescription: 'Пача Мама - уютный уголок природы в Ростове-на-Дону, где обитают милые альпаки из Перу, ласковые кролики и ручные козы. Ко всем животным можно зайти в вольеры, покормить, погладить и даже обнять! Зарядитесь альпакотерапией и порцией позитива!',
            nextDistance: 1160,
            nextTime: 13
        },
        {
            pointName: 'Парк Альпак Пача Мама',
            pointType: 'Парк',
            pointLocation: 'пр-кт Сельмаш, 1А Парк культуры и отдыха им. Николая Островского, Ростов-на-Дону',
            pointRating: 4.9,
            ratingCount: 912,
            pointDescription: 'Пача Мама - уютный уголок природы в Ростове-на-Дону, где обитают милые альпаки из Перу, ласковые кролики и ручные козы. Ко всем животным можно зайти в вольеры, покормить, погладить и даже обнять! Зарядитесь альпакотерапией и порцией позитива!',
        }],
        isLiked: false,
        image: '/search-window/checker.png'
    },
    {
        id: 1,
        author: 'Jane Doe',
        authorPfp: '/search-window/checker.png',
        creationDate: '02 января 1970',
        routeName: 'New Placeholder Route',
        routePanelDescriptionription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        routePanelTags: ['test4', 'test3', 'test2', 'test1'],
        likeCount: 228,
        commentCount: 413,
        points: [],
        isLiked: false,
        image: '/search-window/checker.png'
    }
]

export const initialState: State = {
  isPickerVisible: false,
  isABRouteShown: false,
  isPanelShown: true,
  currentCity: 'Москва',
  routeData: undefined,
};