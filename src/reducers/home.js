const initialState = {
  active_menu_item: "main",
  org_type: true,
  oop: { label: "ООО", value: "ООО" },
  track_number: "",

  calc_send_city: {},
  calc_rec_city: {},
  calc_weight: 0,

  calc_result: [],
  position: { x: 0, y: -50, z: -80 },
  rotation: { x: 0, y: 2, z: 0 },

  map: {
    center: {
      lat: 54.02,
      lng: 82.56,
    },
    zoom: 5,
  },

  directions: null,

  select_filial: "0",
  filial: [
    {
      lat: 55.022919,
      lng: 82.912667,
      type: "Филиал",
      el_key: "01",
      text: "Новосибирск, ул. Коммунистическая д.7 Склад 1",
      size: 25,
      discription: "",
      phone: "+7 (383) 210-22-43",
      email: "razvitie@e-kinetika.ru",
      work_hour: {
        mon: "08:30 - 19:00",
        tue: "08:30 - 19:00",
        wen: "08:30 - 19:00",
        thu: "08:30 - 19:00",
        fri: "08:30 - 19:00",
        sat: "09:00 - 19:00",
        sun: "09:00 - 19:00",
      },
      director: "Ярослав Игоревич Адамович",
      director_photo: "",
    },

    {
      lat: 55.345578,
      lng: 86.066783,
      type: "Филиал",
      el_key: "02",
      text: "Кемерово, ул. Рукавишникова 26",
      size: 25,
      discription: "",
      phone: "+7 (3842) 000-000",
      email: "logistik.kem@e-kinetika.ru",
      work_hour: {
        mon: "09:00 - 18:00",
        tue: "09:00 - 18:00",
        wen: "09:00 - 18:00",
        thu: "09:00 - 18:00",
        fri: "09:00 - 18:00",
        sat: "Выходной",
        sun: "Выходной",
      },
      director: "Евгений Александрович Гейгер",
      director_photo: "",
    },

    {
      lat: 56.471509,
      lng: 84.959046,
      type: "Филиал",
      el_key: "03",
      text: "Томск, ул. Герцена 13/1 оф. 101",
      size: 25,
      discription: "",
      phone: "",
      email: "",
      work_hour: {
        mon: "08:30 - 19:00",
        tue: "08:30 - 19:00",
        wen: "08:30 - 19:00",
        thu: "08:30 - 19:00",
        fri: "08:30 - 19:00",
        sat: "09:00 - 19:00",
        sun: "09:00 - 19:00",
      },
      director: "",
      director_photo: "",
    },

    {
      lat: 56.039091,
      lng: 92.856798,
      type: "Филиал",
      el_key: "04",
      text: "Красноярск, ул. Караульная 4 стр 1",
      size: 25,
      discription: "",
      phone: "",
      email: "",
      work_hour: {
        mon: "08:30 - 19:00",
        tue: "08:30 - 19:00",
        wen: "08:30 - 19:00",
        thu: "08:30 - 19:00",
        fri: "08:30 - 19:00",
        sat: "09:00 - 19:00",
        sun: "09:00 - 19:00",
      },
      director: "",
      director_photo: "",
    },

    {
      lat: 54.968471,
      lng: 73.38879,
      type: "Филиал",
      el_key: "05",
      text: "Омск, ул. Потанина 15",
      size: 25,
      discription: "",
      phone: "",
      email: "",
      work_hour: {
        mon: "08:30 - 19:00",
        tue: "08:30 - 19:00",
        wen: "08:30 - 19:00",
        thu: "08:30 - 19:00",
        fri: "08:30 - 19:00",
        sat: "09:00 - 19:00",
        sun: "09:00 - 19:00",
      },
      director: "",
      director_photo: "",
    },

    {
      lat: 53.332397,
      lng: 83.786013,
      type: "Филиал",
      el_key: "06",
      text: "Барнаул, ул. Короленко 75а",
      size: 25,
      discription: "",
      phone: "",
      email: "",
      work_hour: {
        mon: "08:30 - 19:00",
        tue: "08:30 - 19:00",
        wen: "08:30 - 19:00",
        thu: "08:30 - 19:00",
        fri: "08:30 - 19:00",
        sat: "09:00 - 19:00",
        sun: "09:00 - 19:00",
      },
      director: "",
      director_photo: "",
    },

    {
      lat: 53.745939,
      lng: 87.128185,
      type: "Филиал",
      el_key: "07",
      text: "Новокузнецк, ул. Циолковского 13 оф 11",
      size: 25,
      discription: "",
      phone: "",
      email: "",
      work_hour: {
        mon: "08:30 - 19:00",
        tue: "08:30 - 19:00",
        wen: "08:30 - 19:00",
        thu: "08:30 - 19:00",
        fri: "08:30 - 19:00",
        sat: "09:00 - 19:00",
        sun: "09:00 - 19:00",
      },
      director: "",
      director_photo: "",
    },

    {
      lat: 55.350787,
      lng: 78.358753,
      type: "Представитель",
      el_key: "08",
      text: "Барабинск",
      size: 15,
      discription: "",
      phone: "",
      email: "",
      director: "",
      director_photo: "",
    },

    {
      lat: 54.663651,
      lng: 86.162096,
      type: "Представитель",
      el_key: "16",
      text: "Ленинск-Кузнецкий",
      size: 15,
      discription: "",
      phone: "",
      email: "",
      director: "",
      director_photo: "",
    },

    {
      lat: 56.204605,
      lng: 87.735284,
      type: "Представитель",
      el_key: "09",
      text: "Мариинск",
      size: 15,
      discription: "",
      phone: "",
      email: "",
      director: "",
      director_photo: "",
    },

    {
      lat: 56.258516,
      lng: 90.501988,
      type: "Представитель",
      el_key: "10",
      text: "Ачинск, м-н Юго-Западный 50",
      size: 15,
      discription: "",
      phone: "",
      email: "",
      director: "",
      director_photo: "",
    },

    {
      lat: 52.540283,
      lng: 85.222301,
      type: "Представитель",
      el_key: "11",
      text: "Бийск",
      size: 15,
      discription: "",
      phone: "",
      email: "",
      director: "",
      director_photo: "",
    },

    {
      lat: 51.532461,
      lng: 81.204952,
      type: "Представитель",
      el_key: "12",
      text: "Рубцовск",
      size: 15,
      discription: "",
      phone: "",
      email: "",
      director: "",
      director_photo: "",
    },

    {
      lat: 51.958752,
      lng: 85.951904,
      type: "Представитель",
      el_key: "13",
      text: "Горно-Алтайск",
      size: 15,
      discription: "",
      phone: "",
      email: "",
      director: "",
      director_photo: "",
    },

    {
      lat: 53.715559,
      lng: 91.426133,
      type: "Представитель",
      el_key: "14",
      text: "Абакан",
      size: 15,
      discription: "",
      phone: "",
      email: "",
      director: "",
      director_photo: "",
    },

    {
      lat: 55.720854,
      lng: 84.932176,
      type: "Представитель",
      el_key: "15",
      text: "Юрга",
      size: 15,
      discription: "",
      phone: "",
      email: "",
      director: "",
      director_photo: "",
    },
  ],
};

export default function general(state = initialState, action) {
  switch (action.type) {
    case "set_active_menu_item":
      return { ...state, active_menu_item: action.payload };
    case "set_org_type":
      return { ...state, org_type: action.payload };
    case "set_oop":
      return { ...state, oop: action.payload };
    case "set_track_number":
      return { ...state, track_number: action.payload };

    case "set_calc_send_city":
      return { ...state, calc_send_city: action.payload };
    case "set_calc_rec_city":
      return { ...state, calc_rec_city: action.payload };
    case "set_calc_weight":
      return { ...state, calc_weight: action.payload };

    case "set_calc_result":
      return { ...state, calc_result: action.payload };

    case "set_rotation":
      return { ...state, rotation: action.payload };
    case "set_directions":
      return { ...state, directions: action.payload };

    case "rotate":
      return {
        ...state,
        rotation: { ...state.rotation, y: state.rotation.y + 0.005 },
      };

    case "set_select_filial":
      return { ...state, select_filial: action.payload };

    default:
      return state;
  }
}
