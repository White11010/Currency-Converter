# Сurrency converter
## Краткое описание 
Веб приложение, в котором доступно 2 страницы: Конвертер валют и Курсы валют. 
Навигация осуществляется через заголовок сайта.
## API
API с акутальными курсами валют - https://www.cbr-xml-daily.ru/daily_json.js.
Для отправки запросов и обработки ответов используется **Axios**
## Front-end
Навигация между страницами реализована через **Vue router**.

Для хранения объектов с данными валют и текущей выбранной базовой валюты, относительно которой показываются курсы на странице Currencies, используется state manager **Vuex**

### Верстка

Использована отзывчивая и адаптивная верстка, приложение пригодно для использования и корректно отображается на любых устройствах и при любой ориентации экрана.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
