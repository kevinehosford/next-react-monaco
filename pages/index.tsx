import dynamic from 'next/dynamic';

const OtherEditor = dynamic(() => import('../components/OtherEditor'), { ssr: false });

/** Add your relevant code here for the issue to reproduce */
export default function Home() {
  return (
    <div style={{ height: '100vh' }}>
      <OtherEditor />
    </div>
  )
}
