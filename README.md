# Gulp - быстрый старт
Сборка gulp от компании mostbest.ru. Автор: Чернов Алексей  
_Для работы потребуется установка [Node.js](https://nodejs.org/en/), [Git](https://git-scm.com/)_

# Команды npm
1. **npm i npm -g** - обновление **npm** до последней версии.
1. **npm uninstall _package-name_** - деинсталляция выбранного пакета.
**Псевдонимы:** un, unlink, remove, rm, r 

# Подготовка рабочей области
Создаем репозиторий проекта на локальном компьютере и копируем файлы сборщика проекта.  
1. В папке проекта открываем контекстное меню и запускаем консоль: **shift + левая кнопка мыши -> Открыть окно PowerShell здесь**. Или запускаем консоль в текстовом редакторе.  
1. В открывшемся окне пишем команду **npm i npm-check-updates** - контроль версий и обновление пакетов до последних стабильных версий. Иногда требуется глобольная установка пакета **npm i -g npm-check-updates**
1. Запускаем проверку актуальности пакетов описаных в **package.json** командой **ncu**.
1. При наличии устаревших версий обновляем их командой **ncu -u**.
1. **npm i** - устанавливаем все пактеты перечисленные в **package.json**.
1. **npm init -y** или **npm init -f** - стартовая команда для создание файла **package.json**. В него будет записываться информация об установленных пакетах. Ключ **-f** означает "тихую" установку. 

## Создание нового ключа SSH
1. **Пример создания SSH ключа в редакторе Visual studio Code.** Открываем папку проекта **File -> Open Folder..**. Открывает терминал **Ctrl + Shift + \~**.
1. Вводим команду **ssh-keygen -t ed25519 -C "your_email@example.com"**
1. Далее необходимо ввести имя файла, в который будет сохранен ключ **Enter file in which to save the key (C:\Users\username/.ssh/id_ed25519): id_ed25519.pub**
1. После чего будет предложено указать ключевое слово (можно оставить пустым) **Enter passphrase (empty for no passphrase):** и подтвердить его **Enter same passphrase again:**. В итоге будет сгенерирован и выведен в консоль SSH ключ.
1. Если возникла ошибка **unable to start ssh-agent service, error :1058** (Windows 10), вероятно не установлен компонент **Клиент OpenSSH**. Откройте **Параметры -> Приложения -> Приложения и возможности -> Дополнительные компоненты -> Клиент OpenSSH**. Далее **Службы -> OpenSHH Authentication Agent** в контекстном меню выбираем пункт **Автоматически**.
1. Start-Process ssh-agent -Verb RunAs Start-Service ssh-agent ssh-add c:/Users/username/.ssh/id_ed25519

## Удаляем глобальную версию gulp
1. **npm rm gulp -g** - удаляем предидущую глабально установленную версию **gulp**. В разных проектах могут использоваться разные версии **gulp**. Чтобы проект не зависил от глабально установленного **gulp** в каждый проет ставим **gulp** лакально.
1. **npm rm gulp-cli -g** - деинсталлируем утилиту **gulp-cli**. Утилита **gulp-cli** позваляет без глобальной установки вводить в консоль команды необходимые для управления **gulp**.
1. Запускаем **ssh-agent** командой **Start-Service ssh-agent**. Возможно понадобобится запуск **Start-Process ssh-agent -Verb RunAs**
1. После добавляем ключ **ssh-add c:/Users/username/.ssh/id_ed25519**

## Удаляем локальную версию gulp
1. **cd [your-project-dir/]** - переходим в директорию проекта.
1. **npm rm gulp --save-dev** - удаляем зависимости **devDependencies** из **package.json**.
1. **npm rm gulp --save** - удаляем зависимости **dependencies** из **package.json**.
1. **npm rm gulp --save-optional** - удаляем старую версию **gulp**.
1. **npm cache clean** - чистим кэш.

## Установка gulp локально
1. **npm i gulp** - устанавливаем **gulp**.
1. **npm i gulpjs/gulp-cli -g** - установка утилиты для роботы команд **gulp** в консоли.

## Дополнительная информация
_Чтобы держать gulpfile.js в «чистоте», его можно разделить на отдельные файлы с задачами. Это позволит тестировать каждую задачу независимо или использовать только те задачи, которые действительно нужны в текущем проекте._

