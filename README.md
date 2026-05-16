# חנות דרופשיפינג – SmoothSkin

חנות איקומרס חד-מוצרית בעברית (RTL) עם אופטימיזציה להמרות, Stripe, אנליטיקס ו-A/B testing.

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
- `ADMIN_API_KEY` – לדשבורד `/admin`

**client/.env.local** (העתק מ-`client/.env.local.example`):

- `NEXT_PUBLIC_API_URL=http://localhost:5000/api`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_GA_ID` – Google Analytics (אופציונלי)

### 3. MongoDB + seed

```bash
npm run seed
```

### 4. הרצה

```bash
npm run dev
```

- Frontend: http://localhost:3000
- API: http://localhost:5000
- Admin: http://localhost:3000/admin

## Stripe Webhook (פרודקשן)

```bash
stripe listen --forward-to localhost:5000/api/orders/webhook
```

## דפים

| דף | נתיב |
|----|------|
| דף בית (המרות) | `/` |
| דף מוצר + תשלום | `/product` |
| אחרי רכישה | `/success` |
| דשבורד | `/admin` |

## תכונות

- ✅ עיצוב RTL בעברית, צבעי המרה (#FF4D6D)
- ✅ דף בית: Hero, הוכחה חברתית, בעיה/פתרון, יתרונות, לפני/אחרי
- ✅ דף מוצר: גלריה, מחיר מוזל, countdown, מלאי מוגבל
- ✅ CTA דביק במובייל, exit-intent popup
- ✅ A/B testing (כותרת, מחיר, צבע CTA) ב-localStorage
- ✅ Google Analytics + אירועים מותאמים לשרת
- ✅ Stripe Checkout
- ✅ אימייל אישור הזמנה + נטישת עגלה (SMTP)
- ✅ דשבורד הכנסות והמרות

## פריסה

- **Frontend:** Vercel – שורש `client`
- **Backend:** Render/Railway – שורש `server`

## צ'קליסט השקה

- [ ] מפתחות Stripe (test → live)
- [ ] MongoDB Atlas
- [ ] GA מחובר
- [ ] 3–5 סרטוני TikTok מוכנים
- [ ] בדיקת תשלום מלאה במובייל
