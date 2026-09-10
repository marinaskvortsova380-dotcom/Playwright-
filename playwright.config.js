// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Базовый URL по умолчанию. Может быть переопределен через переменную окружения BASE_URL.
 * Примеры:
 *   BASE_URL=https://qauto.forstudy.space npx playwright test
 *   BASE_URL=https://qauto2.forstudy.space npx playwright test
 */
const defaultBaseURL = process.env.BASE_URL || 'https://qauto.forstudy.space';

/**
 * Конфигурация Playwright
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Директория с тестовыми файлами
  testDir: './tests',

  // Общий таймаут на выполнение одного теста (30 секунд)
  timeout: 30 * 1000,

  // Настройки таймаутов для проверок expect
  expect: {
    // Таймаут для каждого ассерта expect(...) (5 секунд)
    timeout: 5 * 1000,
  },

  // Параллельный запуск тестов внутри одного файла
  fullyParallel: true,

  // Запрет test.only на серверах CI
  forbidOnly: !!process.env.CI,

  // Количество повторных попыток (retries) при падении теста
  retries: process.env.CI ? 2 : 0,

  // Количество параллельных воркеров
  workers: process.env.CI ? 1 : undefined,

  // Настройка репортеров (отчетов о результатах тестирования)
  reporter: [
    // Вывод результатов списком в консоль
    ['list'],
    // Генерация интерактивного HTML отчета в папку playwright-report
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    // Сохранение результатов в формате JSON
    ['json', { outputFile: 'playwright-report/results.json' }],
  ],

  // Общие настройки для всех тестовых проектов
  use: {
    // Базовый URL приложения для относительных путей в page.goto('/')
    baseURL: defaultBaseURL,

    // Таймаут на выполнение отдельных действий (click, type, fill и т.д.) - 10 секунд
    actionTimeout: 10 * 1000,

    // Таймаут на загрузку страниц и навигацию (page.goto, waitForURL) - 15 секунд
    navigationTimeout: 15 * 1000,

    // Учетные данные для HTTP Basic Authentication (guest:welcome2qauto)
    httpCredentials: {
      username: process.env.HTTP_USER || 'guest',
      password: process.env.HTTP_PASSWORD || 'welcome2qauto',
    },

    // Запись трейсов для отладки при первом падении теста
    trace: 'on-first-retry',

    // Создание скриншотов при падении тестов
    screenshot: 'on',

    // Запись видео при падении тестов
    video: 'retain-on-failure',
  },

  // Настройка тестовых окружений и браузеров
  projects: [
    // --- Основные браузеры с baseURL по умолчанию (или из process.env.BASE_URL) ---
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // --- Проекты для явного запуска на стенде QAuto 1 (https://qauto.forstudy.space/) ---
    {
      name: 'qauto-chromium',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://qauto.forstudy.space',
      },
    },

    // --- Проекты для явного запуска на стенде QAuto 2 (https://qauto2.forstudy.space/) ---
    {
      name: 'qauto2-chromium',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://qauto2.forstudy.space',
      },
    },
  ],
});
