# Gulp - быстрый старт
Сборка gulp от компании mostbest.ru. Автор: Чернов Алексей

# Используемые технологии
_Для работы требуется установка [Node.js](https://nodejs.org/en/), [Git](https://git-scm.com/)_

# Команды npm
1. **npm i npm -g** - обновление **npm** до последней версии.
1. **npm uninstall _package-name_** - деинсталляция выбранного пакета.
**Псевдонимы:** un, unlink, remove, rm, r 

# Подготовка рабочей области
Создаем репозиторий проекта на локальном сервере и копируем файлы сборщика проекта.  
1. Открываем окно команд **shift + левая кнопка мыши** из папки проекта.
1. В открывшемся окне пишим команду **npm i npm-check-updates** - контроль версий и обновление пакетов до последних стабильных версий.
1. Запускаем проверку актуальности версий пакетов описаных в **package.json** командой **ncu**.
1. При наличии устаревших версий пакетов обновляем их командой **ncu -u**.
1. **npm i** - устанавливаем все пактеты перечисленные в **package.json**.
1. **npm init -y** или **npm init -f** - стартовая команда для создание файла **package.json**. В него будет записаваться информация об установленных пакетах. Ключ **-f** означает "тихую" установку. 

## Удаляем глобальную версию gulp
1. **npm rm gulp -g** - удаляем предидущую глабально установленную версию **gulp**. В разных проектах могут использоваться разные версии **gulp**. Чтобы проект не зависил от глабально установленного **gulp** в каждый проет ставим **gulp** лакально.
1. **npm rm gulp-cli -g** - деинсталлируем утилиту **gulp-cli**. Утилита **gulp-cli** позваляет без глобальной установки вводить в консоль команды необходимые для управления **gulp**.

## Удаляем локальную версию gulp
1. **cd [your-project-dir/]** - переходим в директорию проекта.
1. **npm rm gulp --save-dev** - удаляем старую версию **gulp**.
1. **npm rm gulp --save** - удаляем старую версию **gulp**.
1. **npm rm gulp --save-optional** - удаляем старую версию **gulp**.
1. **npm cache clean** - чистим кэш.

## Установка gulp локально
1. **npm i gulp** - устанавливаем **gulp**.
1. **npm i gulpjs/gulp-cli -g** - установка утилиты для роботы команд **gulp** в консоли.

