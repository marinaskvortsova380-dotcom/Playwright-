# Playwright Test Automation Project

Проект автоматизации тестирования на базе **Playwright** для приложения **Hillel QAuto** (`https://qauto.forstudy.space` и `https://qauto2.forstudy.space`).

---

## 1. Пошаговое объяснение настроек в `playwright.config.js`

Конфигурационный файл [`playwright.config.js`](./playwright.config.js) управляет всеми аспектами запуска тестов, таймаутами, генерацией отчетов и поддержкой нескольких тестовых стендов.

### 1.1. Настройка репортеров (`reporter`)

```javascript
reporter: [
  ['list'],
  ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ['json', { outputFile: 'playwright-report/results.json' }],
],
```

- **`['list']`**: Выводит подробный список выполняемых тестов прямо в терминал в реальном времени со статусом прохождения и временем выполнения.
- **`['html', { outputFolder: 'playwright-report', open: 'never' }]`**: Генерирует интерактивный визуальный HTML-отчет с графиками, скриншотами, видеозаписями и шагами тестов в папку `playwright-report/`. Параметр `open: 'never'` предотвращает автоматическое открытие браузера при запуске в CI/headless.
- **`['json', { outputFile: 'playwright-report/results.json' }]`**: Сохраняет структурированный отчет в формате JSON для интеграции с CI/CD пайплайнами и внешними дашбордами.

---

### 1.2. Настройка таймаутов (`timeout`, `expect.timeout`, `actionTimeout`, `navigationTimeout`)

В Playwright предусмотрено несколько уровней контроля времени ожидания:

```javascript
// 1. Общий таймаут теста (30 секунд)
timeout: 30 * 1000,

// 2. Таймаут для проверок expect(...) (5 секунд)
expect: {
  timeout: 5 * 1000,
},

use: {
  // 3. Таймаут на выполнение единичных действий (10 секунд)
  actionTimeout: 10 * 1000,

  // 4. Таймаут на загрузку страниц и навигацию (15 секунд)
  navigationTimeout: 15 * 1000,
}
```

- **`timeout: 30000`** — максимальное время выполнения всего тестового блока `test(...)`. Если тест не укладывается в 30 секунд, он прерывается с ошибкой `TimeoutError`.
- **`expect.timeout: 5000`** — время ожидания выполнения ассерта (например, `await expect(locator).toBeVisible()`). Playwright автоматически повторяет проверку (auto-retrying) в течение 5 секунд.
- **`actionTimeout: 10000`** — предельное время ожидания для таких действий, как `locator.click()`, `locator.fill()`, `locator.selectOption()`.
- **`navigationTimeout: 15000`** — предельное время ожидания перехода по URL (`page.goto()`, `page.waitForURL()`).

---

### 1.3. Настройка базовых URL (`baseURL`) и переключение между `qauto` и `qauto2`

Базовый URL позволяет использовать относительные пути в тестах (например, `await page.goto('/')` или `await page.goto('/panel/garage')`):

```javascript
const defaultBaseURL = process.env.BASE_URL || 'https://qauto.forstudy.space';

use: {
  baseURL: defaultBaseURL,
  httpCredentials: {
    username: process.env.HTTP_USER || 'guest',
    password: process.env.HTTP_PASSWORD || 'welcome2qauto',
  },
}
```

#### Встроенная базовая HTTP-аутентификация (`httpCredentials`)
При обращении к стендам `qauto` и `qauto2` сервер запрашивает Basic Auth. Playwright автоматически передает заголовок авторизации `Authorization: Basic Z3Vlc3Q6d2VsY29tZTJxYXV0bw==` для всех сетевых запросов.

#### Готовые профили проектов (`projects`) для двух стендов:
В секции `projects` определены готовые конфигурации для явного запуска на обоих стендах:
- **`qauto-chromium`** — стенд `https://qauto.forstudy.space/` в Google Chrome / Chromium.
- **`qauto2-chromium`** — стенд `https://qauto2.forstudy.space/` в Google Chrome / Chromium.
- **`chromium`**, **`firefox`**, **`webkit`** — запуск в разных браузерах с дефолтным `baseURL`.

---

## 2. Команды для запуска тестов

### 2.1. Запуск на стенде `qauto` (`https://qauto.forstudy.space/`)

```bash
# Запуск через готовый проект
npx playwright test --project=qauto-chromium

# Или через переменную окружения BASE_URL
BASE_URL=https://qauto.forstudy.space npx playwright test
```

### 2.2. Запуск на стенде `qauto2` (`https://qauto2.forstudy.space/`)

```bash
# Запуск через готовый проект
npx playwright test --project=qauto2-chromium

# Или через переменную окружения BASE_URL
BASE_URL=https://qauto2.forstudy.space npx playwright test
```

### 2.3. Запуск во всех основных браузерах (Chromium, Firefox, WebKit)

```bash
npx playwright test --project=chromium --project=firefox --project=webkit
```

### 2.4. Запуск в интерактивном режиме UI (Playwright UI Mode)

```bash
npx playwright test --ui
```

### 2.5. Просмотр сформированного HTML отчета

```bash
npx playwright show-report
```
