import i18n from "i18next";
import {initReactI18next} from "react-i18next";

const resources = {
    en: {
        translation: {

            //types
            "WASHING": "WASHING",
            "DRYING": "DRYING",
            "IRONING": "IRONING",
            "DELIVERY": "DELIVERY",

            "RECEIVED": "RECEIVED",
            "IN PROGRESS": "IN PROGRESS",
            "AWAITING": "AWAITING",
            "COMPLETED": "COMPLETED",
            "CANCELED": "CANCELED",

            "SPECIAL": "SPECIAL",
            "LINEN": "LINEN",
            "BLANKET": "BLANKET",
            "CARPET": "CARPET",
            "OUTERWEAR": "OUTERWEAR",
            "REGULAR": "REGULAR",
            "WOOLENS": "WOOLENS",
            "DELICATE": "DELICATE",

            //alerts
            "Next": "Next",
            "Clear": "Clear",
            "Confirm": "Confirm",
            "Close": "Close",
            "Your order number is ": "Your order number is ",
            "Check the data you entered": "Check the data you entered",
            "Laundry was edited": "Laundry was edited",
            "Laundry was added": "Laundry was added",
            "There are no laundries in your area yet": "There are no laundries in your area yet",

            //header
            "Laundries": "Laundries",
            "Nearby": "Nearby",
            "Find laundry nearby": "Find laundry nearby",

            "About Us": "About Us",
            "Contacts": "Contacts",
            "Making washing easier": "Making washing easier",
            "(a kilometer away from you)": "(a kilometer away from you)",
            "Check order": "Check order",

            //laundry
            "Outerwear: jackets, coats, etc. By the piece.": "Outerwear: jackets, coats, etc. By the piece.",
            "Wool Products. In kg.": "Wool Products. In kg.",
            "Simple jersey. In kg.": "Simple jersey. In kg.",
            "Available for now": "Available for now",
            "No available machine, check in ": "No available machine, check in ",
            //recommendations
            "quantity": "quantity",
            "Choose number of clothes you have to wash":
                "Choose number of clothes you have to wash",
            "Get recommendation": "Get recommendation",
            "Show on the map": "Show on the map",
            "Your order": "Your order",
            "UAH": "UAH",

            //laundry
            //form
            "Leave us your contacts to continue":
                "Leave us your contacts to continue",
            "Your name": "Your name",
            "Phone number": "Phone number",
            "Address to deliver": "Address to deliver",
            "Enter address to deliver": "Enter address to deliver",
            "Description": "Description",
            "Additional information":
                "Additional information",
            "Total": "Total",

            //check order
            "Order number": "Order number",
            "Order": "Order",
            "Order status": "Order status",

            //admin panel
            "Select laundry": "Select laundry",
            "Add laundry": "Add laundry",
            "Log out": "Log out",

            //admin panel
            //control panel
            "Name": "Name",
            "Phone": "Phone",
            "Address": "Address",
            "Delete laundry": "Delete laundry",
            "Edit laundry": "Edit laundry",
            "Delete service": "Delete service",
            "Edit service": "Edit service",
            "Add service": "Add service",
            "Delete order": "Delete order",
            "Set status": "Set status",
            "Order info": "Order info",
            "ServiceType": "ServiceType",
            "Quantity": "Quantity",
            "Unit": "Unit",
            "Price": "Price",
            "Date": "Date",
            "Paid": "Paid",
            "Status": "Status",
            "Orders": "Orders",
            "Services": "Services",

            //admin panel
            //laundry form
            "Edit laundry information": "Edit laundry information",
            "Add laundry information": "Add laundry information",
            "Location": "Location",
            "latitude": "latitude",
            "longitude": "longitude",

            //service form
            "Edit service information": "Edit service information",
            "Add service information": "Add service information",
            "Time": "Time",
            "min": "min",
            "Units": "Units",
            "Clothes Type": "Clothes Type",
            "Service Type": "Service Type",

            //log in
            "Login": "Login",
            "Password": "Password",
            "Log in": "Log in",
            "Wrong login or password!": "Wrong login or password!"
        }
    },
    ua: {
        translation: {

            "WASHING": "ПРАННЯ",
            "DRYING": "СУШІННЯ",
            "IRONING": "ПРАСУВАННЯ",
            "DELIVERY": "ДОСТАВКА",

            "RECEIVED": "RECEIVED",
            "IN PROGRESS": "IN PROGRESS",
            "AWAITING": "AWAITING",
            "COMPLETED": "COMPLETED",
            "CANCELED": "CANCELED",

            "SPECIAL": "SPECIAL",
            "LINEN": "LINEN",
            "BLANKET": "BLANKET",
            "CARPET": "CARPET",
            "OUTERWEAR": "OUTERWEAR",
            "REGULAR": "REGULAR",
            "WOOLENS": "WOOLENS",
            "DELICATE": "DELICATE",


            "Next": "Далі",
            "Clear": "Очистити",
            "Confirm": "Підтвердити",
            "Close": "Закрити",
            "Your order number is ": "Номер вашого замовлення: ",
            "Check the data you entered": "Перевірте правильнісь вводу",
            "Laundry was edited": "Відредаговано",
            "Laundry was added": "Пральню додано",
            "There are no laundries in your area yet": "Нажаль, поблизу пралень немає",


            "Laundries": "Пральні",
            "Nearby": "Знайти",
            "Find laundry nearby": "Знайти пральню",
            "(a kilometer away from you)": "(в радіусі кілометра від вас)",
            "About Us": "Про Нас",
            "Contacts": "Контакти",
            "Making washing easier": "Полегшуємо прання",
            "Check order": "Перевірити замовлення",


            "Outerwear: jackets, coats, etc. By the piece.": "Верхній обяг: куртки, пальта, тп. поштучно",
            "Wool Products. In kg.": "Вироби з вовни. кг",
            "Simple jersey. In kg.": "Звичайний трикотаж. кг",
            "Available for now": "Можете завітати до нас прям зараз",
            "No available machine, check in ": "Зараз усе зайнято, перевірте через ",
            "quantity": "кількість",
            "Choose number of clothes you have to wash":
                "Оберіть кількість одягу одягу для прання",
            "Get recommendation": "Отримати рекомендацію",
            "Show on the map": "Показати на карті",
            "Your order": "Ваше замовлення",
            "UAH": "грн",


            "Leave us your contacts to continue":
                "Для продовження залиште свою контактну інформацію",
            "Your name": "Ваше ім'я",
            "Phone number": "Телефон",
            "Address to deliver": "Адреса для доставки",
            "Enter address to deliver": "Введіть адресу для доставки",
            "Description": "Опис",
            "Additional information": "Додаткова інфомація",
            "Total": "Усього",


            "Order number": "Номер замовлення",
            "Order": "Замовлення",
            "Order status": "Стан замовлення",


            "Select laundry": "Оберіть пральню",
            "Add laundry": "Додати пральню",
            "Log out": "Вихід",


            "Name": "Назва",
            "Phone": "Телефон",
            "Address": "Адреса",
            "Delete laundry": "Видалити пральню",
            "Edit laundry": "Ред. пральню",
            "Delete service": "Видалити послугу",
            "Edit service": "Ред. послугу",
            "Add service": "Додати послугу",
            "Delete order": "Видалити замовлення",
            "Set status": "Встановити стан",
            "Order info": "Про замовлення",
            "ServiceType": "Послуга",
            "Quantity": "Кількість",
            "Unit": "Одиниця",
            "Price": "Ціна",
            "Date": "Дата",
            "Paid": "Сплачено",
            "Status": "Стан",
            "Orders": "Замовлення",
            "Services": "Послуги",

            "Edit laundry information": "Редагувати плальню",
            "Add laundry information": "Додати пральню",
            "Location": "Локація",
            "latitude": "широта",
            "longitude": "довгота",

            "Edit service information": "Редагувати послугу",
            "Add service information": "Додати послугу",
            "Time": "Час",
            "min": "хв",
            "Units": "Одиниці",
            "Clothes Type": "Одяг",
            "Service Type": "Послуга",

            "Login": "Логін",
            "Password": "Пароль",
            "Log in": "Увійти",
            "Wrong login or password!": "Неправильний логін чи пароль"

        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: (localStorage.getItem("currentLanguage") !== null && localStorage.getItem("currentLanguage") !== 'null')
            ? localStorage.getItem("currentLanguage") : 'en',

        keySeparator: false,

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;