# movies-explorer-frontend

Ссылка на макет Фигма: https://www.figma.com/file/6FMWkB94wE7KTkcCgUXtnC/%D0%94%D0%B8%D0%BF%D0%BB%D0%BE%D0%BC%D0%BD%D1%8B%D0%B9-%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82?type=design&node-id=1-6424&mode=design&t=7ztckp5I8BfPRL87-0

Не понял следующие кометарии:
1. По макету у мобильного меню должен быть еще фон (который имеет прозрачность);
2. В проекте есть ошибки по БЭМ : У меня данные ошибки не отображаются 
3. На разрешении 320px должны быть соответствующие иконки. Разве они не такие же ?
4. Инпуту поиска фильмов так же нужен стилизованный фокус и переопределенный outline ? разве он не стилизован ?
.search__input:focus {
    outline: transparent;
}

.search__input::placeholder {
    color: #8B8B8B;
    font-weight: 400;
    font-size: 18px;
    line-height: 20px;
    opacity: 1;
    transition: opacity .8s ease;
}