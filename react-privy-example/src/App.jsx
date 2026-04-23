import { useMemo } from 'react';
import { usePrivy, useWallets } from '@privy-io/react-auth';

export default function App() {
  const { ready, authenticated, login, logout, user } = usePrivy();
  const { wallets } = useWallets();

  const embeddedWallet = useMemo(() => {
    return wallets.find((w) => w.walletClientType === 'privy');
  }, [wallets]);

  const shortAddress = embeddedWallet?.address
    ? `${embeddedWallet.address.slice(0, 6)}...${embeddedWallet.address.slice(-4)}`
    : 'Chưa có ví';

  const sendSelfTx = async () => {
    if (!embeddedWallet) {
      alert('Chưa tìm thấy ví Privy embedded.');
      return;
    }

    await embeddedWallet.switchChain(2810); // Pod network chain id nếu bạn đã add trong Privy dashboard
    const provider = await embeddedWallet.getEthersProvider();
    const signer = await provider.getSigner();
    const to = await signer.getAddress();

    const tx = await signer.sendTransaction({
      to,
      value: 0n
    });
    await tx.wait();
    alert(`TX thành công: ${tx.hash}`);
  };

  if (!ready) return <p style={{ color: '#fff' }}>Đang khởi tạo Privy...</p>;

  return (
    <main style={{ minHeight: '100vh', background: '#020617', color: '#e2e8f0', padding: 24, fontFamily: 'sans-serif' }}>
      <h1>Privy React SDK (Discord + Embedded Wallet)</h1>

      {!authenticated ? (
        <button onClick={login}>Đăng nhập Discord</button>
      ) : (
        <>
          <p>Đăng nhập: {user?.discord?.username || user?.id}</p>
          <p>Ví Privy: {shortAddress}</p>
          <button onClick={sendSelfTx}>Test ký giao dịch</button>
          <button onClick={logout} style={{ marginLeft: 8 }}>Đăng xuất</button>
        </>
      )}
    </main>
  );
}
