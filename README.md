# jscodeshift webinar

## Установка
1) Склонируйте репозиторий
2) Установите зависимости (npm или yarn)

## Описание примеров

### rename-e
Хотим избавиться от однобуквенных переменных, в частности от __e__. Меняем на err или evt в зависимости от контекста.

### args-to-object
В рамках рефакторинга функции хотим заменить все её аргументы на объект с параметрами. Саму функцию несложно переписать и руками, а правку вызовов лучше автоматизировать.

### lodash
Оптимизировать импорты lodash так, чтобы корректно работал tree shaking.
Суть проблемы [описана здесь](https://tyapk.ru/blog/post/correct-way-to-import-lodash-methods).

## Запуск
```shell
npx jscodeshift -t %файл-трансформа% %фаилы-с-кодом%

# Ключи:
# -d - холостой прогон (без записи)
# -p - вывод результата в консоль
# --run-in-band - запуск в рамках одного процесса
#                 нужен для отладки

# Пример запуска трансформа на всех инпутах
npx jscodeshift rename-e/__testfixtures__/*.input.js -t rename-e/rename-e.ts -p -d

# Запуск для отладки
node --inspect-brk node_modules/.bin/jscodeshift \
  args-to-object/__testfixtures__/simple.input.js \
   -t args-to-object/args-to-object.ts \
   -p -d --run-in-band \
   --args=date,format,timezone

# Запуск всех тестов
npm test

# Запуск только lodash тестов
npm test lodash 
```

## Ссылки
- [AST Explorer](https://astexplorer.net/)
- [jscodeshift](https://github.com/facebook/jscodeshift)
- [ast-types](https://github.com/benjamn/ast-types)
