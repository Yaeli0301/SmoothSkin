# SmoothSkin – חנות דרופשיפינג

חנות איקומרס בעברית (RTL) עם אופטימיזציה להמרות, Stripe, אנליטיקס, A/B testing ופאנל מנהל.

## מבנה הפרויקט

```
/client   → Next.js 14 + Tailwind + Zustand
/server   → Express + MongoDB + Stripe
```

## התקנה מהירה

### 1. תלויות

```bash
npm run install:all
```

### 2. משתני סביבה

**server/.env** (העתק מ-`server/.env.example`):

- `MONGODB_URI` – חיבור MongoDB
- `STRIPE_SECRET_KEY` – מפתח Stripe
- `STRIPE_WEBHOOK_SECRET` – webhook לתשלומים
- `CLIENT_URL=http://localhost:3000`
- `JWT_SECRET` – לאימות מנהל
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` – משתמש מנהל ראשוני

**client/.env.local** (העתק מ-`client/.env.local.example`):

- `NEXT_PUBLIC_API_URL=http://localhost:5000/api`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_GA_ID` – Google Analytics (אופציונלי)

### 3. הרצה

```bash
npm run dev
```

- **חנות:** http://localhost:3000
- **API:** http://localhost:5000
- **פאנל מנהל:** http://localhost:3000/admin/login

ברירת מחדל: `admin@store.com` / `admin123`

## דפים

| דף | נתיב |
|----|------|
| דף בית | `/` |
| דף מוצר | `/product` או `/product/[slug]` |
| אחרי רכישה | `/success` |
| כניסת מנהל | `/admin/login` |
| פאנל מנהל | `/admin` |

## תכונות

- עיצוב RTL בעברית, צבעי המרה (#FF4D6D)
- דף בית ודף מוצר מותאמים להמרות
- Stripe Checkout + הגדרות תשלום בפאנל מנהל
- ניהול מוצרים, הזמנות, אנליטיקס
- A/B testing, Google Analytics, exit-intent

## פריסה

- **Frontend:** Vercel – שורש `client`
- **Backend:** Render / Railway – שורש `server`

## צ'קליסט השקה

- [ ] מפתחות Stripe (test → live)
- [ ] MongoDB Atlas
- [ ] GA מחובר
- [ ] בדיקת תשלום במובייל
