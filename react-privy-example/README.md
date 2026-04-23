# React Privy Example (khuyến nghị của Privy)

Đây là ví dụ tối thiểu dùng `@privy-io/react-auth` để đăng nhập Discord và lấy embedded wallet.

## Chạy local

```bash
cd react-privy-example
npm install
npm run dev
```

## Cần cấu hình trong Privy Dashboard

1. Bật Discord provider.
2. Thêm Redirect URL cho Discord:
   - `https://auth.privy.io/api/v1/oauth/callback`
3. Thêm Allowed Origins:
   - `http://localhost:5173`
4. Bật Embedded Wallets.

## Ghi chú

- Ví dụ này dùng `loginMethods: ['discord']` để ưu tiên Discord login.
- `embeddedWallets.createOnLogin = 'users-without-wallets'` giúp mỗi user Discord có ví Privy tương ứng (nếu chưa có sẽ tự tạo).


## Deploy lên Vercel (tối ưu sẵn)

Repo đã có `vercel.json` ở root để build trực tiếp thư mục `react-privy-example`.

### Cấu hình Environment Variables trên Vercel

- `VITE_PRIVY_APP_ID=cmobamqkp00220clbbikzbyl8`

### Build tối ưu

- Đã thêm `vite.config.js` để tách chunk:
  - `vendor` (react, react-dom)
  - `privy` (@privy-io/react-auth, ethers)
- Tắt sourcemap production để giảm kích thước output.
