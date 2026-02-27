# Auth (Авторизація):

- POST /auth/login — Приймає email/password, повертає JWT токен та дані юзера.

- GET /auth/profile — (Protected) Повертає дані поточного юзера за токеном.

# Rooms (Аудиторії):

- GET /rooms — Отримати список всіх аудиторій (можна з фільтрами ?building=1&floor=2).

- GET /rooms/:id/schedule?date=2026-02-12 — Отримати розклад конкретної аудиторії на конкретний день/тиждень. Повертає масив зайнятих слотів.

# Bookings (Бронювання):

- POST /bookings — Створити бронювання. Body: { roomId, date, timeSlot, userId }.

- GET /bookings/my — (Protected) Отримати всі бронювання поточного юзера для сторінки профілю.

- DELETE /bookings/:id — Скасувати бронювання.
