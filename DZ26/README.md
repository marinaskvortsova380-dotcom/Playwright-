# Домашнее задание 26.1: Playwright CLI and ENV variables

## 📁 Структура папки `DZ26`

```
DZ26/
├── .env                     # Локальный файл с переменными окружения (в .gitignore)
├── .env.example             # Шаблон переменных окружения для команды
├── config/
│   └── environment.js       # Модуль конфигурации окружения (считывает .env)
├── tests/
│   ├── qauto.spec.js        # Тесты главной страницы QAuto с проверкой baseURL и элементов
│   └── example.spec.js      # Базовые тесты навигации и заголовка
├── playwright.config.js     # Конфигурационный файл Playwright для модуля DZ26
└── README.md                # Описание домашнего задания и команды запуска
```

---

## ⚙️ Переменные окружения (.env)

В файле `.env` вынесены параметры:
* `BASE_URL` — базовый URL приложения (например, `https://qauto.forstudy.space`).
* `HTTP_USER` — логин для HTTP Basic Authentication (`guest`).
* `HTTP_PASSWORD` — пароль для HTTP Basic Authentication (`welcome2qauto`).

---

## 🚀 Команды для запуска тестов модуля DZ26

### 1. Запуск через npm-скрипты:
* **Все тесты модуля:**
  ```bash
  npm run test:dz26
  ```
* **Интерактивный UI режим:**
  ```bash
  npm run test:dz26:ui
  ```
* **Запуск с открытым браузером (Headed):**
  ```bash
  npm run test:dz26:headed
  ```
* **Запуск на стенде QAuto 1 (Chromium):**
  ```bash
  npm run test:dz26:qauto
  ```
* **Запуск на стенде QAuto 2 (Chromium):**
  ```bash
  npm run test:dz26:qauto2
  ```

---

### 2. Прямой запуск через Playwright CLI:
* **Запуск тестов с указанием конфига:**
  ```bash
  npx playwright test --config=DZ26/playwright.config.js
  ```
* **Запуск с переопределением переменной окружения через CLI:**
  ```bash
  npx cross-env BASE_URL=https://qauto2.forstudy.space npx playwright test --config=DZ26/playwright.config.js
  ```
* **Просмотр HTML-отчета:**
  ```bash
  npx playwright show-report
  ```
