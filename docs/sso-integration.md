# RayTech Account SSO Integration

Use `auth.raytech.cloud` as the single identity provider for all RayTech apps.

## Product Flow

1. User opens product app (`flownote.raytech.cloud`, `flowpaste.raytech.cloud`, `flowsummary.raytech.cloud`, `flowsign.raytech.cloud`).
2. Product calls `GET https://auth.raytech.cloud/api/me` with `credentials: "include"`.
3. If `401`, redirect user to `https://auth.raytech.cloud/login?returnTo=<current-url>`.
4. If `200`, store only `user.id` in product data models.

## Frontend Check (FlowNote / FlowPaste)

```ts
const me = await fetch("https://auth.raytech.cloud/api/me", {
  method: "GET",
  credentials: "include",
  headers: {
    "x-raytech-origin": window.location.origin,
  },
});

if (me.status === 401) {
  const returnTo = encodeURIComponent(window.location.href);
  window.location.href = `https://auth.raytech.cloud/login?returnTo=${returnTo}`;
}

const user = await me.json(); // { id, name, email }
```

## Backend Storage Rule

- Do store: `userId` (foreign key to RayTech Account user)
- Do not store: passwords, session tokens, auth secrets

## Product Logout

For unified logout, redirect to:

```txt
https://auth.raytech.cloud/login
```

or call the Better Auth sign-out endpoint from auth domain before redirecting.
