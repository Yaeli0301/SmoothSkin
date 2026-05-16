# פריסה ל-Vercel – חובה לקרוא

## הגדרה נכונה (פעם אחת)

1. Vercel → הפרויקט → **Settings** → **General**
2. **Root Directory** → לחצי **Edit** → בחרי **`client`** → Save
3. **Environment Variables**:
   - `NEXT_PUBLIC_API_URL` = `https://YOUR-BACKEND.onrender.com/api` (אחרי פריסת השרת)
4. **Deployments** → **Redeploy**

בלי Root Directory = `client` ה-build ייכשל או האתר יהיה ריק.

## מה עובד בלי שרת?

- דף בית, מוצרים, קולקציות – **4 מוצרי דמו** מובנים
- תשלום אמיתי – **דורש** שרת + MongoDB + Stripe

## שרת (Render / Railway)

שורש התיקייה: `server`  
פקודת start: `npm start`  
משתנים: `MONGODB_URI`, `CLIENT_URL` (כתובת Vercel), `JWT_SECRET`, Stripe
